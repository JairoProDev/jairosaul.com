/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neurotransmisores como sistema cromático
        acetylcholine: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Azul eléctrico - Aprendizaje y memoria
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        dopamine: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Naranja brillante - Recompensa y motivación
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        serotonin: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Púrpura profundo - Bienestar y visión
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        glutamate: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#ffffff', // Luz blanca brillante - Energía base
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        gaba: {
          50: '#171717',
          100: '#262626',
          200: '#404040',
          300: '#525252',
          400: '#737373',
          500: '#000000', // Sombra - Inhibición y calma
          600: '#a3a3a3',
          700: '#d4d4d4',
          800: '#e5e5e5',
          900: '#f5f5f5',
        },
        // Colores base del cerebro
        cortex: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Negro profundo para el fondo
        },
        // Nuevos colores científico-tecnológicos
        quantum: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neural: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        cyber: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Verde principal para acentos secundarios
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Nuevo verde específico para marca secundaria
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Verde secundario elegante
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        genetic: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        synaptic: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        transistor: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'], // Títulos con autoridad
        sans: ['Inter', 'system-ui', 'sans-serif'], // Cuerpo de texto nítido
        mono: ['JetBrains Mono', 'monospace'], // Código
      },
      spacing: {
        // Sistema de espaciado basado en múltiplos de 8px
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        // Ondas cerebrales y efectos científico-tecnológicos
        'beta-wave': 'beta-wave 0.5s ease-in-out infinite alternate',
        'alpha-wave': 'alpha-wave 1s ease-in-out infinite alternate',
        'gamma-burst': 'gamma-burst 0.1s ease-in-out',
        'synapse-pulse': 'synapse-pulse 2s ease-in-out infinite',
        'neuron-glow': 'neuron-glow 3s ease-in-out infinite',
        'quantum-shift': 'quantum-shift 4s ease-in-out infinite',
        'neural-flow': 'neural-flow 6s linear infinite',
        'cyber-pulse': 'cyber-pulse 2.5s ease-in-out infinite',
        'genetic-spiral': 'genetic-spiral 8s linear infinite',
        'synaptic-flash': 'synaptic-flash 0.3s ease-out',
        'transistor-flicker': 'transistor-flicker 1.5s ease-in-out infinite',
        'hologram-shimmer': 'hologram-shimmer 3s ease-in-out infinite',
        'data-stream': 'data-stream 2s linear infinite',
        'consciousness-fade': 'consciousness-fade 5s ease-in-out infinite',
      },
      keyframes: {
        'beta-wave': {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'alpha-wave': {
          '0%': { opacity: '0.5', transform: 'translateY(0)' },
          '100%': { opacity: '1', transform: 'translateY(-2px)' },
        },
        'gamma-burst': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '100%': { opacity: '0', transform: 'scale(1)' },
        },
        'synapse-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'neuron-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        'quantum-shift': {
          '0%, 100%': { 
            opacity: '0.7',
            transform: 'translateX(0) rotate(0deg)'
          },
          '25%': { 
            opacity: '1',
            transform: 'translateX(10px) rotate(90deg)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'translateX(0) rotate(180deg)'
          },
          '75%': { 
            opacity: '1',
            transform: 'translateX(-10px) rotate(270deg)'
          },
        },
        'neural-flow': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '10%': { 
            opacity: '1'
          },
          '90%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 0 rgba(34, 197, 94, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
            transform: 'scale(1.1)'
          },
        },
        'genetic-spiral': {
          '0%': { 
            transform: 'rotate(0deg) scale(1)',
            filter: 'hue-rotate(0deg)'
          },
          '100%': { 
            transform: 'rotate(360deg) scale(1.2)',
            filter: 'hue-rotate(360deg)'
          },
        },
        'synaptic-flash': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.5)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.2)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(1)'
          },
        },
        'transistor-flicker': {
          '0%, 100%': { 
            opacity: '0.8',
            filter: 'brightness(1)'
          },
          '50%': { 
            opacity: '1',
            filter: 'brightness(1.3)'
          },
        },
        'hologram-shimmer': {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'translateY(0)'
          },
          '50%': { 
            opacity: '1',
            transform: 'translateY(-5px)'
          },
        },
        'data-stream': {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '10%': { 
            opacity: '1'
          },
          '90%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
        },
        'consciousness-fade': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.02)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neural-network': 'linear-gradient(45deg, transparent 25%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, transparent 50%, transparent 75%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1))',
      },
    },
  },
  plugins: [],
}

