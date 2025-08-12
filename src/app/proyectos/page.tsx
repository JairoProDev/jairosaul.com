import { Navigation } from '@/components/layout/Navigation';
import { getAllProjects } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Code, ExternalLink, Calendar, Users, TrendingUp } from 'lucide-react';
import NeuralBackground from '@/components/ui/NeuralBackground';

export default function ProyectosPage() {
  const projects = getAllProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'in-development':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-cortex-700 text-cortex-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'in-development':
        return 'En Desarrollo';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema robótico */}
      <NeuralBackground theme="robotic" intensity="medium" />
      
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-glutamate-500 mb-6">
              Mis Proyectos
            </h1>
            <p className="text-xl text-cortex-300 max-w-3xl mx-auto leading-relaxed">
              Engramas de construcción - Sistemas tecnológicos que solucionan problemas fundamentales 
              en Latinoamérica. Cada proyecto es una historia de innovación y impacto.
            </p>
          </div>

          {/* Proyectos Destacados */}
          <section className="mb-16 fade-in">
            <h2 className="font-serif text-3xl font-bold text-glutamate-500 mb-8 text-center">
              Proyectos Destacados
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map((project, index) => (
                  <article
                    key={project.slug}
                    className="group fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/proyectos/${project.slug}`}>
                      <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8 h-full hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center">
                            <Code className="h-8 w-8 text-acetylcholine-500 mr-3" />
                            <div>
                              <h3 className="font-serif text-2xl font-semibold text-glutamate-500 group-hover:text-acetylcholine-400 transition-colors">
                                {project.title}
                              </h3>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                                {getStatusText(project.status)}
                              </span>
                            </div>
                          </div>
                          <ExternalLink className="h-5 w-5 text-cortex-400 group-hover:text-acetylcholine-500 transition-colors" />
                        </div>

                        {/* Descripción */}
                        <p className="text-cortex-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tecnologías */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="bg-cortex-700 text-acetylcholine-400 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="bg-cortex-700 text-cortex-400 px-2 py-1 rounded text-xs">
                              +{project.technologies.length - 4} más
                            </span>
                          )}
                        </div>

                        {/* Métricas */}
                        {project.metrics && (
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {project.metrics.users && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-acetylcholine-500 mr-2" />
                                <span className="text-sm text-cortex-300">
                                  {project.metrics.users.toLocaleString()} usuarios
                                </span>
                              </div>
                            )}
                            {project.metrics.revenue && (
                              <div className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-acetylcholine-500 mr-2" />
                                <span className="text-sm text-cortex-300">
                                  ${project.metrics.revenue.toLocaleString()}/año
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Resultados */}
                        <div className="space-y-2">
                          {project.results.slice(0, 3).map((result, resultIndex) => (
                            <div key={`result-${project.slug}-${resultIndex}`} className="flex items-center">
                              <div className="w-2 h-2 bg-acetylcholine-500 rounded-full mr-3" />
                              <span className="text-sm text-cortex-300">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
            </div>
          </section>

          {/* Todos los Proyectos */}
          <section className="fade-in">
            <h2 className="font-serif text-3xl font-bold text-glutamate-500 mb-8 text-center">
              Todos los Proyectos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  className="group fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link href={`/proyectos/${project.slug}`}>
                    <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 h-full hover:border-acetylcholine-500 transition-all duration-300 card-hover">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Code className="h-6 w-6 text-acetylcholine-500 mr-2" />
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-cortex-400 group-hover:text-acetylcholine-500 transition-colors" />
                      </div>

                      {/* Título */}
                      <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-3 group-hover:text-acetylcholine-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-cortex-300 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="bg-cortex-700 text-acetylcholine-400 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-cortex-700 text-cortex-400 px-2 py-1 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Metadatos */}
                      <div className="flex items-center justify-between text-sm text-cortex-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(project.date)}
                        </div>
                        {project.featured && (
                          <span className="bg-acetylcholine-500/20 text-acetylcholine-400 px-2 py-1 rounded text-xs">
                            Destacado
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 pt-16 border-t border-cortex-700 text-center fade-in">
            <h2 className="font-serif text-2xl font-bold text-glutamate-500 mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-cortex-300 mb-8">
              Trabajemos juntos para construir algo extraordinario.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-dopamine-500 text-white rounded-lg font-medium hover:bg-dopamine-600 hover:scale-105 transition-all duration-200"
            >
              Iniciar conversación
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
