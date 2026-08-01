import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from '@/lib/projects';
import {
  getDemoPath,
  hasInteractiveStaticDemo,
  resolveExternalUrl,
} from '@/lib/live';
import { getCategoryLabel, getStatusLabel } from '@/lib/projects-meta';
import { ArrowLeft, ExternalLink, Maximize2 } from 'lucide-react';

interface LivePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Live | JairoSaul' };
  return {
    title: `${project.title} · Live | JairoSaul`,
    description: `Experiencia live de ${project.title} en jairosaul.com`,
    alternates: { canonical: `https://jairosaul.com/live/${slug}` },
    openGraph: {
      title: `${project.title} · Live`,
      description: project.description,
      url: `https://jairosaul.com/live/${slug}`,
    },
  };
}

export default async function LiveProjectPage({ params }: LivePageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const external = resolveExternalUrl(project);
  const demoSrc = getDemoPath(slug);
  const interactive = hasInteractiveStaticDemo(slug);

  return (
    <div className="flex min-h-screen flex-col bg-[#020617] text-cortex-100">
      <header className="z-10 flex flex-wrap items-center gap-3 border-b border-cortex-800 bg-cortex-900/95 px-4 py-3 backdrop-blur">
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-acetylcholine-400 hover:text-acetylcholine-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Case study
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-serif text-lg text-white">{project.title}</h1>
          <p className="truncate text-xs text-cortex-400">
            {getCategoryLabel(project.category)} · {getStatusLabel(project.status)} ·{' '}
            {interactive ? 'demo interactiva' : 'live en jairosaul.com'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {external && (
            <a
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-acetylcholine-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-acetylcholine-600"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Producto online
            </a>
          )}
          <a
            href={demoSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-cortex-600 px-3 py-1.5 text-sm text-cortex-200 hover:border-acetylcholine-500"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Pantalla completa
          </a>
        </div>
      </header>

      <div className="w-full flex-1 bg-black" style={{ height: 'calc(100vh - 57px)' }}>
        <iframe
          title={`Live · ${project.title}`}
          src={demoSrc}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
