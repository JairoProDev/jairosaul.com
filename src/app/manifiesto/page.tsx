
'use client';

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';


const manifiestos = {
  prodev: {
    title: "Manifiesto ProDev - El Código del Profesional de Elite",
    subtitle: "Principios para convertirse en un profesional de alto rendimiento que construye el futuro",
    sections: [
      {
        title: "1. Obsesión por la Excelencia Técnica",
        content: "El profesional de elite no acepta la mediocridad. Cada línea de código, cada arquitectura, cada decisión técnica debe aspirar a la perfección. No se trata de ego, sino de respeto por el oficio y el impacto que creamos.",
        principles: [
          "Escribir código como si fuera leído por generaciones futuras",
          "Elegir la tecnología correcta, no la más popular",
          "La simplicidad es la sofisticación final en la ingeniería"
        ]
      },
      {
        title: "2. Mentalidad de Constructor, No de Consumidor",
        content: "Los profesionales de elite construyen soluciones, no buscan problemas para sus herramientas. Identifican dolor real en el mercado y dedican su carrera a solucionarlo de manera sistémica y escalable.",
        principles: [
          "Buscar problemas que duelen, no que pican",
          "Medir el impacto por vidas transformadas, no por tecnologías usadas",
          "Pensar en sistemas, no en componentes aislados"
        ]
      },
      {
        title: "3. Aprendizaje Perpetuo y Adaptación",
        content: "La tecnología evoluciona exponencialmente. El profesional de elite mantiene una mentalidad de principiante, siempre dispuesto a desaprender y reaprender. La curiosidad intelectual es su combustible.",
        principles: [
          "Dominar los fundamentos antes que las modas",
          "Enseñar para consolidar el propio aprendizaje",
          "Invertir tiempo en entender el 'por qué', no solo el 'cómo'"
        ]
      },
      {
        title: "4. Construir en Público con Integridad",
        content: "El profesional de elite comparte conocimiento sin reservas. Documenta fracasos y éxitos por igual. La transparencia acelera el crecimiento colectivo y construye confianza genuina.",
        principles: [
          "Documentar el proceso, no solo los resultados",
          "La vulnerabilidad es fortaleza profesional",
          "Contribuir más valor del que se extrae de la comunidad"
        ]
      },
      {
        title: "5. Colaboración como Multiplicador de Fuerza",
        content: "El trabajo individual tiene límites. El profesional de elite busca complementariedad, no competencia. Entiende que las mejores soluciones emergen de la diversidad de perspectivas.",
        principles: [
          "Buscar complementariedad, no similitud en el equipo",
          "La comunicación clara multiplica la productividad",
          "Celebrar los éxitos del equipo como propios"
        ]
      },
      {
        title: "6. Impacto Sistémico y Visión a Largo Plazo",
        content: "El profesional de elite no solo resuelve tickets, transforma industrias. Cada proyecto debe tener el potencial de cambiar la forma en que funciona un sector, una región, o la sociedad misma.",
        principles: [
          "Optimizar para décadas, no para sprints",
          "El impacto real requiere paciencia y persistencia",
          "Medir el progreso en términos de cambio sistémico"
        ]
      }
    ]
  },
  growhack: {
    title: "Manifiesto GrowHack - El Sistema Operativo del 1% Superior",
    subtitle: "Principios para diseñar una vida de máximo rendimiento y control total",
    sections: [
      {
        title: "1. Arquitectura de la Vida como Sistema",
        content: "La vida del 1% superior no es accidental, es arquitecturada. Cada área - salud, relaciones, finanzas, aprendizaje - funciona como un módulo optimizado que contribuye al rendimiento total del sistema.",
        principles: [
          "Diseñar cada día como si fuera el prototipo de toda la vida",
          "Los hábitos son el interés compuesto del desarrollo personal",
          "Medir y optimizar todo lo que importa"
        ]
      },
      {
        title: "2. Disciplina como Libertad Fundamental",
        content: "La disciplina no es restricción, es liberación. Cada acto de autodisciplina compra opciones futuras. El 1% superior entiende que la libertad real viene de la estructura, no del caos.",
        principles: [
          "Cada decisión es una inversión en el futuro yo",
          "La comodidad es el enemigo silencioso del crecimiento",
          "La disciplina pequeña y consistente vence al esfuerzo heroico esporádico"
        ]
      },
      {
        title: "3. Optimización Continua del Rendimiento",
        content: "El cuerpo y la mente son las herramientas fundamentales para todo logro. El 1% superior trata su bienestar físico y mental como la infraestructura crítica de su vida.",
        principles: [
          "Entrenar el cuerpo como un atleta, la mente como un erudito",
          "La nutrición es combustible, el ejercicio es medicina",
          "El descanso de calidad es tan importante como el trabajo de calidad"
        ]
      },
      {
        title: "4. Mentalidad Antifragil ante la Adversidad",
        content: "El 1% superior no solo resiste los golpes, los usa como combustible. Cada obstáculo es información, cada fracaso es educación. La antifragilidad es su superpoder.",
        principles: [
          "Los obstáculos no están en el camino, son el camino",
          "Fracasar rápido para aprender rápido",
          "Convertir cada crisis en oportunidad de crecimiento"
        ]
      },
      {
        title: "5. Relaciones como Activos de Vida",
        content: "El 1% superior entiende que las relaciones son el multiplicador más poderoso de todos los logros. Invierte conscientemente en conexiones auténticas y mutuamente beneficiosas.",
        principles: [
          "Dar valor antes de pedir valor",
          "Rodearse de personas que elevan el estándar personal",
          "La calidad de las relaciones determina la calidad de la vida"
        ]
      },
      {
        title: "6. Contribución como Propósito Final",
        content: "El 1% superior trasciende el éxito personal hacia el impacto colectivo. Entiende que el crecimiento individual sin contribución social es incompleto.",
        principles: [
          "Crecer para servir, no solo para acumular",
          "Ser el cambio que se quiere ver en el mundo",
          "El legado se construye en acciones diarias, no en momentos heroicos"
        ]
      }
    ]
  }
};

