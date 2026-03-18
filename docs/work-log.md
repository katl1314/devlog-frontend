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

### 미완료 / 내일 이어서

| 항목 | 내용 |
|------|------|
| 모바일 글쓰기 버튼 | `mobile-bottom-nav.tsx` — 비로그인 시 `/auth` 이동 처리 |
| 테마 토글 설정 화면 연동 | `/settings` 페이지에 테마 변경 UI 추가 |
| 테마 토글 데스크탑 배치 | 사이드바 하단 배치 (설정 화면 연동 후 결정) |
