
import { Navigation } from '@/components/layout/Navigation';


const manifesto = {
  title: "El Manifiesto de un Constructor de Futuro",
  sections: [
    {
      title: "1. Obsesión por el Problema",
      content: "No construyo soluciones buscando problemas. Identifico problemas fundamentales que afectan a millones de personas y dedico mi vida a solucionarlos. La tecnología es mi palanca, pero el problema es mi brújula.",
      principles: [
        "Busco problemas que duelen, no que pican",
        "Prefiero solucionar un problema profundo que diez superficiales",
        "Mido el impacto por vidas transformadas, no por líneas de código"
      ]
    },
    {
      title: "2. La Tecnología como Palanca",
      content: "La tecnología no es el fin, es el medio. Es la herramienta más poderosa que tenemos para escalar soluciones y crear impacto masivo. Pero sin una comprensión profunda del problema humano, la tecnología es solo ruido.",
      principles: [
        "Elegir la tecnología correcta, no la más popular",
        "Arquitectura que escala, código que se mantiene",
        "La simplicidad es la sofisticación final"
      ]
    },
    {
      title: "3. La Búsqueda del Alto Rendimiento",
      content: "Aspiro a la excelencia, no a la mediocridad. Esto significa optimizar cada aspecto de mi vida: física, mental, emocional y espiritual. Solo desde el máximo potencial puedo crear el máximo impacto.",
      principles: [
        "Cada decisión es una inversión en mi futuro yo",
        "Los hábitos son el interés compuesto del desarrollo personal",
        "La disciplina es libertad en el largo plazo"
      ]
    },
    {
      title: "4. Construir en Público y con Integridad",
      content: "Comparto mis éxitos, pero también mis fracasos. Mis aprendizajes, pero también mis errores. La transparencia construye confianza y la vulnerabilidad construye conexiones auténticas.",
      principles: [
        "Documentar el proceso, no solo los resultados",
        "Ser vulnerable es ser valiente",
        "La autenticidad atrae a la gente correcta"
      ]
    },
    {
      title: "5. El Poder de la Colaboración",
      content: "Junto a mi socia y cofundadora, Shantall, hemos aprendido que la sinergia de dos mentes alineadas es exponencialmente más poderosa que el trabajo individual. La colaboración no es una opción, es una necesidad.",
      principles: [
        "Buscar complementariedad, no similitud",
        "La comunicación clara es el lubricante de la colaboración",
        "Celebrar los éxitos del equipo como propios"
      ]
    },
    {
      title: "6. Impacto Sistémico",
      content: "No busco crear productos, busco transformar sistemas. Cada solución que construyo debe tener el potencial de cambiar la forma en que funciona una industria, una región, o incluso una sociedad.",
      principles: [
        "Pensar en sistemas, no en componentes",
        "El impacto real requiere tiempo y persistencia",
        "Medir el progreso en términos de cambio sistémico"
      ]
    }
  ]
};

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-glutamate-500 mb-6">
              {manifesto.title}
            </h1>
            <p className="text-xl text-cortex-300 max-w-2xl mx-auto leading-relaxed">
              Los principios fundamentales que guían mi visión y mis acciones. 
              No son promesas vacías, son compromisos que vivo cada día.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {manifesto.sections.map((section, index) => (
              <section
                key={section.title}
                className="relative fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Section Number */}
                <div className="absolute -left-8 top-0 text-6xl font-bold text-cortex-700 opacity-30">
                  {index + 1}
                </div>

                <div className="pl-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-dopamine-500 mb-6">
                    {section.title}
                  </h2>
                  
                  <p className="text-lg text-cortex-300 leading-relaxed mb-8">
                    {section.content}
                  </p>

                  {section.principles && (
                    <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6">
                      <h3 className="font-serif text-lg font-semibold text-glutamate-500 mb-4">
                        Principios Clave:
                      </h3>
                      <ul className="space-y-3">
                        {section.principles.map((principle, principleIndex) => (
                          <li
                            key={principleIndex}
                            className="flex items-start space-x-3 fade-in"
                            style={{ animationDelay: `${(index * 100) + (principleIndex * 50)}ms` }}
                          >
                            <div className="w-2 h-2 bg-acetylcholine-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-cortex-300">{principle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 pt-16 border-t border-cortex-700 fade-in">
            <h3 className="font-serif text-2xl font-bold text-glutamate-500 mb-4">
              ¿Te resuena esta visión?
            </h3>
            <p className="text-lg text-cortex-300 mb-8 max-w-2xl mx-auto">
              Si estos principios te conectan con tu propia misión, 
              estemos en contacto. Juntos podemos construir algo extraordinario.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-dopamine-500 text-white rounded-lg font-medium hover:bg-dopamine-600 hover:scale-105 transition-all duration-200"
            >
              Establecer Conexión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
