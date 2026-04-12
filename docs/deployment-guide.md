# 로컬 개발 서버 배포 가이드

> 대상 독자: 프론트엔드 개발자  
> 목적: `develop` 브랜치 병합 시 Docker + nginx 환경에서 자동 빌드/배포

---

## 1. 전체 아키텍처

```
[개발자]
    ↓ feature/* → develop 브랜치 PR 병합
[GitHub]
    ↓ push 이벤트 감지
[GitHub Actions]
    ↓ Self-hosted Runner (로컬 머신에서 실행)
[로컬 머신]
    ↓ git pull → docker compose build → docker compose up
[nginx :80]
    ├── /         → Next.js 컨테이너 :3000
    └── /api/*    → NestJS 컨테이너 :3001
         └── DB   → PostgreSQL 컨테이너 :5432
```

### Self-hosted Runner란?

GitHub Actions는 보통 GitHub 서버에서 실행되지만,  
**Self-hosted Runner**를 설치하면 로컬 머신에서 직접 실행됩니다.  
→ 추후 클라우드(AWS 등)로 이전할 때 Runner만 교체하면 파이프라인 재사용 가능.

---

## 2. 사전 준비사항

| 항목 | 확인 방법 | 설치 링크 |
|------|-----------|-----------|
| Docker Desktop | `docker --version` | https://www.docker.com/products/docker-desktop |
| Git | `git --version` | 이미 설치됨 |
| GitHub 계정 | — | 이미 있음 |

---

## 3. 최종 디렉토리 구조

아래 파일들을 새로 생성해야 합니다.

```
c:\dev\dev.log\                         ← 레포지토리 루트
├── .github/
│   └── workflows/
│       └── deploy-develop.yml          ← GitHub Actions 워크플로우 (신규)
├── nginx/
│   └── nginx.conf                      ← nginx 설정 (신규)
├── docker-compose.yml                  ← 전체 서비스 통합 (신규)
├── frontend/
│   ├── Dockerfile                      ← 프론트엔드 Docker 이미지 (신규)
│   └── .env.production                 ← 프로덕션 환경변수 (신규)
└── backend/
    ├── Dockerfile                      ← 백엔드 Docker 이미지 (신규)
    └── .env.production                 ← 프로덕션 환경변수 (신규)
```

---

## 4. 파일별 설정

### 4-1. frontend/Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> **주의**: Next.js standalone 출력을 사용합니다.  
> `frontend/next.config.ts`에 아래 설정이 필요합니다.
> ```ts
> output: 'standalone'
> ```

---

### 4-2. backend/Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["node", "dist/main"]
```

---

### 4-3. nginx/nginx.conf

```nginx
events {}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:3001;
    }

    server {
        listen 80;

        # NextAuth 콜백 → Next.js (백엔드 라우팅보다 먼저 처리)
        location ~ ^/api/auth/ {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_read_timeout 60s;
        }

        # /auth API → NestJS (signIn, access, users 하위 경로만)
        # /auth, /auth/signup 은 Next.js 페이지이므로 제외
        location ~ ^/auth/(signIn|access|users)(/|$) {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_read_timeout 60s;
        }

        # 나머지 백엔드 API 경로 → NestJS
        location ~ ^/(post|blog|tag|comment|common)(/|$) {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_read_timeout 60s;
        }

        # 나머지 → Next.js (/auth, /auth/signup 페이지 포함)
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_read_timeout 60s;
        }
    }
}
```

> **주의**: `/auth` 경로는 프론트엔드(로그인 페이지)와 백엔드(API) 모두에 존재합니다.  
> nginx에서 하위 경로(`/auth/signIn`, `/auth/access`, `/auth/users`)만 백엔드로 라우팅하고,  
> `/auth` 및 `/auth/signup` 은 Next.js로 전달해야 합니다.

---

### 4-4. docker-compose.yml (루트)

```yaml
services:
  postgres:
    image: postgres:15
    restart: always
    volumes:
      - ./backend/postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: devlog

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    env_file:
      - ./backend/.env.production
    depends_on:
      - postgres

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    env_file:
      - ./frontend/.env.production
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - '80:80'
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend
```

---

### 4-5. GitHub Actions 워크플로우 (.github/workflows/deploy-develop.yml)

```yaml
name: Deploy to Local Dev Server

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: self-hosted        # 로컬 머신의 Runner에서 실행

    steps:
      - name: 코드 최신화
        uses: actions/checkout@v4
        with:
          ref: develop

      - name: Docker 이미지 빌드 및 재시작
        run: |
          docker compose -f docker-compose.yml build --no-cache
          docker compose -f docker-compose.yml up -d
          docker image prune -f
