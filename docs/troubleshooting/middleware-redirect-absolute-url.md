# Middleware redirect 절대 URL 오류

## 발생일
2026-04-01

## 증상
```
Error: URL is malformed "/auth". Please use only absolute URLs
```
`/settings` 접근 시 미들웨어에서 위 에러 발생.

## 원인
`NextResponse.redirect('/auth')` — 상대 URL 사용.
Next.js 미들웨어는 반드시 절대 URL이어야 한다.

`/write`에서 동일한 코드가 있었지만, 항상 로그인 상태로 접근해서 redirect 라인이 실행된 적이 없었음. `/settings` 추가 후 비로그인 테스트에서 처음 드러남.

## 해결
```ts
// Before
return NextResponse.redirect('/auth');

// After
return NextResponse.redirect(new URL('/auth', req.url));
```

## 교훈
미들웨어의 `NextResponse.redirect()`는 반드시 `new URL(path, req.url)` 형식으로 작성한다.
