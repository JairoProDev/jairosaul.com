'use client';

import { useState } from 'react';
import Cerebrum from '@/components/3d/Cerebrum';
import Transition3D from '@/components/3d/Transition3D';

import { ArrowLeft, Brain, Settings } from 'lucide-react';
import Link from 'next/link';

export default function CortexPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const [showControls, setShowControls] = useState(false);

  const handleRegionClick = (href: string) => {
    setTargetPath(href);
    setIsTransitioning(true);
  };

  const handleCloseTransition = () => {
    setIsTransitioning(false);
    setTargetPath('');
  };

  return (
    <div className="min-h-screen bg-cortex-900 relative overflow-hidden">
      {/* Navegación minimalista */}
      <div className="absolute top-4 left-4 z-10">
        <Link 
          href="/"
          className="inline-flex items-center text-white hover:text-acetylcholine-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al Cerebrum
        </Link>
      </div>

      {/* Controles */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-white hover:text-acetylcholine-400 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Panel de controles */}
      {showControls && (
        <div className="absolute top-12 right-4 z-10 bg-cortex-800 border border-cortex-700 rounded-lg p-4 text-white text-sm">
          <h3 className="font-semibold mb-2">Controles</h3>
          <ul className="space-y-1 text-cortex-300">
            <li>🖱️ Arrastra para rotar</li>
            <li>🔍 Scroll para zoom</li>
            <li>🎯 Click en regiones</li>
            <li>⌨️ Auto-rotación activa</li>
          </ul>
        </div>
      )}

      {/* Experiencia 3D */}
      <Cerebrum onRegionClick={handleRegionClick} />

      {/* Información flotante */}
      <div className="absolute bottom-8 right-8 z-10 text-white text-sm opacity-60">
        <div className="flex items-center">
          <Brain className="h-4 w-4 mr-2" />
          <span>Modo Inmersivo Activo</span>
        </div>
      </div>

      {/* Transición 3D */}
      <Transition3D
        isVisible={isTransitioning}
        onClose={handleCloseTransition}
        targetPath={targetPath}
      />
    </div>
  );
}
