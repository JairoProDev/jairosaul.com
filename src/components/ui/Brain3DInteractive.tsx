'use client';

import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function createBrainMaterial() {
  type PulseMaterial = THREE.MeshPhysicalMaterial & { tick?: (dt: number) => void };
      const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e2e2e2'), // Color gris claro más cercano al color real del cerebro
    roughness: 0.25, 
    metalness: 0.03,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15,
    transmission: 0.2, // Menos transparente para más solidez
    ior: 1.2,
    thickness: 0.25,
    emissive: new THREE.Color('#3b82f6'),
    emissiveIntensity: 0.15,
    transparent: true,
    opacity: 0.92, // Menos transparencia para más definición
  }) as PulseMaterial;

  let shaderRef: { uniforms: Record<string, { value: number }> } | null = null;
  mat.onBeforeCompile = (shader: { uniforms: Record<string, { value: number }>; vertexShader: string; fragmentShader: string }) => {
    shader.uniforms.uTime = { value: 0 };
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>\n varying vec3 vPos;`
    ).replace(
      '#include <beginnormal_vertex>',
      `#include <beginnormal_vertex>\n vPos = (modelMatrix * vec4(position,1.0)).xyz;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>\n varying vec3 vPos; uniform float uTime;`
    ).replace(
      'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
      `vec3 p = vPos * 10.0;\n 
       float grid1 = (sin(p.x)+sin(p.y*1.3)+sin(p.z*1.7))/3.0;\n 
       float grid2 = (sin(p.x*2.0)+sin(p.y*2.5)+sin(p.z*3.0))/3.0;\n 
       float lines1 = smoothstep(0.85, 0.95, abs(grid1));\n 
       float lines2 = smoothstep(0.80, 0.90, abs(grid2));\n 
       vec3 circuitColor1 = vec3(0.2,0.8,0.4); // Verde\n 
       vec3 circuitColor2 = vec3(0.8,0.2,0.8); // Púrpura\n 
       vec3 circuitColor3 = vec3(0.2,0.4,0.8); // Azul\n 
       outgoingLight += circuitColor1 * lines1 * 0.4;\n 
       outgoingLight += circuitColor2 * lines2 * 0.3;\n 
       outgoingLight += circuitColor3 * (1.0 - lines1) * 0.2;\n 
       gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
    );
    shaderRef = shader;
  };

  mat.tick = (dt: number) => {
    if (!shaderRef) return;
    shaderRef.uniforms.uTime.value += dt;
  };

  return mat;
}

function ProceduralBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => createBrainMaterial(), []);
  
  // Geometría principal del cerebro
  const geometry = useMemo(() => {
    // Usamos una subdivisión mayor para más detalle
    const geom = new THREE.IcosahedronGeometry(1, 6);
    const pos = geom.attributes.position as THREE.BufferAttribute;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = clamp((x - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };
    
    // Función de ruido simple para crear más detalle
    const noise = (x: number, y: number, z: number, scale = 1) => {
      return Math.sin(x * 7.3 * scale) * Math.cos(y * 6.2 * scale) * Math.sin(z * 5.1 * scale) * 0.5 +
             Math.sin(x * 11.9 * scale + 0.5) * Math.cos(y * 10.8 * scale + 1.2) * Math.sin(z * 9.7 * scale + 0.7) * 0.25 +
             Math.sin(x * 25.6 * scale + 1.7) * Math.cos(y * 24.8 * scale + 2.3) * Math.sin(z * 23.7 * scale + 3.1) * 0.125;
    };

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i); const vy = pos.getY(i); const vz = pos.getZ(i);
      const dir = new THREE.Vector3(vx, vy, vz).normalize();

      // Forma base del cerebro: elipsoide asimétrico más pronunciado
      const scaleX = 1.5; // Más ancho
      const scaleY = 1.15; // Altura media
      const scaleZ = 1.65; // Más profundo
      let x = dir.x * scaleX;
      let y = dir.y * scaleY;
      let z = dir.z * scaleZ;

      // Cisura longitudinal (división entre hemisferios) - más profunda
      const fissureDepth = 0.25;
      const fissureWidth = 0.35;
      const fissure = smoothstep(0, fissureWidth, Math.abs(dir.x));
      const fissureEffect = (1 - fissure) * fissureDepth;
      x *= (1 - fissureEffect);
      
      // Cisura central (Rolando)
      if (dir.z > -0.1 && dir.z < 0.3) {
        const centralSulcus = smoothstep(-0.1, 0.1, dir.z) * smoothstep(0.3, 0.1, dir.z);
        const depth = 0.12 * centralSulcus;
        z -= depth * dir.z;
      }

      // Lóbulos específicos con más volumen
      // Frontal (superior-anterior)
      if (dir.y > 0.3 && dir.z > -0.2) {
        const frontal = smoothstep(0.3, 0.8, dir.y) * smoothstep(-0.2, 0.5, dir.z);
        const bulge = 0.15 * frontal;
        x *= (1 + bulge * Math.abs(dir.x));
        y *= (1 + bulge);
        
        // Añadir convolucionado al lóbulo frontal
        const frontNoise = noise(x * 2, y * 2, z * 2, 2.5) * 0.06 * frontal;
        x += frontNoise * dir.x;
        y += frontNoise * dir.y;
        z += frontNoise * dir.z;
      }

      // Temporal (lateral) - más prominente
      if (Math.abs(dir.x) > 0.5 && dir.y < 0.2) {
        const temporal = smoothstep(0.5, 0.9, Math.abs(dir.x)) * smoothstep(0.2, -0.4, dir.y);
        const bulge = 0.12 * temporal;
        x *= (1 + bulge);
        z *= (1 + bulge * 0.7);
        
        // Surco temporal superior
        if (dir.y > -0.2 && dir.y < 0) {
          const temporalSulcus = smoothstep(-0.2, -0.1, dir.y) * smoothstep(0, -0.1, dir.y);
          const depth = 0.1 * temporalSulcus * temporal;
          y -= depth;
        }
      }

      // Parietal (superior-posterior)
      if (dir.y > 0.2 && dir.z < -0.2) {
        const parietal = smoothstep(0.2, 0.7, dir.y) * smoothstep(-0.2, -0.8, dir.z);
        const bulge = 0.14 * parietal;
        y *= (1 + bulge);
        z *= (1 + bulge * 0.4);
        
        // Más textura al lóbulo parietal
        const parietalNoise = noise(x, y, z, 3.2) * 0.05 * parietal;
        x += parietalNoise * dir.x;
        y += parietalNoise * dir.y;
        z += parietalNoise * dir.z;
      }

      // Occipital (posterior) - más pronunciado
      if (dir.z < -0.5) {
        const occipital = smoothstep(-0.5, -0.9, dir.z);
        const bulge = 0.18 * occipital;
        z *= (1 + bulge);
        y *= (1 + bulge * 0.25);
        
        // Surco calcáreo
        if (Math.abs(dir.x) < 0.2) {
          const calcarine = smoothstep(0.2, 0.05, Math.abs(dir.x));
          const depth = 0.12 * calcarine * occipital;
          x -= depth * dir.x;
        }
      }

      // Cerebelo (inferior-posterior) - más detallado
      if (dir.y < -0.2 && dir.z < -0.3) {
        const cerebellum = smoothstep(-0.2, -0.6, dir.y) * smoothstep(-0.3, -0.8, dir.z);
        const bulge = 0.22 * cerebellum;
        y *= (1 + bulge);
        z *= (1 + bulge * 0.5);
        
        // Añadir surcos cerebelosos
        if (cerebellum > 0.2) {
          const cerebellarFolds = Math.sin(x * 18) * Math.sin(y * 20) * Math.sin(z * 22) * 0.03;
          x += cerebellarFolds * dir.x;
          y += cerebellarFolds * dir.y;
          z += cerebellarFolds * dir.z;
        }
      }

      // Tallo cerebral (inferior-central)
      if (dir.y < -0.5 && Math.abs(dir.x) < 0.3 && dir.z > -0.3) {
        const stem = smoothstep(-0.5, -0.8, dir.y) * smoothstep(0.3, 0, Math.abs(dir.x)) * smoothstep(-0.3, 0.2, dir.z);
        const extension = 0.3 * stem;
        y -= extension;
        
        // Estrechar el tallo
        x *= (1 - stem * 0.3);
        z *= (1 - stem * 0.2);
      }

      // Pliegues cerebrales (gyri y sulci) con múltiples frecuencias y más profundidad
      let gyriDepth = 0.0;
      
      // Primera capa de surcos principales - más profundos
      const g1 = Math.sin(x * 28.0) * Math.cos(y * 26.0) * Math.sin(z * 30.0) * 0.012;
      
      // Segunda capa de surcos secundarios
      const g2 = Math.sin(x * 52.0 + y * 7.0) * Math.cos(z * 48.0) * 0.008;
      
      // Tercera capa de micropliegues
      const g3 = Math.sin(y * 38.0 + z * 9.0) * Math.cos(x * 42.0) * 0.006;
      
      // Capa adicional de surcos aleatorios para más realismo
      const g4 = Math.sin(x * 78.0 + z * 5.0) * Math.cos(y * 82.0 + x * 3.0) * 0.004;
      
      gyriDepth = g1 + g2 + g3 + g4;

      // Aplicar deformación final con mayor intensidad en los pliegues
      const radial = 1.0 + gyriDepth * 1.2; // Aumentar la intensidad de los pliegues
      x *= radial; y *= radial; z *= radial;

      pos.setXYZ(i, x, y, z);
    }

    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      const matWithTick = mat as unknown as { tick?: (dt: number) => void };
      if (matWithTick?.tick) matWithTick.tick(delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cerebro principal con material complejo */}
      <mesh ref={mainMeshRef} geometry={geometry} material={mat} scale={0.6} castShadow receiveShadow />
      
      {/* Efecto de brillo/halo alrededor del cerebro */}
      <mesh scale={0.62}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function NeuralParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo(() => {
    // Use fixed values instead of random for hydration consistency
    const positions = [
      { time: 25, factor: 65, speed: 0.02, x: -1.2, y: 0.8, z: -0.5 },
      { time: 50, factor: 45, speed: 0.015, x: 1.1, y: -0.7, z: 0.3 },
      { time: 75, factor: 85, speed: 0.018, x: 0.2, y: 1.3, z: -0.9 },
      { time: 10, factor: 25, speed: 0.01, x: -0.5, y: -0.3, z: 1.2 },
      { time: 35, factor: 55, speed: 0.022, x: 0.7, y: 0.5, z: 0.8 },
      { time: 60, factor: 75, speed: 0.012, x: -0.9, y: -1.1, z: -0.4 },
      { time: 85, factor: 40, speed: 0.017, x: 0.4, y: -0.8, z: -1.1 },
      { time: 15, factor: 60, speed: 0.019, x: -1.3, y: 0.3, z: 0.6 },
      { time: 45, factor: 30, speed: 0.013, x: 0.8, y: 1.0, z: 0.1 },
      { time: 70, factor: 50, speed: 0.016, x: -0.2, y: -0.5, z: -0.7 },
      { time: 30, factor: 80, speed: 0.021, x: 1.2, y: 0.2, z: -0.3 },
      { time: 55, factor: 70, speed: 0.014, x: -0.6, y: -1.2, z: 0.9 },
      { time: 80, factor: 35, speed: 0.023, x: 0.5, y: 0.6, z: -1.0 },
      { time: 20, factor: 90, speed: 0.011, x: -1.1, y: -0.4, z: 0.7 },
      { time: 40, factor: 100, speed: 0.02, x: 0.9, y: 1.1, z: 0.2 },
      { time: 65, factor: 120, speed: 0.015, x: -0.8, y: -0.9, z: -0.8 },
      { time: 90, factor: 110, speed: 0.018, x: 0.6, y: 0.4, z: 1.1 },
      { time: 5, factor: 95, speed: 0.013, x: -0.3, y: -1.0, z: -0.6 },
      { time: 95, factor: 105, speed: 0.016, x: 1.0, y: 0.9, z: 0.4 },
      { time: 38, factor: 48, speed: 0.019, x: -0.7, y: -0.2, z: 1.0 },
      { time: 72, factor: 62, speed: 0.012, x: 0.3, y: 1.2, z: -0.2 },
      { time: 18, factor: 42, speed: 0.021, x: -0.4, y: -0.6, z: 0.5 },
      { time: 58, factor: 52, speed: 0.014, x: 1.3, y: 0.7, z: -1.2 },
      { time: 33, factor: 82, speed: 0.017, x: -1.0, y: -1.3, z: 1.3 },
      { time: 88, factor: 72, speed: 0.011, x: 0.1, y: 0.1, z: -1.3 },
      { time: 28, factor: 32, speed: 0.022, x: -1.4, y: -0.1, z: 0.0 },
      { time: 78, factor: 22, speed: 0.016, x: 1.4, y: 1.4, z: -0.1 },
      { time: 13, factor: 78, speed: 0.019, x: -0.1, y: -1.4, z: 1.4 },
      { time: 53, factor: 68, speed: 0.013, x: 0.0, y: 0.0, z: 0.0 },
      { time: 93, factor: 115, speed: 0.015, x: 1.5, y: -1.5, z: 1.5 },
    ];
    
    // Use only the number of items needed
    return positions.slice(0, count);
  }, [count]);

  useFrame(() => {
    particles.forEach((particle) => {
      particle.time += particle.speed;
      if (particle.time > 1) particle.time = 0;
    });
  });

  return (
    <group>
      {particles.map((particle, _i) => (
        <mesh key={`neural-particle-${_i}-${particle.x.toFixed(2)}-${particle.y.toFixed(2)}-${particle.z.toFixed(2)}`} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function SynapticConnections({ count = 50 }: { count?: number }) {
  const connections = useMemo(() => {
    // Use predefined connections for hydration consistency
    const predefinedConnections = [
      { start: new THREE.Vector3(-1.2, 0.8, -0.5), end: new THREE.Vector3(1.1, -0.7, 0.3), color: '#10b981', speed: 0.015, time: 25 },
      { start: new THREE.Vector3(0.2, 1.3, -0.9), end: new THREE.Vector3(-0.5, -0.3, 1.2), color: '#3b82f6', speed: 0.018, time: 50 },
      { start: new THREE.Vector3(0.7, 0.5, 0.8), end: new THREE.Vector3(-0.9, -1.1, -0.4), color: '#10b981', speed: 0.012, time: 75 },
      { start: new THREE.Vector3(0.4, -0.8, -1.1), end: new THREE.Vector3(-1.3, 0.3, 0.6), color: '#3b82f6', speed: 0.019, time: 10 },
      { start: new THREE.Vector3(0.8, 1.0, 0.1), end: new THREE.Vector3(-0.2, -0.5, -0.7), color: '#10b981', speed: 0.016, time: 35 },
      { start: new THREE.Vector3(1.2, 0.2, -0.3), end: new THREE.Vector3(-0.6, -1.2, 0.9), color: '#3b82f6', speed: 0.014, time: 60 },
      { start: new THREE.Vector3(0.5, 0.6, -1.0), end: new THREE.Vector3(-1.1, -0.4, 0.7), color: '#10b981', speed: 0.011, time: 85 },
      { start: new THREE.Vector3(0.9, 1.1, 0.2), end: new THREE.Vector3(-0.8, -0.9, -0.8), color: '#3b82f6', speed: 0.015, time: 15 },
      { start: new THREE.Vector3(0.6, 0.4, 1.1), end: new THREE.Vector3(-0.3, -1.0, -0.6), color: '#10b981', speed: 0.013, time: 45 },
      { start: new THREE.Vector3(1.0, 0.9, 0.4), end: new THREE.Vector3(-0.7, -0.2, 1.0), color: '#3b82f6', speed: 0.019, time: 70 },
      { start: new THREE.Vector3(0.3, 1.2, -0.2), end: new THREE.Vector3(-0.4, -0.6, 0.5), color: '#10b981', speed: 0.021, time: 30 },
      { start: new THREE.Vector3(1.3, 0.7, -1.2), end: new THREE.Vector3(-1.0, -1.3, 1.3), color: '#3b82f6', speed: 0.014, time: 55 },
      { start: new THREE.Vector3(0.1, 0.1, -1.3), end: new THREE.Vector3(-1.4, -0.1, 0.0), color: '#10b981', speed: 0.017, time: 80 },
      { start: new THREE.Vector3(1.4, 1.4, -0.1), end: new THREE.Vector3(-0.1, -1.4, 1.4), color: '#3b82f6', speed: 0.011, time: 20 },
      { start: new THREE.Vector3(0.0, 0.0, 0.0), end: new THREE.Vector3(1.5, -1.5, 1.5), color: '#10b981', speed: 0.022, time: 40 },
      { start: new THREE.Vector3(-1.5, 1.5, -1.5), end: new THREE.Vector3(1.5, 1.5, 1.5), color: '#3b82f6', speed: 0.016, time: 65 },
      { start: new THREE.Vector3(-1.0, 1.0, -1.0), end: new THREE.Vector3(1.0, 1.0, 1.0), color: '#10b981', speed: 0.019, time: 90 },
      { start: new THREE.Vector3(-0.5, 0.5, -0.5), end: new THREE.Vector3(0.5, 0.5, 0.5), color: '#3b82f6', speed: 0.013, time: 5 },
      { start: new THREE.Vector3(-1.8, 0.2, -0.7), end: new THREE.Vector3(0.7, -0.2, 1.8), color: '#10b981', speed: 0.015, time: 95 },
      { start: new THREE.Vector3(-0.3, 1.7, -1.1), end: new THREE.Vector3(1.1, -1.7, 0.3), color: '#3b82f6', speed: 0.012, time: 38 },
      { start: new THREE.Vector3(-1.6, -0.4, 0.6), end: new THREE.Vector3(-0.6, 0.4, 1.6), color: '#10b981', speed: 0.021, time: 72 },
      { start: new THREE.Vector3(-0.1, -1.5, 0.8), end: new THREE.Vector3(-0.8, 1.5, 0.1), color: '#3b82f6', speed: 0.014, time: 18 },
      { start: new THREE.Vector3(1.6, 0.3, -1.3), end: new THREE.Vector3(1.3, -0.3, -1.6), color: '#10b981', speed: 0.017, time: 58 },
      { start: new THREE.Vector3(0.2, 1.9, 0.5), end: new THREE.Vector3(-0.5, -1.9, -0.2), color: '#3b82f6', speed: 0.011, time: 33 },
      { start: new THREE.Vector3(-1.2, -0.8, -0.9), end: new THREE.Vector3(0.9, 0.8, 1.2), color: '#10b981', speed: 0.022, time: 88 },
      { start: new THREE.Vector3(0.7, -1.7, -1.4), end: new THREE.Vector3(1.4, 1.7, -0.7), color: '#3b82f6', speed: 0.016, time: 28 },
      { start: new THREE.Vector3(-1.9, 0.1, 1.0), end: new THREE.Vector3(-1.0, -0.1, 1.9), color: '#10b981', speed: 0.019, time: 78 },
      { start: new THREE.Vector3(0.4, 0.6, 1.8), end: new THREE.Vector3(-1.8, -0.6, -0.4), color: '#3b82f6', speed: 0.013, time: 13 },
      { start: new THREE.Vector3(1.2, -0.5, -0.1), end: new THREE.Vector3(0.1, 0.5, -1.2), color: '#10b981', speed: 0.015, time: 53 },
      { start: new THREE.Vector3(-0.9, -1.1, -1.6), end: new THREE.Vector3(1.6, 1.1, 0.9), color: '#3b82f6', speed: 0.018, time: 93 },
    ];
    
    // Return only the number requested
    return predefinedConnections.slice(0, count);
  }, [count]);

  useFrame(() => {
    connections.forEach((connection) => {
      connection.time += connection.speed;
      if (connection.time > 1) connection.time = 0;
    });
  });

  return (
    <group>
      {connections.map((connection, _i) => (
        <line key={`connection-${_i}-${connection.start.x.toFixed(2)}-${connection.start.y.toFixed(2)}-${connection.end.z.toFixed(2)}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                connection.start.x, connection.start.y, connection.start.z,
                connection.end.x, connection.end.y, connection.end.z
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={connection.color}
            transparent
            opacity={0.3 + Math.sin(connection.time * Math.PI * 2) * 0.2}
          />
        </line>
      ))}
    </group>
  );
}

