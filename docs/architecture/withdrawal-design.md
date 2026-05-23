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
| 팔로우 관계 | Soft hide → Hard Delete 시 같이 삭제, 복구 시 복원 |
| 좋아요(PostLike) | Soft hide → Hard Delete 시 같이 삭제, 복구 시 복원 |
| 토큰 무효화 | `tokenVersion` 컬럼 + 검증 시 비교 (즉시 무효화) |
| 7일 내 재로그인 | 계정 + 콘텐츠 + 관계 + 좋아요 전부 복구 |
| 탈퇴 확인 입력 | "탈퇴합니다" 텍스트 직접 입력 (OAuth 포함 전체 동일) |
| 복구 자격 판정 | **API 레벨**에서 `now - deletedAt` 비교 (cron 실행과 분리) |
| Hard Delete 시점 | 매일 새벽 3시 KST + 부팅 시 1회 catch-up |

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
  - User.tokenVersion += 1   ← 기존 토큰 즉시 무효화
  - Post, Comment, Follow, PostLike → isDeleted = true (숨김)
        │ 성공
        ▼
[NextAuth signOut() 호출 → 강제 로그아웃]
        │
        ▼
[메인 페이지(/) 이동]


── 7일 이내 재로그인 시 ──

[OAuth/Email 로그인 시도]
        │
        ▼
[NextAuth signIn 콜백]
  ┌────────────────────────────────────────┐
  │ user.deletedAt 검사                    │
  │ - null  → 정상 로그인                  │
  │ - 7일 미경과 → /auth/restore 리다이렉트│
  │ - 7일 경과   → 로그인 거부 (탈퇴 확정) │
  └────────────────────────────────────────┘
        │
        ▼
[/auth/restore]
  - "복구하기" → POST /users/me/restore → 계정 + 콘텐츠 + 관계 복원 → 로그인 완료
  - "탈퇴 유지" → 로그아웃 유지, 유예 기간 계속 진행


── 7일 경과 ──

[배치 (NestJS @nestjs/schedule, 매일 새벽 3시 KST + 부팅 시 1회)]
  - deletedAt이 7일 이상 경과한 User 조회
  - PostLike → Follow → Comment → Post → User 순으로 Hard Delete (FK 의존 역순)
```

---

## 데이터 모델

### User 엔티티

```typescript
@Column({ type: 'timestamp', nullable: true, default: null })
deletedAt: Date | null;

@Column({ type: 'int', default: 0 })
tokenVersion: number;   // 탈퇴 시 +1로 기존 토큰 무효화
```

### Post / Comment / Follow / PostLike 엔티티

```typescript
@Column({ default: false })
isDeleted: boolean;

@Column({ type: 'timestamp', nullable: true, default: null })
deletedAt: Date | null;
```

### 인덱스 권장

- `User.deletedAt` — cron 배치 쿼리 성능
- `Post.isDeleted`, `Comment.isDeleted` — 목록 조회 필터
- `Follow.isDeleted`, `PostLike.isDeleted` — 카운트 집계 필터

---

## API 설계

### 탈퇴

```
DELETE /users/me
Authorization: Bearer {accessToken}

처리:
  1. User.deletedAt = now()
  2. User.tokenVersion += 1
  3. 해당 User의 Post, Comment, Follow(양방향), PostLike → isDeleted = true, deletedAt = now()
  (모두 단일 트랜잭션)

Response 200: { message: "탈퇴 처리가 완료되었습니다." }
Response 401: 인증 실패
Response 409: 이미 탈퇴 처리된 계정
```

### 복구

```
POST /users/me/restore
Authorization: Bearer {accessToken}  ← /auth/restore 페이지에서 발급한 임시 토큰

처리 (반드시 순서대로):
  1. User.deletedAt 존재 여부 확인 (없으면 400)
  2. now - User.deletedAt > 7일이면 400 반환 (유예 기간 만료)
     ※ cron 실행 여부와 무관하게 API에서 시간 비교로 자격 판정
  3. User.deletedAt = null
  4. User.tokenVersion += 1 (탈퇴 시점에 발급된 임시 토큰도 무효화)
  5. Post, Comment, Follow, PostLike → isDeleted = false, deletedAt = null

Response 200: { message: "계정이 복구되었습니다." }
Response 400: 유예 기간 만료 (7일 초과) 또는 탈퇴 상태 아님
Response 404: 계정 없음
```

---

## 백엔드 변경 사항

### 1. 토큰 검증 가드

기존 `BearerTokenGuard`에 `tokenVersion` 비교 추가:

```typescript
const payload = jwt.verify(token, secret);
const user = await userRepo.findOne({ where: { id: payload.sub } });

