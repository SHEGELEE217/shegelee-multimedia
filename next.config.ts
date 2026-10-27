import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: __dirname, // 👈 Forces Turbopack to resolve from THIS folder
  },
};

export default nextConfig;