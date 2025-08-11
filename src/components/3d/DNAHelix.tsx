'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DNAHelixProps {
  height?: number;
  radius?: number;
  turns?: number;
  colorA?: string;
  colorB?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function DNAHelix({
  height = 2.4,
  radius = 0.22,
  turns = 6,
  colorA = '#22d3ee',
  colorB = '#a78bfa',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: DNAHelixProps) {
  const strandARef = useRef<THREE.Mesh>(null);
  const strandBRef = useRef<THREE.Mesh>(null);
  const ladderRef = useRef<THREE.InstancedMesh>(null);

  const { curveA, curveB, ladderCount, ladderGeom } = useMemo(() => {
    const steps = 200;
    const curvePtsA: THREE.Vector3[] = [];
    const curvePtsB: THREE.Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      curvePtsA.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      curvePtsB.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }
    const curveA = new THREE.CatmullRomCurve3(curvePtsA);
    const curveB = new THREE.CatmullRomCurve3(curvePtsB);
    const ladderGeom = new THREE.CylinderGeometry(0.015, 0.015, radius * 1.8, 8);
    const ladderCount = 40;
    return { curveA, curveB, ladderCount, ladderGeom };
  }, [height, radius, turns]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.6;
    if (strandARef.current) strandARef.current.rotation.y = t;
    if (strandBRef.current) strandBRef.current.rotation.y = -t;
    if (ladderRef.current) ladderRef.current.rotation.y = t * 0.5;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={strandARef}>
        <tubeGeometry args={[curveA, 180, 0.028, 8, false]} />
        <meshStandardMaterial color={colorA} emissive={colorA} emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
      <mesh ref={strandBRef}>
        <tubeGeometry args={[curveB, 180, 0.028, 8, false]} />
        <meshStandardMaterial color={colorB} emissive={colorB} emissiveIntensity={0.6} roughness={0.3} />
      </mesh>

      {/* Peldaños (bases) */}
      <instancedMesh ref={ladderRef} args={[ladderGeom, new THREE.MeshStandardMaterial({ color: '#93c5fd', metalness: 0.2, roughness: 0.4 }), ladderCount]}>
        <primitive object={ladderGeom} attach="geometry" />
      </instancedMesh>
    </group>
  );
}
