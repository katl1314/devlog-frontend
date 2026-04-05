# 작업 로그

## 2026-03-17

### 완료된 작업

#### 1. 아키텍처 구성도 작성
- `frontend/docs/architecture-diagram.md` — 전체 시스템 Mermaid 구성도 (9개 다이어그램)
- `backend/docs/architecture-diagram.md` — 백엔드 중심 Mermaid 구성도 (5개 다이어그램)

#### 2. 인수인계 문서 작성
- `frontend/docs/frontend-architecture.md` — 프론트엔드 상세 아키텍처 (14개 섹션)
- `backend/docs/backend-architecture.md` — 백엔드 상세 아키텍처 (12개 섹션)

#### 3. 문서 관리 규칙 추가
- `backend/CLAUDE.md` — 작업 관련 `.md` 문서는 반드시 `docs/`에 저장 규칙 추가
- `frontend/CLAUDE.md` — (보류)

#### 4. 테마 토글 UI 제거
- `src/components/profile/profile.tsx`
  - `<ThemeToggle />` 컴포넌트 및 import 제거
  - 모바일 헤더 포함 전체 UI에서 제거
  - **이유**: 별도 설정(/settings) 화면에서 테마 변경하도록 방향 변경

#### 5. 새 아티클 작성 버튼 — 비로그인 처리
- `src/app/(root)/components/sidebar-nav.tsx`
  - 비로그인 시 `/write` 대신 `/auth`로 이동하도록 수정
  - `href={user ? '/write' : '/auth'}`
  - **이유**: 버튼은 항상 노출(Discovery + CTA), 클릭 시 로그인 유도

---

---

## 2026-03-21

### 완료된 작업

#### 1. 유저 프로필 페이지 설계 문서 작성
- `docs/user-profile-page-design.md` — `/@:userId` 페이지 레이아웃 케이스 4종 정리
  - 현재 상태 분석 (포스트 목록 미구현 확인)
  - Case A: 현재 구조 유지 + 포스트 목록 추가 (추천)
  - Case B: 탭 기반 (포스트/시리즈/소개)
  - Case C: 그리드 카드 레이아웃
  - Case D: 사이드바 프로필 + 우측 포스트 2단

### 미완료 / 이어서

| 항목 | 내용 |
|------|------|
| 유저 프로필 포스트 목록 구현 | `page.tsx:50` placeholder → 실제 포스트 목록 연결 (Case A 기준) |

---

### 미완료 / 내일 이어서

| 항목 | 내용 |
|------|------|
| 모바일 글쓰기 버튼 | `mobile-bottom-nav.tsx` — 비로그인 시 `/auth` 이동 처리 |
| 테마 토글 설정 화면 연동 | `/settings` 페이지에 테마 변경 UI 추가 |
| 테마 토글 데스크탑 배치 | 사이드바 하단 배치 (설정 화면 연동 후 결정) |

---

## 2026-04-04

### 완료된 작업

#### 1. nav/UI 리팩토링 (커밋: `3597c47`)

- `src/app/(root)/components/sidebar-nav-items.tsx`
  - `navItems` 하드코딩 제거 → `items` props로 외부 주입
- `src/app/(root)/components/sidebar-nav.tsx`
  - `navItems` 직접 정의 후 `SidebarNavItems`에 전달
- `src/app/(root)/components/sidebar-user-menu.tsx`
  - 로그인/비로그인 분기를 `SignOnUserMenu` / `NotSignOnUserMenu`로 분리
  - `Nullable<T>` 타입 적용
- `src/app/(root)/components/mobile-bottom-nav.tsx`
  - `/trend` → `/trends` 오타 수정
- `src/app/(blog)/user/components/user-sidebar-nav.tsx`
  - `SidebarNavItems`, `SidebarUserMenu` 재사용으로 코드 대폭 축소
- `src/types/global.d.ts` — `Nullable<T>` 유틸 타입 추가

#### 2. 포스트 상세 — 접근 제어 백엔드 이관 (커밋: `02f8368`, `79298e2`)

**배경**: `post-detail-content.tsx`에서 visibility를 직접 체크하던 구조는 렌더링 컴포넌트가 접근 제어 책임까지 지는 문제가 있었음

- **백엔드** `src/auth/guard/bearer-token.guard.ts`
  - `OptionalAccessTokenGuard` 추가: 토큰 없으면 통과, 있으면 검증
- **백엔드** `src/post/post.service.ts` — `getPost(userId, postId, requesterId?)`
  - `requesterId` 없거나 작성자와 다른 경우 비공개 포스트 → `NotFoundException`
- **백엔드** `src/post/post.controller.ts`
  - `GET /post/:userId/:path`에 `OptionalAccessTokenGuard` 적용, `req.user?.user_id` 전달
- **프론트** `src/services/post.service.ts` — `findPost`에 `accessToken?` 추가
- **프론트** `src/app/(blog)/user/[userId]/[postId]/components/post-detail-content.tsx`
  - visibility 직접 체크 제거 → try/catch로 대체

#### 3. HTTP 에러 응답 표준화

**배경**: 백엔드가 에러 시 HTTP 200 + `{ status: '404' }` 객체를 반환하는 구조가 불안정했음

- **백엔드** `src/common/exception-filter/http.exception.ts`
  - 표준 응답 구조: `{ statusCode, message, path, timestamp }`
  - NestJS 기본 예외 / 배열 메시지 / 문자열 메시지 모두 올바르게 추출
- **백엔드** `src/post/post.service.ts`
  - `getPost`: 에러 객체 반환 → `NotFoundException` throw
  - `doLike`: `new Error('Not Found')` → `NotFoundException` 통일
- **프론트** `post-detail-content.tsx`
  - `post.status === '404'` 체크 제거 → `apiClient` throw를 catch로 처리

#### 4. 포스트 리스트 visibility 필터링

**배경**: 포스트 목록 API가 visibility 조건 없이 전체를 반환하고 있었음

- **백엔드** `src/common/common.service.ts`
  - `paginate` / `cursorPaginate` — `where` 타입을 배열 허용으로 변경
  - 커서 조건을 배열 where 각 항목에 spread 방식으로 적용
- **백엔드** `src/post/post.service.ts` — `buildVisibilityWhere` 추가

  | 상황 | 조건 |
  |---|---|
  | 비로그인 | `visibility = true` |
  | 로그인 (글로벌 피드) | `visibility = true` OR `(visibility = false AND user_id = 나)` |
  | 로그인 (내 프로필) | `user_id = userId` (전부) |
  | 로그인 (남의 프로필) | `user_id = userId AND visibility = true` |

- **백엔드** `src/post/post.controller.ts`
  - `GET /post`에 `OptionalAccessTokenGuard` 적용
- **프론트** `src/services/post.service.ts` — `getList` / `getListByUser`에 `accessToken?` 추가
- **프론트** `src/components/post/post-card-list.tsx`
  - `useSession()`으로 `accessToken` 가져와 queryFn에 전달
  - queryKey에 `accessToken` 포함 → 로그인/로그아웃 시 자동 리패치
- **프론트** `src/app/(blog)/user/components/user-post-card-list.tsx`
  - 동일하게 `useSession()` 적용

### 생성된 브랜치

| 브랜치 | 대상 |
|---|---|
| `feat/refactor-v1` | 프론트엔드 (`feat/refactor` 기반) |
| `feat/refactor-v1` | 백엔드 (`main` 기반) |
