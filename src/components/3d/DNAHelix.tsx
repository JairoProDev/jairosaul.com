'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DNAHelixProps {
  height?: number;
  radius?: number;
  turns?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function DNAHelix({
  height = 2.4,
  radius = 0.15,
  turns = 8,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { backboneA, backboneB, basePairs, sugarPhosphate } = useMemo(() => {
    const steps = 200;
    const pointsA: THREE.Vector3[] = [];
    const pointsB: THREE.Vector3[] = [];
    const basePairPositions: THREE.Vector3[] = [];
    const sugarPositions: THREE.Vector3[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      
      // Hélice A (derecha)
      pointsA.push(new THREE.Vector3(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle)
      ));
      
      // Hélice B (izquierda, desplazada 180°)
      pointsB.push(new THREE.Vector3(
        radius * Math.cos(angle + Math.PI),
        y,
        radius * Math.sin(angle + Math.PI)
      ));

      // Posiciones de pares de bases (cada 10 pasos)
      if (i % 10 === 0) {
        const baseAngle = angle + Math.PI / 2;
        basePairPositions.push(new THREE.Vector3(
          radius * 0.3 * Math.cos(baseAngle),
          y,
          radius * 0.3 * Math.sin(baseAngle)
        ));
      }

      // Posiciones de azúcares (cada 5 pasos)
      if (i % 5 === 0) {
        sugarPositions.push(new THREE.Vector3(
          radius * 0.8 * Math.cos(angle),
          y,
          radius * 0.8 * Math.sin(angle)
        ));
        sugarPositions.push(new THREE.Vector3(
          radius * 0.8 * Math.cos(angle + Math.PI),
          y,
          radius * 0.8 * Math.sin(angle + Math.PI)
        ));
      }
    }

    const curveA = new THREE.CatmullRomCurve3(pointsA);
    const curveB = new THREE.CatmullRomCurve3(pointsB);

    return { backboneA: curveA, backboneB: curveB, basePairs: basePairPositions, sugarPhosphate: sugarPositions };
  }, [height, radius, turns]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Hélice A (derecha) - Azúcar-Fosfato */}
      <mesh>
        <tubeGeometry args={[backboneA, 180, 0.015, 8, false]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} roughness={0.3} />
      </mesh>

      {/* Hélice B (izquierda) - Azúcar-Fosfato */}
      <mesh>
        <tubeGeometry args={[backboneB, 180, 0.015, 8, false]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.4} roughness={0.3} />
      </mesh>

      {/* Pares de bases (escalera) */}
      {basePairs.map((pos, idx) => {
        const baseType = idx % 4; // A, T, G, C
        const colors = ['#ef4444', '#10b981', '#f59e0b', '#8b5cf6']; // Rojo, Verde, Naranja, Violeta
        
        return (
          <group key={`base-${idx}-${pos.x.toFixed(3)}-${pos.y.toFixed(3)}-${pos.z.toFixed(3)}`} position={pos}>
            {/* Base nitrogenada A */}
            <mesh position={[0.02, 0, 0]}>
              <boxGeometry args={[0.04, 0.02, 0.02]} />
              <meshStandardMaterial color={colors[baseType]} emissive={colors[baseType]} emissiveIntensity={0.3} />
            </mesh>
            
            {/* Base nitrogenada B (complementaria) */}
            <mesh position={[-0.02, 0, 0]}>
              <boxGeometry args={[0.04, 0.02, 0.02]} />
              <meshStandardMaterial color={colors[(baseType + 2) % 4]} emissive={colors[(baseType + 2) % 4]} emissiveIntensity={0.3} />
            </mesh>
            
            {/* Puentes de hidrógeno */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.002, 0.002, 0.04, 6]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* Azúcares (puntos brillantes en las hélices) */}
      {sugarPhosphate.map((pos, idx) => (
        <mesh key={`sugar-${idx}-${pos.x.toFixed(3)}-${pos.y.toFixed(3)}-${pos.z.toFixed(3)}`} position={pos}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Conectores de fosfato (líneas finas) */}
      {sugarPhosphate.slice(0, -2).map((pos, idx) => {
        if (idx % 2 === 0) return null; // Solo conectar cada dos azúcares
        const nextPos = sugarPhosphate[idx + 2];
        if (!nextPos) return null;
        
        const direction = nextPos.clone().sub(pos);
        const distance = direction.length();
        const center = pos.clone().add(direction.multiplyScalar(0.5));
        
        return (
          <mesh key={`connector-${idx}-${center.x.toFixed(3)}-${center.y.toFixed(3)}-${center.z.toFixed(3)}`} position={center}>
            <cylinderGeometry args={[0.002, 0.002, distance, 6]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}