export default function ManifestoPage() {
  const [activeTab, setActiveTab] = useState<'prodev' | 'growhack'>('prodev');
  const currentManifesto = manifiestos[activeTab];

  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-glutamate-500 mb-4">
              Mis Manifiestos
            </h1>
            <p className="text-lg text-cortex-300 max-w-3xl mx-auto leading-relaxed">
              Dos códigos de vida: uno para la excelencia profesional, otro para el máximo rendimiento personal. 
              Estos son los estándares que aspiro vivir cada día.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12 fade-in">
            <div className="bg-cortex-800 rounded-xl p-1 flex">
              <button
                onClick={() => setActiveTab('prodev')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'prodev'
                    ? 'bg-acetylcholine-500 text-white'
                    : 'text-cortex-300 hover:text-white hover:bg-cortex-700'
                }`}
              >
                ProDev - Profesional
              </button>
              <button
                onClick={() => setActiveTab('growhack')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'growhack'
                    ? 'bg-emerald-500 text-white'
                    : 'text-cortex-300 hover:text-white hover:bg-cortex-700'
                }`}
              >
                GrowHack - Personal
              </button>
            </div>
          </div>

          {/* Manifesto Content */}
          <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-2xl p-8 mb-12 fade-in">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                {currentManifesto.title}
              </h2>
              <p className="text-base text-cortex-300 max-w-2xl mx-auto">
                {currentManifesto.subtitle}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {currentManifesto.sections.map((section, index) => (
                <section
                  key={section.title}
                  className="relative fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Section Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white ${
                        activeTab === 'prodev' ? 'bg-acetylcholine-500' : 'bg-emerald-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-serif text-lg md:text-xl font-bold mb-3 ${
                        activeTab === 'prodev' ? 'text-acetylcholine-400' : 'text-emerald-400'
                      }`}>
                        {section.title}
                      </h3>
                      
                      <p className="text-cortex-300 leading-relaxed mb-4 text-sm md:text-base">
                        {section.content}
                      </p>

                      {section.principles && (
                        <div className="bg-cortex-700/50 rounded-lg p-4">
                          <h4 className="font-medium text-white mb-3 text-sm">
                            Principios Clave:
                          </h4>
                          <ul className="space-y-2">
                            {section.principles.map((principle, principleIndex) => (
                              <li
                                key={principleIndex}
                                className="flex items-start space-x-2"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                  activeTab === 'prodev' ? 'bg-acetylcholine-400' : 'bg-emerald-400'
                                }`} />
                                <span className="text-cortex-300 text-sm">{principle}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center fade-in">
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              ¿Te resuenan estos principios?
            </h3>
            <p className="text-cortex-300 mb-6 max-w-2xl mx-auto">
              Si estos estándares conectan con tu propia búsqueda de excelencia, 
              trabajemos juntos hacia la superación.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
            >
              Establecer Conexión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
