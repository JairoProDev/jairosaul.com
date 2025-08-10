'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { plasticityEngine } from '@/lib/plasticity';
import CommandPalette from '@/components/ui/CommandPalette';
import SystemControlPanel from '@/components/ui/SystemControlPanel';

interface PlasticityContextType {
  openCommandPalette: () => void;
  openSystemPanel: () => void;
  recordInteraction: (type: string, target: string) => void;
}

const PlasticityContext = createContext<PlasticityContextType | undefined>(undefined);

export function usePlasticity() {
  const context = useContext(PlasticityContext);
  if (context === undefined) {
    throw new Error('usePlasticity must be used within a PlasticityProvider');
  }
  return context;
}

interface PlasticityProviderProps {
  children: React.ReactNode;
}

export default function PlasticityProvider({ children }: PlasticityProviderProps) {
  const pathname = usePathname();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSystemPanelOpen, setIsSystemPanelOpen] = useState(false);
  const [pageStartTime, setPageStartTime] = useState(Date.now());

  // Recordar visita a página cuando cambia
  useEffect(() => {
    if (pathname) {
      plasticityEngine.recordPageVisit(pathname);
      setPageStartTime(Date.now());
    }
  }, [pathname]);

  // Recordar tiempo en página cuando se desmonta
  useEffect(() => {
    return () => {
      const timeSpent = (Date.now() - pageStartTime) / 1000; // en segundos
      if (pathname && timeSpent > 1) { // Solo registrar si estuvo más de 1 segundo
        plasticityEngine.recordTimeSpent(pathname, timeSpent);
      }
    };
  }, [pathname, pageStartTime]);

  // Manejar atajos de teclado globales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K o Ctrl+K para abrir paleta de comandos
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }

      // ⌘, o Ctrl+, para abrir panel del sistema
      if (e.key === ',' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSystemPanelOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCommandPalette = () => setIsCommandPaletteOpen(true);
  const openSystemPanel = () => setIsSystemPanelOpen(true);

  const recordInteraction = (type: string, target: string) => {
    plasticityEngine.recordInteraction(type as 'page_visit' | 'click' | 'hover' | 'scroll' | 'search', target);
  };

  const contextValue: PlasticityContextType = {
    openCommandPalette,
    openSystemPanel,
    recordInteraction,
  };

  return (
    <PlasticityContext.Provider value={contextValue}>
      {children}
      
      {/* Paleta de Comandos */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenSystemPanel={() => {
          setIsCommandPaletteOpen(false);
          setIsSystemPanelOpen(true);
        }}
      />

      {/* Panel de Control del Sistema */}
      <SystemControlPanel
        isOpen={isSystemPanelOpen}
        onClose={() => setIsSystemPanelOpen(false)}
      />
    </PlasticityContext.Provider>
  );
}
