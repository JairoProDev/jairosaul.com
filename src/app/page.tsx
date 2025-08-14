
import Link from 'next/link';
import Image from 'next/image';
import { Code, Lightbulb, BookOpen, MessageCircle, ExternalLink, Brain, Target, Eye, TrendingUp, Zap, Globe } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import NeuralParticles from '@/components/ui/NeuralParticles';
import { DNAHelix, Minibrain } from '@/components/ui/NeuralCircuits';
import DNA3D from '@/components/ui/DNA3D';
import Brain3DInteractive from '@/components/ui/Brain3DInteractive';
import NeuralBackground from '@/components/ui/NeuralBackground';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedCard from '@/components/ui/ThemedCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema híbrido */}
      <NeuralBackground theme="hybrid" intensity="high" />
      
      {/* Premium metallic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-emerald-500/5"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <NeuralParticles />
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Integrated Header with Photo */}
          <div className="relative">
            {/* DNA Helix - Floating */}
            <DNAHelix className="absolute top-10 right-10 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            
            {/* Minibrain - Floating */}
            <Minibrain className="absolute top-20 left-10 opacity-60 hover:opacity-100 transition-opacity duration-300" />
            
            {/* Premium metallic container */}
            <div className="relative bg-gradient-to-br from-slate-800/20 via-slate-700/10 to-slate-600/20 backdrop-blur-xl border border-slate-500/20 rounded-3xl p-8 lg:pt-1 lg:pb-1 shadow-2xl">
              {/* Metallic border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/10 via-transparent to-acetylcholine-500/10 rounded-3xl"></div>
              
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Integrated Photo with Neural Effects and DNA */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative">
                      {/* Neural circuit background */}
                      <div className="absolute inset-0 scale-150">
                        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-30">
                          <defs>
                            <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                              <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                          </defs>
                          <circle cx="100" cy="100" r="80" fill="url(#neuralGlow)" className="animate-pulse" />
                          <path d="M100 20 Q140 60 100 100 Q60 140 100 180" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.5" />
                          <path d="M20 100 Q60 60 100 100 Q140 140 180 100" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.5" />
                        </svg>
                      </div>
                      
                      {/* Premium photo container */}
                      <div className="relative w-64 h-64 lg:w-96 lg:h-96 flex items-center justify-center mt-5 mb-0 lg:mt-8 lg:mb-0">
                        {/* Metallic frame */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-300 to-slate-500 rounded-full p-1 shadow-2xl">
                          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-1">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/profile.jpg`}
                              alt="Jairo Saul Salas Quiñones"
                              width={320}
                              height={320}
                              className="w-full h-full object-cover rounded-full shadow-inner"
                              priority
                              unoptimized={false}
                              loading="eager"
                            />
                          </div>
                        </div>
                        
                        {/* Floating neural elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-acetylcholine-400 to-acetylcholine-600 rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 -right-4 w-2 h-2 bg-gradient-to-br from-cyber-400 to-cyber-600 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }}></div>
                      </div>
                    </div>
                    
                    {/* 3D DNA Helix - Positioned closer and larger next to photo */}
                    <div className="hidden lg:flex items-center -ml-6 -mr-2 z-10" style={{ marginLeft: '-6rem' }}>
                      <DNA3D size={450} className="transform hover:scale-110 transition-transform duration-500 -ml-8" />
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="text-center lg:text-left space-y-6">
                    <div>
                      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-acetylcholine-400 to-emerald-400 bg-clip-text text-transparent">Ing.</span>{" "}
                        <span className="bg-gradient-to-br from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Jairo Saul Salas Quiñones</span>
                      </h1>
                      
                      <div className="text-lg md:text-xl lg:text-2xl leading-relaxed space-y-2">
                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1">
                          <span className="bg-gradient-to-r from-acetylcholine-400 to-acetylcholine-500 bg-clip-text text-transparent font-semibold">Startup Technical Founder</span>
                          <span className="text-slate-400"></span>
                          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent font-semibold">Business Developer</span>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1">
                          <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent font-medium">FullStack Software Engineer</span>
                          <span className="text-slate-400"></span>
                          <span className="bg-gradient-to-r from-acetylcholine-400 to-emerald-400 bg-clip-text text-transparent font-semibold">Scientific Content Creator</span>
                        </div>
                      </div>
                    </div>

                                              {/* Premium Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <ThemedButton
                              href="/cortex"
                              variant="neural"
                              size="lg"
                              icon={<Brain className="h-5 w-5" />}
                            >
                              Explorar Brain 3D
                            </ThemedButton>
                            <ThemedButton
                              href="/proyectos"
                              variant="genetic"
                              size="lg"
                              icon={<Code className="h-5 w-5" />}
                            >
                              Ver Proyectos
                            </ThemedButton>
                          </div>
                    
                    {/* Premium Social Links */}
                    <div className="flex space-x-4 justify-center lg:justify-start pt-4">
                      {[
                        { href: "https://linkedin.com/in/JairoSaulProDev", color: "blue", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                        { href: "https://github.com/JairoSaulProDev", color: "gray", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                        { href: "https://twitter.com/JairoSaulProDev", color: "sky", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                        { href: "https://youtube.com/@JairoSaulProDev", color: "red", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                        { href: "https://instagram.com/JairoSaulProDev", color: "pink", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                        { 
                          href: "https://tiktok.com/@JairoSaulProDev", 
                          color: "purple", 
                          icon: "M14.6456 14.7977V7.80911C15.9912 8.77501 17.6429 9.34614 19.4245 9.34614V6.67608C18.3945 6.45788 17.4899 5.90063 16.8218 5.1344C15.7454 4.43326 14.9704 3.3095 14.7245 2H12.2098L12.2051 15.7775C12.1495 17.3192 10.8782 18.5591 9.32393 18.5591C8.35884 18.5591 7.50977 18.0808 6.98085 17.3564C6.06219 16.8688 5.4312 15.9076 5.4312 14.7977C5.4312 13.205 6.72567 11.9094 8.31708 11.9094C8.61402 11.9094 8.90168 11.9605 9.17079 12.0441V9.35079C5.75598 9.42509 3 12.2298 3 15.6707C3 17.3331 3.64492 18.847 4.69812 19.98C5.7235 20.6998 6.97621 21.127 8.32172 21.127C11.8061 21.127 14.6456 18.2851 14.6456 14.7977Z" 
                        }
                        
                      ].map((social, index) => (
                        <a 
                          key={`social-${social.href}-${index}`}
                          href={social.href} 
                          target="_blank" 
                          className={`p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-${social.color}-500/20 hover:to-${social.color}-600/20 backdrop-blur-sm border border-slate-600/30 hover:border-${social.color}-500/50 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl`}
                        >
                          <svg className={`w-5 h-5 text-slate-300 group-hover:text-${social.color}-400 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Filosofía - Layout Intercalado */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Brain 3D Interactive - Contenedor izquierdo */}
            <div className="lg:col-span-2 flex justify-center items-center h-80 md:h-96 fade-in">
              <div className="w-full h-full">
                <Brain3DInteractive />
              </div>
            </div>

            {/* Componentes en grid 2x2 a la derecha */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Componente 1: Proyectos y Startups */}
                <ThemedCard
                  variant="neural"
                  icon={<Code className="w-5 h-5" />}
                  title="Proyectos Activos"
                  description="Startups y aplicaciones en desarrollo activo"
                  className="fade-in"
                >
                  <div className="space-y-1 text-cortex-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-acetylcholine-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-acetylcholine-400 font-medium">Buscadis</span> - Marketplace
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-emerald-400 font-medium">DiverEdu</span> - Educación
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-cyber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-cyber-400 font-medium">Uplify</span> - Contenido
                      </p>
                    </div>
                  </div>
                </ThemedCard>

                {/* Componente 2: Filosofía y Sistema de Pensamiento */}
                <ThemedCard
                  variant="genetic"
                  icon={<Zap className="w-5 h-5" />}
                  title="Sistema de Pensamiento"
                  description="Filosofía para la excelencia personal y profesional"
                  className="fade-in"
                >
                  <div className="space-y-1 text-cortex-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-emerald-400 font-medium">ProDev</span> - Excelencia
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-acetylcholine-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-acetylcholine-400 font-medium">GrowHack</span> - Superación
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-cyber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-cyber-400 font-medium">Antifragilidad</span> - Resiliencia
                      </p>
                    </div>
                  </div>
                </ThemedCard>

                {/* Componente 3: Experiencia y Contenido */}
                <ThemedCard
                  variant="robotic"
                  icon={<Brain className="w-5 h-5" />}
                  title="Experiencia 3D"
                  description="Exploración interactiva y contenido científico"
                  className="fade-in"
                >
                  <div className="space-y-1 text-cortex-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-cyber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-cyber-400 font-medium">Brain 3D</span> - Interactivo
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-acetylcholine-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-acetylcholine-400 font-medium">Ideas</span> - Blog
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-emerald-400 font-medium">Conexiones</span> - Redes
                      </p>
                    </div>
                  </div>
                </ThemedCard>

                {/* Componente 4: Impacto Global */}
                <ThemedCard
                  variant="hybrid"
                  icon={<Globe className="w-5 h-5" />}
                  title="Impacto Global"
                  description="Transformación tecnológica y social"
                  className="fade-in"
                >
                  <div className="space-y-1 text-cortex-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-purple-400 font-medium">Innovación</span> - Tecnología
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-pink-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-pink-400 font-medium">Educación</span> - Futuro
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs">
                        <span className="text-indigo-400 font-medium">Comunidad</span> - Crecimiento
                      </p>
                    </div>
                  </div>
                </ThemedCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información Relevante para Visitantes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Qué Puedes Encontrar Aquí?
            </h2>
            <p className="text-base md:text-lg text-cortex-200 max-w-3xl mx-auto">
              Un ecosistema completo de conocimiento, proyectos y filosofía para la excelencia personal y profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Proyectos y Startups */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-acetylcholine-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-acetylcholine-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Proyectos Activos</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">3 Startups</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Marketplace, educación y contenido científico en desarrollo activo
              </p>
              <Link href="/proyectos" className="text-acetylcholine-400 text-sm hover:text-acetylcholine-300 flex items-center">
                Ver proyectos <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>

            {/* Ideas y Filosofía */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Sistema de Pensamiento</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Filosofía</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Manifiestos ProDev y GrowHack para la excelencia profesional y personal
              </p>
              <Link href="/manifiesto" className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center">
                Leer manifiestos <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>

            {/* Brain 3D Experience */}
            <div className="group fade-in bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-cyber-500 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-cyber-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Experiencia 3D</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-cyber-500/20 text-cyber-400 text-xs rounded-full">Interactivo</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Explora el cerebro 3D interactivo y descubre las conexiones neuronales
              </p>
              <Link href="/cortex" className="text-cyber-400 text-sm hover:text-cyber-300 flex items-center">
                Explorar 3D <ExternalLink className="w-3 h-3 ml-1" />
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
              Mis Proyectos y Creaciones
            </h2>
            <p className="text-base md:text-lg text-cortex-200 max-w-3xl mx-auto">
              Un ecosistema de proyectos tecnológicos, educativos y de contenido científico 
              diseñados para transformar la forma en que aprendemos, trabajamos y crecemos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buscadis */}
            <ThemedCard
              variant="neural"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>}
              title="Buscadis"
              description="Marketplace de avisos clasificados que conecta oportunidades en Latinoamérica"
              className="fade-in"
            >
              <div className="flex space-x-2 mb-3">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Activo</span>
                <span className="px-2 py-1 bg-acetylcholine-500/20 text-acetylcholine-400 text-xs rounded-full">Marketplace</span>
              </div>
              <Link href="/proyectos/buscadis" className="text-acetylcholine-400 text-sm hover:text-acetylcholine-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </ThemedCard>

            {/* Uplify */}
            <ThemedCard
              variant="genetic"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>}
              title="Uplify"
              description="Sistema operativo para la superación humana y desarrollo personal"
              className="fade-in"
            >
              <div className="flex space-x-2 mb-3">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Desarrollo</span>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Productividad</span>
              </div>
              <Link href="/proyectos/uplify" className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </ThemedCard>

            {/* DiverEdu */}
            <ThemedCard
              variant="robotic"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>}
              title="DiverEdu"
              description="YouTube de la educación - Plataforma de contenido educativo diverso"
              className="fade-in"
            >
              <div className="flex space-x-2 mb-3">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Planificación</span>
                <span className="px-2 py-1 bg-cyber-500/20 text-cyber-400 text-xs rounded-full">Educación</span>
              </div>
              <Link href="/proyectos/diveredu" className="text-cyber-400 text-sm hover:text-cyber-300 flex items-center">
                Ver proyecto <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </ThemedCard>
          </div>

          <div className="text-center mt-12 fade-in">
            <ThemedButton
              href="/proyectos"
              variant="hybrid"
              size="lg"
              icon={<Code className="h-4 w-4" />}
            >
              Ver todos los proyectos
            </ThemedButton>
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

          <div className="text-center mt-8 fade-in">
            <Link 
              href="/ideas"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-serotonin-500 to-neural-500 text-white rounded-xl font-medium hover:from-serotonin-600 hover:to-neural-600 transition-all duration-300 shadow-lg"
            >
              Explorar todas las ideas
              <Lightbulb className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ecosistema Completo de Proyectos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent mb-4">
              Ecosistema Completo
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Un universo interconectado de proyectos que abarcan desde marketplaces hasta desarrollo personal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Buscadis */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-acetylcholine-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-acetylcholine-500 to-acetylcholine-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Buscadis</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Activo</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Marketplace de avisos clasificados que conecta oportunidades en LATAM
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Marketplace</span>
                <Link href="/proyectos/buscadis" className="text-acetylcholine-400 hover:text-acetylcholine-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Uplify */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Uplify</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">MVP</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Sistema operativo para la superación humana y máximo rendimiento
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Productividad</span>
                <Link href="/proyectos/uplify" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* DiverEdu */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-cyber-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-cyber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">DiverEdu</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">Concepto</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                YouTube de la educación - Contenido educativo diverso y accesible
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Educación</span>
                <Link href="/proyectos/diveredu" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* JourNews */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-neural-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neural-500 to-neural-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">JourNews</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">Visión</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                TikTok de noticias - Información rápida, verificada y engaging
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Media</span>
                <Link href="/proyectos" className="text-neural-400 hover:text-neural-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* PlayBook */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-dopamine-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-dopamine-500 to-dopamine-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">PlayBook</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">Idea</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Spotify de los libros - Audiolibros y contenido literario premium
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Content</span>
                <Link href="/proyectos" className="text-dopamine-400 hover:text-dopamine-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Publicadis */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-serotonin-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-serotonin-500 to-serotonin-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Publicadis</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Beta</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                SaaS de publicidad multiplataforma para maximizar alcance
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Marketing</span>
                <Link href="/proyectos" className="text-serotonin-400 hover:text-serotonin-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Noticiadis */}
            <div className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6 hover:border-genetic-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-genetic-500 to-genetic-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Noticiadis</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">Dev</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Plataforma de noticias locales y contenido informativo
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">News</span>
                <Link href="/proyectos" className="text-genetic-400 hover:text-genetic-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Future Project Slot */}
            <div className="group bg-gradient-to-br from-slate-800/10 to-slate-700/5 backdrop-blur-xl border border-slate-500/10 border-dashed rounded-2xl p-6 hover:border-slate-400/30 transition-all duration-300 opacity-50 hover:opacity-70">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-400">Próximo Proyecto</h3>
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                La próxima solución disruptiva está en construcción...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Innovación</span>
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofías y Mentalidades Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent mb-6">
              Filosofías que Guían mi Existencia
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Principios destilados desde la trinchera de la construcción y la reconstrucción personal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Antifragilidad */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-500/30 rounded-2xl p-8 shadow-2xl fade-in">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-acetylcholine-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
                    Antifragilidad
                  </h3>
                  <p className="text-slate-400 text-sm">Nassim Taleb aplicado a la vida diaria</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  No busco solo resistir los golpes, los uso como combustible. Cada crisis es información, 
                  cada fracaso es educación acelerada. Los obstáculos no están en el camino, son el camino.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-acetylcholine-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-400 text-sm">Convertir volatilidad en oportunidad</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-400 text-sm">Fracasar rápido para aprender rápido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estoicismo Práctico */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-500/30 rounded-2xl p-8 shadow-2xl fade-in">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
                    Estoicismo Práctico
                  </h3>
                  <p className="text-slate-400 text-sm">Marco Aurelio para emprendedores</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Controlo lo que puedo controlar, acepto lo que no puedo, y tengo la sabiduría 
                  para distinguir entre ambos. Mi energía va solo hacia lo que está bajo mi influencia.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-400 text-sm">Memento mori: la vida es finita, actúa ahora</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-400 text-sm">Amor fati: amar el proceso, no solo el resultado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final Premium */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900/50 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-3xl p-12 shadow-2xl fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent mb-6">
              ¿Listo para la Revolución Personal?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Si aspiras a la excelencia y rechazas la mediocridad, si buscas construir algo que importe 
              o reconstruir tu propia vida desde cero, unamos fuerzas. El futuro se construye con aliados, 
              no en soledad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contacto"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-acetylcholine-500 via-emerald-500 to-cyber-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MessageCircle className="mr-3 h-6 w-6 relative z-10" />
                <span className="relative z-10">Establecer Sinapsis</span>
              </Link>
              
              <Link 
                href="/manifiesto"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl font-semibold border border-slate-500/50 hover:border-slate-400/70 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="mr-3 h-6 w-6" />
                <span>Leer Manifiestos</span>
              </Link>
            </div>
            
            {/* Stats finales */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-600/30">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-acetylcholine-400 to-emerald-400 bg-clip-text text-transparent">+7</div>
                <div className="text-sm text-slate-400 mt-1">Proyectos Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyber-400 bg-clip-text text-transparent">+100</div>
                <div className="text-sm text-slate-400 mt-1">Días de Reconstrucción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyber-400 to-neural-400 bg-clip-text text-transparent">∞</div>
                <div className="text-sm text-slate-400 mt-1">Potencial por Desbloquear</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
