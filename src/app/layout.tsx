import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodoo",
  description: "Moodoo 페이지 입니다.",
};

interface RootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayout>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}
