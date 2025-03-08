import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // rewrite
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/week",
      },
    ];
  },
};

export default nextConfig;
