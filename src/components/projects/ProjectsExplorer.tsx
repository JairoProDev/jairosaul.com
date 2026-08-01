'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Search } from 'lucide-react';
import type { Project, ProjectCategory, ProjectStatus } from '@/types/content';
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  getCategoryLabel,
  getProjectCover,
  getStatusColor,
  getStatusLabel,
} from '@/lib/projects-meta';

interface ProjectsExplorerProps {
  projects: Project[];
  dense?: boolean;
  emptyLabel?: string;
}

export function ProjectsExplorer({
  projects,
  dense = false,
  emptyLabel = 'No hay proyectos con estos filtros.',
}: ProjectsExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
  const [stack, setStack] = useState<string>('all');
  const deferredQuery = useDeferredValue(query);

  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((project) => {
      if (category !== 'all' && project.category !== category) return false;
      if (status !== 'all' && project.status !== status) return false;
      if (stack !== 'all' && !project.technologies.includes(stack)) return false;
      if (!q) return true;
      const haystack = [
        project.title,
        project.description,
        project.role,
        ...project.tags,
        ...project.technologies,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, category, status, stack, deferredQuery]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cortex-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, stack, tags..."
            className="w-full rounded-xl border border-cortex-700 bg-cortex-800/80 py-3 pl-11 pr-4 text-glutamate-500 placeholder:text-cortex-500 focus:border-acetylcholine-500 focus:outline-none focus:ring-1 focus:ring-acetylcholine-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCategory(item.value)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                category === item.value
                  ? 'bg-acetylcholine-500 text-white'
                  : 'bg-cortex-800 text-cortex-300 hover:bg-cortex-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus | 'all')}
            className="rounded-lg border border-cortex-700 bg-cortex-800 px-3 py-2 text-sm text-cortex-200"
          >
            {PROJECT_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="rounded-lg border border-cortex-700 bg-cortex-800 px-3 py-2 text-sm text-cortex-200"
          >
            <option value="all">Todo el stack</option>
            {allStacks.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          <p className="text-sm text-cortex-400 sm:ml-auto">
            {filtered.length} proyecto{filtered.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-cortex-700 bg-cortex-800/50 p-8 text-center text-cortex-400">
          {emptyLabel}
        </p>
      ) : dense ? (
        <div className="divide-y divide-cortex-700 overflow-hidden rounded-xl border border-cortex-700 bg-cortex-800/40">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-cortex-800 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-lg text-glutamate-500">{project.title}</h3>
                  <span
                    className={`rounded border px-2 py-0.5 text-xs ${getStatusColor(project.status)}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-cortex-400">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-cortex-400">
                <span>{getCategoryLabel(project.category)}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <article
              key={project.slug}
              className="group fade-in overflow-hidden rounded-xl border border-cortex-700 bg-cortex-800/60 transition-all duration-300 hover:border-acetylcholine-500"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-cortex-900">
                  <Image
                    src={getProjectCover(project)}
                    alt={`Captura de ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cortex-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 text-xs backdrop-blur ${getStatusColor(project.status)}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                    <span className="rounded border border-cortex-600 bg-cortex-900/70 px-2 py-0.5 text-xs text-cortex-200 backdrop-blur">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-glutamate-500 transition-colors group-hover:text-acetylcholine-400">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cortex-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-cortex-700 px-2 py-0.5 text-xs text-acetylcholine-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="flex gap-3 border-t border-cortex-700 px-5 py-3">
                  <Link
                    href={`/live/${project.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-acetylcholine-400 hover:text-acetylcholine-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-cortex-400 hover:text-cortex-200"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Código
                    </a>
                  )}
                </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
