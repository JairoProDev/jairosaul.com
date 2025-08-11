'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Lightbulb, Clock, Brain, Zap, Target, RefreshCw } from 'lucide-react';

const habitsContent = {
  title: "Hábitos del 1% Superior",
  subtitle: "Sistema operativo para el máximo rendimiento: De la mediocridad a la excelencia en +100 días",
  author: "Jairo Saul",
  date: "2024",
  readTime: "12 min",
  category: "JairoGrowHack",
  habits: [
    {
      title: "1. Arquitectura del Día: 4:30 AM - 10:00 PM",
      content: "El día no comienza cuando te despiertas, comienza cuando lo diseñas. Cada minuto tiene un propósito, cada hora un objetivo. El horario no es una cárcel, es una máquina de libertad.",
      principles: [
        "4:30 AM - 6:00 AM: Deep Work (Construcción sin interrupciones)",
        "6:00 AM - 7:00 AM: Entrenamiento físico (Combustible para el cerebro)",
        "7:00 AM - 8:00 AM: Nutrición optimizada + Planning del día",
        "8:00 AM - 12:00 PM: Bloque de construcción principal",
        "12:00 PM - 1:00 PM: Pausa activa + Nutrición",
        "1:00 PM - 6:00 PM: Ejecución y colaboración",
        "6:00 PM - 8:00 PM: Aprendizaje y desarrollo",
        "8:00 PM - 10:00 PM: Reflexión, planning del siguiente día, descanso"
      ],
      icon: <Clock className="h-6 w-6" />,
      color: "acetylcholine"
    },
    {
      title: "2. Nutrición como Combustible Neural",
      content: "Tu cerebro consume 20% de tu energía total. No puedes aspirar al máximo rendimiento con combustible de baja calidad. Cada comida es una decisión estratégica.",
      principles: [
        "Ayuno intermitente 16:8 para claridad mental",
        "Proteína en cada comida (1.6g por kg de peso corporal)",
        "Omega-3, magnesio, vitamina D como suplementos base",
        "Hidratación: 35ml por kg de peso + 500ml extra por hora de entrenamiento",
        "Eliminar azúcares procesados y carbohidratos simples",
        "Última comida 3 horas antes de dormir"
      ],
      icon: <Zap className="h-6 w-6" />,
      color: "emerald"
    },
    {
      title: "3. Sistema de Objetivos: OKRs Personales",
      content: "Sin métricas claras, el progreso es una ilusión. El 1% superior no 'espera motivación', construye sistemas que hacen el progreso inevitable.",
      principles: [
        "3 Objetivos máximo por trimestre (Menos es más)",
        "Cada objetivo con 3-4 key results medibles",
        "Review semanal de 30 minutos cada domingo",
        "Tracking diario de 3 métricas clave",
        "Premios y consecuencias claras por cumplimiento/incumplimiento"
      ],
      icon: <Target className="h-6 w-6" />,
      color: "cyber"
    },
    {
      title: "4. Entrenamiento Cognitivo Diario",
      content: "El cerebro es un músculo que se atrofia sin uso. El 1% superior entrena su mente con la misma disciplina que los atletas entrenan su cuerpo.",
      principles: [
        "Lectura de alta calidad: 1 libro por semana mínimo",
        "Escritura reflexiva: 500 palabras diarias",
        "Meditación/Mindfulness: 10-20 minutos diarios",
        "Aprendizaje de nuevas habilidades: 1 hora diaria",
        "Resolver problemas complejos sin distracciones",
        "Memorización activa (números, idiomas, conceptos)"
      ],
      icon: <Brain className="h-6 w-6" />,
      color: "neural"
    },
    {
      title: "5. Optimización del Sueño: 7-8 Horas de Calidad",
      content: "El sueño no es tiempo perdido, es tiempo de construcción neural. Durante el sueño se consolida la memoria, se elimina toxinas cerebrales y se restaura la energía.",
      principles: [
        "Dormir y despertar a la misma hora todos los días",
        "Habitación completamente oscura (cortinas blackout)",
        "Temperatura entre 18-20°C",
        "Sin pantallas 2 horas antes de dormir",
        "Magnesio + melatonina 1 hora antes de acostarse",
        "Despertar con luz natural o lámpara de luz solar"
      ],
      icon: <RefreshCw className="h-6 w-6" />,
      color: "dopamine"
    }
  ]
};

