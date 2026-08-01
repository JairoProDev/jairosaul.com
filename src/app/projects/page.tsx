import { Navigation } from '@/components/layout/Navigation';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import NeuralBackground from '@/components/ui/NeuralBackground';
import { getShowcaseProjects } from '@/lib/projects';
import Link from 'next/link';
import { ArrowRight, Archive } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | JairoSaul',
  description:
    'Vitrina de creaciones: startups, productos, clientes, mobile y tools. Portfolio navegable con búsqueda y filtros.',
  openGraph: {
    title: 'Projects | JairoSaul',
    description: 'Explora todas las creaciones destacadas de Jairo Saul.',
    url: 'https://jairosaul.com/projects',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jairosaul.com/projects',
  },
};

export default function ProjectsPage() {
  const projects = getShowcaseProjects();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <NeuralBackground theme="robotic" intensity="medium" />
      <Navigation />

      <div className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 text-center fade-in">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-acetylcholine-400">
              JairoSaul · Portfolio
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-glutamate-500 md:text-6xl">
              Projects
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-cortex-300">
              Startups, productos, clientes y experimentos. Cada pieza es una prueba de ejecución —
              navegable, filtrable y compartible.
            </p>
          </header>

          <ProjectsExplorer projects={projects} />

          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-xl border border-cortex-700 bg-cortex-800/50 p-8 text-center sm:flex-row sm:text-left fade-in">
            <div className="flex items-start gap-3">
              <Archive className="mt-1 h-6 w-6 text-cortex-400" />
              <div>
                <h2 className="font-serif text-xl text-glutamate-500">Archivo completo</h2>
                <p className="mt-1 text-sm text-cortex-400">
                  Legacy, spikes y WIP que no entran en la vitrina principal.
                </p>
              </div>
            </div>
            <Link
              href="/projects/archive"
              className="inline-flex items-center gap-2 rounded-lg bg-cortex-700 px-5 py-2.5 text-sm font-medium text-cortex-200 transition-colors hover:bg-cortex-600"
            >
              Ver archivo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
