import type { Heading } from '@/lib/headings';

export function ArticleToc({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Contenido"
      className="mb-10 rounded-xl border border-cortex-700 bg-cortex-800/40 p-5 lg:mb-0 lg:sticky lg:top-28"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cortex-400">
        En este artículo
      </p>
      <ol className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className="text-cortex-300 no-underline hover:text-acetylcholine-400"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
