
import Link from 'next/link';
import Image from 'next/image';
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
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fade-in">
            {/* Contenido Principal */}
            <div className="text-center lg:text-left">
              <div className="consciousness-glow rounded-3xl p-8 lg:p-12">
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
                  Jairo Saul Salas Quiñones
                </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl text-cortex-200 mb-8 leading-relaxed animate-fade-in-delay">
                  Startup Founder | Full-Stack Software Engineer |{' '}
                  <span className="text-acetylcholine-400 font-medium">Scientific Content Creator</span>
                </p>

                <div className="flex flex-col items-center lg:items-start space-y-6">
                  <div className="text-acetylcholine-500 animate-bounce lg:hidden">
                    <ArrowDown className="h-8 w-8" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/cortex"
                      className="btn-quantum inline-flex items-center px-6 py-3 bg-gradient-to-r from-acetylcholine-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-acetylcholine-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <Brain className="mr-2 h-5 w-5" />
                      Explorar Brain 3D
                    </Link>
                    <Link
                      href="/proyectos"
                      className="btn-quantum inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyber-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-cyber-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <Code className="mr-2 h-5 w-5" />
                      Ver Proyectos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Foto Personal */}
            <div className="flex justify-center lg:justify-end animate-fade-in-delay">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                  {/* Efectos de resplandor */}
                  <div className="absolute inset-0 bg-gradient-to-br from-acetylcholine-500/30 to-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-acetylcholine-400/20 to-emerald-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Foto principal */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-br from-acetylcholine-500 to-emerald-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cortex-800 to-cortex-700">
                      <Image
                        src="/images/profile.jpg"
                        alt="Jairo Saul Salas Quiñones"
                        width={384}
                        height={384}
                        className="w-full h-full object-cover rounded-full"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Partículas flotantes */}
                  <div className="absolute -top-4 -right-4 w-3 h-3 bg-acetylcholine-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute top-1/2 -right-6 w-1 h-1 bg-cyber-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Misión */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 fade-in">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Mi Misión
            </h2>
                          <p className="text-base md:text-lg text-cortex-200 leading-relaxed max-w-3xl mx-auto">
              Mi filosofía central es <span className="text-emerald-400 font-medium">"La Reconstrucción"</span>. 
              Habiendo identificado +100 áreas de mejora en mi vida, estoy en un proceso diario y disciplinado 
              de transformación radical. Mi misión es doble: construir sistemas tecnológicos que empoderen a otros 
              y usar mi propia vida como laboratorio para la superación humana.
            </p>
            <Link 
              href="/manifiesto"
              className="inline-flex items-center mt-4 px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Leer el manifiesto completo
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mis Creaciones - Proyectos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 fade-in">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Mis Frentes de Batalla
            </h2>
            <p className="text-base md:text-lg text-cortex-200 max-w-3xl mx-auto">
              Tres misiones paralelas: construir el ecosistema tecnológico del futuro, 
              diseñar el sistema operativo para la superación humana, y documentar la reconstrucción radical de una vida.
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
          <div className="text-center mb-8 fade-in">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-glutamate-500 mb-4">
              Mi Sistema de Pensamiento
            </h2>
            <p className="text-base md:text-lg text-cortex-300 max-w-3xl mx-auto">
              Dos vertientes de conocimiento: la construcción de imperios tecnológicos 
              y el diseño del súper-humano. De la trinchera a la cumbre, documentando cada aprendizaje.
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
                <span className="text-acetylcholine-400 font-medium">El Constructor</span> - 
                Desde la trinchera del emprendedor: estrategias de construcción, lecciones de fundador técnico, 
                arquitectura de sistemas y la guerra contra la mediocridad profesional.
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
                <span className="text-emerald-400 font-medium">El Explorador</span> - 
                Mi laboratorio de reconstrucción: Plan de +100 Días, hábitos del 1% superior, 
                filosofía antifragil y el diseño sistemático de una vida extraordinaria.
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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-glutamate-500 mb-4">
              ¿Eres constructor o explorador?
            </h2>
            <p className="text-base md:text-lg text-cortex-300 mb-6">
              Si aspiras a la excelencia y rechazas la mediocridad, si buscas construir algo que importe 
              o reconstruir tu propia vida desde cero, establezcamos una sinapsis. 
              Juntos podemos construir el futuro y diseñar la mejor versión de nosotros mismos.
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
