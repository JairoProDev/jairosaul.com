import type { Config } from 'tailwindcss'

const config: Config = {
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
        // Ondas cerebrales
        'beta-wave': 'beta-wave 0.5s ease-in-out infinite alternate',
        'alpha-wave': 'alpha-wave 1s ease-in-out infinite alternate',
        'gamma-burst': 'gamma-burst 0.1s ease-in-out',
        'synapse-pulse': 'synapse-pulse 2s ease-in-out infinite',
        'neuron-glow': 'neuron-glow 3s ease-in-out infinite',
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
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
            transform: 'scale(1.05)' 
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

export default config

