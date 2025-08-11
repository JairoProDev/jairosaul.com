
import Link from 'next/link';
import { ArrowDown, Code, Lightbulb, BookOpen, MessageCircle, ExternalLink, Brain } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { siteConfig } from '@/lib/config';
import NeuralParticles from '@/components/ui/NeuralParticles';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg relative">
      <NeuralParticles />
      <Navigation />
      
      {/* Hero Section - La Declaración */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center fade-in">
            <div className="consciousness-glow rounded-3xl p-12 mb-8">
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                Jairo Saul Salas Quiñones
              </h1>
              
              <p className="text-xl md:text-2xl text-cortex-200 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
                Startup Founder | Full-Stack Software Engineer |{' '}
                <span className="text-acetylcholine-400 font-medium">Scientific Content Creator</span>
              </p>

              <div className="flex flex-col items-center space-y-6">
                <div className="text-acetylcholine-500 animate-bounce">
                  <ArrowDown className="h-8 w-8" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/cortex"
                    className="btn-quantum inline-flex items-center px-8 py-4 bg-gradient-to-r from-acetylcholine-500 to-neural-500 text-white rounded-xl font-semibold hover:from-acetylcholine-600 hover:to-neural-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Brain className="mr-3 h-6 w-6" />
                    Explorar Cerebrum 3D
                  </Link>
                  <Link
                    href="/proyectos"
                    className="btn-quantum inline-flex items-center px-8 py-4 bg-gradient-to-r from-cortex-700 to-transistor-700 text-white rounded-xl font-semibold hover:from-cortex-600 hover:to-transistor-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Code className="mr-3 h-6 w-6" />
                    Ver Proyectos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Misión */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Mi Misión
            </h2>
            <p className="text-lg text-cortex-200 leading-relaxed">
              Mi obsesión es eliminar la ineficiencia y crear oportunidades a través de sistemas tecnológicos. 
              Aspiro a la excelencia, no a la mediocridad. Junto a mi socia y cofundadora, Shantall, 
              construimos soluciones que transforman realidades.
            </p>
            <Link 
              href="/manifiesto"
              className="inline-flex items-center mt-6 px-6 py-3 bg-dopamine-500 text-white rounded-lg font-medium hover:bg-dopamine-600 transition-colors"
            >
              Leer mi manifiesto completo
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mis Creaciones - Proyectos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Mis Creaciones
            </h2>
            <p className="text-lg text-cortex-200 max-w-2xl mx-auto">
              Engramas de construcción - Sistemas tecnológicos que solucionan problemas fundamentales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.projects.featured.map((project, index) => (
              <div
                key={project}
                className="group fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/proyectos/${project}`}>
                  <div className="card-neural rounded-2xl p-8 h-full hover:border-acetylcholine-500 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="transistor-glow p-3 rounded-xl">
                        <Code className="h-8 w-8 text-acetylcholine-500" />
                      </div>
                      <ExternalLink className="h-5 w-5 text-cortex-400 group-hover:text-acetylcholine-500 transition-colors" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-white mb-3 capitalize">
                      {project}
                    </h3>
                    <p className="text-cortex-200 text-sm leading-relaxed">
                      Solucionando problemas fundamentales en Latinoamérica
                    </p>
                    <div className="mt-6 flex space-x-2">
                      <div className="w-2 h-2 bg-acetylcholine-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-neural-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-2 h-2 bg-cyber-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-in">
            <Link 
              href="/proyectos"
              className="inline-flex items-center px-6 py-3 bg-acetylcholine-500 text-white rounded-lg font-medium hover:bg-acetylcholine-600 transition-colors"
            >
              Ver todos los proyectos
              <Code className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mi Laboratorio de Ideas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-glutamate-500 mb-6">
              Mi Laboratorio de Ideas
            </h2>
            <p className="text-lg text-cortex-300 max-w-2xl mx-auto">
              Nodos de memoria - Pensamientos y estrategias para construir el futuro
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jairoprodev */}
            <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8 fade-in">
              <div className="flex items-center mb-6">
                <Code className="h-8 w-8 text-acetylcholine-500 mr-3" />
                <h3 className="font-serif text-2xl font-semibold text-glutamate-500">
                  Jairoprodev
                </h3>
              </div>
              <p className="text-cortex-300 mb-6">
                Construyendo el futuro - Estrategias de startups, lecciones como fundador técnico, 
                análisis de tecnología y cómo levantar capital.
              </p>
              <div className="space-y-2">
                {siteConfig.ideas.categories.jairoprodev.slice(0, 3).map((idea) => (
                  <Link
                    key={idea}
                    href={`/ideas/${idea}`}
                    className="block text-acetylcholine-400 hover:text-acetylcholine-300 transition-colors"
                  >
                    {idea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>

            {/* Jairogrowhack */}
            <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8 fade-in">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-8 w-8 text-serotonin-500 mr-3" />
                <h3 className="font-serif text-2xl font-semibold text-glutamate-500">
                  Jairogrowhack
                </h3>
              </div>
              <p className="text-cortex-300 mb-6">
                Diseñando al súper-humano - Hábitos de alto rendimiento, nutrición para la máxima 
                función cognitiva, filosofía estoica para emprendedores.
              </p>
              <div className="space-y-2">
                {siteConfig.ideas.categories.jairogrowhack.slice(0, 3).map((idea) => (
                  <Link
                    key={idea}
                    href={`/ideas/${idea}`}
                    className="block text-serotonin-400 hover:text-serotonin-300 transition-colors"
                  >
                    {idea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 fade-in">
            <Link 
              href="/ideas"
              className="inline-flex items-center px-6 py-3 bg-serotonin-500 text-white rounded-lg font-medium hover:bg-serotonin-600 transition-colors"
            >
              Explorar todas las ideas
              <Lightbulb className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Conecta - Call to Action Final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-glutamate-500 mb-6">
              ¿Tienes un proyecto que puede cambiar el mundo?
            </h2>
            <p className="text-lg text-cortex-300 mb-8">
              Establezcamos una sinapsis. Trabajemos juntos para construir el futuro.
            </p>
            <Link 
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-dopamine-500 text-white rounded-lg font-medium hover:bg-dopamine-600 hover:scale-105 transition-all duration-200"
            >
              Iniciar conversación
              <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
