'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { brainRegions } from '@/lib/config';

interface BrainLobeProps {
  position: [number, number, number];
  color: string;
  name: string;
  description: string;
  onClick: () => void;
}

function BrainLobe({ position, color, name, description, onClick }: BrainLobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave
      meshRef.current.rotation.y += 0.005;
      
      // Efecto de pulso cuando está hover
      if (hovered) {
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 5) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    onClick();
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Texto flotante */}
      <Html position={[0, 2, 0]} center>
        <div className="bg-cortex-800 border border-cortex-700 rounded-lg p-3 text-white text-sm max-w-xs">
          <div className="font-semibold text-acetylcholine-400">{name}</div>
          <div className="text-cortex-300 text-xs">{description}</div>
        </div>
      </Html>
    </group>
  );
}

function SimpleBrainScene({ onRegionClick }: { onRegionClick: (href: string) => void }) {
  const regions = [
    {
      ...brainRegions.frontal,
      position: [3, 2, 0] as [number, number, number],
      color: '#4f46e5', // acetylcholine
    },
    {
      ...brainRegions.temporal,
      position: [-3, 1, 2] as [number, number, number],
      color: '#10b981', // serotonin
    },
    {
      ...brainRegions.parietal,
      position: [0, 3, -2] as [number, number, number],
      color: '#f59e0b', // dopamine
    },
    {
      ...brainRegions.occipital,
      position: [0, -2, 3] as [number, number, number],
      color: '#10b981', // serotonin
    },
  ];

  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.5} />
      
      {/* Luz direccional */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Regiones cerebrales */}
      {regions.map((region) => (
        <BrainLobe
          key={region.name}
          position={region.position}
          color={region.color}
          name={region.name}
          description={region.description}
          onClick={() => onRegionClick(region.href)}
        />
      ))}
      
      {/* Controles de órbita */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

interface SimpleBrainProps {
  onRegionClick: (href: string) => void;
}

export default function SimpleBrain({ onRegionClick }: SimpleBrainProps) {
  console.log('SimpleBrain: renderizando componente');

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
        onError={(error) => {
          console.error('Canvas error:', error);
        }}
        onCreated={() => {
          console.log('Canvas creado exitosamente');
        }}
      >
        <SimpleBrainScene onRegionClick={onRegionClick} />
      </Canvas>
      
      {/* Overlay de información */}
      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-2xl font-bold mb-2">JairoSaul.com</h2>
        <p className="text-sm opacity-80">Navega por las regiones cerebrales para explorar el contenido</p>
      </div>
      
      {/* Instrucciones */}
      <div className="absolute bottom-8 left-8 text-white text-sm opacity-60">
        <p>🖱️ Arrastra para rotar • 🔍 Scroll para zoom • 🎯 Click en regiones</p>
      </div>
    </div>
  );
}
