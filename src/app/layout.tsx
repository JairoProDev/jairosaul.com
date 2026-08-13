import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e293b' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: 'JairoSaul.com - Jairo Saul Salas Quiñones',
    template: '%s | JairoSaul.com'
  },
  description: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator. Fundador técnico obsesionado con eliminar la ineficiencia y crear oportunidades a través de sistemas tecnológicos.',
  keywords: [
    'startup', 'technical founder', 'fullstack', 'software engineer', 
    'business developer', 'scientific content creator', 'latam', 'peru', 
    'cusco', 'entrepreneur', 'technology', 'innovation', 'software development',
    'web development', 'react', 'nextjs', 'typescript', 'startup ecosystem'
  ],
  authors: [{ name: 'Jairo Saul Salas Quiñones' }],
  creator: 'Jairo Saul Salas Quiñones',
  publisher: 'Jairo Saul Salas Quiñones',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jairosaul.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://jairosaul.com',
    title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
    description: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator',
    siteName: 'JairoSaul.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jairo Saul Salas Quiñones - Startup Technical Founder',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
    description: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator',
    creator: '@JairoSaulProDev',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  category: 'technology',
  classification: 'Personal Website',
  other: {
    'msapplication-TileColor': '#1e293b',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'JairoSaul.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <StructuredData type="person" />
        <StructuredData type="website" />
        <link rel="icon" href="/brain-icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-cortex-900 text-glutamate-500 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

