import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Book, Code, FileText, Lightbulb, Wrench, ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { getRecursosByCategory } from '@/lib/recursos';
import { Recurso } from '@/types/recursos';

const categories = {
  herramientas: { name: 'Herramientas', icon: Wrench, color: 'acetylcholine' },
  libros: { name: 'Libros', icon: Book, color: 'emerald' },
  articulos: { name: 'Artículos', icon: FileText, color: 'cyber' },
  frameworks: { name: 'Frameworks', icon: Lightbulb, color: 'dopamine' },
  guias: { name: 'Guías', icon: Code, color: 'serotonin' },
};

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const category = categories[categoryParam as keyof typeof categories];

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Recursos | JairoSaul.com`,
    description: `Recursos curados de ${category.name.toLowerCase()} para fundadores técnicos y emprendedores`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const categoryKey = categoryParam as keyof typeof categories;
  const category = categories[categoryKey];

  if (!category) {
    notFound();
  }

  const recursos = await getRecursosByCategory(categoryKey as Recurso['category']);
  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/recursos"
            className="inline-flex items-center space-x-2 text-cortex-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Recursos</span>
          </Link>

          <div className="flex items-start space-x-6 mb-8">
            <div className={`w-20 h-20 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
              <Icon className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-xl text-slate-300">
                {recursos.length} recursos curados para fundadores técnicos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {recursos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-cortex-300">
                Próximamente: Más recursos de {category.name.toLowerCase()}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recursos.map((recurso) => (
                <Link
                  key={recurso.slug}
                  href={`/recursos/${categoryParam}/${recurso.slug}`}
                  className="group bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-500/30 rounded-2xl p-6 hover:border-acetylcholine-500/50 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-acetylcholine-400 transition-colors">
                    {recurso.title}
                  </h3>

                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {recurso.description}
                  </p>

                  {recurso.tags && recurso.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recurso.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-cortex-700/50 text-cortex-300 text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {recurso.date && (
                      <span className="text-xs text-cortex-400">
                        {new Date(recurso.date).toLocaleDateString('es', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    )}
                    <span className="text-acetylcholine-400 group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
