import Link from 'next/link';
import { Book, Code, FileText, Lightbulb, Wrench, Search, Star, TrendingUp } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { getAllRecursos, getFeaturedRecursos } from '@/lib/recursos';
import StructuredData from '@/components/seo/StructuredData';

export const metadata = {
  title: 'Recursos para Fundadores Técnicos | JairoSaul.com',
  description: 'Herramientas, libros, artículos, frameworks y guías curadas para construir startups exitosas',
};

const categories = [
  {
    id: 'herramientas',
    name: 'Herramientas',
    icon: Wrench,
    description: 'Stack tecnológico y tools que uso diariamente',
    color: 'acetylcholine',
  },
  {
    id: 'libros',
    name: 'Libros',
    icon: Book,
    description: 'Lecturas que transformaron mi forma de pensar',
    color: 'emerald',
  },
  {
    id: 'articulos',
    name: 'Artículos',
    icon: FileText,
    description: 'Essays y artículos esenciales',
    color: 'cyber',
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    icon: Lightbulb,
    description: 'Modelos mentales y frameworks de decisión',
    color: 'dopamine',
  },
  {
    id: 'guias',
    name: 'Guías',
    icon: Code,
    description: 'Tutoriales paso a paso y case studies',
    color: 'serotonin',
  },
];

export default async function RecursosPage() {
  const allRecursos = await getAllRecursos();
  const featured = await getFeaturedRecursos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      <Navigation />

      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: 'Inicio', url: 'https://jairosaul.com' },
            { name: 'Recursos', url: 'https://jairosaul.com/recursos' },
          ]
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            Recursos para Fundadores Técnicos
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Herramientas, libros, artículos, frameworks y guías que uso para construir startups.
            Contenido curado desde la trinchera, no desde la teoría.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-4">
              <div className="text-3xl font-bold text-acetylcholine-400">{allRecursos.length}</div>
              <div className="text-sm text-cortex-300">Recursos</div>
            </div>
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-4">
              <div className="text-3xl font-bold text-emerald-400">{featured.length}</div>
              <div className="text-sm text-cortex-300">Destacados</div>
            </div>
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-4">
              <div className="text-3xl font-bold text-cyber-400">5</div>
              <div className="text-sm text-cortex-300">Categorías</div>
            </div>
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-4">
              <div className="text-3xl font-bold text-dopamine-400">100%</div>
              <div className="text-sm text-cortex-300">Gratis</div>
            </div>
          </div>

          {/* Search (placeholder for now) */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cortex-400" />
              <input
                type="text"
                placeholder="Buscar recursos... (próximamente)"
                disabled
                className="w-full pl-12 pr-4 py-4 bg-cortex-800/50 border border-cortex-700 rounded-xl text-white placeholder-cortex-400 focus:outline-none focus:border-acetylcholine-500 transition-colors disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featured.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Star className="h-6 w-6 text-yellow-400" />
              <h2 className="font-serif text-3xl font-bold text-white">
                Recursos Destacados
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((recurso) => {
                const category = categories.find(c => c.id === recurso.category);
                const Icon = category?.icon || FileText;

                return (
                  <Link
                    key={`${recurso.category}-${recurso.slug}`}
                    href={`/recursos/${recurso.category}/${recurso.slug}`}
                    className="group bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-500/30 rounded-2xl p-6 hover:border-acetylcholine-500/50 transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${category?.color}-500 to-${category?.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30 flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Destacado</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-acetylcholine-400 transition-colors">
                      {recurso.title}
                    </h3>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {recurso.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {recurso.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-cortex-700/50 text-cortex-300 text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <h2 className="font-serif text-3xl font-bold text-white">
              Explora por Categoría
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = allRecursos.filter(r => r.category === category.id).length;

              return (
                <Link
                  key={category.id}
                  href={`/recursos/${category.id}`}
                  className="group bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-8 hover:border-acetylcholine-500/50 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-acetylcholine-400 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-slate-300 text-sm mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cortex-400">
                      {count} recursos
                    </span>
                    <span className="text-acetylcholine-400 group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent mb-6">
              ¿Tienes un recurso para compartir?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Si conoces herramientas, libros o artículos que deberían estar aquí, házmelo saber.
              Comparto lo que funciona, no lo que está de moda.
            </p>

            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-acetylcholine-500 to-emerald-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Compartir Recurso
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
