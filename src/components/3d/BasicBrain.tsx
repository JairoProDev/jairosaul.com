'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function BasicBrainScene() {
  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.6} />
      
      {/* Luz direccional */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Lóbulo Frontal - Azul */}
      <mesh position={[3, 2, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Lóbulo Temporal - Verde */}
      <mesh position={[-3, 1, 2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* Lóbulo Parietal - Naranja */}
      <mesh position={[0, 3, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      {/* Lóbulo Occipital - Verde */}
      <mesh position={[0, -2, 3]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* Controles de órbita */}
      <OrbitControls />
    </>
  );
}

export default function BasicBrain() {
  console.log('BasicBrain: renderizando componente básico');

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
      >
        <BasicBrainScene />
      </Canvas>
      
      {/* Overlay de información */}
      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-2xl font-bold mb-2">JairoSaul.com</h2>
        <p className="text-sm opacity-80">Cerebro 3D Básico - Deberías ver 4 esferas de colores</p>
      </div>
      
      {/* Instrucciones */}
      <div className="absolute bottom-8 left-8 text-white text-sm opacity-60">
        <p>🖱️ Arrastra para rotar • 🔍 Scroll para zoom • 🎯 Click en regiones</p>
      </div>
    </div>
  );
}
