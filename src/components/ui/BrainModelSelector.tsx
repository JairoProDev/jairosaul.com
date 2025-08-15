'use client';

import { useState } from 'react';
import { Brain, RotateCcw, Palette } from 'lucide-react';
import Brain3DInteractive from './Brain3DInteractive';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

type BrainModel = 'procedural' | 'brain-glb' | 'brain-hologram-glb';

interface BrainModelProps {
  modelPath: string;
  scale?: number;
}

function GLTFBrainModel({ modelPath, scale = 1 }: BrainModelProps) {
  const { scene } = useGLTF(modelPath);
  
  return (
    <primitive 
      object={scene} 
      scale={[scale, scale, scale]}
      rotation={[0, 0, 0]}
    />
  );
}

// Preload the models
useGLTF.preload('/models/brain.glb');
useGLTF.preload('/models/brain_hologram.glb');

export default function BrainModelSelector() {
  const [currentModel, setCurrentModel] = useState<BrainModel>('procedural');
  
  const models = [
    {
      id: 'procedural' as BrainModel,
      name: 'Cerebro Procedural',
      description: 'Modelo 3D generado por algoritmos',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: 'brain-glb' as BrainModel,
      name: 'Cerebro Anatómico',
      description: 'Modelo 3D realista',
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: 'brain-hologram-glb' as BrainModel,
      name: 'Cerebro Holográfico',
      description: 'Modelo 3D detallado (16MB)',
      icon: <RotateCcw className="w-4 h-4" />,
    },
  ];

  const renderModel = () => {
    switch (currentModel) {
      case 'procedural':
        return <Brain3DInteractive />;
      case 'brain-glb':
        return (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Suspense fallback={null}>
              <GLTFBrainModel modelPath="/models/brain.glb" scale={2} />
            </Suspense>
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              autoRotate={true}
              autoRotateSpeed={1}
            />
          </Canvas>
        );
      case 'brain-hologram-glb':
        return (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={0.8} />
            <Suspense fallback={null}>
              <GLTFBrainModel modelPath="/models/brain_hologram.glb" scale={0.02} />
            </Suspense>
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={10}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        );
      default:
        return <Brain3DInteractive />;
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Selector de modelos */}
      <div className="absolute top-4 left-4 z-10 bg-cortex-800/80 backdrop-blur-sm border border-cortex-600/50 rounded-lg p-2">
        <div className="flex flex-col space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setCurrentModel(model.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-xs transition-all duration-200
                ${currentModel === model.id 
                  ? 'bg-acetylcholine-500 text-white shadow-lg' 
                  : 'text-cortex-200 hover:bg-cortex-700/50 hover:text-white'
                }
              `}
              title={model.description}
            >
              {model.icon}
              <span className="hidden sm:inline">{model.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de carga para modelos pesados */}
      {(currentModel === 'brain-hologram-glb') && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-xs">Modelo pesado (16MB)</span>
          </div>
        </div>
      )}

      {/* Contenedor del modelo */}
      <div className="w-full h-full">
        {renderModel()}
      </div>
    </div>
  );
}
