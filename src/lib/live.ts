import type { Project } from '@/types/content';

/**
 * Destinos live prioritarios (producto real / store / demo hospedada).
 * /live/[slug] redirige aquí — sin iframe (evita X-Frame-Options DENY).
 */
export const LIVE_TARGETS: Record<string, string> = {
  // Productos online verificados
  buscadis: 'https://buscadis.com',
  'adis-lat': 'https://adis.lat',
  conectadis: 'https://adis.lat/conectadis',
  vectorify: 'https://convectorify.com',
  agrilsur: 'https://agrilsur.vercel.app',
  'villa-chaco': 'https://buscadis.com/villachaco/',
  candidatazo: 'https://candidatazo-elector.vercel.app',
  glowapplify: 'https://gloway.vercel.app',
  applify: 'https://gloway.vercel.app',
  uplify: 'https://gloway.vercel.app',
  vector: 'https://vector-livid.vercel.app',
  'buscadis-legacy': 'https://buscadisapp.vercel.app',

  // Mobile → Play Store (deep links Buscadis)
  'buscadis-mobile': 'https://www.buscadis.com/app',
  'vectorify-mobile': 'https://convectorify.com',

  // Demos hospedadas en jairosaul.com (ruta explícita index.html — evita 404 por trailing slash)
  publicadis: '/demos/publicadis/index.html',
  'publicadis-evolution': '/demos/publicadis/index.html',
  cristalimag: '/demos/cristalimag/index.html',
  amogusio: '/demos/amogusio/index.html',
  'math-games': '/demos/math-games/index.html',
  journews: '/demos/journews/index.html',
  diveredu: '/demos/diveredu/index.html',
  'ed-tech': '/demos/diveredu/index.html',
  noticiadis: '/demos/journews/index.html',
  'villa-chaco-demo': '/demos/villa-chaco/index.html',
};

export const STATIC_DEMO_SLUGS = new Set([
  'amogusio',
  'math-games',
  'villa-chaco',
  'publicadis',
  'cristalimag',
  'publicadis-evolution',
  'journews',
  'diveredu',
]);

/** @deprecated use LIVE_TARGETS — kept for callers expecting external map */
export const EXTERNAL_LIVE: Record<string, string> = {
  buscadis: 'https://buscadis.com',
  'adis-lat': 'https://adis.lat',
  conectadis: 'https://adis.lat/conectadis',
  vectorify: 'https://convectorify.com',
  agrilsur: 'https://agrilsur.vercel.app',
  'villa-chaco': 'https://buscadis.com/villachaco/',
  candidatazo: 'https://candidatazo-elector.vercel.app',
  glowapplify: 'https://gloway.vercel.app',
  applify: 'https://gloway.vercel.app',
  uplify: 'https://gloway.vercel.app',
  vector: 'https://vector-livid.vercel.app',
  'buscadis-legacy': 'https://buscadisapp.vercel.app',
  'buscadis-mobile': 'https://www.buscadis.com/app',
};

export function getDemoPath(slug: string): string {
  return `/demos/${slug}/index.html`;
}

export function getLivePath(slug: string): string {
  return `/live/${slug}`;
}

export function resolveLiveTarget(project: Project): string {
  if (LIVE_TARGETS[project.slug]) return LIVE_TARGETS[project.slug];
  if (project.liveUrl) return project.liveUrl;
  return getDemoPath(project.slug);
}

export function resolveExternalUrl(project: Project): string | undefined {
  const target = resolveLiveTarget(project);
  if (target.startsWith('http')) return target;
  return undefined;
}

export function getProjectAccessUrl(project: Project): string {
  return getLivePath(project.slug);
}

export function hasInteractiveStaticDemo(slug: string): boolean {
  return STATIC_DEMO_SLUGS.has(slug);
}
