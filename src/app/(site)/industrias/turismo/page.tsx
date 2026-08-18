import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import StructuredData from '@/components/seo/StructuredData';
import { getIndustryArticles, turismoClusters } from '@/lib/industrias';

export const metadata: Metadata = {
  title: 'Turismo',
  description:
    'Notas de turismo desde Cusco: Mincetur 2025, cupo del Camino Inca, Brasil, OTAs y catálogo por idioma.',
  alternates: { canonical: '/industrias/turismo' },
  openGraph: {
    title: 'Turismo',
    description:
      'Mercados, producto, canales y demanda. Datos de Mincetur y mediciones propias. Jairo, Cusco. Agosto 2026.',
    url: 'https://jairosaul.com/industrias/turismo',
  },
};

export default function TurismoHubPage() {
  const articles = getIndustryArticles('turismo');
  const startHere = [
    'brasil-crecio-quince',
    'cupo-camino-inca-quinientos',
    'el-americano-compra-seis-meses-antes',
  ];

  return (
    <div className="min-h-screen bg-cortex-900">
      <Navigation />
      <StructuredData
        type="website"
        data={{
          name: 'Turismo',
          url: 'https://jairosaul.com/industrias/turismo',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Turismo',
            itemListElement: articles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://jairosaul.com/industrias/turismo/${article.slug}`,
              name: article.title,
            })),
          }),
        }}
      />

      <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-acetylcholine-400">
            Industrias · Cusco · Agosto 2026
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-glutamate-500 md:text-6xl">
            Turismo
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cortex-300">
            Vivo en Cusco. Lo que escribo aquí cruza el reporte de Mincetur de
            2025, el cupo del Camino Inca y catálogos reales de operadoras con
            dominio por idioma. Si el detalle es técnico (hreflang, schema,
            WAF), está en{' '}
            <Link
              href="/seo"
              className="text-acetylcholine-400 underline underline-offset-2"
            >
              /seo
            </Link>
            .
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/60 px-4 py-5">
              <dt className="text-xs text-cortex-400">Turistas 2025</dt>
              <dd className="mt-2 font-serif text-2xl font-bold text-acetylcholine-400">
                3,42 M
              </dd>
              <p className="mt-1 text-xs text-cortex-500">Mincetur, año cerrado</p>
            </div>
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/60 px-4 py-5">
              <dt className="text-xs text-cortex-400">Brasil</dt>
              <dd className="mt-2 font-serif text-2xl font-bold text-acetylcholine-400">
                +15%
              </dd>
              <p className="mt-1 text-xs text-cortex-500">212.365 turistas</p>
            </div>
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/60 px-4 py-5">
              <dt className="text-xs text-cortex-400">Camino Inca</dt>
              <dd className="mt-2 font-serif text-2xl font-bold text-acetylcholine-400">
                ~200
              </dd>
              <p className="mt-1 text-xs text-cortex-500">turistas/día, de 500</p>
            </div>
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/60 px-4 py-5">
              <dt className="text-xs text-cortex-400">Italia</dt>
              <dd className="mt-2 font-serif text-2xl font-bold text-acetylcholine-400">
                +12%
              </dd>
              <p className="mt-1 text-xs text-cortex-500">62.183, aún bajo 2019</p>
            </div>
          </dl>

          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-glutamate-500">
              Tres de este mes
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {startHere.map((slug) => {
                const article = articles.find((item) => item.slug === slug);
                if (!article) return null;
                return (
                  <Link
                    key={slug}
                    href={`/industrias/turismo/${slug}`}
                    className="group rounded-2xl border border-acetylcholine-500/30 bg-acetylcholine-500/5 p-5 transition-colors hover:border-acetylcholine-500"
                  >
                    <h3 className="font-serif text-lg font-semibold text-glutamate-500 group-hover:text-acetylcholine-400">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-cortex-300">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm text-acetylcholine-400">
                      Leer
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {turismoClusters.map((cluster) => {
            const items = articles.filter((article) => article.cluster === cluster.id);
            if (items.length === 0) return null;
            return (
              <section key={cluster.id} className="mt-16">
                <h2 className="font-serif text-2xl font-bold text-dopamine-500">
                  {cluster.title}
                </h2>
                <p className="mt-2 max-w-2xl text-cortex-400">{cluster.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {items.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/industrias/turismo/${article.slug}`}
                        className="flex flex-col rounded-xl border border-cortex-700 bg-cortex-800/40 px-5 py-4 transition-colors hover:border-acetylcholine-500 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span>
                          <span className="block font-medium text-glutamate-500">
                            {article.title}
                          </span>
                          <span className="mt-1 block text-sm text-cortex-400">
                            {article.excerpt}
                          </span>
                        </span>
                        <span className="mt-3 inline-flex shrink-0 items-center text-sm text-cortex-500 sm:ml-6 sm:mt-0">
                          <Clock className="mr-1 h-4 w-4" />
                          {article.readingTime} min
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <p className="mt-16 max-w-2xl text-sm text-cortex-500">
            Fuentes que cito: Mincetur, Reporte mensual de turismo (diciembre
            2025). Cupo del Camino Inca clásico: 500 personas/día incluyendo
            staff. Catálogos: medición propia, agosto 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
