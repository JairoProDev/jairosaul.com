import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { IndustryArticle, IndustryId, TurismoCluster } from '@/types/content';
import { calculateReadingTime } from '@/lib/utils';

const industriasRoot = path.join(process.cwd(), 'src/content/industrias');

export const industries: {
  id: IndustryId;
  title: string;
  href: string;
  blurb: string;
}[] = [
  {
    id: 'turismo',
    title: 'Turismo',
    href: '/industrias/turismo',
    blurb:
      'Cusco, mercados, cupos, OTAs y catálogo. Lo que se ve desde el piso, con números de Mincetur y mediciones propias.',
  },
];

export const turismoClusters: {
  id: TurismoCluster;
  title: string;
  blurb: string;
}[] = [
  {
    id: 'mercados',
    title: 'Mercados',
    blurb:
      'Quién llega al Perú no es lo mismo que quién reserva un trek en Cusco. Brasil, USA, Italia y el resto.',
  },
  {
    id: 'producto',
    title: 'Producto',
    blurb:
      'Camino Inca, Salkantay, lujo, licencia. Lo que se vende y lo que el catálogo no publica en un idioma.',
  },
  {
    id: 'canales',
    title: 'Canales',
    blurb:
      'GetYourGuide llena el bus. WhatsApp cierra. La web recupera margen si el idioma y la ficha aguantan.',
  },
  {
    id: 'demanda',
    title: 'Demanda',
    blurb:
      'El americano investiga en enero. El cupo de junio ya no está. El blog en inglés, si existe.',
  },
];

function industryDir(industry: IndustryId) {
  return path.join(industriasRoot, industry);
}

function readArticle(industry: IndustryId, slug: string, filePath: string): IndustryArticle {
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
    type: 'industry',
    industry,
    cluster: data.cluster as TurismoCluster,
    readingTime,
    excerpt: data.excerpt || `${content.replace(/[#>*`]/g, '').slice(0, 180).trim()}…`,
    content,
    related: data.related || [],
  };
}

export function getIndustryArticles(industry: IndustryId): IndustryArticle[] {
  const dir = industryDir(industry);
  if (!fs.existsSync(dir)) return [];

  const clusterOrder = turismoClusters.map((c) => c.id);

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return readArticle(industry, slug, path.join(dir, file));
    })
    .sort((a, b) => {
      const ca = clusterOrder.indexOf(a.cluster);
      const cb = clusterOrder.indexOf(b.cluster);
      if (ca !== cb) return ca - cb;
      return a.title.localeCompare(b.title, 'es');
    });
}

export function getIndustryArticleBySlug(
  industry: IndustryId,
  slug: string,
): IndustryArticle | null {
  const filePath = path.join(industryDir(industry), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readArticle(industry, slug, filePath);
}

export function getIndustrySlugs(industry: IndustryId): string[] {
  const dir = industryDir(industry);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getRelatedIndustryArticles(
  current: IndustryArticle,
  limit = 3,
): IndustryArticle[] {
  const all = getIndustryArticles(current.industry).filter(
    (article) => article.slug !== current.slug,
  );

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
