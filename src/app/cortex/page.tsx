'use client';

import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import NeuralBackground from '@/components/ui/NeuralBackground';

const BrainShowcase = dynamic(() => import('@/components/3d/BrainShowcase'), { ssr: false });

export default function CortexPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 overflow-hidden">
      {/* Neural Background con tema neural */}
      <NeuralBackground theme="neural" intensity="low" />
      
      <Navigation />
      
      <div className="pt-16">
        <BrainShowcase />
      </div>

      <div className="absolute bottom-4 right-4 z-20 text-white text-sm opacity-70">
        🧠 Experiencia 3D — Arrastra para rotar · Scroll para zoom · Click en hotspots
      </div>
    </div>
  );
}
