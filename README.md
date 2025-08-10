# 🧠 Cerebrum Digitalis

> **Construyendo el futuro de la tecnología en Latinoamérica. Un sistema a la vez.**

El sitio web personal de Jairo Saúl Salas Quiñones - una embajada digital que combina diseño neuro-biónico con funcionalidad de élite para crear una experiencia única de navegación.

## 🎯 Visión

Cerebrum Digitalis no es solo un sitio web personal. Es una declaración de intenciones, un laboratorio de ideas, y una plataforma de conexión estratégica. Cada elemento está diseñado para reflejar la filosofía de construcción de sistemas y la búsqueda de la excelencia.

## 🏗️ Arquitectura

### Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS con sistema de diseño neuro-biónico
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Despliegue**: Vercel
- **Contenido**: MDX para artículos y proyectos

### Sistema de Diseño Neuro-Biónico

El diseño está basado en la neurociencia, utilizando colores que representan neurotransmisores específicos:

- **🔵 Acetilcolina** (Azul): Aprendizaje y memoria - Enlaces y exploración intelectual
- **🟠 Dopamina** (Naranja): Recompensa y motivación - CTAs y logros
- **🟣 Serotonina** (Púrpura): Bienestar y visión - Valores fundamentales
- **⚪ Glutamato** (Blanco): Energía base - Texto principal
- **⚫ GABA** (Negro): Inhibición y calma - Fondos y enfoque

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js App Router
│   ├── contacto/          # Página de contacto (Sinapsis)
│   ├── ideas/             # Blog y artículos
│   ├── manifiesto/        # Principios fundamentales
│   ├── proyectos/         # Casos de estudio
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   ├── ui/               # Componentes de UI reutilizables
│   └── content/          # Componentes de contenido
├── content/              # Contenido MDX
│   ├── ideas/            # Artículos del blog
│   └── proyectos/        # Casos de estudio
├── lib/                  # Utilidades y configuración
├── types/                # Tipos TypeScript
└── styles/               # Estilos globales
```

## 🚀 Características

### ✅ Implementadas (Fase 1 - MVP)

- [x] Sistema de diseño neuro-biónico completo
- [x] Página principal con declaración de intenciones
- [x] Página del manifiesto con principios fundamentales
- [x] Página de contacto con formulario funcional
- [x] Navegación responsive con animaciones
- [x] Tipografía optimizada (Lora + Inter)
- [x] Animaciones fluidas con Framer Motion
- [x] Diseño responsive y accesible
- [x] SEO optimizado con metadatos

### 🔄 En Desarrollo (Fase 2)

- [ ] Sistema de blog con MDX
- [ ] Páginas de proyectos con casos de estudio
- [ ] Paleta de comandos (⌘+K)
- [ ] Modo de enfoque para lectura
- [ ] Sistema de tags y categorías

### 🎯 Planificadas (Fase 3)

- [ ] Experiencia 3D con React Three Fiber
- [ ] Navegación por lóbulos cerebrales
- [ ] Motor de plasticidad (memoria persistente)
- [ ] Ondas cerebrales como estado ambiental
- [ ] Integración con CMS headless

## 🛠️ Desarrollo Local

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jairosaul/cerebrum-digitalis.git
cd cerebrum-digitalis

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 📝 Contenido

### Agregar un Nuevo Proyecto

1. Crear archivo MDX en `src/content/proyectos/`
2. Seguir el formato:

```mdx
---
title: "Nombre del Proyecto"
description: "Descripción breve"
date: "2024-01-01"
status: "active"
technologies: ["Next.js", "TypeScript", "Tailwind"]
role: "Fundador Técnico"
problem: "Descripción del problema"
solution: "Descripción de la solución"
results: ["Resultado 1", "Resultado 2"]
liveUrl: "https://proyecto.com"
---

Contenido del caso de estudio...
```

### Agregar un Nuevo Artículo

1. Crear archivo MDX en `src/content/ideas/`
2. Seguir el formato:

```mdx
---
title: "Título del Artículo"
description: "Descripción breve"
date: "2024-01-01"
category: "jairoprodev"
tags: ["startups", "tecnología"]
readingTime: 5
---

Contenido del artículo...
```

## 🎨 Personalización

### Colores

Los colores se pueden personalizar en `tailwind.config.ts`:

```typescript
colors: {
  acetylcholine: {
    500: '#3b82f6', // Azul para aprendizaje
  },
  dopamine: {
    500: '#f97316', // Naranja para recompensa
  },
  // ... más colores
}
```

### Tipografía

Las fuentes se configuran en `src/app/layout.tsx`:

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
})
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno si es necesario
3. Despliegue automático en cada push a `main`

### Otros Proveedores

El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🧠 Filosofía del Proyecto

Cerebrum Digitalis representa más que un sitio web. Es una manifestación de:

- **Claridad Manifiesta**: Cada elemento tiene un propósito
- **Complejidad Revelada**: La sofisticación está en los detalles
- **Construcción en Público**: Transparencia en el proceso
- **Excelencia Sistemática**: Optimización de cada componente

## 📞 Contacto

- **Email**: jairo@jairosaul.com
- **LinkedIn**: [Jairo Saúl Salas Quiñones](https://linkedin.com/in/jairosaul)
- **Twitter**: [@jairosaul](https://twitter.com/jairosaul)

---

*Construido con ❤️ y neurociencia en Cusco, Perú*