export default function HabitosAltoRendimientoPage() {
  return (
    <div className="min-h-screen bg-cortex-900 neural-bg">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              <span className="text-emerald-400 text-sm font-medium">{habitsContent.category}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              {habitsContent.title}
            </h1>
            <p className="text-lg text-cortex-300 max-w-2xl mx-auto leading-relaxed mb-6">
              {habitsContent.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-cortex-400">
              <span>Por {habitsContent.author}</span>
              <span>{habitsContent.date}</span>
              <span>{habitsContent.readTime} lectura</span>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 mb-8 fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Mi Laboratorio de Reconstrucción</h3>
                <p className="text-cortex-300 text-sm leading-relaxed">
                  Estos hábitos son el resultado de +100 días de experimentación sistemática en mi proceso de reconstrucción. 
                  No son teorías, son protocolos testados en la realidad de alguien construyendo startups mientras optimiza su vida.
                </p>
              </div>
            </div>
          </div>

          {/* Habits */}
          <div className="space-y-8">
            {habitsContent.habits.map((habit, index) => (
              <div
                key={habit.title}
                className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    habit.color === 'acetylcholine' ? 'bg-acetylcholine-500' :
                    habit.color === 'emerald' ? 'bg-emerald-500' :
                    habit.color === 'cyber' ? 'bg-cyber-500' :
                    habit.color === 'neural' ? 'bg-neural-500' :
                    'bg-dopamine-500'
                  }`}>
                    <div className="text-white">
                      {habit.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-serif text-lg font-bold mb-3 ${
                      habit.color === 'acetylcholine' ? 'text-acetylcholine-400' :
                      habit.color === 'emerald' ? 'text-emerald-400' :
                      habit.color === 'cyber' ? 'text-cyber-400' :
                      habit.color === 'neural' ? 'text-neural-400' :
                      'text-dopamine-400'
                    }`}>
                      {habit.title}
                    </h3>
                    <p className="text-cortex-300 text-sm leading-relaxed mb-4">
                      {habit.content}
                    </p>
                    <div className="bg-cortex-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3 text-sm">Protocolo de Implementación:</h4>
                      <ul className="space-y-2">
                        {habit.principles.map((principle, principleIndex) => (
                          <li key={principleIndex} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              habit.color === 'acetylcholine' ? 'bg-acetylcholine-400' :
                              habit.color === 'emerald' ? 'bg-emerald-400' :
                              habit.color === 'cyber' ? 'bg-cyber-400' :
                              habit.color === 'neural' ? 'bg-neural-400' :
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

          {/* Implementation Framework */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyber-500/10 border border-emerald-500/30 rounded-xl p-6 mt-8 fade-in">
            <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Marco de Implementación: Los Primeros 30 Días
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cortex-800/50 rounded-lg p-4">
                <h4 className="font-bold text-emerald-400 mb-2">Semana 1-2: Bases</h4>
                <ul className="space-y-1 text-xs text-cortex-300">
                  <li>• Fijar horario de sueño</li>
                  <li>• Implementar ayuno 16:8</li>
                  <li>• Rutina matutina de 1 hora</li>
                </ul>
              </div>
              <div className="bg-cortex-800/50 rounded-lg p-4">
                <h4 className="font-bold text-cyber-400 mb-2">Semana 3-4: Construcción</h4>
                <ul className="space-y-1 text-xs text-cortex-300">
                  <li>• Agregar entrenamiento físico</li>
                  <li>• Sistema de OKRs personales</li>
                  <li>• Bloques de deep work</li>
                </ul>
              </div>
              <div className="bg-cortex-800/50 rounded-lg p-4">
                <h4 className="font-bold text-neural-400 mb-2">Semana 5+: Optimización</h4>
                <ul className="space-y-1 text-xs text-cortex-300">
                  <li>• Suplementación avanzada</li>
                  <li>• Tracking de métricas</li>
                  <li>• Ajustes finos del sistema</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t border-cortex-700 fade-in">
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              ¿Listo para la Reconstrucción?
            </h3>
            <p className="text-cortex-300 mb-6 max-w-2xl mx-auto">
              La diferencia entre el 1% superior y el resto no es talento, es sistema. 
              Si estás dispuesto a declarar la guerra a la mediocridad, comencemos.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 hover:scale-105 transition-all duration-200"
            >
              Iniciar Mi Reconstrucción
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
