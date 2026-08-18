import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import StructuredData from '@/components/seo/StructuredData';
import { getIndustryArticles, industries } from '@/lib/industrias';

export const metadata: Metadata = {
  title: 'Industrias',
  description:
    'Notas por industria. Empiezo por turismo en Cusco: mercados, cupos, OTAs y catálogo.',
  alternates: { canonical: '/industrias' },
  openGraph: {
    title: 'Industrias',
    description:
      'Turismo primero. Mercados, producto, canales. Jairo, Cusco. Agosto 2026.',
    url: 'https://jairosaul.com/industrias',
  },
};

export default function IndustriasPage() {
  const turismoCount = getIndustryArticles('turismo').length;
  const turismo = industries.find((item) => item.id === 'turismo');

  return (
    <div className="min-h-screen bg-cortex-900">
      <Navigation />
      <StructuredData
        type="website"
        data={{
          name: 'Industrias',
          url: 'https://jairosaul.com/industrias',
        }}
      />

      <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-acetylcholine-400">
            Agosto 2026
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-glutamate-500 md:text-6xl">
            Industrias
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cortex-300">
            Escribo cuando tengo números, catálogo o operación. No un blog de
            tips. La primera vertical es turismo, porque vivo en Cusco y es lo
            que más he medido.
          </p>

          {turismo ? (
            <Link
              href={turismo.href}
              className="mt-12 block rounded-2xl border border-acetylcholine-500/30 bg-acetylcholine-500/5 p-6 transition-colors hover:border-acetylcholine-500 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-acetylcholine-400">
                Vertical abierta
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-glutamate-500">
                {turismo.title}
              </h2>
              <p className="mt-3 max-w-2xl text-cortex-300">{turismo.blurb}</p>
              <p className="mt-6 inline-flex items-center text-sm text-acetylcholine-400">
                {turismoCount} notas
                <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
