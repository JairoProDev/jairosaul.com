import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Recurso } from '@/types/recursos';

const recursosDirectory = path.join(process.cwd(), 'src/content/recursos');

export async function getAllRecursos(): Promise<Recurso[]> {
  const recursos: Recurso[] = [];

  const categories = ['herramientas', 'libros', 'articulos', 'frameworks', 'guias'];

  for (const category of categories) {
    const categoryPath = path.join(recursosDirectory, category);

    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      recursos.push({
        title: data.title,
        description: data.description,
        category: category as Recurso['category'],
        tags: data.tags || [],
        featured: data.featured || false,
        date: data.date,
        slug: file.replace(/\.mdx$/, ''),
        content,
        author: data.author,
        rating: data.rating,
        url: data.url,
        image: data.image,
        price: data.price
      });
    }
  }

  return recursos.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });
}

export async function getRecursosByCategory(category: Recurso['category']): Promise<Recurso[]> {
  const all = await getAllRecursos();
  return all.filter(r => r.category === category);
}

export async function getRecursoBySlug(category: string, slug: string): Promise<Recurso | null> {
  try {
    const fullPath = path.join(recursosDirectory, category, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      category: category as Recurso['category'],
      tags: data.tags || [],
      featured: data.featured || false,
      date: data.date,
      slug,
      content,
      author: data.author,
      rating: data.rating,
      url: data.url,
      image: data.image,
      price: data.price
    };
  } catch {
    return null;
  }
}

export async function getFeaturedRecursos(): Promise<Recurso[]> {
  const all = await getAllRecursos();
  return all.filter(r => r.featured);
}

export async function searchRecursos(query: string): Promise<Recurso[]> {
  const all = await getAllRecursos();
  const lowercaseQuery = query.toLowerCase();

  return all.filter(r =>
    r.title.toLowerCase().includes(lowercaseQuery) ||
    r.description.toLowerCase().includes(lowercaseQuery) ||
    r.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (r.content && r.content.toLowerCase().includes(lowercaseQuery))
  );
}
