# 프론트엔드 설계 표준

Next.js (App Router) + TypeScript + TailwindCSS v4 + Radix UI(shadcn/ui) 스택 기반 프로젝트에 적용하는 설계 표준이다.
새 프로젝트에 이 파일을 그대로 복사해 사용한다.

---

## 1. Design Tokens

### 1-1. 색상 시스템

CSS 변수(시맨틱 토큰)만 사용한다. 임의 Tailwind 색상(`blue-500`, `purple-500` 등)은 금지한다.

**필수 정의 토큰 (globals.css)**

```css
:root {
  /* 배경/표면 */
  --background: oklch(...);
  --foreground: oklch(...);
  --card: oklch(...);
  --card-foreground: oklch(...);

  /* 주요 액션 */
  --primary: oklch(...);
  --primary-foreground: oklch(...);

  /* 보조 */
  --secondary: oklch(...);
  --secondary-foreground: oklch(...);

  /* 상태 */
  --destructive: oklch(...);   /* 삭제, 위험 */
  --muted: oklch(...);         /* 비활성, 약한 요소 */
  --muted-foreground: oklch(...);
  --accent: oklch(...);        /* 호버, 강조 */
  --accent-foreground: oklch(...);

  /* 구조 */
  --border: oklch(...);
  --input: oklch(...);
  --ring: oklch(...);          /* 포커스 링 */

  /* 반경 */
  --radius: 0.625rem;          /* 10px */

  /* 사이드바 (사이드바가 있는 경우) */
  --sidebar: oklch(...);
  --sidebar-foreground: oklch(...);
  --sidebar-primary: oklch(...);
  --sidebar-accent: oklch(...);
  --sidebar-border: oklch(...);
}

.dark {
  /* 다크모드 오버라이드 */
}
```

**사용 규칙**

| 허용 | 금지 |
|------|------|
| `text-foreground` | `text-gray-900` |
| `bg-primary` | `bg-green-500` |
| `border-border` | `border-gray-200` |
| `text-muted-foreground` | `text-slate-500` |

브랜드 색상이 필요하면 토큰에 추가한다. 임의 색상을 직접 쓰지 않는다.

---

### 1-2. 타이포그래피 스케일

**정의**

| 이름 | Tailwind 클래스 | 용도 |
|------|----------------|------|
| `heading-1` | `text-3xl font-bold` | 페이지 제목 |
| `heading-2` | `text-2xl font-bold` | 섹션 제목 |
| `heading-3` | `text-xl font-semibold` | 카드 제목, 소섹션 |
| `heading-4` | `text-lg font-semibold` | 서브 항목 제목 |
| `body-lg` | `text-base font-normal` | 본문 강조 |
| `body` | `text-sm font-normal` | 기본 본문 |
| `label` | `text-sm font-medium` | 폼 레이블, UI 레이블 |
| `caption` | `text-xs font-normal` | 보조 설명, 날짜, 메타 |

**규칙**

- `text-[17px]`, `text-[13px]` 같은 임의값 금지 — 스케일 안에서 선택한다.
- 라인 높이는 Tailwind 기본값을 따른다 (`leading-*` 명시가 필요한 경우에만 추가).
- `font-bold`/`font-semibold`/`font-medium` 외 weight는 사용하지 않는다.

---

### 1-3. 스페이싱 스케일

4px 기반 Tailwind 기본 스케일을 사용한다.

| 단계 | 값 | 주요 용도 |
|------|----|----------|
| `1` | 4px | 아이콘-텍스트 간격 |
| `2` | 8px | 인라인 요소 간격 |
| `3` | 12px | 작은 컴포넌트 내부 패딩 |
| `4` | 16px | 기본 패딩, 카드 내부 |
| `6` | 24px | 섹션 간격 |
| `8` | 32px | 컴포넌트 간 여백 |
| `12` | 48px | 페이지 섹션 간격 |

임의값(`p-[14px]`, `gap-[10px]`) 금지. 가장 가까운 스케일 값을 선택한다.

---

### 1-4. Border Radius / Shadow

**Radius**

| 토큰 | 값 | 용도 |
|------|----|------|
| `rounded-sm` | `calc(var(--radius) - 4px)` ≈ 6px | 배지, 태그 |
| `rounded-md` | `calc(var(--radius) - 2px)` ≈ 8px | 인풋, 버튼 |
| `rounded-lg` | `var(--radius)` ≈ 10px | 카드, 드롭다운 |
| `rounded-xl` | `calc(var(--radius) + 4px)` ≈ 14px | 모달, 바텀시트 |
| `rounded-full` | 9999px | 아바타, 필 배지 |

**Shadow**

| 클래스 | 용도 |
|--------|------|
| `shadow-xs` | 카드, 버튼 기본 상태 |
| `shadow-sm` | 인풋 포커스 |
| `shadow-md` | 드롭다운, 팝오버 |
| `shadow-lg` | 모달, 다이얼로그 |

---

