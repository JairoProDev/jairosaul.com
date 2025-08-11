'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BrainParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export default function BrainParticles({ 
  count = 1000, 
  color = '#4f46e5', 
  size = 0.02, 
  speed = 1 
}: BrainParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Posiciones iniciales en forma de cerebro
      const radius = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Velocidades aleatorias
      velocities[i * 3] = (Math.random() - 0.5) * 0.01 * speed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01 * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01 * speed;
    }
    
    return [positions, velocities];
  }, [count, speed]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        // Actualizar posiciones
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Mantener partículas dentro del área del cerebro
        const distance = Math.sqrt(
          positions[i * 3] ** 2 + 
          positions[i * 3 + 1] ** 2 + 
          positions[i * 3 + 2] ** 2
        );
        
        if (distance > 15) {
          // Rebote en los límites
          const scale = 15 / distance;
          positions[i * 3] *= scale;
          positions[i * 3 + 1] *= scale;
          positions[i * 3 + 2] *= scale;
          
          // Invertir velocidades
          velocities[i * 3] *= -0.8;
          velocities[i * 3 + 1] *= -0.8;
          velocities[i * 3 + 2] *= -0.8;
        }
        
        if (distance < 6) {
          // Evitar que se acerquen demasiado al centro
          const scale = 6 / distance;
          positions[i * 3] *= scale;
          positions[i * 3 + 1] *= scale;
          positions[i * 3 + 2] *= scale;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function SynapticFlows() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const [lines] = useMemo(() => {
    const positions: number[] = [];
    const numLines = 300;
    
    for (let i = 0; i < numLines; i++) {
      // Crear flujos sinápticos que se mueven
      const startRadius = 7 + Math.random() * 8;
      const endRadius = 7 + Math.random() * 8;
      
      const startTheta = Math.random() * Math.PI * 2;
      const startPhi = Math.random() * Math.PI;
      const endTheta = startTheta + (Math.random() - 0.5) * Math.PI;
      const endPhi = startPhi + (Math.random() - 0.5) * Math.PI;
      
      const startX = startRadius * Math.sin(startPhi) * Math.cos(startTheta);
      const startY = startRadius * Math.sin(startPhi) * Math.sin(startTheta);
      const startZ = startRadius * Math.cos(startPhi);
      
      const endX = endRadius * Math.sin(endPhi) * Math.cos(endTheta);
      const endY = endRadius * Math.sin(endPhi) * Math.sin(endTheta);
      const endZ = endRadius * Math.cos(endPhi);
      
      positions.push(startX, startY, startZ, endX, endY, endZ);
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.0003;
      linesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[lines as unknown as Float32Array, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4f46e5"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function NeuralPulses() {
  const pulsesRef = useRef<THREE.Points>(null);
  const [pulses] = useMemo(() => {
    const positions = [];
    const numPulses = 200;
    
    for (let i = 0; i < numPulses; i++) {
      const radius = 9 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (pulsesRef.current) {
      const material = pulsesRef.current.material as THREE.PointsMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        material.size = 0.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      }
    }
  });

  return (
    <points ref={pulsesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pulses as unknown as Float32Array, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#10b981"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
