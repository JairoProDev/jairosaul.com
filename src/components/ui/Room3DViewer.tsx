'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Room3DProps {
  modelPath?: string;
  scale?: number;
}

function Room3DModel({ modelPath = '/models/room.glb', scale = 1 }: Room3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Si no hay modelo específico, crear una habitación procedural simple
  if (!modelPath || modelPath === '/models/room.glb') {
    return <ProceduralRoom scale={scale} />;
  }

  try {
    const { scene } = useGLTF(modelPath);
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.002;
      }
    });

    return (
      <group ref={meshRef}>
        <primitive 
          object={scene} 
          scale={[scale, scale, scale]}
          position={[0, -1, 0]}
        />
      </group>
    );
  } catch (error) {
    console.warn('Could not load room model, using procedural room');
    return <ProceduralRoom scale={scale} />;
  }
}

function ProceduralRoom({ scale = 1 }: { scale: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Suelo */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>

      {/* Paredes */}
      <mesh position={[0, 1, -4]} receiveShadow>
        <boxGeometry args={[8, 5, 0.1]} />
        <meshStandardMaterial color="#4a5568" roughness={0.9} />
      </mesh>

      <mesh position={[-4, 1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 5, 8]} />
        <meshStandardMaterial color="#4a5568" roughness={0.9} />
      </mesh>

      <mesh position={[4, 1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 5, 8]} />
        <meshStandardMaterial color="#4a5568" roughness={0.9} />
      </mesh>

      {/* Techo */}
      <mesh position={[0, 3.5, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>

      {/* Escritorio */}
      <mesh position={[2, -0.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>

      {/* Patas del escritorio */}
      {[
        [1.8, -1, -1.8],
        [2.2, -1, -1.8],
        [1.8, -1, -2.2],
        [2.2, -1, -2.2]
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Monitor */}
      <mesh position={[2, -0.2, -2.3]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Pantalla del monitor */}
      <mesh position={[2, -0.2, -2.27]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.01]} />
        <meshStandardMaterial 
          color="#1a365d" 
          emissive="#0066cc" 
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Silla */}
      <mesh position={[2, -0.8, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      <mesh position={[2, 0, -0.5]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Librero */}
      <mesh position={[-2.5, 0.5, -3.5]} castShadow receiveShadow>
        <boxGeometry args={[1, 3, 0.3]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>

      {/* Libros */}
      {[0, 0.5, 1, 1.5].map((yOffset, index) => (
        <mesh key={index} position={[-2.5, -0.5 + yOffset, -3.35]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.2]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? "#dc143c" : "#4169e1"} 
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Ventana */}
      <mesh position={[3.95, 1.5, -1]} castShadow>
        <boxGeometry args={[0.05, 2, 1.5]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* Lámpara de techo */}
      <mesh position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffff88" 
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Alfombra */}
      <mesh position={[0, -1.45, 1]} receiveShadow>
        <boxGeometry args={[3, 0.02, 2]} />
        <meshStandardMaterial color="#8b0000" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function Room3DViewer({ modelPath, scale = 0.8 }: Room3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [6, 4, 6], fov: 45 }}
        shadows
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={0.8} color="#ffff88" />
        <pointLight position={[4, 2, -2]} intensity={0.4} color="#87ceeb" />
        
        <Suspense 
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#666" />
            </mesh>
          }
        >
          <Room3DModel modelPath={modelPath} scale={scale} />
        </Suspense>
        
        <Environment preset="apartment" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {/* Información del modelo */}
      <div className="absolute bottom-4 left-4 z-10 bg-cortex-800/80 backdrop-blur-sm border border-cortex-600/50 rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="text-cortex-200 text-xs">Habitación 3D</span>
        </div>
      </div>
    </div>
  );
}
