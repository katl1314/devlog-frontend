# 컴포넌트 설계 가이드

이 프로젝트에서 컴포넌트를 설계할 때 따르는 철학과 패턴을 정의한다.

---

## 핵심 철학

**상태와 UI를 분리하지 말고, 책임 단위로 묶어라.**

컴포넌트가 "어떻게 보이는가"와 "어떤 상태를 갖는가"는 같은 단위에서 관리되어야 한다.
소비자(부모)에게 FileReader, ref, useState 같은 구현 세부사항을 노출하지 않는다.

---

## Compound Component 패턴

연관된 UI 조각들이 공유 상태를 필요로 할 때 사용한다.

### 구조

```
<Parent>           ← Context 소유, 상태 및 로직 관리
  <Parent.A />     ← Context 소비, 특정 조건에서만 렌더
  <Parent.B />     ← Context 소비, 특정 조건에서만 렌더
</Parent>
```

### 규칙

- `Parent`는 Context를 통해 상태를 공급한다 — prop drilling 없이
- `Parent.A`, `Parent.B`는 Context를 읽어 스스로 렌더 여부를 결정한다
- `useParent` hook을 export해 트리 내 커스텀 컴포넌트도 Context에 접근할 수 있게 한다
- 소비자는 상태 관리 로직(useState, useRef, FileReader 등)을 직접 구현하지 않는다

### 예시: ImageUpload

```tsx
// src/components/image-upload/index.tsx

<ImageUpload initialUrl={image} onFileChange={setFile}>
  <ImageUpload.Upload className="...">   {/* previewUrl 없을 때 렌더 */}
    <FiUploadCloud />
    <span>이미지 업로드</span>
  </ImageUpload.Upload>
  <ImageUpload.Preview />               {/* previewUrl 있을 때 렌더 */}
</ImageUpload>
```

**소비자가 직접 구현하지 않는 것들:**
- `useState(previewUrl)`
- `useRef(fileInputRef)`
- `FileReader` + `onloadend` 콜백
- `if (previewUrl) ... else ...` 조건 분기

이 모든 것은 `ImageUpload` 내부에 캡슐화된다.

**트리 내 커스텀 컴포넌트가 Context 접근이 필요한 경우:**

```tsx
import { useImageUpload } from '@/components/image-upload';

function AvatarEditOverlay() {
  const { triggerInput } = useImageUpload();
  return (
    <div onClick={triggerInput} className="...">
      편집
    </div>
  );
}
```

---

## Props 설계 원칙

### className 허용

모든 UI 컴포넌트는 `className` prop을 허용해 소비자가 레이아웃·스타일을 제어할 수 있게 한다.

```tsx
<ImageUpload.Upload className="w-full aspect-video rounded-xl border-dashed ...">
  ...
</ImageUpload.Upload>
```

### children으로 내부 UI 교체 허용

기본 UI가 있되, `children`을 전달하면 완전히 교체할 수 있어야 한다.

```tsx
// 기본 UI 사용
<ImageUpload.Upload />

// 커스텀 UI로 교체
<ImageUpload.Upload>
  <MyCustomUploadButton />
</ImageUpload.Upload>
```

### 동작 변형은 boolean prop으로

```tsx
<ImageUpload.Preview allowReupload />  // 클릭 시 재업로드 허용
```

---

## 컴포넌트 위치 규칙

| 상황 | 위치 |
|------|------|
| 특정 페이지/기능에서만 사용 | `src/app/[feature]/components/` |
| 2개 이상의 페이지에서 사용 | `src/components/[name]/index.tsx` |
| shadcn/ui 기반 기본 요소 | `src/components/ui/` |

---

## 안티패턴

### 소비자에게 구현 세부사항 노출 (금지)

```tsx
// 나쁜 예 — settings-form.tsx가 직접 FileReader를 관리
const [previewUrl, setPreviewUrl] = useState(image);
const fileInputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  const reader = new FileReader();
  reader.onloadend = e => setPreviewUrl(e.target?.result as string);
  reader.readAsDataURL(avatarFile);
}, [avatarFile]);
```

### 중복 이미지 업로드 구현 (금지)

같은 기능(이미지 업로드 + 미리보기)을 여러 페이지에서 각자 구현하지 않는다.
공통 compound component를 만들어 재사용한다.

### 역할 없는 wrapper 컴포넌트 (금지)

상태도 없고 로직도 없이 단순히 조건부 렌더만 하는 컴포넌트는 만들지 않는다.
조건부 렌더 책임은 compound component의 subcomponent가 스스로 갖는다.
