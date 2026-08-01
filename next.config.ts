import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      {
        source: '/demos/:slug',
        destination: '/demos/:slug/index.html',
        permanent: false,
      },
      {
        source: '/demos/:slug/',
        destination: '/demos/:slug/index.html',
        permanent: false,
      },
      {
        source: '/proyectos',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/proyectos/archive',
        destination: '/projects/archive',
        permanent: true,
      },
      {
        source: '/proyectos/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/demos/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
