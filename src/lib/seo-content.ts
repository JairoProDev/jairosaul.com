import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SeoArticle, SeoCluster } from '@/types/content';
import { calculateReadingTime } from '@/lib/utils';

const seoDirectory = path.join(process.cwd(), 'src/content/seo');

export const seoClusters: {
  id: SeoCluster;
  title: string;
  blurb: string;
}[] = [
  {
    id: 'internacionalizacion',
    title: 'Internacionalización',
    blurb: 'Un dominio por idioma no es una red hasta que Google entiende las equivalencias.',
  },
  {
    id: 'serp-money',
    title: 'Dinero en el SERP',
    blurb: 'Precio, estrellas y entidad: lo que el buscador puede pintar sin que subas de posición.',
  },
  {
    id: 'rastreo',
    title: 'Rastreo e indexación',
    blurb: 'WAF, robots.txt y las dos formas de “sin indexar” que la gente confunde.',
  },
  {
    id: 'rendimiento',
    title: 'Rendimiento',
    blurb: 'Core Web Vitals en temas de constructor, caché y el subset de fuente que nadie pidió.',
  },
  {
    id: 'negocio',
    title: 'Negocio',
    blurb: 'OTAs, margen, E-E-A-T de operador y noventa días de alguien que también implementa.',
  },
];

function readArticle(slug: string, filePath: string): SeoArticle {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const readingTime =
    typeof data.readingTime === 'number'
      ? data.readingTime
      : calculateReadingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    featured: data.featured || false,
    type: 'seo',
    cluster: data.cluster as SeoCluster,
    readingTime,
    excerpt: data.excerpt || content.replace(/[#>*`]/g, '').slice(0, 180).trim() + '…',
    content,
    related: data.related || [],
  };
}

export function getAllSeoArticles(): SeoArticle[] {
  if (!fs.existsSync(seoDirectory)) return [];

  const clusterOrder = seoClusters.map((c) => c.id);

  return fs
    .readdirSync(seoDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return readArticle(slug, path.join(seoDirectory, file));
    })
    .sort((a, b) => {
      const ca = clusterOrder.indexOf(a.cluster);
      const cb = clusterOrder.indexOf(b.cluster);
      if (ca !== cb) return ca - cb;
      return a.title.localeCompare(b.title, 'es');
    });
}

export function getSeoArticleBySlug(slug: string): SeoArticle | null {
  const filePath = path.join(seoDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readArticle(slug, filePath);
}

export function getAllSeoSlugs(): string[] {
  if (!fs.existsSync(seoDirectory)) return [];
  return fs
    .readdirSync(seoDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getSeoArticlesByCluster(cluster: SeoCluster): SeoArticle[] {
  return getAllSeoArticles().filter((article) => article.cluster === cluster);
}

export function getRelatedSeoArticles(current: SeoArticle, limit = 3): SeoArticle[] {
  const all = getAllSeoArticles().filter((article) => article.slug !== current.slug);

  const scored = all.map((article) => {
    let score = 0;
    if (article.cluster === current.cluster) score += 5;
    if (current.related?.includes(article.slug)) score += 8;
    score += article.tags.filter((tag) => current.tags.includes(tag)).length;
    return { article, score };
  });

  return scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.article);
}
