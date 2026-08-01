import type { Project, ProjectCategory, ProjectStatus } from '@/types/content';

export const PROJECT_CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'startup', label: 'Startups' },
  { value: 'product', label: 'Productos' },
  { value: 'client', label: 'Clientes' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'tool', label: 'Tools' },
  { value: 'experiment', label: 'Experimentos' },
];

export const PROJECT_STATUSES: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Cualquier estado' },
  { value: 'live', label: 'En vivo' },
  { value: 'wip', label: 'En desarrollo' },
  { value: 'concept', label: 'Concepto' },
  { value: 'archived', label: 'Archivado' },
];

export function getStatusLabel(status: ProjectStatus): string {
  return PROJECT_STATUSES.find((s) => s.value === status)?.label || status;
}

export function getCategoryLabel(category: ProjectCategory): string {
  return PROJECT_CATEGORIES.find((c) => c.value === category)?.label || category;
}

export function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case 'live':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'wip':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'concept':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'archived':
      return 'bg-cortex-700 text-cortex-300 border-cortex-600';
    default:
      return 'bg-cortex-700 text-cortex-300 border-cortex-600';
  }
}

export function getProjectCover(project: Pick<Project, 'coverImage' | 'image'>): string {
  return project.coverImage || project.image || '/images/og-image.jpg';
}
