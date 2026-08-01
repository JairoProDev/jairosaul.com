/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de rendimiento
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/fiber', '@react-three/drei'],
    mdxRs: true,
  },
  
  // Asegurar que las imágenes estáticas se sirven correctamente
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.jairosaul.com' : '',
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
    domains: ['jairosaul.com', 'www.jairosaul.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jairosaul.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jairosaul.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compresión y optimización
  compress: true,
  poweredByHeader: false,
  
  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Optimizaciones de webpack
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Configuración de MDX
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  async redirects() {
    return [
      { source: '/proyectos', destination: '/projects', permanent: true },
      { source: '/proyectos/archive', destination: '/projects/archive', permanent: true },
      { source: '/proyectos/:slug', destination: '/projects/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
