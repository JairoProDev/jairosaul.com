'use client';

import { Navigation } from '@/components/layout/Navigation';
import { TrendingUp, Target, Brain, Clock, Users, Zap, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const uplifyProject = {
  name: "Uplify",
  tagline: "Sistema Operativo para la Superación Humana",
  description: "La plataforma definitiva para el desarrollo personal basada en ciencia, métricas y sistemas probados. ClickUp del crecimiento personal.",
  status: "En Desarrollo",
  phase: "MVP - Q2 2024",
  category: "Productividad & Desarrollo Personal",
  problem: {
    title: "El Problema que Resolvemos",
    content: "El desarrollo personal está fragmentado en apps sin conexión, gurús sin método y teorías sin medición. La gente quiere cambiar pero no tiene un sistema integral.",
    stats: [
      { number: "92%", label: "De las resoluciones fallan en 3 meses" },
      { number: "67%", label: "No trackea su progreso personal" },
      { number: "80%", label: "Usa 5+ apps sin integración" }
    ]
  },
  solution: {
    title: "Nuestra Solución",
    content: "Una plataforma unificada que combina tracking de hábitos, gestión de objetivos, optimización de salud y aprendizaje continuo en un sistema cohesivo.",
    features: [
      {
        title: "Arquitectura de Vida",
        description: "Diseña tu día ideal con bloques de tiempo optimizados",
        icon: <Clock className="h-6 w-6" />,
        color: "acetylcholine"
      },
      {
        title: "OKRs Personales",
        description: "Sistema de objetivos con métricas claras y tracking automatizado",
        icon: <Target className="h-6 w-6" />,
        color: "emerald"
      },
      {
        title: "Stack de Hábitos",
        description: "Construye rutinas compuestas con seguimiento científico",
        icon: <TrendingUp className="h-6 w-6" />,
        color: "cyber"
      },
      {
        title: "Optimización Cognitiva",
        description: "Entrena tu mente con ejercicios basados en neurociencia",
        icon: <Brain className="h-6 w-6" />,
        color: "neural"
      },
      {
        title: "Comunidad de Alto Rendimiento",
        description: "Conecta con otros que aspiran a la excelencia",
        icon: <Users className="h-6 w-6" />,
        color: "dopamine"
      },
      {
        title: "Analytics de Vida",
        description: "Dashboard completo de tu progreso en todas las áreas",
        icon: <Zap className="h-6 w-6" />,
        color: "serotonin"
      }
    ]
  },
  vision: {
    title: "Visión a Largo Plazo",
    content: "Convertirnos en el sistema operativo estándar para cualquier persona que quiera maximizar su potencial humano.",
    milestones: [
      "Q2 2024: MVP con funciones básicas de tracking",
      "Q4 2024: Integración con wearables y apps de salud",
      "Q2 2025: AI personal coach basado en tus datos",
      "Q4 2025: Marketplace de programas de desarrollo",
      "2026+: Expansión a empresas y equipos"
    ]
  },
  techStack: [
    "Next.js 14 con App Router",
    "TypeScript para type safety",
    "Supabase como backend",
    "Tailwind CSS para UI",
    "Framer Motion para animaciones",
    "Recharts para visualización de datos",
    "PWA para experiencia mobile-first"
  ]
};

export default function UplifyProjectPage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">
                  {uplifyProject.name}
                </h1>
                <p className="text-emerald-400 font-medium">{uplifyProject.tagline}</p>
              </div>
            </div>
            
            <p className="text-xl text-cortex-200 max-w-3xl mx-auto leading-relaxed mb-8">
              {uplifyProject.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                {uplifyProject.status}
              </span>
              <span className="text-cortex-400">{uplifyProject.phase}</span>
              <span className="text-cortex-400">{uplifyProject.category}</span>
            </div>
          </div>

          {/* Problem Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-8 fade-in">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">
                {uplifyProject.problem.title}
              </h2>
              <p className="text-cortex-300 leading-relaxed mb-6">
                {uplifyProject.problem.content}
              </p>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-synaptic-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">El Dolor Real</h3>
                  <p className="text-cortex-400 text-sm">
                    Las personas saben qué quieren cambiar, pero no tienen las herramientas 
                    ni el sistema para hacerlo de manera consistente y medible.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 fade-in">
              {uplifyProject.problem.stats.map((stat, index) => (
                <div key={index} className="bg-synaptic-500/10 border border-synaptic-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-synaptic-400">{stat.number}</div>
                  <div className="text-xs text-cortex-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Features */}
          <div className="mb-16">
            <div className="text-center mb-12 fade-in">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                {uplifyProject.solution.title}
              </h2>
              <p className="text-lg text-cortex-300 max-w-3xl mx-auto">
                {uplifyProject.solution.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uplifyProject.solution.features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      feature.color === 'acetylcholine' ? 'bg-acetylcholine-500' :
                      feature.color === 'emerald' ? 'bg-emerald-500' :
                      feature.color === 'cyber' ? 'bg-cyber-500' :
                      feature.color === 'neural' ? 'bg-neural-500' :
                      feature.color === 'dopamine' ? 'bg-dopamine-500' :
                      'bg-serotonin-500'
                    }`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-cortex-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Vision */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-8 fade-in">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">
                {uplifyProject.vision.title}
              </h2>
              <p className="text-cortex-300 leading-relaxed mb-6">
                {uplifyProject.vision.content}
              </p>
              <div className="space-y-3">
                <h3 className="font-medium text-emerald-400 mb-3">Roadmap:</h3>
                {uplifyProject.vision.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-cortex-300 text-sm">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-8 fade-in">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">
                Stack Tecnológico
              </h2>
              <p className="text-cortex-300 mb-6">
                Construido con tecnologías modernas para escalabilidad y performance.
              </p>
              <div className="space-y-3">
                {uplifyProject.techStack.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-cortex-300 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyber-500/10 border border-emerald-500/30 rounded-xl p-8 text-center fade-in">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              ¿Quieres ser parte de la reconstrucción?
            </h3>
            <p className="text-cortex-300 mb-6 max-w-2xl mx-auto">
              Uplify está en desarrollo activo. Si te interesa ser early user, 
              tener acceso al beta o simplemente seguir el progreso, conectemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacto"
                className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                Ser Early User
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/ideas/habitos-alto-rendimiento"
                className="inline-flex items-center px-6 py-3 bg-cortex-700 text-white rounded-lg font-medium hover:bg-cortex-600 transition-colors"
              >
                Ver Filosofía Detrás
                <Brain className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
