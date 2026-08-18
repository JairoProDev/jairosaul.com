export interface BaseContent {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  featured?: boolean;
}

export type ProjectCategory =
  | 'startup'
  | 'product'
  | 'client'
  | 'experiment'
  | 'tool'
  | 'mobile';

export type ProjectVisibility = 'showcase' | 'archive';

export type ProjectStatus = 'live' | 'wip' | 'archived' | 'concept';

export interface Project extends BaseContent {
  type: 'project';
  status: ProjectStatus;
  category: ProjectCategory;
  visibility: ProjectVisibility;
  year: number;
  technologies: string[];
  role: string;
  problem: string;
  solution: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Preferred cover path; falls back to `image` */
  coverImage?: string;
  image?: string;
  metrics?: {
    users?: number;
    revenue?: number;
    growth?: string;
    engagement?: number;
  };
  content: string;
}

export interface Idea extends BaseContent {
  type: 'idea';
  category: 'jairoprodev' | 'jairogrowhack';
  readingTime: number;
  excerpt: string;
  content: string;
  relatedIdeas?: string[];
}

export type SeoCluster =
  | 'internacionalizacion'
  | 'serp-money'
  | 'rastreo'
  | 'rendimiento'
  | 'negocio';

export interface SeoArticle extends BaseContent {
  type: 'seo';
  cluster: SeoCluster;
  readingTime: number;
  excerpt: string;
  content: string;
  related?: string[];
}

export interface Manifesto {
  title: string;
  sections: {
    title: string;
    content: string;
    principles?: string[];
  }[];
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
    bio: string;
    location: string;
    avatar: string;
    phone?: string;
    birthday?: string;
  };
  social: SocialLink[];
  navigation: NavigationItem[];
  projects: {
    featured: string[];
    all: string[];
  };
  ideas: {
    featured: string[];
    categories: {
      jairoprodev: string[];
      jairogrowhack: string[];
    };
  };
}
