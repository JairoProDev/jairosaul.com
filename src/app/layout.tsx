import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import PlasticityProvider from '@/components/layout/PlasticityProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "JairoSaul.com - Jairo Saul Salas Quiñones",
  description: "Startup Founder | FullStack Software Engineer | Scientific Content Creator ",
  keywords: ['Jairo Saul', 'tecnología', 'startups', 'Latinoamérica', 'fundador', 'desarrollo'],
  authors: [{ name: 'Jairo Saul Salas Quiñones' }],
  creator: 'Jairo Saul Salas Quiñones',
  openGraph: {
    title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
    description: 'Startup Founder | FullStack Software Engineer | Scientific Content Creator ',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
    description: 'Startup Founder | FullStack Software Engineer | Scientific Content Creator ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="bg-cortex-900 text-glutamate-500 font-sans antialiased">
        <PlasticityProvider>
          {children}
        </PlasticityProvider>
      </body>
    </html>
  );
}

