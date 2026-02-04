import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/secplusstudy',
  assetPrefix: '/secplusstudy/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
