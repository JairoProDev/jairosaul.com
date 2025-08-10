import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Idea, Project } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'src/content');

// Función para leer archivos MDX
function readMDXFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

// Función para obtener todos los archivos MDX de un directorio
function getMDXFiles(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      filePath: path.join(fullPath, file),
    }));
}

// Función para obtener todas las ideas
export function getAllIdeas(): Idea[] {
  const ideaFiles = getMDXFiles('ideas');
  
  const ideas = ideaFiles
    .map(({ slug, filePath }) => {
      const { data, content } = readMDXFile(filePath);
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        readingTime: data.readingTime || 5,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        content,
        featured: data.featured || false,
        type: 'idea' as const,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return ideas;
}

// Función para obtener una idea específica
export function getIdeaBySlug(slug: string): Idea | null {
  const ideaFiles = getMDXFiles('ideas');
  const ideaFile = ideaFiles.find((file) => file.slug === slug);
  
  if (!ideaFile) {
    return null;
  }

  const { data, content } = readMDXFile(ideaFile.filePath);
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    readingTime: data.readingTime || 5,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    content,
    featured: data.featured || false,
    type: 'idea' as const,
  };
}

// Función para obtener todas las ideas de una categoría
export function getIdeasByCategory(category: 'jairoprodev' | 'jairogrowhack'): Idea[] {
  const allIdeas = getAllIdeas();
  return allIdeas.filter((idea) => idea.category === category);
}

// Función para obtener todos los proyectos
export function getAllProjects(): Project[] {
  const projectFiles = getMDXFiles('proyectos');
  
  const projects = projectFiles
    .map(({ slug, filePath }) => {
      const { data, content } = readMDXFile(filePath);
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        status: data.status,
        technologies: data.technologies || [],
        role: data.role,
        problem: data.problem,
        solution: data.solution,
        results: data.results || [],
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        image: data.image,
        metrics: data.metrics,
        tags: data.tags || [],
        featured: data.featured || false,
        content,
        type: 'project' as const,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

// Función para obtener un proyecto específico
export function getProjectBySlug(slug: string): Project | null {
  const projectFiles = getMDXFiles('proyectos');
  const projectFile = projectFiles.find((file) => file.slug === slug);
  
  if (!projectFile) {
    return null;
  }

  const { data, content } = readMDXFile(projectFile.filePath);
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    status: data.status,
    technologies: data.technologies || [],
    role: data.role,
    problem: data.problem,
    solution: data.solution,
    results: data.results || [],
    liveUrl: data.liveUrl,
    githubUrl: data.githubUrl,
    image: data.image,
    metrics: data.metrics,
    tags: data.tags || [],
    featured: data.featured || false,
    content,
    type: 'project' as const,
  };
}

// Función para obtener ideas relacionadas
export function getRelatedIdeas(currentSlug: string, tags: string[], limit = 3): Idea[] {
  const allIdeas = getAllIdeas();
  
  return allIdeas
    .filter((idea) => idea.slug !== currentSlug)
    .filter((idea) => idea.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}

// Función para obtener todos los slugs de ideas
export function getAllIdeaSlugs(): string[] {
  const ideaFiles = getMDXFiles('ideas');
  return ideaFiles.map((file) => file.slug);
}

// Función para obtener todos los slugs de proyectos
export function getAllProjectSlugs(): string[] {
  const projectFiles = getMDXFiles('proyectos');
  return projectFiles.map((file) => file.slug);
}
