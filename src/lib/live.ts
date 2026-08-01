import type { Project } from '@/types/content';

/** Same-origin static demos under /demos/{slug}/ */
export const STATIC_DEMO_SLUGS = new Set([
  'amogusio',
  'math-games',
  'villa-chaco',
  'publicadis',
  'cristalimag',
  'publicadis-evolution',
]);

/** External products confirmed reachable (updated when probing). */
export const EXTERNAL_LIVE: Record<string, string> = {
  buscadis: 'https://buscadis.com',
  'adis-lat': 'https://adis.lat',
  conectadis: 'https://adis.lat/conectadis',
  vectorify: 'https://convectorify.com',
  agrilsur: 'https://agrilsur.vercel.app',
  'villa-chaco': 'https://buscadis.com/villachaco/',
  candidatazo: 'https://candidatazo-elector.vercel.app',
  glowapplify: 'https://gloway.vercel.app',
  vector: 'https://vector-livid.vercel.app',
  'buscadis-legacy': 'https://buscadisapp.vercel.app',
  'conectadis-live': 'https://conectadis-live.vercel.app',
};

export function getDemoPath(slug: string): string {
  return `/demos/${slug}/`;
}

export function getLivePath(slug: string): string {
  return `/live/${slug}`;
}

/** Prefer working external URL, then project.liveUrl, else same-origin demo. */
export function resolveExternalUrl(project: Project): string | undefined {
  return EXTERNAL_LIVE[project.slug] || project.liveUrl || undefined;
}

export function getProjectAccessUrl(project: Project): string {
  return getLivePath(project.slug);
}

export function hasInteractiveStaticDemo(slug: string): boolean {
  return STATIC_DEMO_SLUGS.has(slug);
}
