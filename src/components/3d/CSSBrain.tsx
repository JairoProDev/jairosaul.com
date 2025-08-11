'use client';

import { useState } from 'react';

export default function CSSBrain() {
  const [hoveredLobe, setHoveredLobe] = useState<string | null>(null);

  const lobes = [
    {
      name: 'Lóbulo Frontal',
      description: 'Proyectos y Creaciones',
      href: '/proyectos',
      color: '#4f46e5',
      position: 'top-1/4 left-1/4'
    },
    {
      name: 'Lóbulo Temporal',
      description: 'Ideas y Pensamientos', 
      href: '/ideas',
      color: '#10b981',
      position: 'top-1/2 left-1/6'
    },
    {
      name: 'Lóbulo Parietal',
      description: 'El Manifiesto',
      href: '/manifiesto',
      color: '#f59e0b',
      position: 'top-1/3 right-1/4'
    },
    {
      name: 'Lóbulo Occipital',
      description: 'Visión y Futuro',
      href: '/vision',
      color: '#10b981',
      position: 'bottom-1/3 right-1/3'
    }
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900">
      {/* Cerebro principal - círculo grande */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Círculo principal del cerebro */}
        <div className="w-96 h-96 rounded-full border-4 border-acetylcholine-500/30 relative animate-pulse-slow">
          
          {/* Ondas cerebrales - círculos concéntricos */}
          <div className="absolute inset-0 rounded-full border-2 border-acetylcholine-400/20 animate-ping"></div>
          <div className="absolute inset-4 rounded-full border-2 border-dopamine-400/20 animate-ping animation-delay-300"></div>
          <div className="absolute inset-8 rounded-full border-2 border-serotonin-400/20 animate-ping animation-delay-600"></div>
          
          {/* Lóbulos cerebrales */}
          {lobes.map((lobe, index) => (
            <div
              key={lobe.name}
              className={`absolute ${lobe.position} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
              onMouseEnter={() => setHoveredLobe(lobe.name)}
              onMouseLeave={() => setHoveredLobe(null)}
              onClick={() => window.location.href = lobe.href}
            >
              {/* Lóbulo */}
              <div 
                className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                  hoveredLobe === lobe.name 
                    ? 'scale-125 shadow-2xl animate-bounce' 
                    : 'scale-100 hover:scale-110'
                }`}
                style={{
                  backgroundColor: lobe.color + '40',
                  borderColor: lobe.color,
                  boxShadow: hoveredLobe === lobe.name 
                    ? `0 0 30px ${lobe.color}` 
                    : `0 0 10px ${lobe.color}60`
                }}
              >
                {/* Partículas dentro del lóbulo */}
                <div className="absolute inset-2 rounded-full animate-spin-slow">
                  <div 
                    className="w-2 h-2 rounded-full absolute top-1 left-1"
                    style={{ backgroundColor: lobe.color }}
                  ></div>
                  <div 
                    className="w-1 h-1 rounded-full absolute bottom-2 right-2"
                    style={{ backgroundColor: lobe.color }}
                  ></div>
                  <div 
                    className="w-1.5 h-1.5 rounded-full absolute top-1/2 right-1"
                    style={{ backgroundColor: lobe.color }}
                  ></div>
                </div>
              </div>

              {/* Tooltip */}
              {hoveredLobe === lobe.name && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-cortex-800 border border-cortex-700 rounded-lg p-3 text-white text-sm max-w-xs z-10 animate-fade-in">
                  <div className="font-semibold text-acetylcholine-400">{lobe.name}</div>
                  <div className="text-cortex-300 text-xs">{lobe.description}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cortex-700"></div>
                </div>
              )}

              {/* Conexiones neuronales */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-px bg-gradient-to-r opacity-40 animate-pulse ${
                      hoveredLobe === lobe.name ? 'opacity-80' : 'opacity-20'
                    }`}
                    style={{
                      height: `${40 + i * 20}px`,
                      background: `linear-gradient(${45 + i * 30}deg, ${lobe.color}80, transparent)`,
                      transform: `rotate(${i * 120}deg) translateY(-${20 + i * 10}px)`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}

          {/* Centro del cerebro - núcleo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-acetylcholine-500 to-dopamine-500 animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Overlay de información */}
      <div className="absolute top-8 left-8 text-white z-10">
        <h2 className="text-2xl font-bold mb-2">JairoSaul.com</h2>
        <p className="text-sm opacity-80">Cerebro 3D CSS - Navega por las regiones cerebrales</p>
      </div>
      
      {/* Instrucciones */}
      <div className="absolute bottom-8 left-8 text-white text-sm opacity-60 z-10">
        <p>🎯 Click en regiones • 🖱️ Hover para información</p>
      </div>

      {/* Indicador de modo inmersivo */}
      <div className="absolute bottom-8 right-8 text-white text-sm opacity-60 z-10">
        <div className="flex items-center space-x-2">
          <span>🧠 Modo CSS 3D Activo</span>
        </div>
      </div>
    </div>
  );
}
