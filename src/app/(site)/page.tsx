
import Link from 'next/link';
import { Code, Lightbulb, BookOpen, MessageCircle, ExternalLink, Brain, Zap, Globe } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import NeuralParticles from '@/components/ui/NeuralParticles';
import { DNAHelix, Minibrain } from '@/components/ui/NeuralCircuits';
import DNA3D from '@/components/ui/DNA3D';
import BrainModelSelector from '@/components/ui/BrainModelSelector';
import Rooms3DPreview from '@/components/rooms3d/Rooms3DPreview';
import ProfileImage from '@/components/ui/ProfileImage';
import NeuralBackground from '@/components/ui/NeuralBackground';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedCard from '@/components/ui/ThemedCard';
import { FeaturedProjectsMiniList, FeaturedProjectsSection } from '@/components/projects/FeaturedProjects';
import { getShowcaseProjects } from '@/lib/projects';

export default function HomePage() {
  const showcaseCount = getShowcaseProjects().length;
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
                            {/* Use ProfileImage component with fallback */}
                            <ProfileImage
                              alt="Jairo Saul Salas Quiñones"
                              className="w-full h-full object-cover rounded-full shadow-inner"
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
                              href="/projects"
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
            {/* Componentes en grid 2x2 a la izquierda */}
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
                  <FeaturedProjectsMiniList />
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

            {/* Brain Model Selector - Contenedor derecho */}
            <div className="lg:col-span-2 flex justify-center items-center h-80 md:h-96 fade-in">
              <div className="w-full h-full">
                <BrainModelSelector />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Rooms 3D - Intercalado */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 fade-in">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">4 Workspaces, 4 Roles</h2>
            <p className="text-base md:text-lg text-cortex-200 max-w-3xl mx-auto">
              Un sistema completo: Founder, Coder, Scientist y Human. Cada sala cuenta una parte de la historia.
            </p>
          </div>

          {([
            {
              id: 'founder',
              title: 'Founder Suite',
              subtitle: 'negocio • estrategia • liderazgo',
              bullets: ['Tablero GTM + métricas', 'Decisiones y roadmap', 'Visión ejecutiva'],
            },
            {
              id: 'coder',
              title: 'Coder Bay',
              subtitle: 'builder • hacker • engineer',
              bullets: ['Nexus multi‑pantalla', 'Server nexus', 'Prototipos y pipelines'],
            },
            {
              id: 'research',
              title: 'Research Lab',
              subtitle: 'ciencia • experimentos • R&D',
              bullets: ['Laboratorio funcional', 'Notas y trazabilidad', 'Instrumentos + análisis'],
            },
            {
              id: 'human',
              title: 'Human Studio',
              subtitle: 'estudio • entrenamiento • calma',
              bullets: ['Lectura y notas', 'Movilidad + respiración', 'Sistema de crecimiento'],
            },
          ] as const).map((s, idx) => {
            const isReverse = idx % 2 === 1;
            const hudPortalId = `rooms3d-hud-${s.id}-${idx}`;
            return (
              <div key={s.id} className="mb-10">
                <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 items-center ${isReverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="lg:col-span-2 flex justify-center items-center h-80 md:h-96 fade-in">
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-500/20 bg-slate-900/10">
                      <Rooms3DPreview sceneId={s.id} hudPortalTargetId={hudPortalId} hudVariant="side" />
                    </div>
                  </div>

                  <div className="lg:col-span-2 fade-in">
                    <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-8 shadow-xl">
                      <div className="mb-4">
                        <h3 className="font-serif text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                          {s.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{s.subtitle}</p>
                      </div>

                      <ul className="space-y-2 text-slate-300">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400/80" />
                            <span className="text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* HUD del viewer (controles) renderizado aquí para no tapar el 3D */}
                      <div id={hudPortalId} className="mt-6" />

                      <div className="pt-5 flex flex-wrap gap-3">
                        <ThemedButton href={`/workspace-3d?scene=${s.id}`} variant="neural" size="sm" icon={<Brain className="h-4 w-4" />}>
                          Pantalla completa
                        </ThemedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">{showcaseCount} en vitrina</span>
                  </div>
                </div>
              </div>
              <p className="text-cortex-300 text-sm mb-4">
                Marketplace, educación y contenido científico en desarrollo activo
              </p>
              <Link href="/projects" className="text-acetylcholine-400 text-sm hover:text-acetylcholine-300 flex items-center">
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

      <FeaturedProjectsSection />

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
