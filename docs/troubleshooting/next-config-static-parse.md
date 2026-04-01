# middleware config 정적 파싱 실패

## 발생일
2026-04-01

## 증상
```
Next.js can't recognize the exported `config` field in route
The exported configuration object in a source file need to have a very specific format
from which some properties can be statically parsed at compiled-time.
```

## 원인
`middleware.ts`의 `config.matcher`에 변수를 참조했음.
```ts
const matchersForMiddleware = ['/', '/@:userId', ...];
export const config = {
  matcher: matchersForMiddleware // 변수 참조 → 빌드 타임 파싱 불가
};
```
Next.js는 `config.matcher`를 빌드 타임에 정적으로 파싱해야 하므로 변수 참조 불가.

## 해결
```ts
export const config = {
  matcher: ['/', '/@:userId', '/new', '/write', '/auth', '/@:userId/:slug']
};
```
인라인 리터럴 배열로 직접 작성.

## 교훈
`middleware.ts`의 `export const config`는 반드시 리터럴 값만 사용한다.
