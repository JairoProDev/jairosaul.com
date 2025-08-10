import { SiteConfig } from '@/types/content';

export const siteConfig: SiteConfig = {
  title: 'Jairo Saúl Salas Quiñones',
  description: 'Construyendo el futuro de la tecnología en Latinoamérica. Un sistema a la vez.',
  author: {
    name: 'Jairo Saúl Salas Quiñones',
    email: 'jairo@jairosaul.com',
    bio: 'Fundador técnico obsesionado con eliminar la ineficiencia y crear oportunidades a través de sistemas tecnológicos. Aspiro a la excelencia, no a la mediocridad.',
    location: 'Cusco, Perú',
    avatar: '/images/jairo-avatar.jpg',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/jairosaul',
      icon: 'linkedin',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/jairosaul',
      icon: 'twitter',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/jairosaul',
      icon: 'github',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@jairosaul',
      icon: 'youtube',
    },
  ],
  navigation: [
    {
      label: 'Cerebrum',
      href: '/',
      description: 'La corteza principal - Tu declaración de intenciones',
      icon: 'brain',
    },
    {
      label: 'Cortex 3D',
      href: '/cortex',
      description: 'Experiencia inmersiva - Navega por las regiones cerebrales',
      icon: 'brain',
    },
    {
      label: 'Manifiesto',
      href: '/manifiesto',
      description: 'Los principios fundamentales que guían mi visión',
      icon: 'book-open',
    },
    {
      label: 'Proyectos',
      href: '/proyectos',
      description: 'Engramas de construcción - Mis creaciones tecnológicas',
      icon: 'code',
    },
    {
      label: 'Ideas',
      href: '/ideas',
      description: 'Nodos de memoria - Mi laboratorio de pensamiento',
      icon: 'lightbulb',
    },
    {
      label: 'Sinapsis',
      href: '/contacto',
      description: 'Establecer conexión - Trabajemos juntos',
      icon: 'message-circle',
    },
  ],
  projects: {
    featured: ['buscadis', 'publicadis', 'noticiadis'],
    all: ['buscadis', 'publicadis', 'noticiadis', 'jairoprodev', 'jairogrowhack'],
  },
  ideas: {
    featured: [
      'estrategias-startups-latam',
      'nextjs-arquitectura-escalable',
      'habitos-alto-rendimiento',
      'filosofia-estoica-emprendedores',
    ],
    categories: {
      jairoprodev: [
        'estrategias-startups-latam',
        'nextjs-arquitectura-escalable',
        'levantar-capital-startup',
        'tecnologias-emergentes-2024',
      ],
      jairogrowhack: [
        'habitos-alto-rendimiento',
        'filosofia-estoica-emprendedores',
        'nutricion-funcion-cognitiva',
        'rutinas-entrenamiento-productividad',
      ],
    },
  },
};

export const brainRegions = {
  frontal: {
    name: 'Lóbulo Frontal',
    description: 'Proyectos y Creaciones',
    color: 'acetylcholine',
    icon: 'code',
    href: '/proyectos',
  },
  temporal: {
    name: 'Lóbulo Temporal',
    description: 'Ideas y Pensamientos',
    color: 'serotonin',
    icon: 'lightbulb',
    href: '/ideas',
  },
  parietal: {
    name: 'Lóbulo Parietal',
    description: 'El Manifiesto',
    color: 'dopamine',
    icon: 'book-open',
    href: '/manifiesto',
  },
  occipital: {
    name: 'Lóbulo Occipital',
    description: 'Visión y Futuro',
    color: 'serotonin',
    icon: 'eye',
    href: '/vision',
  },
};

export const neurotransmitters = {
  acetylcholine: {
    name: 'Acetilcolina',
    function: 'Aprendizaje y Memoria',
    color: 'acetylcholine-500',
    description: 'Se activa en enlaces a contenido profundo y exploración intelectual',
  },
  dopamine: {
    name: 'Dopamina',
    function: 'Recompensa y Motivación',
    color: 'dopamine-500',
    description: 'Se libera en interacciones gratificantes y logros',
  },
  serotonin: {
    name: 'Serotonina',
    function: 'Bienestar y Visión',
    color: 'serotonin-500',
    description: 'Se asocia con pensamiento de alto nivel y valores fundamentales',
  },
  glutamate: {
    name: 'Glutamato',
    function: 'Energía Base',
    color: 'glutamate-500',
    description: 'El neurotransmisor excitatorio principal, la energía de la actividad',
  },
  gaba: {
    name: 'GABA',
    function: 'Inhibición y Calma',
    color: 'gaba-500',
    description: 'Calma la actividad para permitir el enfoque',
  },
};
