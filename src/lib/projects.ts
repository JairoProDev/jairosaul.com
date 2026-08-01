import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectVisibility,
} from '@/types/content';

export {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  getStatusLabel,
  getCategoryLabel,
  getStatusColor,
  getProjectCover,
} from '@/lib/projects-meta';

const contentDirectory = path.join(process.cwd(), 'src/content');

const STATUS_MAP: Record<string, ProjectStatus> = {
  live: 'live',
  wip: 'wip',
  archived: 'archived',
  concept: 'concept',
  active: 'live',
  completed: 'archived',
  'in-development': 'wip',
};

function readMDXFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

function getMDXFiles(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      filePath: path.join(fullPath, file),
    }));
}

function parseProject(slug: string, data: Record<string, unknown>, content: string): Project {
  const technologies = (data.technologies as string[]) || (data.stack as string[]) || [];
  const date = (data.date as string) || `${data.year || new Date().getFullYear()}-01-01`;
  const year =
    typeof data.year === 'number'
      ? data.year
      : new Date(date).getFullYear() || new Date().getFullYear();

  const rawStatus = String(data.status || 'wip');
  const status = STATUS_MAP[rawStatus] || 'wip';

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date,
    year,
    status,
    category: (data.category as ProjectCategory) || 'product',
    visibility: (data.visibility as ProjectVisibility) || 'showcase',
    technologies,
    role: (data.role as string) || 'Builder',
    problem: (data.problem as string) || '',
    solution: (data.solution as string) || '',
    results: (data.results as string[]) || [],
    liveUrl: data.liveUrl as string | undefined,
    githubUrl: data.githubUrl as string | undefined,
    coverImage: (data.coverImage as string) || (data.image as string) || undefined,
    image: data.image as string | undefined,
    metrics: data.metrics as Project['metrics'],
    tags: (data.tags as string[]) || [],
    featured: Boolean(data.featured),
    content,
    type: 'project',
  };
}

function sortProjects(projects: Project[]): Project[] {
  const statusWeight: Record<ProjectStatus, number> = {
    live: 0,
    wip: 1,
    concept: 2,
    archived: 3,
  };

  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.year !== b.year) return b.year - a.year;
    if (statusWeight[a.status] !== statusWeight[b.status]) {
      return statusWeight[a.status] - statusWeight[b.status];
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllProjects(): Project[] {
  const projectFiles = getMDXFiles('projects');
  const projects = projectFiles.map(({ slug, filePath }) => {
    const { data, content } = readMDXFile(filePath);
    return parseProject(slug, data, content);
  });
  return sortProjects(projects);
}

export function getShowcaseProjects(): Project[] {
  return getAllProjects().filter((p) => p.visibility === 'showcase');
}

export function getArchiveProjects(): Project[] {
  return getAllProjects().filter((p) => p.visibility === 'archive');
}

export function getFeaturedProjects(limit = 6): Project[] {
  const all = getShowcaseProjects();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | null {
  const projectFiles = getMDXFiles('projects');
  const projectFile = projectFiles.find((file) => file.slug === slug);
  if (!projectFile) return null;
  const { data, content } = readMDXFile(projectFile.filePath);
  return parseProject(slug, data, content);
}

export function getAllProjectSlugs(): string[] {
  return getMDXFiles('projects').map((file) => file.slug);
}

export function getRelatedProjects(currentSlug: string, tags: string[], limit = 3): Project[] {
  const all = getAllProjects().filter((p) => p.slug !== currentSlug);
  const scored = all
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length >= limit) {
    return scored.slice(0, limit).map((item) => item.project);
  }

  const remaining = all
    .filter((p) => !scored.some((s) => s.project.slug === p.slug))
    .slice(0, limit - scored.length);

  return [...scored.map((s) => s.project), ...remaining];
}
