import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  category: string;
  tags?: string[];
}

interface RelatedContentProps {
  currentTags?: string[];
  currentCategory?: string;
  currentSlug?: string;
  items?: RelatedItem[];
  maxItems?: number;
}

export default async function RelatedContent({
  currentTags = [],
  currentCategory,
  currentSlug,
  items,
  maxItems = 3,
}: RelatedContentProps) {
  // Por ahora mostramos items estáticos o los pasados
  // En una versión completa, esto buscaría contenido relacionado por tags
  const relatedItems = items || [];

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-cortex-700">
      <h3 className="font-serif text-2xl font-bold text-white mb-6">
        Contenido Relacionado
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedItems.slice(0, maxItems).map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-500/30 rounded-xl p-6 hover:border-acetylcholine-500/50 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="px-3 py-1 bg-cortex-700/50 text-cortex-300 text-xs rounded-lg capitalize">
                {item.category}
              </span>
              <ExternalLink className="h-4 w-4 text-cortex-400 group-hover:text-acetylcholine-400 transition-colors" />
            </div>

            <h4 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-acetylcholine-400 transition-colors">
              {item.title}
            </h4>

            <p className="text-slate-300 text-sm line-clamp-2">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-cortex-700/30 text-cortex-400 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
