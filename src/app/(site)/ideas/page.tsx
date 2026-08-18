import { Navigation } from '@/components/layout/Navigation';
import { getAllIdeas, getIdeasByCategory } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Code, Lightbulb, Clock, Calendar, Tag } from 'lucide-react';
import NeuralBackground from '@/components/ui/NeuralBackground';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ideas',
  description:
    'Laboratorio de ideas sobre startups, tecnología y alto rendimiento. El SEO técnico está en /seo.',
  alternates: { canonical: '/ideas' },
};

export default function IdeasPage() {
  const allIdeas = getAllIdeas();
  const jairoprodevIdeas = getIdeasByCategory('jairoprodev');
  const jairogrowhackIdeas = getIdeasByCategory('jairogrowhack');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema neural */}
      <NeuralBackground theme="neural" intensity="medium" />
      
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-glutamate-500 mb-6">
              Mi Laboratorio de Ideas
            </h1>
            <p className="text-xl text-cortex-300 max-w-3xl mx-auto leading-relaxed">
              Nodos de memoria — startups, tecnología y alto rendimiento. El SEO técnico
              vive ahora en su propia sección:{' '}
              <Link href="/seo" className="text-acetylcholine-400 underline underline-offset-2">
                jairosaul.com/seo
              </Link>
              .
            </p>
          </div>

          {/* Categorías */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Jairoprodev */}
            <div className="fade-in">
              <div className="flex items-center mb-8">
                <Code className="h-10 w-10 text-acetylcholine-500 mr-4" />
                <div>
                  <h2 className="font-serif text-3xl font-bold text-glutamate-500">
                    Jairoprodev
                  </h2>
                  <p className="text-cortex-300">
                    Construyendo el futuro - Estrategias de startups, lecciones como fundador técnico, 
                    análisis de tecnología y cómo levantar capital.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {jairoprodevIdeas.map((idea, index) => (
                  <article
                    key={idea.slug}
                    className="group fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/ideas/${idea.slug}`}>
                      <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-2 group-hover:text-acetylcholine-400 transition-colors">
                              {idea.title}
                            </h3>
                            <p className="text-cortex-300 text-sm mb-4">
                              {idea.excerpt}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-cortex-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(idea.date)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {idea.readingTime} min
                            </div>
                          </div>
                          
                          {idea.featured && (
                            <span className="bg-acetylcholine-500/20 text-acetylcholine-400 px-2 py-1 rounded text-xs">
                              Destacado
                            </span>
                          )}
                        </div>

                        {idea.tags.length > 0 && (
                          <div className="flex items-center mt-4 pt-4 border-t border-cortex-700">
                            <Tag className="h-4 w-4 text-cortex-400 mr-2" />
                            <div className="flex flex-wrap gap-2">
                              {idea.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-cortex-700 text-cortex-300 px-2 py-1 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Jairogrowhack */}
            <div className="fade-in">
              <div className="flex items-center mb-8">
                <Lightbulb className="h-10 w-10 text-serotonin-500 mr-4" />
                <div>
                  <h2 className="font-serif text-3xl font-bold text-glutamate-500">
                    Jairogrowhack
                  </h2>
                  <p className="text-cortex-300">
                    Diseñando al súper-humano - Hábitos de alto rendimiento, nutrición para la máxima 
                    función cognitiva, filosofía estoica para emprendedores.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {jairogrowhackIdeas.map((idea, index) => (
                  <article
                    key={idea.slug}
                    className="group fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/ideas/${idea.slug}`}>
                      <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 hover:border-serotonin-500 transition-all duration-300 card-hover">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-2 group-hover:text-serotonin-400 transition-colors">
                              {idea.title}
                            </h3>
                            <p className="text-cortex-300 text-sm mb-4">
                              {idea.excerpt}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-cortex-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(idea.date)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {idea.readingTime} min
                            </div>
                          </div>
                          
                          {idea.featured && (
                            <span className="bg-serotonin-500/20 text-serotonin-400 px-2 py-1 rounded text-xs">
                              Destacado
                            </span>
                          )}
                        </div>

                        {idea.tags.length > 0 && (
                          <div className="flex items-center mt-4 pt-4 border-t border-cortex-700">
                            <Tag className="h-4 w-4 text-cortex-400 mr-2" />
                            <div className="flex flex-wrap gap-2">
                              {idea.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-cortex-700 text-cortex-300 px-2 py-1 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Todas las Ideas */}
          <div className="fade-in">
            <h2 className="font-serif text-3xl font-bold text-glutamate-500 mb-8 text-center">
              Todas las Ideas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allIdeas.map((idea, index) => (
                <article
                  key={idea.slug}
                  className="group fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link href={`/ideas/${idea.slug}`}>
                    <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 h-full hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                      <div className="flex items-center mb-4">
                        {idea.category === 'jairoprodev' ? (
                          <Code className="h-6 w-6 text-acetylcholine-500 mr-2" />
                        ) : (
                          <Lightbulb className="h-6 w-6 text-serotonin-500 mr-2" />
                        )}
                        <span className="text-xs text-cortex-400 uppercase tracking-wide">
                          {idea.category}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-lg font-semibold text-glutamate-500 mb-2 group-hover:text-acetylcholine-400 transition-colors line-clamp-2">
                        {idea.title}
                      </h3>
                      
                      <p className="text-cortex-300 text-sm mb-4 line-clamp-3">
                        {idea.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-cortex-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {idea.readingTime} min
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(idea.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
