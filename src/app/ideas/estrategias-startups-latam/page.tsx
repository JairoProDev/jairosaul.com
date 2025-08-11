'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Code, Lightbulb, Target, TrendingUp, Users, DollarSign } from 'lucide-react';

const strategiesContent = {
  title: "Estrategias de Startups en LATAM",
  subtitle: "Lecciones desde la trinchera: Cómo construir empresas tecnológicas que escalen en Latinoamérica",
  author: "Jairo Saul",
  date: "2024",
  readTime: "8 min",
  category: "JairoProDev",
  strategies: [
    {
      title: "1. Resolver Problemas Locales con Soluciones Globales",
      content: "No caigas en la trampa de copiar modelos estadounidenses sin entender el contexto local. Los problemas de LATAM requieren soluciones que entiendan la idiosincrasia regional.",
      principles: [
        "Identifica fricciones únicas del mercado latinoamericano",
        "Adapta tecnologías globales a realidades locales",
        "Construye para la inclusión financiera desde el día uno"
      ],
      icon: <Target className="h-6 w-6" />,
      color: "acetylcholine"
    },
    {
      title: "2. Capital Paciente vs Capital Extractivo",
      content: "No todo dinero es bueno dinero. En LATAM necesitas inversores que entiendan los ciclos largos de adopción y la importancia de construir infraestructura.",
      principles: [
        "Busca VCs con experiencia real en mercados emergentes",
        "Prioriza inversores que agreguen valor operacional",
        "Mantén control estratégico el mayor tiempo posible"
      ],
      icon: <DollarSign className="h-6 w-6" />,
      color: "emerald"
    },
    {
      title: "3. El Equipo es Todo (Especialmente en LATAM)",
      content: "El talento técnico de calidad es escaso y costoso. Tu capacidad de atraer, retener y desarrollar talento determinará tu éxito más que cualquier otro factor.",
      principles: [
        "Invierte en cultura desde el primer empleado",
        "Desarrolla talento junior en lugar de solo contratar seniors",
        "Ofrece equity real, no equity simbólico"
      ],
      icon: <Users className="h-6 w-6" />,
      color: "cyber"
    },
    {
      title: "4. Monetización Temprana es Supervivencia",
      content: "En mercados con menos capital disponible, generar ingresos rápido no es opcional. La romantización del 'grow first, monetize later' puede ser fatal en LATAM.",
      principles: [
        "Define tu modelo de monetización antes de tu MVP",
        "Testea disposición de pago desde las primeras versiones",
        "Construye múltiples streams de ingresos desde el inicio"
      ],
      icon: <TrendingUp className="h-6 w-6" />,
      color: "neural"
    },
    {
      title: "5. Piensa Regional, Ejecuta Local",
      content: "LATAM no es un solo mercado, son 20+ mercados diferentes. Pero una vez que funciona en uno, puedes escalar regionalmente más rápido que los players globales.",
      principles: [
        "Domina completamente un mercado antes de expandir",
        "Construye infraestructura que soporte múltiples países",
        "Entiende las regulaciones locales como ventaja competitiva"
      ],
      icon: <Lightbulb className="h-6 w-6" />,
      color: "dopamine"
    }
  ]
};

export default function EstrategiasStartupsPage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Code className="h-5 w-5 text-acetylcholine-500" />
              <span className="text-acetylcholine-400 text-sm font-medium">{strategiesContent.category}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              {strategiesContent.title}
            </h1>
            <p className="text-lg text-cortex-300 max-w-2xl mx-auto leading-relaxed mb-6">
              {strategiesContent.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-cortex-400">
              <span>Por {strategiesContent.author}</span>
              <span>{strategiesContent.date}</span>
              <span>{strategiesContent.readTime} lectura</span>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 mb-8 fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-acetylcholine-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Desde la Trinchera</h3>
                <p className="text-cortex-300 text-sm leading-relaxed">
                  Estas estrategias nacen de experiencia real construyendo Buscadis, Uplify y otros proyectos 
                  en el ecosistema latinoamericano. No son teorías de libros, son lecciones pagadas con errores reales.
                </p>
              </div>
            </div>
          </div>

          {/* Strategies */}
          <div className="space-y-8">
            {strategiesContent.strategies.map((strategy, index) => (
              <div
                key={strategy.title}
                className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    strategy.color === 'acetylcholine' ? 'bg-acetylcholine-500' :
                    strategy.color === 'emerald' ? 'bg-emerald-500' :
                    strategy.color === 'cyber' ? 'bg-cyber-500' :
                    strategy.color === 'neural' ? 'bg-neural-500' :
                    'bg-dopamine-500'
                  }`}>
                    <div className="text-white">
                      {strategy.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-serif text-lg font-bold mb-3 ${
                      strategy.color === 'acetylcholine' ? 'text-acetylcholine-400' :
                      strategy.color === 'emerald' ? 'text-emerald-400' :
                      strategy.color === 'cyber' ? 'text-cyber-400' :
                      strategy.color === 'neural' ? 'text-neural-400' :
                      'text-dopamine-400'
                    }`}>
                      {strategy.title}
                    </h3>
                    <p className="text-cortex-300 text-sm leading-relaxed mb-4">
                      {strategy.content}
                    </p>
                    <div className="bg-cortex-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3 text-sm">Principios Clave:</h4>
                      <ul className="space-y-2">
                        {strategy.principles.map((principle, principleIndex) => (
                          <li key={principleIndex} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              strategy.color === 'acetylcholine' ? 'bg-acetylcholine-400' :
                              strategy.color === 'emerald' ? 'bg-emerald-400' :
                              strategy.color === 'cyber' ? 'bg-cyber-400' :
                              strategy.color === 'neural' ? 'bg-neural-400' :
                              'bg-dopamine-400'
                            }`} />
                            <span className="text-cortex-300 text-sm">{principle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t border-cortex-700 fade-in">
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              ¿Construyendo en LATAM?
            </h3>
            <p className="text-cortex-300 mb-6 max-w-2xl mx-auto">
              Si estás en la trinchera construyendo una startup en Latinoamérica, 
              intercambiemos experiencias. El camino es más fácil cuando no lo recorres solo.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-acetylcholine-500 text-white rounded-lg font-medium hover:bg-acetylcholine-600 hover:scale-105 transition-all duration-200"
            >
              Conectar y Construir Juntos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