function NeurotransmitterParticles({ count = 100 }: { count?: number }) {
  const particles = useMemo(() => {
    // Predefined particles for consistent hydration
    const predefinedParticles = [
      { time: 25, speed: 0.03, x: -2.5, y: 1.8, z: -1.5, color: '#10b981' },
      { time: 50, speed: 0.04, x: 2.1, y: -1.7, z: 1.3, color: '#3b82f6' },
      { time: 75, speed: 0.035, x: 0.5, y: 2.8, z: -2.2, color: '#a78bfa' },
      { time: 10, speed: 0.025, x: -1.5, y: -0.8, z: 2.5, color: '#10b981' },
      { time: 35, speed: 0.045, x: 1.7, y: 1.2, z: 1.8, color: '#3b82f6' },
      { time: 60, speed: 0.03, x: -2.2, y: -2.5, z: -1.2, color: '#a78bfa' },
      { time: 85, speed: 0.035, x: 1.2, y: -1.9, z: -2.7, color: '#10b981' },
      { time: 15, speed: 0.04, x: -2.8, y: 0.7, z: 1.5, color: '#3b82f6' },
      { time: 45, speed: 0.025, x: 1.9, y: 2.3, z: 0.4, color: '#a78bfa' },
      { time: 70, speed: 0.035, x: -0.6, y: -1.2, z: -1.8, color: '#10b981' },
      { time: 30, speed: 0.045, x: 2.7, y: 0.5, z: -0.9, color: '#3b82f6' },
      { time: 55, speed: 0.025, x: -1.4, y: -2.7, z: 2.2, color: '#a78bfa' },
      { time: 80, speed: 0.04, x: 1.1, y: 1.5, z: -2.4, color: '#10b981' },
      { time: 20, speed: 0.03, x: -2.6, y: -0.9, z: 1.7, color: '#3b82f6' },
      { time: 40, speed: 0.035, x: 2.2, y: 2.6, z: 0.5, color: '#a78bfa' },
    ];
    
    // Create 100 particles from the templates, repeating as needed
    const result = [];
    for (let i = 0; i < count; i++) {
      const template = predefinedParticles[i % predefinedParticles.length];
      // Small variations that don't affect hydration
      result.push({
        ...template,
        // Offset the time slightly for each group to avoid all particles moving in sync
        time: template.time + Math.floor(i / predefinedParticles.length) * 10,
      });
    }
    
    return result;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle) => {
      particle.time += particle.speed;
      if (particle.time > 1) particle.time = 0;
    });
  });

  return (
    <group>
      {particles.map((particle, _i) => (
        <mesh key={`neuro-particle-${_i}-${particle.x.toFixed(3)}-${particle.y.toFixed(3)}-${particle.z.toFixed(3)}`} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.4 + Math.sin(particle.time * Math.PI * 2) * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeuralExplosions({ count = 8 }: { count?: number }) {
  const explosions = useMemo(() => {
    // Predefined explosion positions for consistent hydration
    const predefinedExplosions = [
      { time: 15, speed: 0.008, x: -1.2, y: 0.8, z: -0.5, color: '#f59e0b' },
      { time: 35, speed: 0.012, x: 0.9, y: -0.7, z: 0.3, color: '#ef4444' },
      { time: 65, speed: 0.007, x: 0.2, y: 1.1, z: -0.8, color: '#f59e0b' },
      { time: 85, speed: 0.01, x: -0.5, y: -0.3, z: 1.0, color: '#ef4444' },
      { time: 25, speed: 0.009, x: 0.7, y: 0.5, z: 0.6, color: '#f59e0b' },
      { time: 45, speed: 0.011, x: -0.8, y: -0.9, z: -0.4, color: '#ef4444' },
      { time: 75, speed: 0.006, x: 0.4, y: -0.6, z: -1.1, color: '#f59e0b' },
      { time: 55, speed: 0.013, x: -1.0, y: 0.3, z: 0.6, color: '#ef4444' },
    ];
    
    // Return only the requested number of explosions
    return predefinedExplosions.slice(0, count);
  }, [count]);

  useFrame(() => {
    explosions.forEach((explosion) => {
      explosion.time += explosion.speed;
      if (explosion.time > 1) explosion.time = 0;
    });
  });

  return (
    <group>
      {explosions.map((explosion, _i) => (
        <group key={`explosion-${_i}-${explosion.x.toFixed(2)}-${explosion.y.toFixed(2)}-${explosion.z.toFixed(2)}`} position={[explosion.x, explosion.y, explosion.z]}>
          {[...Array(12)].map((_, j) => (
            <mesh key={`explosion-particle-${_i}-${j}`} position={[
              Math.cos(j * Math.PI / 6) * (0.5 + explosion.time * 2),
              Math.sin(j * Math.PI / 6) * (0.5 + explosion.time * 2),
              0
            ]}>
              <sphereGeometry args={[0.02, 4, 4]} />
              <meshStandardMaterial
                color={explosion.color}
                emissive={explosion.color}
                emissiveIntensity={1}
                transparent
                opacity={1 - explosion.time}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function BrainScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      
      {/* Luces principales */}
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-2, -2, 2]} intensity={1.2} color="#10b981" />
      
      {/* Luces adicionales para resaltar texturas */}
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[3, 0, 0]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[-3, 0, 0]} intensity={0.6} color="#34d399" />
      <pointLight position={[0, 0, 3]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[0, 0, -3]} intensity={0.7} color="#f59e0b" />
      
      {/* Luces de relleno para eliminar sombras duras */}
      <pointLight position={[1, 1, 1]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-1, -1, -1]} intensity={0.4} color="#ffffff" />
      
      <ProceduralBrain />
      <NeuralParticles count={30} />
      <SynapticConnections count={50} />
      <NeurotransmitterParticles count={100} />
      <NeuralExplosions count={8} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </>
  );
}

export default function Brain3DInteractive() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
              <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
        <Suspense fallback={null}>
          <BrainScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
