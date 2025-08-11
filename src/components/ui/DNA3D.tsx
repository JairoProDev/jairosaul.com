'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface DNA3DProps {
  className?: string;
  size?: number;
}

function DNA3DModel({ size = 200 }: { size: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { backboneA, backboneB, basePairs, sugarPhosphates } = useMemo(() => {
    const steps = 80; // Menos pasos para un ADN más compacto
    const pointsA: THREE.Vector3[] = [];
    const pointsB: THREE.Vector3[] = [];
    const basePairPositions: THREE.Vector3[] = [];
    const sugarPhosphatePositions: THREE.Vector3[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * 4; // 4 vueltas para ser más compacto
      const y = (t - 0.5) * 1.2; // Altura reducida
      
      // Hélice A (derecha) - Azul
      pointsA.push(new THREE.Vector3(
        0.08 * Math.cos(angle),
        y,
        0.08 * Math.sin(angle)
      ));
      
      // Hélice B (izquierda) - Verde
      pointsB.push(new THREE.Vector3(
        0.08 * Math.cos(angle + Math.PI),
        y,
        0.08 * Math.sin(angle + Math.PI)
      ));

      // Posiciones de pares de bases (cada 6 pasos)
      if (i % 6 === 0) {
        const baseAngle = angle + Math.PI / 2;
        basePairPositions.push(new THREE.Vector3(
          0.08 * 0.5 * Math.cos(baseAngle),
          y,
          0.08 * 0.5 * Math.sin(baseAngle)
        ));
      }

      // Posiciones de azúcares y fosfatos (cada 3 pasos)
      if (i % 3 === 0) {
        sugarPhosphatePositions.push(new THREE.Vector3(
          0.08 * 0.3 * Math.cos(angle),
          y,
          0.08 * 0.3 * Math.sin(angle)
        ));
        sugarPhosphatePositions.push(new THREE.Vector3(
          0.08 * 0.3 * Math.cos(angle + Math.PI),
          y,
          0.08 * 0.3 * Math.sin(angle + Math.PI)
        ));
      }
    }

    const curveA = new THREE.CatmullRomCurve3(pointsA);
    const curveB = new THREE.CatmullRomCurve3(pointsB);

    return { 
      backboneA: curveA, 
      backboneB: curveB, 
      basePairs: basePairPositions,
      sugarPhosphates: sugarPhosphatePositions
    };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.4;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={size / 200}>
      {/* Hélice A (derecha) - Azul Acetylcholine */}
      <mesh>
        <tubeGeometry args={[backboneA, 80, 0.008, 8, false]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#3b82f6" 
          emissiveIntensity={0.3} 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Hélice B (izquierda) - Verde Emerald */}
      <mesh>
        <tubeGeometry args={[backboneB, 80, 0.008, 8, false]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981" 
          emissiveIntensity={0.3} 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Pares de bases (escalera) - Conectados de extremo a extremo */}
      {basePairs.map((pos, idx) => {
        const angle = (idx * Math.PI * 2 * 4) / (basePairs.length - 1);
        const strandA = new THREE.Vector3(
          0.08 * Math.cos(angle),
          pos.y,
          0.08 * Math.sin(angle)
        );
        const strandB = new THREE.Vector3(
          0.08 * Math.cos(angle + Math.PI),
          pos.y,
          0.08 * Math.sin(angle + Math.PI)
        );
        
        // Vector de dirección para el puente horizontal
        const bridgeDirection = new THREE.Vector3().subVectors(strandB, strandA).normalize();
        const bridgeLength = 0.16; // Longitud del puente
        const bridgeCenter = new THREE.Vector3().addVectors(strandA, strandB).multiplyScalar(0.5);
        
        return (
          <group key={`base-${idx}`}>
            {/* Base nitrogenada A - Adenina (Azul) */}
            <mesh position={strandA}>
              <boxGeometry args={[0.02, 0.012, 0.012]} />
              <meshStandardMaterial 
                color="#3b82f6" 
                emissive="#3b82f6" 
                emissiveIntensity={0.2} 
              />
            </mesh>
            
            {/* Base nitrogenada B - Timina (Verde) */}
            <mesh position={strandB}>
              <boxGeometry args={[0.02, 0.012, 0.012]} />
              <meshStandardMaterial 
                color="#10b981" 
                emissive="#10b981" 
                emissiveIntensity={0.2} 
              />
            </mesh>
            
            {/* Puente de hidrógeno horizontal - Conectando las bases */}
            <mesh position={bridgeCenter}>
              <cylinderGeometry args={[0.001, 0.001, bridgeLength, 6]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.4} 
              />
            </mesh>
          </group>
        );
      })}

      {/* Azúcares y fosfatos */}
      {sugarPhosphates.map((pos, idx) => (
        <mesh key={`sugar-${idx}`} position={pos}>
          <sphereGeometry args={[0.004, 6, 6]} />
          <meshStandardMaterial 
            color={idx % 2 === 0 ? "#fbbf24" : "#f59e0b"} 
            emissive={idx % 2 === 0 ? "#fbbf24" : "#f59e0b"} 
            emissiveIntensity={0.3} 
          />
        </mesh>
      ))}
    </group>
  );
}

function DNAScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-2, -2, 2]} intensity={0.8} color="#10b981" />
      
      <DNA3DModel size={200} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.4}
        minDistance={1.2}
        maxDistance={4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </>
  );
}

export default function DNA3D({ className = '', size = 200 }: DNA3DProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-acetylcholine-500/20 via-transparent to-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
      
      {/* 3D DNA Container - Más compacto */}
      <div 
        className="relative z-10 rounded-full overflow-hidden"
        style={{ width: size * 0.8, height: size * 0.8 }}
      >
        <Canvas
          camera={{ position: [0, 0, 1.5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <DNAScene />
        </Canvas>
      </div>
      
      {/* Floating particles around DNA */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-acetylcholine-400 to-emerald-400 rounded-full animate-ping"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Interactive hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-acetylcholine-500/5 to-emerald-500/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