## 2. 컴포넌트 설계 패턴

> 상세 패턴(Compound Component, Props 원칙, 안티패턴)은 [`component-design-guide.md`](component-design-guide.md)를 따른다.
> 이 섹션은 해당 가이드에 없는 보완 규칙만 다룬다.

### 2-1. CVA(class-variance-authority) 사용 기준

variant가 **2개 이상의 독립 변형**이 필요할 때만 CVA를 도입한다. 단일 스타일이면 `cn()`으로 충분하다.

```tsx
// 도입 기준 충족 (variant × size 조합)
const buttonVariants = cva('inline-flex items-center ...', {
  variants: {
    variant: { default: '...', destructive: '...', ghost: '...' },
    size:    { default: '...', sm: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

// 도입 불필요 — cn()으로 충분
function Badge({ className }: { className?: string }) {
  return <span className={cn('rounded-full px-2 text-xs', className)} />;
}
```

### 2-2. Guard 컴포넌트 패턴

조건부 렌더링에 `&&` 연산자를 사용하지 않는다. Guard 컴포넌트로 분리한다.

```tsx
// 금지
{isOwner && <EditButton />}

// 허용
function OwnerGuard({ userId, children }: { userId: string; children: ReactNode }) {
  const session = useSession();
  if (session.data?.user?.id !== userId) return null;
  return <>{children}</>;
}

<OwnerGuard userId={post.userId}>
  <EditButton />
</OwnerGuard>
```

Guard 이름 규칙: `[조건]Guard` (예: `AuthGuard`, `OwnerGuard`, `AdminGuard`)

### 2-3. Server vs Client Component

- `'use client'`는 트리의 **최하위 leaf 컴포넌트**에만 붙인다.
- 데이터 페칭은 Server Component 우선, 클라이언트 상태가 필요한 경우에만 `'use client'` 도입.
- Server Component와 Client Component를 같은 파일에 혼용하지 않는다.

```
app/
└── posts/
    └── page.tsx           ← Server Component (데이터 페칭)
        └── PostList.tsx   ← Server Component
            └── PostCard.tsx   ← Server Component
                └── LikeButton.tsx  ← 'use client' (상호작용 필요)
```

### 2-4. Props 인터페이스 규칙

```tsx
// 규칙
interface ComponentProps {
  // 1. 필수 데이터 props 먼저
  title: string;
  userId: string;

  // 2. 선택적 데이터 props
  description?: string;

  // 3. 이벤트 핸들러
  onSubmit?: (data: FormData) => void;

  // 4. className 항상 마지막
  className?: string;
}

// 금지
interface BadProps {
  data: any;           // any 금지
  onClick: Function;   // Function 타입 금지 — 구체적 시그니처 사용
}
```

### 2-5. Skeleton / Loading 패턴

각 데이터 컴포넌트는 대응하는 Skeleton을 함께 제공한다.

```
components/
└── post/
    ├── post-card.tsx
    └── post-card-skeleton.tsx   ← animate-pulse 기반
```

```tsx
// post-card-skeleton.tsx
export function PostCardSkeleton() {
  return (
    <div className="px-4 py-4 border-b border-border">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-24 h-4" />
      </div>
      <Skeleton className="w-full h-5 mb-2" />
      <Skeleton className="w-3/4 h-5" />
    </div>
  );
}
```

---

## 3. 아이콘 / 에셋 규칙

### 3-1. 아이콘 라이브러리

**기본**: `lucide-react` 단일 사용

**예외**: `lucide-react`에 없는 브랜드 아이콘에 한해 `react-icons` 허용

| 허용 케이스 | 예시 |
|------------|------|
| 브랜드 로고 | `FaGithub`, `FcGoogle`, `SiNotion` |

```tsx
// 허용 — lucide
import { Search, Heart, MessageCircle } from 'lucide-react';

// 허용 — 브랜드 아이콘 (lucide에 없음)
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

// 금지 — lucide에 있는데 react-icons 사용
import { FiSearch } from 'react-icons/fi';
```

### 3-2. 아이콘 크기 토큰

| 토큰 | Tailwind | 용도 |
|------|----------|------|
| `size-3` | 12px | 인라인 배지 내부 |
| `size-4` | 16px | 텍스트 인라인, 버튼 내 아이콘 |
| `size-5` | 20px | 기본 버튼, 목록 아이템 |
| `size-6` | 24px | 헤더 아이콘, 강조 요소 |
| `size-8` | 32px | 빈 상태(empty state), 온보딩 |

```tsx
// lucide는 size prop 사용
<Heart size={16} />

// Tailwind className 사용 시
<Icon className="size-4" />
```

### 3-3. 이미지

- `next/image` (`<Image />`) 필수 — `<img>` 직접 사용 금지.
- `alt` 속성 필수. 장식용 이미지는 `alt=""`.
- `width`/`height` 또는 `fill` 필수 (레이아웃 시프트 방지).
- 외부 이미지 도메인은 `next.config.ts`의 `remotePatterns`에 명시.

