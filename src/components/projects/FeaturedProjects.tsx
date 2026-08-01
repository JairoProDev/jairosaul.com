import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code, ExternalLink } from 'lucide-react';
import {
  getFeaturedProjects,
  getShowcaseProjects,
} from '@/lib/projects';
import {
  getCategoryLabel,
  getProjectCover,
  getStatusColor,
  getStatusLabel,
} from '@/lib/projects-meta';
import ThemedButton from '@/components/ui/ThemedButton';

export function FeaturedProjectsSection() {
  const featured = getFeaturedProjects(6);
  const total = getShowcaseProjects().length;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center fade-in">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-acetylcholine-400">
            Portfolio
          </p>
          <h2 className="mb-4 font-serif text-2xl font-bold text-white md:text-4xl">
            Projects
          </h2>
          <p className="mx-auto max-w-2xl text-base text-cortex-200 md:text-lg">
            Una muestra de las creaciones principales. {total} piezas en la vitrina, más el archivo
            completo de legacy y experimentos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <article
              key={project.slug}
              className="group fade-in overflow-hidden rounded-2xl border border-cortex-700 bg-cortex-800/40 transition-all duration-300 hover:border-acetylcholine-500"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-cortex-900">
                  <Image
                    src={getProjectCover(project)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cortex-900/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 text-xs backdrop-blur ${getStatusColor(project.status)}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-1 text-xs uppercase tracking-wide text-cortex-400">
                    {getCategoryLabel(project.category)}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white transition-colors group-hover:text-acetylcholine-400">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-cortex-300">{project.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm text-acetylcholine-400">
                    Ver case study
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row fade-in">
          <ThemedButton href="/projects" variant="hybrid" size="lg" icon={<Code className="h-4 w-4" />}>
            Ver todos los projects
          </ThemedButton>
          <Link
            href="/projects/archive"
            className="inline-flex items-center gap-2 text-sm text-cortex-400 transition-colors hover:text-cortex-200"
          >
            Ir al archivo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjectsMiniList() {
  const featured = getFeaturedProjects(3);
  return (
    <div className="space-y-1 text-cortex-200">
      {featured.map((project) => (
        <div key={project.slug} className="flex items-start space-x-2">
          <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-acetylcholine-400" />
          <p className="text-xs">
            <Link
              href={`/projects/${project.slug}`}
              className="font-medium text-acetylcholine-400 hover:text-acetylcholine-300"
            >
              {project.title}
            </Link>
            {' — '}
            {getCategoryLabel(project.category)}
          </p>
        </div>
      ))}
    </div>
  );
}
