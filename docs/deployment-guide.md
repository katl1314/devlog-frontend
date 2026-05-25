# Docker + nginx 배포 가이드

## 구조

```
nginx :90
├── /api/auth/*              → Next.js (NextAuth 콜백)
├── /auth/(signIn|access|users)/*  → NestJS
├── /(post|blog|tag|comment|common)/*  → NestJS
└── /*                       → Next.js
```

---

## 환경변수 파일

| 파일 | 용도 |
|------|------|
| `frontend/.env` | 공통 시크릿 (AUTH_SECRET, OAuth 키 등) |
| `frontend/.env.production` | 프로덕션 전용 URL, 버킷 등 |
| `backend/.env.production` | 백엔드 DB, JWT 등 |

> `docker-compose.yml`의 `env_file`은 위 순서대로 두 파일 모두 로드해야 합니다.
> `NEXT_PUBLIC_*` 변수는 **빌드 시점**에 번들에 포함됩니다. 빌드 전 파일이 있어야 합니다.

### frontend/.env.production 필수 항목

```env
NEXT_PUBLIC_STORAGE_BUCKET=...
SERVER_URL=http://backend:3001      # 컨테이너 내부 주소 (SSR용)
AUTH_URL=http://192.168.0.10        # 외부 접속 IP (NextAuth 콜백 기준)
```

### frontend/.env 필수 항목

```env
AUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 최초 실행

```bash
cd c:/dev/dev.log

docker compose up --build -d
```

---

## 코드 변경 후 재배포

### 프론트엔드만 변경된 경우

```bash
# 1. 빌드
docker compose build --no-cache frontend

# 2. 컨테이너 교체
docker compose up -d frontend

# 3. nginx 재시작 (IP 캐시 갱신 필수)
docker compose restart nginx
```

> **nginx 재시작이 필수인 이유**: nginx는 upstream 컨테이너 IP를 시작 시점에 캐싱합니다.
> 컨테이너가 재생성되면 IP가 바뀌므로 nginx도 반드시 재시작해야 합니다.

### 백엔드만 변경된 경우

```bash
docker compose build --no-cache backend
docker compose up -d backend
docker compose restart nginx
```

### nginx 설정만 변경된 경우

```bash
cd c:/dev/dev.log
docker compose restart nginx
```

> nginx는 `nginx.conf`를 볼륨으로 마운트하므로 재시작만으로 변경사항이 반영됩니다. 빌드 불필요.

> **포트 매핑을 변경한 경우** (`docker-compose.yml`의 `ports`)에는 `restart`로는 반영되지 않습니다. 컨테이너를 재생성해야 합니다.
> ```bash
> docker compose up -d nginx
> ```

### 전체 재빌드

```bash
docker compose down
docker compose up --build -d
```

---

## 상태 확인

```bash
# 컨테이너 상태
docker compose ps

# 실시간 로그
docker compose logs -f frontend
docker compose logs -f nginx
```

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 502 Bad Gateway | nginx가 이전 컨테이너 IP를 물고 있음 | `docker compose restart nginx` |
| `MissingSecret` 에러 | `AUTH_SECRET`이 컨테이너에 없음 | `docker-compose.yml`의 `env_file`에 `.env` 추가 확인 |
| `/undefined/post` API 오류 | `NEXT_PUBLIC_SERVER_URL` 미설정으로 `undefined` 문자열 오염 | `.env.production`에 `NEXT_PUBLIC_SERVER_URL=`(빈 값) 추가 또는 `apiClient`에서 `?? ''` 폴백 처리 |
| `/auth` 접근 시 `/`로 리다이렉트 | 이미 로그인된 세션 → 정상 동작 | 시크릿 창에서 접속 또는 로그아웃 후 재시도 |
| 변경사항이 반영 안 됨 | 빌드 후 컨테이너 교체를 안 한 경우 | `up -d` 후 `restart nginx` 필수 |