if (!user) throw new UnauthorizedException();
if (user.tokenVersion !== payload.tokenVersion) {
  throw new UnauthorizedException('Token revoked');
}
```

JWT 페이로드에 `tokenVersion` 필드 포함 필수. 발급 시 현재 DB값 스냅샷.

### 2. 조회 쿼리 필터

전역 필터를 위해 TypeORM 글로벌 옵션이 아닌 **명시적 WHERE 조건** 사용 (TypeORM의 `@DeleteDateColumn`은 soft delete 자동화하지만 본 설계의 `isDeleted` 패턴과 분리하기 위해 수동 처리 권장).

- 포스트 목록·상세: `WHERE post.isDeleted = false AND post.user.deletedAt IS NULL`
- 댓글: `WHERE comment.isDeleted = false`
- 팔로우 카운트: `WHERE follow.isDeleted = false`
- 좋아요 카운트: `WHERE postLike.isDeleted = false`

### 3. NextAuth `signIn` 콜백 (Frontend 측)

```typescript
async signIn({ user }) {
  const dbUser = await userService.findUserByEmail(user.email);
  if (!dbUser) return '/auth/signup';  // 기존 흐름

  if (dbUser.deletedAt) {
    const elapsed = Date.now() - new Date(dbUser.deletedAt).getTime();
    if (elapsed > 7 * 24 * 60 * 60 * 1000) {
      return false;   // 7일 경과: 로그인 거부
    }
    // 7일 미경과: 임시 토큰 발급하여 /auth/restore로
    return `/auth/restore?token=...`;
  }

  return true;
}
```

### 4. Hard Delete 배치

```typescript
// backend/src/auth/withdrawal.cron.ts
@Injectable()
export class WithdrawalCron implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource
  ) {}

  @Cron('0 3 * * *', { timeZone: 'Asia/Seoul' })
  async scheduled() {
    await this.hardDeleteExpired();
  }

  // 부팅 직후 1회 — cron 미실행 기간 catch-up
  async onApplicationBootstrap() {
    await this.hardDeleteExpired();
  }

  private async hardDeleteExpired() {
    const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // 한 번에 너무 많이 처리되지 않도록 페이지네이션 (다음 실행에서 이어받음)
    const targets = await this.userRepo.find({
      where: { deletedAt: LessThanOrEqual(threshold) },
      take: 1000
    });

    for (const user of targets) {
      await this.dataSource.transaction(async (qr) => {
        await qr.delete(PostLike, { user: { id: user.id } });
        await qr.delete(Follow, [
          { follower: { id: user.id } },
          { following: { id: user.id } }
        ]);
        await qr.delete(Comment, { user: { id: user.id } });
        await qr.delete(Post, { user: { id: user.id } });
        await qr.delete(User, { id: user.id });
      });
    }
  }
}
```

`AppModule`에 `ScheduleModule.forRoot()` import 추가.

**삭제 순서**: PostLike → Follow → Comment → Post → User (FK 의존 역순)

---

## 운영 시나리오

### 서버가 꺼져 있을 때

- 쿼리가 `deletedAt <= now - 7d`로 작성되어 있어 **누락된 날짜는 다음 실행에서 자동 catch-up**
- 부팅 시 1회 실행으로 다운타임 + 다음 03:00까지의 지연을 "다운타임 + 부팅 즉시"로 단축
- 며칠 연속 다운돼도 결국 켜진 다음 한 번에 정리됨

### 복구 자격은 cron과 무관

- Hard Delete가 지연됐다고 해서 "8일째 복구 성공"이 되면 안 됨
- 복구 API에서 항상 `now - deletedAt > 7d`로 차단 → cron 실행 여부와 일관성 분리

### 시간대

- cron: `Asia/Seoul` 명시 (`@Cron('0 3 * * *', { timeZone: 'Asia/Seoul' })`)
- 7일 계산은 UTC 저장값 기준 산술 → 자동으로 시간대 무관

### 멱등성

- `hardDeleteExpired`는 순수 함수 — 동일 입력에 동일 결과
- cron 시점 실패 → 다음 호출이 동일 작업 재실행. 부작용 없음

---

## 프론트엔드 변경 사항

### 1. 탈퇴 확인 다이얼로그

**파일**: `src/app/settings/components/withdrawal-dialog.tsx` (신규)

```
┌──────────────────────────────────────┐
│  회원 탈퇴                        X  │
├──────────────────────────────────────┤
│                                      │
│  탈퇴 시 모든 게시물·댓글·팔로우    │
│  관계·좋아요가 즉시 숨김되며,        │
│  7일 후 완전히 삭제됩니다.           │
│                                      │
│  7일 이내 재로그인 시 모두 복구됩니다.│
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
```

**동작**:
- 입력값 === "탈퇴합니다" 일 때만 탈퇴하기 버튼 활성화
- 탈퇴하기 클릭 → `DELETE /users/me` 호출 → 성공 시 `signOut({ callbackUrl: '/' })`

### 2. 설정 페이지 탈퇴 버튼 연결

- 기존 onClick 미연결 탈퇴 버튼([settings-form.tsx](../../src/app/settings/components/settings-form.tsx))에 `WithdrawalDialog` 연결

### 3. 복구 안내 페이지

**파일**: `src/app/auth/restore/page.tsx` (신규)

탈퇴 유예 계정 로그인 시 NextAuth `signIn` 콜백이 이 경로로 리다이렉트.

```
┌──────────────────────────────────────┐
│  탈퇴 진행 중인 계정입니다           │
├──────────────────────────────────────┤
│                                      │
│  이 계정은 탈퇴 처리 중입니다.      │
│  잔여 유예 기간: N일               │
│                                      │
│  복구 시 모든 콘텐츠·팔로우·       │
│  좋아요가 원복됩니다.                │
│                                      │
│  [탈퇴 유지]         [계정 복구하기] │
└──────────────────────────────────────┘
```

- **계정 복구하기** → `POST /users/me/restore` → 성공 시 로그인 완료
- **탈퇴 유지** → `signOut()` 후 메인 페이지

### 4. 미들웨어

탈퇴 유예 계정이 직접 URL을 통해 보호된 페이지에 접근하는 경우 차단:
- 세션의 `deletedAt` 검사 → `/auth/restore` 리다이렉트

---

## Server Action

**파일**: `src/actions/actions.ts`

```typescript
export async function withdrawUser(): Promise<void>
  // DELETE /users/me 호출 → signOut

