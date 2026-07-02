import type { NextConfig } from 'next';
import path from 'path';

const bffInternal =
  process.env.BFF_INTERNAL_URL ||
  `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}`;

const bookingApiRewrites = [
  'wp-doctors',
  'branches',
  'theme',
  'text',
  'config',
  'services',
  'slots',
  'book',
  'doctors',
  'catalog/doctors',
  'catalog/prices',
  'catalog/services',
  'diagnostics',
].map((segment) => ({
  source: `/api/${segment}`,
  destination: `${bffInternal}/api/${segment}`,
}));

const nextConfig: NextConfig = {
  transpilePackages: ['@med-site/contracts', '@med-site/page-engine'],
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      ...bookingApiRewrites,
      {
        source: '/api/wp-doctors/clear-cache',
        destination: `${bffInternal}/api/wp-doctors/clear-cache`,
      },
    ];
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
      '@med-site/page-engine': path.join(root, 'packages/page-engine/dist/index.js'),
      // Виджеты прототипа ожидают react-router-dom (Vite), в Next — shim
      'react-router-dom': path.join(__dirname, 'lib/react-router-dom-shim.tsx'),
    };
    return config;
  },
};

export default nextConfig;
