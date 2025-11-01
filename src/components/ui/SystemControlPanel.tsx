'use client';

import { useState, useEffect } from 'react';
import { plasticityEngine, UserPreferences } from '@/lib/plasticity';
import {
  Settings,
  Brain,
  Eye,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Activity,
  BarChart3,
  X
} from 'lucide-react';

interface SystemControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemControlPanel({ isOpen, onClose }: SystemControlPanelProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'dark',
    animationSpeed: 'normal',
    soundEnabled: false,
    focusMode: false,
    autoRotate: true,
  });
  const [stats, setStats] = useState<ReturnType<typeof plasticityEngine.getUsageStats> | null>(null);
  const [behavior, setBehavior] = useState<ReturnType<typeof plasticityEngine.analyzeBehavior> | null>(null);

  useEffect(() => {
    if (isOpen) {
      const currentPrefs = plasticityEngine.getPreferences();
      setPreferences(currentPrefs);
      
      const currentStats = plasticityEngine.getUsageStats();
      setStats(currentStats);
      
      const currentBehavior = plasticityEngine.analyzeBehavior();
      setBehavior(currentBehavior);
    }
  }, [isOpen]);

  const handlePreferenceChange = (key: keyof UserPreferences, value: string | boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    plasticityEngine.updatePreferences(newPreferences);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getExplorationPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'focused': return <Eye className="h-4 w-4 text-acetylcholine-500" />;
      case 'exploratory': return <Activity className="h-4 w-4 text-dopamine-500" />;
      case 'mixed': return <BarChart3 className="h-4 w-4 text-serotonin-500" />;
      default: return <Brain className="h-4 w-4 text-cortex-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-acetylcholine-500" />
            <h2 className="text-xl font-bold text-glutamate-500">Panel de Control del Sistema</h2>
          </div>
          <button
            onClick={onClose}
            className="text-cortex-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Estadísticas Vitales */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-glutamate-500 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-acetylcholine-500" />
            Estadísticas Vitales
          </h3>
          
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cortex-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-acetylcholine-500">{stats.totalVisits}</div>
                <div className="text-sm text-cortex-300">Visitas Totales</div>
              </div>
              <div className="bg-cortex-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-dopamine-500">{stats.uniquePagesVisited}</div>
                <div className="text-sm text-cortex-300">Páginas Exploradas</div>
              </div>
              <div className="bg-cortex-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-serotonin-500">{formatTime(stats.totalTimeSpent)}</div>
                <div className="text-sm text-cortex-300">Tiempo Total</div>
              </div>
              <div className="bg-cortex-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-glutamate-500">{formatTime(stats.averageTimePerPage)}</div>
                <div className="text-sm text-cortex-300">Promedio/Página</div>
              </div>
            </div>
          )}
        </div>

        {/* Análisis de Comportamiento */}
        {behavior && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-glutamate-500 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-dopamine-500" />
              Análisis de Comportamiento
            </h3>
            
            <div className="bg-cortex-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-cortex-300">Patrón de Exploración:</span>
                <div className="flex items-center space-x-2">
                  {getExplorationPatternIcon(behavior.explorationPattern)}
                  <span className="text-glutamate-500 capitalize">{behavior.explorationPattern}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-cortex-300">Usuario Activo:</span>
                <span className={`${behavior.isActive ? 'text-green-500' : 'text-red-500'}`}>
                  {behavior.isActive ? 'Sí' : 'No'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-cortex-300">Interacción Preferida:</span>
                <span className="text-acetylcholine-500 capitalize">{behavior.preferredInteractionType}</span>
              </div>
            </div>
          </div>
        )}

        {/* Preferencias del Sistema */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-glutamate-500 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-serotonin-500" />
            Preferencias del Sistema
          </h3>
          
          <div className="space-y-4">
            {/* Velocidad de Animación */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-acetylcholine-500" />
                <span className="text-cortex-300">Velocidad de Animación</span>
              </div>
              <select
                value={preferences.animationSpeed}
                onChange={(e) => handlePreferenceChange('animationSpeed', e.target.value)}
                className="bg-cortex-700 border border-cortex-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="slow">Lenta</option>
                <option value="normal">Normal</option>
                <option value="fast">Rápida</option>
              </select>
            </div>

            {/* Sonido */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preferences.soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-dopamine-500" />
                ) : (
                  <VolumeX className="h-5 w-5 text-cortex-400" />
                )}
                <span className="text-cortex-300">Sonido Ambiental</span>
              </div>
              <button
                onClick={() => handlePreferenceChange('soundEnabled', !preferences.soundEnabled)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  preferences.soundEnabled
                    ? 'bg-dopamine-500 text-white'
                    : 'bg-cortex-700 text-cortex-300'
                }`}
              >
                {preferences.soundEnabled ? 'Activado' : 'Desactivado'}
              </button>
            </div>

            {/* Modo Enfoque */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-serotonin-500" />
                <span className="text-cortex-300">Modo Enfoque</span>
              </div>
              <button
                onClick={() => handlePreferenceChange('focusMode', !preferences.focusMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  preferences.focusMode
                    ? 'bg-serotonin-500 text-white'
                    : 'bg-cortex-700 text-cortex-300'
                }`}
              >
                {preferences.focusMode ? 'Activado' : 'Desactivado'}
              </button>
            </div>

            {/* Auto-rotación */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-glutamate-500" />
                <span className="text-cortex-300">Auto-rotación 3D</span>
              </div>
              <button
                onClick={() => handlePreferenceChange('autoRotate', !preferences.autoRotate)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  preferences.autoRotate
                    ? 'bg-glutamate-500 text-white'
                    : 'bg-cortex-700 text-cortex-300'
                }`}
              >
                {preferences.autoRotate ? 'Activado' : 'Desactivado'}
              </button>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres limpiar toda la memoria? Esta acción no se puede deshacer.')) {
                plasticityEngine.clearMemory();
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
          >
            Limpiar Memoria
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-acetylcholine-500 text-white rounded-lg hover:bg-acetylcholine-600 transition-colors"
          >
            Cerrar
          </button>
        </div>

        {/* Auto-save indicator */}
        <div className="mt-4 pt-4 border-t border-cortex-700">
          <p className="text-xs text-cortex-400 text-center">
            ✓ Las preferencias se guardan automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}
