
import Link from 'next/link';
import { ArrowDown, Code, Lightbulb, BookOpen, MessageCircle, ExternalLink } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      {/* Hero Section - La Declaración */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center fade-in">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-glutamate-500 mb-6 animate-fade-in">
              Jairo Saúl Salas Quiñones
            </h1>
            
            <p className="text-xl md:text-2xl text-cortex-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
              Construyendo el futuro de la tecnología en Latinoamérica.{' '}
              <span className="text-acetylcholine-500 font-medium">Un sistema a la vez.</span>
            </p>

            <div className="flex justify-center">
              <div className="text-acetylcholine-500 animate-bounce">
                <ArrowDown className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Misión */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-glutamate-500 mb-6">
              Mi Misión
            </h2>
            <p className="text-lg text-cortex-300 leading-relaxed">
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-glutamate-500 mb-6">
              Mis Creaciones
            </h2>
            <p className="text-lg text-cortex-300 max-w-2xl mx-auto">
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
                  <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 h-full hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <Code className="h-8 w-8 text-acetylcholine-500" />
                      <ExternalLink className="h-4 w-4 text-cortex-400 group-hover:text-acetylcholine-500 transition-colors" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-2 capitalize">
                      {project}
                    </h3>
                    <p className="text-cortex-300 text-sm">
                      Solucionando problemas fundamentales en Latinoamérica
                    </p>
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
