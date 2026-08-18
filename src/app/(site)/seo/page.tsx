import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import StructuredData from '@/components/seo/StructuredData';
import { getAllSeoArticles, seoClusters } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'SEO técnico',
  description:
    'Notas de hreflang, schema de tours, WAF y GetYourGuide. WordPress multidominio. Jairo, Cusco.',
  alternates: { canonical: '/seo' },
  openGraph: {
    title: 'SEO técnico',
    description:
      'Notas sobre hreflang, schema de tours, WAF, Core Web Vitals y GetYourGuide. Jairo, Cusco. Agosto 2026.',
    url: 'https://jairosaul.com/seo',
  },
};

export default function SeoHubPage() {
  const articles = getAllSeoArticles();
  const startHere = [
    'hreflang-turismo-idioma-equivocado',
    'precio-google-offer-pricecurrency',
    'margen-getyourguide-sin-pelea',
  ];

  return (
    <div className="min-h-screen bg-cortex-900">
      <Navigation />
      <StructuredData
        type="website"
        data={{
          name: 'SEO técnico',
          url: 'https://jairosaul.com/seo',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'SEO técnico',
            itemListElement: articles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://jairosaul.com/seo/${article.slug}`,
              name: article.title,
            })),
          }),
        }}
      />

      <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-acetylcholine-400">
            Agosto 2026
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-glutamate-500 md:text-6xl">
            Notas de SEO técnico
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cortex-300">
            Notas de SEO técnico: rastreo, hreflang, schema, WAF y WordPress
            con más de un idioma. El recorte es turismo porque vivo en Cusco,
            no porque esté escribiendo el manual de una agencia en concreto.
            Mercado y producto, en{' '}
            <Link
              href="/industrias/turismo"
              className="text-acetylcholine-400 underline underline-offset-2"
            >
              /industrias/turismo
            </Link>
            .
          </p>

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
                    href={`/seo/${slug}`}
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

          {seoClusters.map((cluster) => {
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
                        href={`/seo/${article.slug}`}
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
        </div>
      </div>
    </div>
  );
}
