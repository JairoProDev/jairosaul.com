'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface ThemedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'genetic' | 'neural' | 'robotic' | 'hybrid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export default function ThemedButton({
  children,
  href,
  onClick,
  variant = 'hybrid',
  size = 'md',
  className = '',
  icon
}: ThemedButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden group";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    genetic: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-500 text-white shadow-lg hover:shadow-emerald-500/25",
    neural: "bg-gradient-to-r from-acetylcholine-500 via-acetylcholine-600 to-blue-500 text-white shadow-lg hover:shadow-acetylcholine-500/25",
    robotic: "bg-gradient-to-r from-purple-500 via-purple-600 to-violet-500 text-white shadow-lg hover:shadow-purple-500/25",
    hybrid: "bg-gradient-to-r from-acetylcholine-500 via-emerald-500 to-purple-500 text-white shadow-lg hover:shadow-acetylcholine-500/25"
  };

  const buttonContent = (
    <>
      {/* Efecto de fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Circuitos neurales */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <path
            d="M10 50 Q30 20 50 50 Q70 80 90 50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M10 30 Q30 60 50 30 Q70 10 90 30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.3s' }}
          />
        </svg>
      </div>

      {/* Contenido del botón */}
      <div className="relative z-10 flex items-center space-x-2">
        {icon && <span className="group-hover:animate-pulse">{icon}</span>}
        <span>{children}</span>
      </div>

      {/* Efecto de borde brillante */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
    </>
  );

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}
