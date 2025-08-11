
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
            {/* Foto Personal - Ahora a la izquierda */}
            <div className="flex justify-center lg:justify-start animate-fade-in-delay lg:order-1 order-2">
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

            {/* Contenido Principal - Ahora a la derecha */}
            <div className="text-center lg:text-left lg:order-2 order-1">
              <div className="consciousness-glow rounded-3xl p-8 lg:p-12">
                <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in leading-tight">
                  Jairo Saul Salas Quiñones
                </h1>
                
                <p className="text-base md:text-lg lg:text-xl text-cortex-200 mb-6 leading-relaxed animate-fade-in-delay">
                  <span className="text-acetylcholine-400 font-medium">Startup Technical Founder</span> |{' '}
                  <span className="text-white">FullStack Software Engineer</span> |{' '}
                  <span className="text-emerald-400 font-medium">Business Developer</span> |{' '}
                  <span className="text-acetylcholine-400 font-medium">Scientific Content Creator</span>
                </p>

                <div className="flex flex-col items-center lg:items-start space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/cortex"
                      className="btn-quantum inline-flex items-center px-5 py-3 bg-gradient-to-r from-acetylcholine-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-acetylcholine-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Explorar Brain 3D
                    </Link>
                    <Link
                      href="/proyectos"
                      className="btn-quantum inline-flex items-center px-5 py-3 bg-gradient-to-r from-emerald-600 to-cyber-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-cyber-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Ver Proyectos
                    </Link>
                  </div>
                  
                  {/* Redes Sociales */}
                  <div className="flex space-x-3 pt-2">
                    <a href="https://linkedin.com/in/JairoSaulProDev" target="_blank" className="p-2 bg-cortex-700/50 hover:bg-blue-500/20 rounded-full transition-colors group">
                      <svg className="w-5 h-5 text-cortex-300 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://github.com/JairoSaulProDev" target="_blank" className="p-2 bg-cortex-700/50 hover:bg-gray-500/20 rounded-full transition-colors group">
                      <svg className="w-5 h-5 text-cortex-300 group-hover:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://twitter.com/JairoSaulProDev" target="_blank" className="p-2 bg-cortex-700/50 hover:bg-sky-500/20 rounded-full transition-colors group">
                      <svg className="w-5 h-5 text-cortex-300 group-hover:text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="https://youtube.com/@JairoSaulProDev" target="_blank" className="p-2 bg-cortex-700/50 hover:bg-red-500/20 rounded-full transition-colors group">
                      <svg className="w-5 h-5 text-cortex-300 group-hover:text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Mi Misión - Layout Intercalado */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Tarjeta de Misión */}
            <div className="lg:col-span-2 bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-2xl p-8 fade-in">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-3">
                    Mi Filosofía: "La Reconstrucción"
                  </h2>
                  <div className="space-y-3 text-cortex-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">
                        <span className="text-emerald-400 font-medium">170+ áreas identificadas</span> para mejora personal y profesional
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-acetylcholine-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">
                        <span className="text-acetylcholine-400 font-medium">Proceso diario</span> de transformación radical documentado
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">
                        <span className="text-cyber-400 font-medium">Mi vida como laboratorio</span> para la superación humana
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Rápidas */}
            <div className="space-y-4 fade-in">
              <div className="bg-acetylcholine-500/10 border border-acetylcholine-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-acetylcholine-400">3</div>
                <div className="text-xs text-cortex-300">Startups Activas</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">+100</div>
                <div className="text-xs text-cortex-300">Días de Reconstrucción</div>
              </div>
              <div className="bg-cyber-500/10 border border-cyber-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyber-400">24/7</div>
                <div className="text-xs text-cortex-300">Modo Constructor</div>
              </div>
              <Link 
                href="/manifiesto"
                className="block w-full px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors text-center"
              >
                Ver Manifiestos
              </Link>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buscadis */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-acetylcholine-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-acetylcholine-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Buscadis</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Activo</span>
                    <span className="px-2 py-1 bg-acetylcholine-500/20 text-acetylcholine-400 text-xs rounded-full">Marketplace</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Marketplace de avisos clasificados que conecta oportunidades en Latinoamérica
              </p>
              <Link href="/proyectos/buscadis" className="text-acetylcholine-400 text-sm hover:text-acetylcholine-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>

            {/* Uplify */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Uplify</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Desarrollo</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Productividad</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Sistema operativo para la superación humana y desarrollo personal
              </p>
              <Link href="/proyectos/uplify" className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>

            {/* DiverEdu */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-cyber-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-cyber-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">DiverEdu</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Planificación</span>
                    <span className="px-2 py-1 bg-cyber-500/20 text-cyber-400 text-xs rounded-full">Educación</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                YouTube de la educación - Plataforma de contenido educativo diverso
              </p>
              <Link href="/proyectos/diveredu" className="text-cyber-400 text-sm hover:text-cyber-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Jairoprodev - Más amplio */}
            <div className="lg:col-span-3 bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 fade-in">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-acetylcholine-500 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    JairoProDev - El Constructor
                  </h3>
                  <p className="text-cortex-300 text-sm mb-4">
                    Desde la trinchera del emprendedor: estrategias, arquitectura de sistemas y la guerra contra la mediocridad.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-acetylcholine-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Estrategias de Startups</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-acetylcholine-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Arquitectura Escalable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-acetylcholine-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Fundador Técnico</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-acetylcholine-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Levantamiento de Capital</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jairogrowhack - Más compacto */}
            <div className="lg:col-span-2 bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 fade-in">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    JairoGrowHack
                  </h3>
                  <p className="text-cortex-300 text-xs mb-3">
                    El laboratorio de reconstrucción personal
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Plan de +100 Días</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Hábitos del 1%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-cortex-400">Filosofía Antifragil</span>
                    </div>
                  </div>
                </div>
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
