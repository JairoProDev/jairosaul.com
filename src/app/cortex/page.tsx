'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';

const BrainShowcase = dynamic(() => import('@/components/3d/BrainShowcase'), { ssr: false });

export default function CortexPage() {
  return (
    <div className="relative min-h-screen bg-cortex-900">
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
