'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BrainShowcase = dynamic(() => import('@/components/3d/BrainShowcase'), { ssr: false });

export default function CortexPage() {
  return (
    <div className="relative min-h-screen bg-cortex-900">
      <div className="absolute top-4 left-4 z-20">
        <Link 
          href="/"
          className="inline-flex items-center text-white hover:text-acetylcholine-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al inicio
        </Link>
      </div>

      <div className="pt-16">
        <BrainShowcase />
      </div>

      <div className="absolute bottom-4 right-4 z-20 text-white text-sm opacity-70">
        🧠 Experiencia 3D — Arrastra para rotar · Scroll para zoom · Click en hotspots
      </div>
    </div>
  );
}
