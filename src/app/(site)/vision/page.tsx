'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Eye, Globe, Rocket, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import NeuralBackground from '@/components/ui/NeuralBackground';

const visionSections = [
  {
    icon: Globe,
    title: "Transformar Latinoamérica",
    description: "Convertir a Latinoamérica en el hub tecnológico del mundo. Crear ecosistemas que generen oportunidades para millones de personas.",
    goals: [
      "10 startups exitosas en 10 años",
      "1 millón de empleos creados",
      "Presencia en 20 países",
      "Ecosistema de innovación autosostenible"
    ]
  },
  {
    icon: Rocket,
    title: "Innovación Disruptiva",
    description: "Construir tecnologías que resuelvan problemas fundamentales de la humanidad. No solo mejorar, sino reinventar industrias completas.",
    goals: [
      "IA que democratice la educación",
      "Sistemas de salud predictivos",
      "Energía renovable accesible",
      "Comunicación universal instantánea"
    ]
  },
  {
    icon: Users,
    title: "Empoderar Personas",
    description: "Crear herramientas que permitan a cualquier persona alcanzar su máximo potencial. Democratizar el acceso a oportunidades.",
    goals: [
      "Plataformas de aprendizaje personalizado",
      "Herramientas de productividad avanzadas",
      "Redes de mentores globales",
      "Sistemas de financiamiento inclusivo"
    ]
  },
  {
    icon: Target,
    title: "Impacto Sistémico",
    description: "No solo crear productos, sino transformar sistemas completos. Cambiar la forma en que funcionan las sociedades.",
    goals: [
      "Revolucionar la educación tradicional",
      "Transformar la industria publicitaria",
      "Reinventar los medios de comunicación",
      "Crear nuevos modelos de negocio"
    ]
  }
];

const futureProjects = [
  {
    name: "DiverEdu",
    description: "YouTube de la educación - Plataforma de aprendizaje personalizado con IA",
    status: "Planificación",
    timeline: "2024-2025"
  },
  {
    name: "JourNews",
    description: "TikTok de noticias - Contenido informativo viral y entretenido",
    status: "Planificación",
    timeline: "2024-2025"
  },
  {
    name: "PlayBook",
    description: "Spotify de los libros - Audiolibros y contenido educativo",
    status: "Planificación",
    timeline: "2025-2026"
  },
  {
    name: "Uplify",
    description: "ClickUp del desarrollo personal - Sistema integral de productividad",
    status: "Planificación",
    timeline: "2025-2026"
  },
  {
    name: "Conectadis",
    description: "Red social del futuro - Conexiones auténticas y significativas",
    status: "Planificación",
    timeline: "2026-2027"
  }
];

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema híbrido */}
      <NeuralBackground theme="hybrid" intensity="high" />
      
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-glutamate-500 mb-6">
              Mi Visión del Futuro
            </h1>
            <p className="text-xl text-cortex-300 max-w-3xl mx-auto leading-relaxed">
              No solo imagino el futuro, lo construyo. Cada línea de código, cada decisión estratégica, 
              cada interacción está diseñada para crear un mundo mejor.
            </p>
          </div>

          {/* Vision Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {visionSections.map((section, index) => (
              <div
                key={section.title}
                className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-8 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-acetylcholine-500/20 rounded-lg mr-4">
                    <section.icon className="h-8 w-8 text-acetylcholine-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-glutamate-500">
                    {section.title}
                  </h2>
                </div>
                
                <p className="text-cortex-300 mb-6 leading-relaxed">
                  {section.description}
                </p>

                <div className="space-y-3">
                  <h3 className="font-semibold text-acetylcholine-400 mb-3">Objetivos Clave:</h3>
                  {section.goals.map((goal, goalIndex) => (
                    <div key={`goal-${section.title}-${goalIndex}`} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-acetylcholine-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-cortex-300 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Future Projects */}
          <section className="mb-16 fade-in">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-glutamate-500 mb-4">
                Próximos Proyectos
              </h2>
              <p className="text-lg text-cortex-300 max-w-2xl mx-auto">
                El futuro se construye proyecto a proyecto. Estos son los próximos sistemas que transformarán industrias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureProjects.map((project, index) => (
                <div
                  key={project.name}
                  className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 hover:border-acetylcholine-500/50 transition-all duration-300 fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-semibold text-glutamate-500">
                      {project.name}
                    </h3>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-cortex-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-cortex-400">
                    <Zap className="h-3 w-3 mr-1" />
                    {project.timeline}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center fade-in">
            <div className="bg-gradient-to-r from-acetylcholine-500/10 to-dopamine-500/10 border border-acetylcholine-500/20 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-glutamate-500 mb-4">
                ¿Quieres Ser Parte del Futuro?
              </h2>
              <p className="text-cortex-300 mb-6 max-w-2xl mx-auto">
                El futuro no se construye solo. Necesitamos mentes brillantes, corazones apasionados 
                y manos dispuestas a trabajar. ¿Tienes lo que se necesita?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center px-6 py-3 bg-acetylcholine-500 text-white rounded-lg font-medium hover:bg-acetylcholine-600 transition-colors"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Únete al Equipo
                </Link>
                
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-cortex-700 text-white rounded-lg font-medium hover:bg-cortex-600 transition-colors"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Proyectos Actuales
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
