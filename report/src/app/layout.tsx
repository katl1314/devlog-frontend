import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dev.Log — Test Dashboard',
  description: 'Playwright E2E 테스트 커버리지 대시보드'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
