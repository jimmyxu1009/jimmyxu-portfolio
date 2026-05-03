import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/feijidazhan", destination: "/feijidazhan/index.html" },
    ];
  },
};

export default nextConfig;
