'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { brainRegions } from '@/lib/config';

interface BrainLobeProps {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  color: string;
  name: string;
  description: string;
  onClick: () => void;
  isActive: boolean;
}

function BrainLobe({ position, scale, rotation, color, name, description, onClick, isActive }: BrainLobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave
      meshRef.current.rotation.y += 0.002;
      
      // Efecto de pulso cuando está activo o hover
      if (isActive || hovered) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(1 + pulse);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    onClick();
  };

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Efecto de brillo cuando está hover */}
      {hovered && (
        <mesh scale={1.1}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Texto flotante */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-cortex-800/90 backdrop-blur-sm border border-cortex-700 rounded-lg p-3 text-white text-sm max-w-xs">
          <div className="font-semibold text-acetylcholine-400">{name}</div>
          <div className="text-cortex-300 text-xs">{description}</div>
        </div>
      </Html>
    </group>
  );
}

function NeuralConnections() {
  const pointsRef = useRef<THREE.Points>(null);
  const [points] = useState(() => {
    const points = [];
    for (let i = 0; i < 1000; i++) {
      points.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(points);
  });

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4f46e5"
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function BrainWaves() {
  const wavesRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (wavesRef.current) {
      wavesRef.current.rotation.y += 0.002;
      const material = wavesRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <mesh ref={wavesRef}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        color="#4f46e5"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function BrainStem() {
  const stemRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (stemRef.current) {
      stemRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={stemRef} position={[0, -8, 0]}>
      <cylinderGeometry args={[0.5, 0.3, 3, 16]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.8}
        roughness={0.4}
      />
    </mesh>
  );
}

function RealisticBrainScene({ onRegionClick }: { onRegionClick: (href: string) => void }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 15);
  }, [camera]);

  const lobes = [
    {
      ...brainRegions.frontal,
      position: [3, 2, 0] as [number, number, number],
      scale: [1.2, 1.2, 1.2] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      color: '#4f46e5', // acetylcholine - azul
    },
    {
      ...brainRegions.temporal,
      position: [-3, 1, 2] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      color: '#10b981', // serotonin - verde
    },
    {
      ...brainRegions.parietal,
      position: [0, 3, -2] as [number, number, number],
      scale: [1.1, 1.1, 1.1] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      color: '#f59e0b', // dopamine - naranja
    },
    {
      ...brainRegions.occipital,
      position: [0, -2, 3] as [number, number, number],
      scale: [0.9, 0.9, 0.9] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      color: '#10b981', // serotonin - verde
    },
  ];

  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.4} />
      
      {/* Luz direccional */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Luz puntual para efectos dramáticos */}
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#4f46e5" />
      
      {/* Ondas cerebrales de fondo */}
      <BrainWaves />
      
      {/* Conexiones neuronales */}
      <NeuralConnections />
      
      {/* Tronco cerebral */}
      <BrainStem />
      
      {/* Lóbulos cerebrales */}
      {lobes.map((lobe) => (
        <BrainLobe
          key={lobe.name}
          position={lobe.position}
          scale={lobe.scale}
          rotation={lobe.rotation}
          color={lobe.color}
          name={lobe.name}
          description={lobe.description}
          onClick={() => onRegionClick(lobe.href)}
          isActive={false}
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

interface RealisticBrainProps {
  onRegionClick: (href: string) => void;
}

export default function RealisticBrain({ onRegionClick }: RealisticBrainProps) {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
      >
        <RealisticBrainScene onRegionClick={onRegionClick} />
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
