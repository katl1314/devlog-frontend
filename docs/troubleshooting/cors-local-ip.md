# 로컬 IP 접근 시 CORS 오류

## 발생일
2026-04-01

## 증상
모바일에서 `http://192.168.0.10:3000` 접근 시 백엔드 API 호출에서 CORS 오류 발생.

## 원인
NestJS `enableCors()`의 `origin`이 `http://localhost:3000`만 허용하고 있었음.

## 해결
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

## 관련 변경
- `.env`, `.env.local`: `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_SITE_URL` → `192.168.0.10`으로 변경
- `AUTH_URL`은 `localhost:3000` 유지 (Google OAuth가 IP 주소를 허용하지 않음)
- `package.json` dev 스크립트: `--hostname 0.0.0.0` 추가

## 교훈
- Google OAuth는 로컬 IP를 허용하지 않아 모바일에서 로그인 불가
- 모바일 테스트: UI/데이터 확인만 가능, 로그인은 PC(`localhost:3000`)에서 진행
