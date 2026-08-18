import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import StructuredData from '@/components/seo/StructuredData';
import { ArticleToc } from '@/components/article/ArticleToc';
import { MdxBody } from '@/components/article/MdxBody';
import { ReadingProgress } from '@/components/article/ReadingProgress';
import { extractHeadings } from '@/lib/headings';
import { formatDate } from '@/lib/utils';

type Related = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
};

export async function ArticleLayout({
  title,
  description,
  date,
  readingTime,
  tags,
  sectionLabel,
  backHref,
  backLabel,
  canonical,
  category,
  content,
  related,
}: {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
  sectionLabel: string;
  backHref: string;
  backLabel: string;
  canonical: string;
  category: string;
  content: string;
  related: Related[];
}) {
  const headings = extractHeadings(content);
  const body = content.replace(/^#\s+[^\n]+\n+/, '');

  return (
    <div className="relative min-h-screen bg-cortex-900">
      <Navigation />
      <ReadingProgress />
      <StructuredData
        type="article"
        data={{
          title,
          description,
          datePublished: date,
          dateModified: date,
          url: canonical,
          keywords: tags,
          category,
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: 'Inicio', url: 'https://jairosaul.com' },
            { name: backLabel, url: `https://jairosaul.com${backHref}` },
            { name: title, url: canonical },
          ],
        }}
      />

      <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center text-sm text-acetylcholine-500 hover:text-acetylcholine-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Link>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
            <article>
              <header className="mb-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-cortex-400">
                  {sectionLabel}
                </p>
                <h1 className="font-serif text-4xl font-bold leading-tight text-glutamate-500 md:text-5xl">
                  {title}
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-cortex-300">{description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-cortex-400">
                  <span className="inline-flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(date)}
                  </span>
                  <span className="inline-flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {readingTime} min de lectura
                  </span>
                </div>
                {tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-cortex-400" />
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cortex-700 bg-cortex-800 px-3 py-1 text-xs text-cortex-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>

              <div id="article-body" className="article-body">
                <MdxBody source={body} />
              </div>
            </article>

            <aside className="mt-12 lg:mt-2">
              <ArticleToc headings={headings} />
            </aside>
          </div>

          {related.length > 0 ? (
            <section className="mt-16 border-t border-cortex-700 pt-12">
              <h2 className="mb-6 font-serif text-2xl font-bold text-glutamate-500">
                Sigue por aquí
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-5 transition-colors hover:border-acetylcholine-500"
                  >
                    <h3 className="font-serif text-lg font-semibold text-glutamate-500">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-cortex-300">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
