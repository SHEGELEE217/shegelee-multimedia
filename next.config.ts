import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbopack: {}, // 👈 This fixes the Tailwind CSS loading issue in Next.js 16
  },
};

export default nextConfig;