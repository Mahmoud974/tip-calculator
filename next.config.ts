import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionSourceMaps: false,
  webpack: (config) => {
    config.devtool = false;
    return config;
  },
};

export default nextConfig;
