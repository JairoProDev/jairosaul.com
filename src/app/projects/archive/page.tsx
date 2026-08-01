import { Navigation } from '@/components/layout/Navigation';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import NeuralBackground from '@/components/ui/NeuralBackground';
import { getArchiveProjects } from '@/lib/projects';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Archive | JairoSaul',
  description:
    'Archivo completo de proyectos legacy, experimentos y WIP fuera de la vitrina principal.',
  openGraph: {
    title: 'Projects Archive | JairoSaul',
    description: 'Legacy, spikes y experimentos de Jairo Saul.',
    url: 'https://jairosaul.com/projects/archive',
  },
  alternates: {
    canonical: 'https://jairosaul.com/projects/archive',
  },
};

export default function ProjectsArchivePage() {
  const projects = getArchiveProjects();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <NeuralBackground theme="hybrid" intensity="low" />
      <Navigation />

      <div className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 fade-in">
            <Link
              href="/projects"
              className="inline-flex items-center text-acetylcholine-500 transition-colors hover:text-acetylcholine-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la vitrina
            </Link>
          </div>

          <header className="mb-10 fade-in">
            <h1 className="font-serif text-4xl font-bold text-glutamate-500 md:text-5xl">
              Archivo de Projects
            </h1>
            <p className="mt-4 max-w-2xl text-cortex-300">
              Legacy, spikes y WIP. La cobertura completa sin diluir la vitrina principal.
            </p>
          </header>

          <ProjectsExplorer
            projects={projects}
            dense
            emptyLabel="No hay entradas de archivo con estos filtros."
          />
        </div>
      </div>
    </div>
  );
}
