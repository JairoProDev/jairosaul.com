import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { getRecursoBySlug, getAllRecursos } from '@/lib/recursos';
import StructuredData from '@/components/seo/StructuredData';

export async function generateStaticParams() {
  const recursos = await getAllRecursos();

  return recursos.map((recurso) => ({
    category: recurso.category,
    slug: recurso.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const recurso = await getRecursoBySlug(category, slug);

  if (!recurso) {
    return {};
  }

  return {
    title: `${recurso.title} | JairoSaul.com`,
    description: recurso.description,
  };
}

export default async function RecursoPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const recurso = await getRecursoBySlug(category, slug);

  if (!recurso) {
    notFound();
  }

  const readingTime = recurso.content ? Math.ceil(recurso.content.split(' ').length / 200) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <Navigation />

      <StructuredData
        type="article"
        data={{
          title: recurso.title,
          description: recurso.description,
          datePublished: recurso.date,
          dateModified: recurso.date,
          url: `https://jairosaul.com/recursos/${category}/${slug}`,
          keywords: recurso.tags,
          category: recurso.category,
        }}
      />

      <article className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-cortex-300 mb-8">
            <Link href="/recursos" className="hover:text-white transition-colors">
              Recursos
            </Link>
            <span>/</span>
            <Link href={`/recursos/${category}`} className="hover:text-white transition-colors capitalize">
              {category}
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
              {recurso.title}
            </h1>

            <p className="text-xl text-slate-300 mb-6">
              {recurso.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-cortex-300">
              {recurso.date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(recurso.date).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}

              {readingTime > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min lectura</span>
                </div>
              )}

              {recurso.tags && recurso.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4" />
                  <span>{recurso.tags.length} etiquetas</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {recurso.tags && recurso.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {recurso.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cortex-700/50 text-cortex-200 text-sm rounded-lg border border-cortex-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="markdown-content text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: (recurso.content || '').replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-cortex-700">
            <Link
              href={`/recursos/${category}`}
              className="inline-flex items-center space-x-2 text-acetylcholine-400 hover:text-acetylcholine-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a {category}</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
