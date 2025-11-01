export interface Recurso {
  title: string;
  description: string;
  url?: string;
  category: 'herramientas' | 'libros' | 'articulos' | 'frameworks' | 'guias';
  tags: string[];
  featured?: boolean;
  author?: string;
  rating?: number;
  date?: string;
  slug?: string;
  content?: string;
  image?: string;
  price?: 'free' | 'paid' | 'freemium';
}

export interface Guia {
  title: string;
  description: string;
  slug: string;
  category: 'fundador-tecnico' | 'desarrollo' | 'productividad' | 'startups' | 'mindset';
  tags: string[];
  readingTime: string;
  date: string;
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  excerpt?: string;
  relatedGuides?: string[];
}

export interface Tool {
  name: string;
  description: string;
  url: string;
  category: 'desarrollo' | 'productividad' | 'diseño' | 'marketing' | 'analytics';
  price: 'free' | 'paid' | 'freemium';
  logo?: string;
  rating?: number;
  featured?: boolean;
  tags: string[];
}
