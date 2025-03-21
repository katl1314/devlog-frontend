import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // rewrite
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/trends",
      },
    ];
  },
  // 외부 이미지 조회
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "placehold.co",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
