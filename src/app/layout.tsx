import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/Layout/SidebarLayout/SidebarLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "모달 테스트",
  description: "모달 테스트 페이지 입니다.",
};

interface RootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayout>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SidebarProvider>
          <SidebarLayout>{children}</SidebarLayout>
          <div id="modal"></div>
        </SidebarProvider>
      </body>
    </html>
  );
}
