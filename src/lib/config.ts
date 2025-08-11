import { SiteConfig } from '@/types/content';

export const siteConfig: SiteConfig = {
  title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
  description: 'Startup Founder | FullStack Software Engineer | Scientific Content Creator ',
  author: {
    name: 'Jairo Saul Salas Quiñones',
    email: 'JairoProDev@gmail.com',
    bio: 'Software Engineer | Full Stack Developer | Startup Founder | Scientific Popularizer. Fundador técnico obsesionado con eliminar la ineficiencia y crear oportunidades a través de sistemas tecnológicos. Aspiro a la excelencia, no a la mediocridad.',
    location: 'Cusco, Perú 🇵🇪 LATAM → World 🌐',
    phone: '+51 937 054 328',
    birthday: 'September 18, 2002',
    avatar: '/images/profile.png',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/JairoSaulProDev',
      icon: 'linkedin',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/JairoSaulProDev',
      icon: 'twitter',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/JairoSaulProDev',
      icon: 'github',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@JairoSaulProDev',
      icon: 'youtube',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/JairoSaulProDev',
      icon: 'instagram',
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@JairoSaulProDev',
      icon: 'tiktok',
    },
    {
      platform: 'Pinterest',
      url: 'https://pinterest.com/JairoSaulProDev',
      icon: 'pinterest',
    },
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/51937054328',
      icon: 'whatsapp',
    },
  ],
  navigation: [
    {
      label: 'Sobre Mí',
      href: '/sobre-mi',
      description: 'Mi perfil profesional y proyectos personales',
      icon: 'user',
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
      label: 'Visión',
      href: '/vision',
      description: 'Mi visión del futuro y próximos proyectos',
      icon: 'eye',
    },
    {
      label: 'Cerebrum 3D',
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
      label: 'Sinapsis',
      href: '/contacto',
      description: 'Establecer conexión - Trabajemos juntos',
      icon: 'message-circle',
    },
  ],
  projects: {
    featured: ['buscadis', 'publicadis', 'noticiadis'],
    all: ['buscadis', 'publicadis', 'noticiadis'],
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
      ],
      jairogrowhack: [
        'habitos-alto-rendimiento',
        'filosofia-estoica-emprendedores',
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
