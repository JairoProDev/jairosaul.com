'use client';

import { ReactNode } from 'react';

interface ThemedCardProps {
  children: ReactNode;
  variant?: 'genetic' | 'neural' | 'robotic' | 'hybrid';
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  hover?: boolean;
}

export default function ThemedCard({
  children,
  variant = 'hybrid',
  className = '',
  icon,
  title,
  description,
  hover = true
}: ThemedCardProps) {
  const baseClasses = "relative bg-cortex-800/30 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500";
  
  const variantClasses = {
    genetic: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/20",
    neural: "border-acetylcholine-500/30 hover:border-acetylcholine-500/60 hover:shadow-acetylcholine-500/20",
    robotic: "border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/20",
    hybrid: "border-acetylcholine-500/30 hover:border-acetylcholine-500/60 hover:shadow-acetylcholine-500/20"
  };

  const hoverClasses = hover ? "hover:scale-105 hover:bg-cortex-800/40" : "";

  const getGradientColors = () => {
    switch (variant) {
      case 'genetic':
        return 'from-emerald-500/10 via-green-500/5 to-emerald-500/10';
      case 'neural':
        return 'from-acetylcholine-500/10 via-blue-500/5 to-acetylcholine-500/10';
      case 'robotic':
        return 'from-purple-500/10 via-violet-500/5 to-purple-500/10';
      case 'hybrid':
        return 'from-acetylcholine-500/10 via-emerald-500/5 to-purple-500/10';
      default:
        return 'from-acetylcholine-500/10 via-emerald-500/5 to-purple-500/10';
    }
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {/* Fondo con gradiente temático */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Efecto de borde brillante */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-acetylcholine-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Circuitos neurales de fondo */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <path
            d="M10 20 Q30 40 50 20 Q70 60 90 20"
            stroke="currentColor"
            strokeWidth="0.3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M10 80 Q30 60 50 80 Q70 40 90 80"
            stroke="currentColor"
            strokeWidth="0.3"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.3s' }}
          />
          <circle cx="20" cy="50" r="1" fill="currentColor" className="animate-ping" />
          <circle cx="80" cy="50" r="1" fill="currentColor" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 p-6">
        {/* Header con icono y título */}
        {(icon || title || description) && (
          <div className="flex items-start space-x-4 mb-4">
            {icon && (
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                variant === 'genetic' ? 'bg-emerald-500' :
                variant === 'neural' ? 'bg-acetylcholine-500' :
                variant === 'robotic' ? 'bg-purple-500' :
                'bg-gradient-to-br from-acetylcholine-500 to-emerald-500'
              }`}>
                <div className="w-6 h-6 text-white">
                  {icon}
                </div>
              </div>
            )}
            {(title || description) && (
              <div className="flex-1">
                {title && (
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-cortex-300 text-sm">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Contenido principal */}
        <div className="space-y-3">
          {children}
        </div>
      </div>

      {/* Efecto de escaneo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full"></div>
    </div>
  );
}
