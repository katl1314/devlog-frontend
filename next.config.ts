import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
};

export default nextConfig;
