export interface BaseContent {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  featured?: boolean;
}

export interface Project extends BaseContent {
  type: 'project';
  status: 'active' | 'completed' | 'in-development';
  technologies: string[];
  role: string;
  problem: string;
  solution: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  metrics?: {
    users?: number;
    revenue?: number;
    growth?: string;
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
