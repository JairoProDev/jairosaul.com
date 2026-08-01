import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Idea } from '@/types/content';

export {
  getAllProjects,
  getProjectBySlug,
  getAllProjectSlugs,
  getShowcaseProjects,
  getArchiveProjects,
  getFeaturedProjects,
  getRelatedProjects,
} from '@/lib/projects';

const contentDirectory = path.join(process.cwd(), 'src/content');

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

  const files = fs.readdirSync(fullPath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      filePath: path.join(fullPath, file),
    }));
}

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

export function getIdeasByCategory(category: 'jairoprodev' | 'jairogrowhack'): Idea[] {
  const allIdeas = getAllIdeas();
  return allIdeas.filter((idea) => idea.category === category);
}

export function getRelatedIdeas(currentSlug: string, tags: string[], limit = 3): Idea[] {
  const allIdeas = getAllIdeas();

  return allIdeas
    .filter((idea) => idea.slug !== currentSlug)
    .filter((idea) => idea.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}

export function getAllIdeaSlugs(): string[] {
  const ideaFiles = getMDXFiles('ideas');
  return ideaFiles.map((file) => file.slug);
}
