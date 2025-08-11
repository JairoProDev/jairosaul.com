'use client';

import { useState } from 'react';
import TestBrain from '@/components/3d/TestBrain';
import SimpleBrain from '@/components/3d/SimpleBrain';
import Link from 'next/link';

export default function Test3DPage() {
  const [currentTest, setCurrentTest] = useState<'test' | 'simple'>('test');

  return (
    <div className="min-h-screen bg-cortex-900">
      {/* Header */}
      <div className="absolute top-4 left-4 z-50 text-white">
        <Link href="/" className="inline-flex items-center text-sm hover:text-acetylcholine-400 transition-colors">
          ← Volver a JairoSaul.com
        </Link>
        
        <h1 className="text-2xl font-bold mt-2">Test 3D - Diagnóstico</h1>
        
        {/* Botones de prueba */}
        <div className="mt-4 space-x-2">
          <button
            onClick={() => setCurrentTest('test')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTest === 'test'
                ? 'bg-acetylcholine-500 text-white'
                : 'bg-cortex-700 text-cortex-300 hover:bg-cortex-600'
            }`}
          >
            Test Básico
          </button>
          <button
            onClick={() => setCurrentTest('simple')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTest === 'simple'
                ? 'bg-acetylcholine-500 text-white'
                : 'bg-cortex-700 text-cortex-300 hover:bg-cortex-600'
            }`}
          >
            Cerebro Simple
          </button>
        </div>
      </div>

      {/* Contenido 3D */}
      {currentTest === 'test' ? (
        <TestBrain />
      ) : (
        <SimpleBrain onRegionClick={(href) => console.log('Click en región:', href)} />
      )}
    </div>
  );
}

