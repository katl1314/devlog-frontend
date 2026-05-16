# 트러블슈팅

## 목차

1. [로컬 IP 접근 시 CORS 오류](#1-로컬-ip-접근-시-cors-오류)
2. [Git 브랜치 tracking 오설정으로 인한 잘못된 remote push](#2-git-브랜치-tracking-오설정으로-인한-잘못된-remote-push)
3. [Middleware redirect 절대 URL 오류](#3-middleware-redirect-절대-url-오류)
4. [middleware config 정적 파싱 실패](#4-middleware-config-정적-파싱-실패)

---

## 1. 로컬 IP 접근 시 CORS 오류

**발생일**: 2026-04-01

### 증상

모바일에서 `http://192.168.0.10:3000` 접근 시 백엔드 API 호출에서 CORS 오류 발생.

### 원인

NestJS `enableCors()`의 `origin`이 `http://localhost:3000`만 허용하고 있었음.

### 해결

```ts
// Before
app.enableCors({
  credentials: true,
  origin: 'http://localhost:3000',
});

// After
app.enableCors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://192.168.0.10:3000'],
});
```

### 관련 변경

- `.env`, `.env.local`: `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_SITE_URL` → `192.168.0.10`으로 변경
- `AUTH_URL`은 `localhost:3000` 유지 (Google OAuth가 IP 주소를 허용하지 않음)
- `package.json` dev 스크립트: `--hostname 0.0.0.0` 추가

### 교훈

- Google OAuth는 로컬 IP를 허용하지 않아 모바일에서 로그인 불가
- 모바일 테스트: UI/데이터 확인만 가능, 로그인은 PC(`localhost:3000`)에서 진행

---

## 2. Git 브랜치 tracking 오설정으로 인한 잘못된 remote push

**발생일**: 2026-04-01

### 증상

- 로컬 `feature/post-layout` 브랜치에서 작업한 커밋 3개가 `origin/feat/refactor`에 잘못 push됨
- `git branch -vv` 확인 결과: `feature/post-layout`이 `origin/feat/refactor`를 추적하고 있었음
- `origin/feature/post-layout`은 3커밋 뒤처진 상태

### 원인

이전 세션에서 CLAUDE.md의 `기본 브랜치: feat/refactor` 설정을 따라 push 시 `-u origin feat/refactor` 옵션을 사용한 것으로 추정.
결과적으로 로컬 `feature/post-layout`의 upstream이 `origin/feat/refactor`로 잘못 설정됨.

### 해결 과정

1. `git branch -vv`로 잘못된 tracking 확인
2. tracking 재설정: `git branch --set-upstream-to=origin/feature/post-layout feature/post-layout`
3. 올바른 remote에 push: `git push origin feature/post-layout`
4. `feat/refactor`에 병합: `git merge feature/post-layout` (이미 커밋이 포함돼 있어 Already up to date)

### 재발 방지

- push 전 반드시 `git branch -vv`로 tracking 확인
- 로컬 브랜치명과 remote 브랜치명이 일치하는지 검증 (예: `feature/post-layout` → `origin/feature/post-layout`)
- CLAUDE.md의 "기본 브랜치" 설정이 현재 작업 브랜치와 다를 경우, 임의로 다른 remote에 push하지 않고 사용자에게 먼저 확인
- tracking 변경(`git branch --set-upstream-to`)은 사용자 승인 없이 실행 불가

---

## 3. Middleware redirect 절대 URL 오류

**발생일**: 2026-04-01

### 증상

```
Error: URL is malformed "/auth". Please use only absolute URLs
```

`/settings` 접근 시 미들웨어에서 위 에러 발생.

### 원인

`NextResponse.redirect('/auth')` — 상대 URL 사용.
Next.js 미들웨어는 반드시 절대 URL이어야 한다.

`/write`에서 동일한 코드가 있었지만, 항상 로그인 상태로 접근해서 redirect 라인이 실행된 적이 없었음. `/settings` 추가 후 비로그인 테스트에서 처음 드러남.

### 해결

```ts
// Before
return NextResponse.redirect('/auth');

// After
return NextResponse.redirect(new URL('/auth', req.url));
```

### 교훈

미들웨어의 `NextResponse.redirect()`는 반드시 `new URL(path, req.url)` 형식으로 작성한다.

---

## 4. middleware config 정적 파싱 실패

**발생일**: 2026-04-01

### 증상

```
Next.js can't recognize the exported `config` field in route
The exported configuration object in a source file need to have a very specific format
from which some properties can be statically parsed at compiled-time.
```

### 원인

`middleware.ts`의 `config.matcher`에 변수를 참조했음.

```ts
const matchersForMiddleware = ['/', '/@:userId', ...];
export const config = {
  matcher: matchersForMiddleware // 변수 참조 → 빌드 타임 파싱 불가
};
```

Next.js는 `config.matcher`를 빌드 타임에 정적으로 파싱해야 하므로 변수 참조 불가.

### 해결

```ts
export const config = {
  matcher: ['/', '/@:userId', '/new', '/write', '/auth', '/@:userId/:slug']
};
```

인라인 리터럴 배열로 직접 작성.

### 교훈

`middleware.ts`의 `export const config`는 반드시 리터럴 값만 사용한다.
