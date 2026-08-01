import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import NeuralBackground from '@/components/ui/NeuralBackground';
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from '@/lib/projects';
import {
  getCategoryLabel,
  getProjectCover,
  getStatusColor,
  getStatusLabel,
} from '@/lib/projects-meta';
import { formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Share2,
  Tag,
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Proyecto no encontrado | JairoSaul' };
  }

  const cover = getProjectCover(project);
  return {
    title: `${project.title} | Projects | JairoSaul`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://jairosaul.com/projects/${slug}`,
      images: [cover],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [cover],
    },
    alternates: {
      canonical: `https://jairosaul.com/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(slug, project.tags, 3);
  const cover = getProjectCover(project);
  const shareUrl = `https://jairosaul.com/projects/${slug}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <NeuralBackground theme="robotic" intensity="low" />
      <Navigation />

      <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 fade-in">
            <Link
              href={project.visibility === 'archive' ? '/projects/archive' : '/projects'}
              className="inline-flex items-center text-acetylcholine-500 transition-colors hover:text-acetylcholine-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Projects
            </Link>
          </div>

          <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-2xl border border-cortex-700 fade-in">
            <Image
              src={cover}
              alt={`Cover de ${project.title}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cortex-900 via-cortex-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className={`rounded border px-2 py-0.5 text-xs ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
                <span className="rounded border border-cortex-600 bg-cortex-900/70 px-2 py-0.5 text-xs text-cortex-200">
                  {getCategoryLabel(project.category)}
                </span>
                <span className="rounded border border-cortex-600 bg-cortex-900/70 px-2 py-0.5 text-xs text-cortex-200">
                  {project.year}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-base text-cortex-200 md:text-lg">{project.description}</p>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-3 fade-in">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-acetylcholine-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acetylcholine-600"
              >
                <ExternalLink className="h-4 w-4" />
                Ver en vivo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cortex-700 px-5 py-2.5 text-sm font-medium text-cortex-200 transition-colors hover:bg-cortex-600"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-cortex-600 px-5 py-2.5 text-sm font-medium text-cortex-300 transition-colors hover:border-acetylcholine-500"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </a>
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-3 fade-in">
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-5">
              <p className="text-xs uppercase tracking-wide text-cortex-400">Rol</p>
              <p className="mt-2 text-glutamate-500">{project.role}</p>
            </div>
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-5">
              <p className="text-xs uppercase tracking-wide text-cortex-400">Fecha</p>
              <p className="mt-2 flex items-center gap-2 text-glutamate-500">
                <Calendar className="h-4 w-4 text-cortex-400" />
                {formatDate(project.date)}
              </p>
            </div>
            <div className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-5">
              <p className="text-xs uppercase tracking-wide text-cortex-400">Stack</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded bg-cortex-700 px-2 py-0.5 text-xs text-acetylcholine-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {(project.problem || project.solution) && (
            <div className="mb-12 grid gap-6 md:grid-cols-2 fade-in">
              {project.problem && (
                <div className="rounded-xl border border-cortex-700 bg-cortex-800/40 p-6">
                  <h2 className="mb-3 font-serif text-xl text-glutamate-500">Problema</h2>
                  <p className="leading-relaxed text-cortex-300">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-xl border border-cortex-700 bg-cortex-800/40 p-6">
                  <h2 className="mb-3 font-serif text-xl text-glutamate-500">Solución</h2>
                  <p className="leading-relaxed text-cortex-300">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {project.results.length > 0 && (
            <div className="mb-12 rounded-xl border border-cortex-700 bg-cortex-800/40 p-6 fade-in">
              <h2 className="mb-4 font-serif text-xl text-glutamate-500">Resultados</h2>
              <ul className="space-y-2">
                {project.results.map((result) => (
                  <li key={result} className="flex gap-2 text-cortex-300">
                    <span className="text-acetylcholine-400">▸</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <article className="mb-12 fade-in">
            <div className="space-y-4 whitespace-pre-wrap leading-relaxed text-cortex-300 [&_strong]:text-glutamate-500">
              {project.content
                .replace(/^# .+\n+/, '')
                .split(/\n\n+/)
                .map((block, i) => {
                  if (block.startsWith('## ')) {
                    return (
                      <h2 key={i} className="pt-4 font-serif text-2xl font-bold text-glutamate-500">
                        {block.replace(/^## /, '')}
                      </h2>
                    );
                  }
                  if (block.startsWith('- ')) {
                    return (
                      <ul key={i} className="list-disc space-y-1 pl-5">
                        {block.split('\n').map((line, j) => (
                          <li key={j}>{line.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{block}</p>;
                })}
            </div>
          </article>

          {project.tags.length > 0 && (
            <div className="mb-12 flex flex-wrap items-center gap-2 fade-in">
              <Tag className="h-4 w-4 text-cortex-400" />
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cortex-700 bg-cortex-800 px-3 py-1 text-sm text-cortex-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <section className="border-t border-cortex-700 pt-12 fade-in">
              <h2 className="mb-6 font-serif text-2xl font-bold text-glutamate-500">
                Proyectos relacionados
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-5 transition-colors hover:border-acetylcholine-500"
                  >
                    <p className="text-xs text-cortex-400">{getCategoryLabel(item.category)}</p>
                    <h3 className="mt-2 font-serif text-lg text-glutamate-500">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-cortex-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
