import { SiteConfig, type NavLink, type NavNode } from '@/types/content';

export const siteConfig: SiteConfig = {
  title: 'JairoSaul.com - Jairo Saul Salas Quiñones',
  description: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator',
  author: {
    name: 'Jairo Saul Salas Quiñones',
    email: 'JairoProDev@gmail.com',
    bio: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator. Fundador técnico obsesionado con eliminar la ineficiencia y crear oportunidades a través de sistemas tecnológicos. Aspiro a la excelencia, no a la mediocridad.',
    location: 'Cusco, Perú 🇵🇪 LATAM → World 🌐',
    phone: '+51 937 054 328',
    birthday: 'September 18, 2002',
    avatar: '/images/profile.webp',
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
      label: 'Sobre mí',
      href: '/sobre-mi',
      description: 'Perfil y trayectoria',
    },
    {
      label: 'Proyectos',
      href: '/projects',
      description: 'Productos, clientes y experimentos',
      children: [
        {
          label: 'Proyectos',
          href: '/projects',
          description: 'Showcase en vivo y en curso',
        },
        {
          label: 'Archivo',
          href: '/projects/archive',
          description: 'Piezas anteriores y archivos',
        },
      ],
    },
    {
      label: 'Notas',
      description: 'SEO, turismo, ideas y recursos',
      children: [
        {
          label: 'SEO técnico',
          href: '/seo',
          description: 'Hreflang, schema, WAF, WordPress multidominio',
        },
        {
          label: 'Turismo',
          href: '/industrias/turismo',
          description: 'Mercados, cupos, OTAs y catálogo desde Cusco',
        },
        {
          label: 'Industrias',
          href: '/industrias',
          description: 'Verticales. Turismo es la que está abierta',
        },
        {
          label: 'Ideas',
          href: '/ideas',
          description: 'Startups, tecnología, hábitos',
        },
        {
          label: 'Recursos',
          href: '/recursos',
          description: 'Herramientas, libros y guías',
        },
      ],
    },
    {
      label: 'Estudio',
      description: 'Manifiesto, visión y experiencias 3D',
      children: [
        {
          label: 'Manifiesto',
          href: '/manifiesto',
          description: 'Principios',
        },
        {
          label: 'Visión',
          href: '/vision',
          description: 'Hacia dónde va el trabajo',
        },
        {
          label: 'Brain 3D',
          href: '/cortex',
          description: 'Recorrido por regiones cerebrales',
        },
        {
          label: 'Workspace 3D',
          href: '/workspace-3d',
          description: 'Escena de trabajo inmersiva',
        },
      ],
    },
    {
      label: 'Contacto',
      href: '/contacto',
      description: 'WhatsApp, correo, LinkedIn',
    },
  ],
  projects: {
    featured: ['buscadis', 'publicadis', 'adis-lat', 'conectadis', 'vectorify', 'diveredu'],
    all: [
      'buscadis',
      'publicadis',
      'adis-lat',
      'conectadis',
      'vectorify',
      'agrilsur',
      'villa-chaco',
      'candidatazo',
      'glowapplify',
      'diveredu',
      'journews',
      'vector',
      'buscadis-mobile',
      'vectorify-mobile',
      'cursor-ai-tts',
      'uplify',
      'noticiadis',
      'ed-tech',
      'cristalimag',
    ],
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

export function flattenNav(nodes: NavNode[] = siteConfig.navigation): NavLink[] {
  const out: NavLink[] = [];
  const seen = new Set<string>();

  const push = (item: NavLink) => {
    if (seen.has(item.href)) return;
    seen.add(item.href);
    out.push(item);
  };

  for (const node of nodes) {
    if (node.href) {
      push({
        label: node.label,
        href: node.href,
        description: node.description,
      });
    }
    for (const child of node.children ?? []) {
      push(child);
    }
  }

  return out;
}

export const brainRegions = {
  frontal: {
    name: 'Lóbulo Frontal',
    description: 'Proyectos y Creaciones',
    color: 'acetylcholine',
    icon: 'code',
    href: '/projects',
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
