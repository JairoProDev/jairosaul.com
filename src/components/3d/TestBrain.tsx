'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function TestScene() {
  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.5} />
      
      {/* Luz direccional */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Cubo de prueba - esto debería verse */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      {/* Esfera de prueba */}
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      
      {/* Controles de órbita */}
      <OrbitControls />
    </>
  );
}

export default function TestBrain() {
  console.log('TestBrain: renderizando componente de prueba');

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
        onError={(error) => {
          console.error('Canvas error:', error);
        }}
        onCreated={() => {
          console.log('Canvas creado exitosamente');
        }}
      >
        <TestScene />
      </Canvas>
      
      {/* Overlay de información */}
      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Test Brain 3D</h2>
        <p className="text-sm opacity-80">Deberías ver un cubo rojo y una esfera verde</p>
      </div>
    </div>
  );
}

