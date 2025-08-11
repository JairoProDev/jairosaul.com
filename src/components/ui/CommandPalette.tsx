'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { plasticityEngine } from '@/lib/plasticity';
import { siteConfig } from '@/lib/config';
import { 
  Search, 
  X, 
  Brain, 
  Code, 
  Lightbulb, 
  BookOpen, 
  MessageCircle, 
  Settings,
  Clock,
  Activity,
  BarChart3,
  Zap,
  Eye,
  Command,
  Home
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSystemPanel: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'navigation' | 'system' | 'recent' | 'stats';
}

export default function CommandPalette({ isOpen, onClose, onOpenSystemPanel }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [commands, setCommands] = useState<CommandItem[]>([]);

  const generateCommands = useCallback(() => {
    const memory = plasticityEngine.getMemory();
    const stats = plasticityEngine.getUsageStats();
    const behavior = plasticityEngine.analyzeBehavior();

    const navigationCommands: CommandItem[] = siteConfig.navigation.map((item) => ({
      id: `nav-${item.href}`,
      title: item.label,
      description: item.description || '',
      icon: getIconForNavigation(item.icon || 'brain'),
      action: () => router.push(item.href),
      category: 'navigation' as const,
    }));

    const systemCommands: CommandItem[] = [
      {
        id: 'system-panel',
        title: 'Panel de Control del Sistema',
        description: 'Ver estadísticas y configurar preferencias',
        icon: <Settings className="h-4 w-4" />,
        action: onOpenSystemPanel,
        category: 'system',
      },
      {
        id: 'focus-mode',
        title: 'Modo Enfoque',
        description: 'Activar/desactivar modo de lectura sin distracciones',
        icon: <Eye className="h-4 w-4" />,
        action: () => {
          const prefs = plasticityEngine.getPreferences();
          plasticityEngine.updatePreferences({ focusMode: !prefs.focusMode });
        },
        category: 'system',
      },
      {
        id: 'animation-speed',
        title: 'Velocidad de Animación',
        description: 'Cambiar velocidad de animaciones del sistema',
        icon: <Zap className="h-4 w-4" />,
        action: () => {
          const prefs = plasticityEngine.getPreferences();
          const speeds = ['slow', 'normal', 'fast'];
          const currentIndex = speeds.indexOf(prefs.animationSpeed);
          const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
          plasticityEngine.updatePreferences({ animationSpeed: nextSpeed as 'slow' | 'normal' | 'fast' });
        },
        category: 'system',
      },
    ];

    const recentCommands: CommandItem[] = memory.visitedPages
      .slice(-5)
      .reverse()
      .map((page) => ({
        id: `recent-${page}`,
        title: page,
        description: `Visitar ${page}`,
        icon: <Home className="h-4 w-4" />,
        action: () => router.push(page),
        category: 'recent' as const,
      }));

    const statsCommands: CommandItem[] = [
      {
        id: 'stats-pages',
        title: 'Páginas Visitadas',
        description: `${stats.uniquePagesVisited} páginas únicas`,
        icon: <Eye className="h-4 w-4" />,
        action: () => {},
        category: 'stats',
      },
      {
        id: 'stats-time',
        title: 'Tiempo Total',
        description: `${Math.round(stats.totalTimeSpent / 60)} minutos`,
        icon: <Zap className="h-4 w-4" />,
        action: () => {},
        category: 'stats',
      },
      {
        id: 'stats-behavior',
        title: 'Patrón de Comportamiento',
        description: behavior.explorationPattern || 'Explorador',
        icon: <Brain className="h-4 w-4" />,
        action: () => {},
        category: 'stats',
      },
    ];

    setCommands([...navigationCommands, ...systemCommands, ...recentCommands, ...statsCommands]);
  }, [router, onOpenSystemPanel]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      generateCommands();
    }
  }, [isOpen, generateCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open - this would be handled by parent
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, onClose]);



  const getIconForNavigation = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'lightbulb': return <Lightbulb className="h-4 w-4" />;
      case 'book-open': return <BookOpen className="h-4 w-4" />;
      case 'message-circle': return <MessageCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const filteredCommands = commands.filter((command) =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'text-acetylcholine-500';
      case 'system': return 'text-dopamine-500';
      case 'recent': return 'text-serotonin-500';
      case 'stats': return 'text-glutamate-500';
      default: return 'text-cortex-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'navigation': return 'Navegación';
      case 'system': return 'Sistema';
      case 'recent': return 'Recientes';
      case 'stats': return 'Estadísticas';
      default: return 'Otros';
    }
  };

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cortex-800 border border-cortex-700 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center space-x-3 p-4 border-b border-cortex-700">
          <Search className="h-5 w-5 text-cortex-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar comandos, navegar, configurar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-cortex-400 outline-none"
          />
          <div className="flex items-center space-x-2 text-cortex-400 text-sm">
            <Command className="h-4 w-4" />
            <span>⌘K</span>
          </div>
          <button
            onClick={onClose}
            className="text-cortex-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Commands List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
            <div key={category}>
              <div className="px-4 py-2 bg-cortex-700/50">
                <span className={`text-xs font-medium uppercase tracking-wide ${getCategoryColor(category)}`}>
                  {getCategoryLabel(category)}
                </span>
              </div>
              {categoryCommands.map((command) => {
                const globalIndex = filteredCommands.findIndex(c => c.id === command.id);
                const isSelected = globalIndex === selectedIndex;
                
                return (
                  <button
                    key={command.id}
                    onClick={() => {
                      command.action();
                      onClose();
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-cortex-700 transition-colors ${
                      isSelected ? 'bg-cortex-700' : ''
                    }`}
                  >
                    <div className={`${getCategoryColor(command.category)}`}>
                      {command.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{command.title}</div>
                      <div className="text-cortex-400 text-sm">{command.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-cortex-700 text-cortex-400 text-sm">
          <div className="flex items-center justify-between">
            <span>Navega con ↑↓, selecciona con Enter</span>
            <span>{filteredCommands.length} comandos disponibles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