```

---

## 5. Self-hosted Runner 설치 (로컬 머신)

> GitHub Actions가 로컬 머신에서 실행되도록 Runner를 등록합니다.  
> 한 번만 설정하면 됩니다.

### 5-1. GitHub에서 Runner 등록 페이지 접속

```
GitHub 레포지토리 → Settings → Actions → Runners → New self-hosted runner
```

### 5-2. OS 선택

`Windows` 선택 후 페이지에 표시된 명령어를 순서대로 실행합니다.  
(GitHub이 자동으로 최신 명령어를 생성해줍니다)

### 5-3. Runner를 서비스로 등록 (PC 재시작 후에도 자동 실행)

PowerShell을 **관리자 권한**으로 실행:

```powershell
cd C:\actions-runner        # Runner 설치 경로
.\svc.sh install
.\svc.sh start
```

### 5-4. 확인

```
GitHub 레포지토리 → Settings → Actions → Runners
```
Runner 상태가 **Idle** 이면 정상입니다.

---

## 6. 환경변수 파일 설정

### frontend/.env.production

```env
NEXT_PUBLIC_SITE_URL=http://192.168.0.10
NEXT_PUBLIC_SERVER_URL=
SERVER_URL=http://backend:3001
AUTH_URL=http://192.168.0.10
AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SERVER_URL` | **빈 문자열** — 클라이언트 사이드 API 요청이 상대 경로(`/auth/signIn` 등)로 전송되어 접속 IP에 무관하게 동작 |
| `SERVER_URL` | Next.js 서버 사이드(SSR/Server Actions)에서 백엔드를 Docker 내부 네트워크로 직접 호출 |
| `AUTH_URL` | NextAuth v5 콜백 기준 URL — 외부 접속 IP로 설정 |

### backend/.env.production

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/devlog
JWT_SECRET=your_jwt_secret
# 기타 백엔드 환경변수
```

> `.env.production` 파일은 절대 Git에 커밋하지 않습니다.  
> `.gitignore`에 반드시 추가하세요.

---

## 7. 최초 실행 (수동)

파이프라인 설정 전에 먼저 수동으로 한 번 정상 동작을 확인합니다.

```bash
# 레포지토리 루트에서
cd c:/dev/dev.log

# 빌드 및 실행
docker compose up --build -d

# 상태 확인
docker compose ps

# 로그 확인
docker compose logs -f
```

브라우저에서 `http://localhost` 또는 `http://192.168.0.10` 접속 확인.

---

## 8. 이후 개발 플로우

```
1. feature/* 브랜치에서 개발
2. develop 브랜치로 PR 생성
3. PR 병합
4. GitHub Actions 자동 실행 (약 2~5분)
5. http://localhost 에서 변경사항 확인
```

---

## 9. 추후 클라우드 이전 시 변경 사항

로컬 → 클라우드(AWS 등)로 이전할 때 변경이 필요한 부분만 정리합니다.

| 항목 | 로컬 | 클라우드 |
|------|------|----------|
| Runner | Self-hosted (로컬 PC) | Self-hosted (EC2 등) 또는 GitHub-hosted |
| 접속 URL | `http://localhost` | 도메인 or EC2 IP |
| nginx | HTTP (80) | HTTPS (443) + SSL 인증서 추가 |
| 환경변수 | `.env.production` 파일 | AWS Secrets Manager 또는 GitHub Secrets |

워크플로우 파일(`.github/workflows/deploy-develop.yml`) 자체는 거의 변경 없이 재사용 가능합니다.

---

## 10. 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| `http://localhost` 접속 안됨 | nginx 컨테이너 미실행 | `docker compose ps` 로 상태 확인 |
| 빌드 실패 | `.env.production` 누락 | 환경변수 파일 존재 여부 확인 |
| Runner가 Offline | Runner 서비스 미실행 | PowerShell에서 `.\svc.sh start` |
| 포트 80 충돌 | 다른 프로세스가 80 사용 중 | `netstat -ano \| findstr :80` 으로 확인 |
| `/auth` 접근 시 404 | nginx가 `/auth` 전체를 백엔드로 라우팅 | nginx.conf에서 `/auth/(signIn\|access\|users)` 만 백엔드로 라우팅, `/auth`·`/auth/signup`은 프론트로 전달 |
| `192.168.0.10`에서 API 호출 실패 | `NEXT_PUBLIC_SERVER_URL`이 특정 호스트로 고정됨 | `NEXT_PUBLIC_SERVER_URL=` (빈 값)으로 설정해 상대 경로 사용 |
| OAuth 로그인 후 콜백 실패 | `AUTH_URL`이 접속 IP와 불일치 | `AUTH_URL`을 실제 접속 IP(`http://192.168.0.10`)로 설정, Google Console에 리디렉션 URI 등록 확인 |
| CORS 오류 | 백엔드 허용 origin에 포트 80 주소 누락 | `main.ts`의 `enableCors` origin 목록에 `http://localhost`, `http://192.168.0.10` 추가 |
