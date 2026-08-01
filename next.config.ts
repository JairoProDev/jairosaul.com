import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
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
