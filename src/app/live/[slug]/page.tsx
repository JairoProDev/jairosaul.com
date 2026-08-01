import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/projects';
import { resolveLiveTarget } from '@/lib/live';

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
    description: `Abrir experiencia live de ${project.title}`,
    alternates: { canonical: `https://jairosaul.com/live/${slug}` },
  };
}

/**
 * Smart redirect: cada /live/{slug} lleva al producto real, Play Store o demo local.
 * Sin iframe — evita "refused to connect" por X-Frame-Options.
 */
export default async function LiveProjectPage({ params }: LivePageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  redirect(resolveLiveTarget(project));
}
