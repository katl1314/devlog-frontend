# 회원 탈퇴 기능 설계 문서

## 개요

| 항목 | 내용 |
|------|------|
| 기능명 | 회원 탈퇴 |
| 관련 태스크 | [Notion — 회원 탈퇴 기능 구현](https://www.notion.so/357b587b0c188150ba11e9d666ee7a49) |
| 범위 | Frontend + Backend |

---

## 정책 결정 사항

| 항목 | 결정 내용 |
|------|-----------|
| 탈퇴 처리 방식 | Soft Delete — 7일 유예 후 Hard Delete |
| 콘텐츠 (포스트·댓글) | 탈퇴 즉시 숨김 처리, 7일 후 완전 삭제 |
| 7일 내 재로그인 | 계정 + 콘텐츠 모두 복구 |
| 탈퇴 확인 입력 | "탈퇴합니다" 텍스트 직접 입력 (OAuth 포함 전체 동일) |

---

## 전체 플로우

```
[설정 페이지 — 탈퇴 버튼 클릭]
        │
        ▼
[확인 다이얼로그]
  - "탈퇴합니다" 입력란 표시
  - 입력 일치 시 "탈퇴하기" 버튼 활성화
        │ 확인
        ▼
[DELETE /users/me API 호출]
  - User.deletedAt = now()
  - User의 Post, Comment → isDeleted = true (숨김)
        │ 성공
        ▼
[NextAuth signOut() 호출 → 강제 로그아웃]
        │
        ▼
[메인 페이지(/) 이동]


── 7일 이내 재로그인 시 ──

[Google OAuth 로그인 시도]
        │
        ▼
[NextAuth signIn 콜백: deletedAt 확인]
  - deletedAt이 있고 7일 미경과 → 복구 흐름
        │
        ▼
[/auth/restore 페이지 또는 복구 안내 모달]
  - "복구하기" → POST /users/me/restore → 계정 + 콘텐츠 복구 → 로그인 완료
  - "탈퇴 유지" → 로그아웃 유지, 유예 기간 계속 진행


── 7일 경과 ──

[백엔드 배치 (cron job, 1일 1회)]
  - deletedAt이 7일 이상 경과한 User 조회
  - User, Post, Comment Hard Delete
```

---

## API 설계

### 탈퇴 API

```
DELETE /users/me
Authorization: Bearer {accessToken}

Response 200: { message: "탈퇴 처리가 완료되었습니다." }
Response 401: 인증 실패
Response 409: 이미 탈퇴 처리된 계정
```

### 복구 API

```
POST /users/me/restore
Authorization: Bearer {accessToken}  ← 탈퇴 유예 계정의 임시 토큰

Response 200: { message: "계정이 복구되었습니다." }
Response 400: 유예 기간 만료 (7일 초과)
Response 404: 해당 계정 없음
```

---

## 백엔드 변경 사항

### User 엔티티

```typescript
@Column({ type: 'timestamp', nullable: true, default: null })
deletedAt: Date | null;
```

### Post / Comment 엔티티

```typescript
@Column({ default: false })
isDeleted: boolean;

@Column({ type: 'timestamp', nullable: true, default: null })
deletedAt: Date | null;
```

### 탈퇴 처리 로직

1. `User.deletedAt = new Date()` 설정
2. 해당 User의 Post 전체 → `isDeleted = true`, `deletedAt = now()`
3. 해당 User의 Comment 전체 → `isDeleted = true`, `deletedAt = now()`
4. 포스트 목록·상세 조회 시 `isDeleted = false` 조건 추가

### 복구 처리 로직

1. `User.deletedAt = null` 초기화
2. 해당 User의 Post 전체 → `isDeleted = false`, `deletedAt = null`
3. 해당 User의 Comment 전체 → `isDeleted = false`, `deletedAt = null`

### Hard Delete 배치

- 실행 주기: 매일 새벽 3시 (cron)
- 조건: `deletedAt <= now() - 7days`
- 순서: Comment → Post → User (FK 의존 순)

---

## 프론트엔드 변경 사항

### 1. 탈퇴 확인 다이얼로그

**파일**: `src/app/settings/components/withdrawal-dialog.tsx` (신규)

```
┌──────────────────────────────────────┐
│  회원 탈퇴                        X  │
├──────────────────────────────────────┤
│                                      │
│  탈퇴 시 모든 게시물과 댓글이       │
│  즉시 숨김 처리되며, 7일 후         │
│  완전히 삭제됩니다.                  │
│                                      │
│  7일 이내 재로그인 시 복구 가능합니다. │
│                                      │
│  확인을 위해 아래에                  │
│  "탈퇴합니다"를 입력해 주세요.      │
│                                      │
│  ┌────────────────────────────────┐  │
│  │                                │  │
│  └────────────────────────────────┘  │
│                                      │
│  [취소]          [탈퇴하기 (비활성)] │
└──────────────────────────────────────┘
         ↓ "탈퇴합니다" 입력 시
│  [취소]          [탈퇴하기 (활성)]   │
```

**동작**:
- 입력값 === "탈퇴합니다" 일 때만 탈퇴하기 버튼 활성화
- 탈퇴하기 클릭 → `DELETE /users/me` 호출 → 성공 시 `signOut({ callbackUrl: '/' })`

### 2. 설정 페이지 탈퇴 버튼 연결

**파일**: `src/app/settings/page.tsx` 또는 관련 컴포넌트

- 기존 onClick 미연결 탈퇴 버튼에 `WithdrawalDialog` 연결

### 3. 복구 안내 모달 (재로그인 시)

**파일**: `src/app/auth/restore/page.tsx` (신규) 또는 미들웨어 리다이렉트 처리

**시나리오**: 탈퇴 유예 계정으로 OAuth 로그인 시도 시
- NextAuth `signIn` 콜백에서 `deletedAt` 감지 → `/auth/restore`로 리다이렉트
- 복구 페이지에서 안내 + "복구하기" / "탈퇴 유지" 선택

```
┌──────────────────────────────────────┐
│  탈퇴 진행 중인 계정입니다           │
├──────────────────────────────────────┤
│                                      │
│  이 계정은 탈퇴 처리 중입니다.      │
│  잔여 유예 기간: N일               │
│                                      │
│  복구 시 모든 게시물과 댓글이       │
│  원복됩니다.                         │
│                                      │
│  [탈퇴 유지]         [계정 복구하기] │
└──────────────────────────────────────┘
```

---

## Server Action

**파일**: `src/actions/actions.ts`

```typescript
// 탈퇴
export async function withdrawUser(): Promise<void>

// 복구
export async function restoreUser(): Promise<void>
```

---

## 구현 체크리스트

### 백엔드

- [ ] `User` 엔티티 `deletedAt` 필드 추가 및 마이그레이션
- [ ] `Post`, `Comment` 엔티티 `isDeleted`, `deletedAt` 필드 추가 및 마이그레이션
- [ ] `DELETE /users/me` API 구현 (탈퇴 + 콘텐츠 숨김)
- [ ] `POST /users/me/restore` API 구현 (계정 + 콘텐츠 복구)
- [ ] 포스트·댓글 조회 쿼리에 `isDeleted = false` 조건 추가
- [ ] NextAuth `signIn` 콜백: `deletedAt` 감지 로직 추가
- [ ] Hard Delete 배치 (cron job) 구현

### 프론트엔드

- [ ] `WithdrawalDialog` 컴포넌트 구현
- [ ] 설정 페이지 탈퇴 버튼에 `WithdrawalDialog` 연결
- [ ] `withdrawUser` Server Action 구현
- [ ] `restoreUser` Server Action 구현
- [ ] `/auth/restore` 복구 안내 페이지 구현
- [ ] 미들웨어: 탈퇴 유예 계정 접근 시 `/auth/restore` 리다이렉트 처리

---

## 고려 사항

- **팔로우 관계**: 탈퇴 시 해당 유저의 팔로워/팔로잉 관계 처리 필요 → 정책 미결정 (숨김 vs 삭제)
- **좋아요**: 탈퇴 유저의 좋아요 집계 처리 방식 → 정책 미결정
- **배치 트랜잭션**: Hard Delete 시 Comment → Post → User 순서 FK 의존성 고려
- **토큰 처리**: 탈퇴 후 기존 accessToken 무효화 필요 (blacklist 또는 즉시 만료)