```tsx
// 허용
<Image src={src} alt={`${username}의 프로필`} width={40} height={40} />

// 금지
<img src={src} />
```

---

## 4. 폴더 구조 / 네이밍

### 4-1. 디렉토리 구조

```
src/
├── app/                         # Next.js App Router 라우팅
│   ├── (group)/                 # 라우트 그룹 (소문자, 괄호)
│   │   └── [slug]/              # 동적 세그먼트
│   │       ├── page.tsx
│   │       └── components/      # 해당 라우트 전용 컴포넌트
│   ├── api/                     # API 라우트
│   └── layout.tsx
│
├── components/
│   ├── ui/                      # shadcn/Radix 원시 컴포넌트 (수정 최소화)
│   ├── layout/                  # 레이아웃 컴포넌트
│   └── [feature]/               # 기능별 컴포넌트 (2개 이상 라우트에서 공유)
│       ├── index.tsx
│       └── [feature]-skeleton.tsx
│
├── hooks/                       # 커스텀 훅
├── services/                    # 백엔드 API 호출 레이어
├── types/                       # TypeScript 타입 정의
├── lib/                         # 유틸리티 함수 (순수 함수)
└── actions/                     # Server Actions
```

**컴포넌트 배치 기준**

| 상황 | 위치 |
|------|------|
| 특정 라우트에서만 사용 | `app/[route]/components/` |
| 2개 이상 라우트에서 공유 | `src/components/[feature]/` |
| shadcn/ui 기반 원시 요소 | `src/components/ui/` |

### 4-2. 파일 네이밍

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | `kebab-case.tsx` | `post-card.tsx` |
| 컴포넌트 Skeleton | `[name]-skeleton.tsx` | `post-card-skeleton.tsx` |
| 훅 | `use-kebab-case.ts` | `use-infinite-scroll.ts` |
| 서비스 | `kebab-case.ts` | `post.service.ts` |
| 타입 | `kebab-case.types.ts` 또는 `types.ts` | `post.types.ts` |
| 유틸리티 | `kebab-case.ts` | `format-date.ts` |
| Server Action | `actions.ts` 또는 `[feature].actions.ts` | `post.actions.ts` |
| 상수 | `[feature].constants.ts` | `post.constants.ts` |

### 4-3. 컴포넌트 네이밍

```tsx
// 파일: post-card.tsx
// 컴포넌트명: PascalCase, default export
export default function PostCard({ title, userId }: PostCardProps) { ... }

// 파일: post-card.tsx 내 Sub-component (Compound 패턴)
PostCard.Header = function PostCardHeader() { ... };
PostCard.Body = function PostCardBody() { ... };
```

- 파일당 1개의 주요 컴포넌트 (default export).
- 동일 파일 내 작은 sub-component는 named export로 허용.
- Guard 컴포넌트: `[Condition]Guard` (예: `AuthGuard`, `OwnerGuard`).
- Context 훅: `use[FeatureName]` (예: `usePostContext`, `useImageUpload`).

### 4-4. 변수 / 함수 네이밍

| 유형 | 규칙 | 예시 |
|------|------|------|
| 일반 변수 | `camelCase` | `postList`, `currentUser` |
| 상수 | `UPPER_SNAKE_CASE` | `MAX_POST_LENGTH` |
| 이벤트 핸들러 | `handle[Event]` | `handleSubmit`, `handleClick` |
| boolean 변수 | `is/has/can` 접두사 | `isLoading`, `hasError` |
| 비동기 함수 | 동사 + 명사 | `fetchPost`, `createUser` |

---

## 5. 체크리스트

컴포넌트 신규 작성 또는 리팩토링 전 확인한다.

### 설계

- [ ] 임의 Tailwind 색상(`blue-500` 등) 없이 시맨틱 토큰만 사용
- [ ] 임의 크기값(`text-[17px]`, `p-[14px]`) 없이 스케일 준수
- [ ] `any` 타입 미사용, Props 인터페이스 명확히 정의
- [ ] 조건부 렌더링에 `&&` 대신 Guard 컴포넌트 사용
- [ ] `<img>` 대신 `next/image` 사용
- [ ] 아이콘: lucide-react 우선, 브랜드 아이콘만 react-icons 허용

### 구조

- [ ] 파일 위치가 배치 기준에 맞음 (라우트 전용 vs 공유)
- [ ] 파일명 `kebab-case`, 컴포넌트명 `PascalCase`
- [ ] `'use client'`가 최하위 leaf 컴포넌트에만 있음
- [ ] 데이터 페칭 컴포넌트 대응 Skeleton 존재

### 재사용성

- [ ] variant가 2개 이상이면 CVA 사용, 아니면 `cn()`으로 충분
- [ ] 2개 이상 라우트에서 공유되는 컴포넌트는 `src/components/[feature]/`로 이동
- [ ] Compound Component: 소비자에게 구현 세부사항 미노출
