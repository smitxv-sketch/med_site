import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@med-site/contracts'],
  experimental: {
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    const root = path.join(__dirname, '../..');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(root, 'src'),
      '@med-site/contracts': path.join(root, 'packages/contracts/dist/index.js'),
      'react-router-dom': path.join(__dirname, 'lib/react-router-dom-shim.tsx'),
    };
    return config;
  },
};

export default nextConfig;
