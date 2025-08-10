import { notFound } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { getIdeaBySlug, getRelatedIdeas, getAllIdeaSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowLeft, Code, Lightbulb } from 'lucide-react';

interface IdeaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllIdeaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);

  if (!idea) {
    notFound();
  }

  const relatedIdeas = getRelatedIdeas(slug, idea.tags, 3);

  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 fade-in">
            <Link 
              href="/ideas"
              className="inline-flex items-center text-acetylcholine-500 hover:text-acetylcholine-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Ideas
            </Link>
          </div>

          {/* Header del Artículo */}
          <article className="fade-in">
            <header className="mb-12">
              {/* Categoría */}
              <div className="flex items-center mb-6">
                {idea.category === 'jairoprodev' ? (
                  <Code className="h-6 w-6 text-acetylcholine-500 mr-3" />
                ) : (
                  <Lightbulb className="h-6 w-6 text-serotonin-500 mr-3" />
                )}
                <span className="text-sm text-cortex-400 uppercase tracking-wide">
                  {idea.category}
                </span>
              </div>

              {/* Título */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-glutamate-500 mb-6">
                {idea.title}
              </h1>

              {/* Descripción */}
              <p className="text-xl text-cortex-300 mb-8 leading-relaxed">
                {idea.description}
              </p>

              {/* Metadatos */}
              <div className="flex items-center justify-between text-sm text-cortex-400 mb-8">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(idea.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {idea.readingTime} min de lectura
                  </div>
                </div>
                
                {idea.featured && (
                  <span className="bg-acetylcholine-500/20 text-acetylcholine-400 px-3 py-1 rounded-full text-xs">
                    Artículo Destacado
                  </span>
                )}
              </div>

              {/* Tags */}
              {idea.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-cortex-400" />
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-cortex-800 text-cortex-300 px-3 py-1 rounded-full text-sm border border-cortex-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Contenido */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-cortex-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: idea.content }}
              />
            </div>
          </article>

          {/* Artículos Relacionados */}
          {relatedIdeas.length > 0 && (
            <section className="mt-16 pt-16 border-t border-cortex-700 fade-in">
              <h2 className="font-serif text-2xl font-bold text-glutamate-500 mb-8">
                Artículos Relacionados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedIdeas.map((relatedIdea) => (
                  <article key={relatedIdea.slug} className="group">
                    <Link href={`/ideas/${relatedIdea.slug}`}>
                      <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 h-full hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                        <div className="flex items-center mb-4">
                          {relatedIdea.category === 'jairoprodev' ? (
                            <Code className="h-5 w-5 text-acetylcholine-500 mr-2" />
                          ) : (
                            <Lightbulb className="h-5 w-5 text-serotonin-500 mr-2" />
                          )}
                          <span className="text-xs text-cortex-400 uppercase tracking-wide">
                            {relatedIdea.category}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-lg font-semibold text-glutamate-500 mb-2 group-hover:text-acetylcholine-400 transition-colors line-clamp-2">
                          {relatedIdea.title}
                        </h3>
                        
                        <p className="text-cortex-300 text-sm mb-4 line-clamp-3">
                          {relatedIdea.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-cortex-400">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {relatedIdea.readingTime} min
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(relatedIdea.date)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="mt-16 pt-16 border-t border-cortex-700 text-center fade-in">
            <h2 className="font-serif text-2xl font-bold text-glutamate-500 mb-4">
              ¿Te gustó este artículo?
            </h2>
            <p className="text-cortex-300 mb-8">
              Compártelo y sígueme para más insights sobre startups, tecnología y alto rendimiento.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${idea.title}" por @jairosaul`)}&url=${encodeURIComponent(`https://jairosaul.com/ideas/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-acetylcholine-500 text-white rounded-lg font-medium hover:bg-acetylcholine-600 transition-colors"
              >
                Compartir en Twitter
              </a>
              <Link
                href="/ideas"
                className="inline-flex items-center px-6 py-3 bg-cortex-700 text-cortex-300 rounded-lg font-medium hover:bg-cortex-600 transition-colors"
              >
                Ver más artículos
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
