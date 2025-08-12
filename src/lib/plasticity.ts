export interface UserMemory {
  visitedPages: string[];
  timeSpent: Record<string, number>;
  interactions: Interaction[];
  preferences: UserPreferences;
  lastVisit: string;
  totalVisits: number;
}

export interface Interaction {
  type: 'page_visit' | 'click' | 'hover' | 'scroll' | 'search';
  target: string;
  timestamp: number;
  duration?: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  animationSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  focusMode: boolean;
  autoRotate: boolean;
}

class PlasticityEngine {
  private static instance: PlasticityEngine;
  private memory: UserMemory;
  private readonly STORAGE_KEY = 'nexus_plasticity_memory';

  private constructor() {
    this.memory = this.loadMemory();
    this.initializeMemory();
  }

  static getInstance(): PlasticityEngine {
    if (!PlasticityEngine.instance) {
      PlasticityEngine.instance = new PlasticityEngine();
    }
    return PlasticityEngine.instance;
  }

  private loadMemory(): UserMemory {
    if (typeof window === 'undefined') {
      return this.getDefaultMemory();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.getDefaultMemory(), ...parsed };
      }
          } catch (_error) {
        // console.warn('Error loading plasticity memory:', error);
      }

    return this.getDefaultMemory();
  }

  private getDefaultMemory(): UserMemory {
    return {
      visitedPages: [],
      timeSpent: {},
      interactions: [],
      preferences: {
        theme: 'dark',
        animationSpeed: 'normal',
        soundEnabled: false,
        focusMode: false,
        autoRotate: true,
      },
      lastVisit: new Date().toISOString(),
      totalVisits: 0,
    };
  }

  private initializeMemory(): void {
    this.recordVisit();
    this.saveMemory();
  }

  private saveMemory(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.memory));
    } catch (_error) {
      // console.warn('Error saving plasticity memory:', error);
    }
  }

  // Recordar visita a página
  recordPageVisit(page: string): void {
    if (!this.memory.visitedPages.includes(page)) {
      this.memory.visitedPages.push(page);
    }
    
    this.memory.lastVisit = new Date().toISOString();
    this.memory.totalVisits++;
    
    this.recordInteraction('page_visit', page);
    this.saveMemory();
  }

  // Recordar tiempo en página
  recordTimeSpent(page: string, duration: number): void {
    this.memory.timeSpent[page] = (this.memory.timeSpent[page] || 0) + duration;
    this.saveMemory();
  }

  // Recordar interacción
  recordInteraction(type: Interaction['type'], target: string, duration?: number): void {
    const interaction: Interaction = {
      type,
      target,
      timestamp: Date.now(),
      duration,
    };

    this.memory.interactions.push(interaction);
    
    // Mantener solo las últimas 100 interacciones
    if (this.memory.interactions.length > 100) {
      this.memory.interactions = this.memory.interactions.slice(-100);
    }
    
    this.saveMemory();
  }

  // Actualizar preferencias
  updatePreferences(preferences: Partial<UserPreferences>): void {
    this.memory.preferences = { ...this.memory.preferences, ...preferences };
    this.saveMemory();
  }

  // Obtener páginas más visitadas
  getMostVisitedPages(limit: number = 5): string[] {
    const pageCounts = this.memory.visitedPages.reduce((acc, page) => {
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([page]) => page);
  }

  // Obtener páginas donde más tiempo se ha pasado
  getMostTimeSpentPages(limit: number = 5): string[] {
    return Object.entries(this.memory.timeSpent)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([page]) => page);
  }

  // Verificar si es la primera visita
  isFirstVisit(): boolean {
    return this.memory.totalVisits <= 1;
  }

  // Obtener estadísticas de uso
  getUsageStats() {
    return {
      totalVisits: this.memory.totalVisits,
      uniquePagesVisited: this.memory.visitedPages.length,
      totalTimeSpent: Object.values(this.memory.timeSpent).reduce((a, b) => a + b, 0),
      averageTimePerPage: this.memory.visitedPages.length > 0 
        ? Object.values(this.memory.timeSpent).reduce((a, b) => a + b, 0) / this.memory.visitedPages.length 
        : 0,
      lastVisit: this.memory.lastVisit,
    };
  }

  // Obtener memoria completa
  getMemory(): UserMemory {
    return { ...this.memory };
  }

  // Obtener preferencias
  getPreferences(): UserPreferences {
    return { ...this.memory.preferences };
  }

  // Limpiar memoria (para desarrollo)
  clearMemory(): void {
    this.memory = this.getDefaultMemory();
    this.saveMemory();
  }

  private recordVisit(): void {
    this.memory.totalVisits++;
    this.memory.lastVisit = new Date().toISOString();
  }

  // Analizar patrones de comportamiento
  analyzeBehavior(): BehaviorAnalysis {
    const interactions = this.memory.interactions;
    const recentInteractions = interactions.filter(
      i => Date.now() - i.timestamp < 24 * 60 * 60 * 1000 // Últimas 24 horas
    );

    return {
      isActive: recentInteractions.length > 5,
      preferredInteractionType: this.getMostCommonInteractionType(),
      averageSessionDuration: this.calculateAverageSessionDuration(),
      explorationPattern: this.analyzeExplorationPattern(),
    };
  }

  private getMostCommonInteractionType(): Interaction['type'] {
    const typeCounts = this.memory.interactions.reduce((acc, interaction) => {
      acc[interaction.type] = (acc[interaction.type] || 0) + 1;
      return acc;
    }, {} as Record<Interaction['type'], number>);

    return Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] as Interaction['type'] || 'page_visit';
  }

  private calculateAverageSessionDuration(): number {
    // Implementación simplificada - en una implementación real
    // se calcularía basándose en timestamps de inicio/fin de sesión
    return Object.values(this.memory.timeSpent).reduce((a, b) => a + b, 0) / 
           Math.max(this.memory.visitedPages.length, 1);
  }

  private analyzeExplorationPattern(): 'focused' | 'exploratory' | 'mixed' {
    const uniquePages = new Set(this.memory.visitedPages).size;
    const totalVisits = this.memory.totalVisits;
    
    if (uniquePages / totalVisits > 0.8) return 'exploratory';
    if (uniquePages / totalVisits < 0.3) return 'focused';
    return 'mixed';
  }
}

export interface BehaviorAnalysis {
  isActive: boolean;
  preferredInteractionType: Interaction['type'];
  averageSessionDuration: number;
  explorationPattern: 'focused' | 'exploratory' | 'mixed';
}

export const plasticityEngine = PlasticityEngine.getInstance();
