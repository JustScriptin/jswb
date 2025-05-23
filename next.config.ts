import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  webpack: (config) => {
    config.resolve.extensions.push(".node");
    return config;
  },
};

export default nextConfig;