export async function restoreUser(): Promise<{ ok: boolean; message?: string }>
  // POST /users/me/restore 호출
```

---

## 구현 체크리스트

### 백엔드

- [ ] `User` 엔티티 `deletedAt`, `tokenVersion` 필드 추가
- [ ] `Post`, `Comment`, `Follow`, `PostLike` 엔티티 `isDeleted`, `deletedAt` 필드 추가
- [ ] JWT 페이로드에 `tokenVersion` 포함, 발급 로직 수정
- [ ] `BearerTokenGuard`에 tokenVersion 비교 추가
- [ ] `DELETE /users/me` API 구현 (탈퇴 + 콘텐츠·관계 숨김 + tokenVersion 증가, 단일 TX)
- [ ] `POST /users/me/restore` API 구현 (7일 자격 판정 + 일괄 복원)
- [ ] Post/Comment/Follow/PostLike 조회 쿼리에 `isDeleted = false` 조건 추가
- [ ] `ScheduleModule.forRoot()` 등록
- [ ] `WithdrawalCron` 구현 (`@Cron` + `OnApplicationBootstrap`)
- [ ] 인덱스 추가 (`User.deletedAt`, `Post.isDeleted` 등)

### 프론트엔드

- [ ] `WithdrawalDialog` 컴포넌트 구현
- [ ] 설정 페이지 탈퇴 버튼에 `WithdrawalDialog` 연결
- [ ] `withdrawUser` Server Action 구현
- [ ] `restoreUser` Server Action 구현
- [ ] `/auth/restore` 복구 안내 페이지 구현
- [ ] NextAuth `signIn` 콜백에 `deletedAt` 분기 추가 (7일 미경과/경과)
- [ ] 미들웨어: 탈퇴 유예 계정 접근 시 `/auth/restore` 리다이렉트

---

## 향후 과제

- **다중 인스턴스 환경**: backend 컨테이너가 2개 이상이 되면 cron이 중복 실행됨. PostgreSQL `pg_try_advisory_lock` 또는 BullMQ + Redis로 분산 락 도입 필요. 현재 단일 인스턴스라 보류.
- **관리자용 즉시 처리 API**: 운영 중 강제 Hard Delete / 강제 복구가 필요해지면 별도 관리자 인증 + 엔드포인트 추가
- **정확한 168시간 보장**: 현재 daily cron은 최대 +24h 오차. 분 단위 정확도가 요구되면 시간 단위 cron으로 좁히기 (DB 부하 미미)
- **탈퇴 사유 수집**: UX 개선 차원 — 다이얼로그에 선택형 사유 입력 추가 검토
