'use client';

import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function createBrainMaterial() {
  type PulseMaterial = THREE.MeshPhysicalMaterial & { tick?: (dt: number) => void };
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'), // Color blanco base
    roughness: 0.2,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transmission: 0.3, // Más transparente
    ior: 1.1,
    thickness: 0.2,
    emissive: new THREE.Color('#3b82f6'),
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.85, // Transparencia adicional
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

function GLBBrain() {
  const { scene } = useGLTF('/models/brain.glb');
  const groupRef = useRef<THREE.Group>(null);

  const mat = useMemo(() => createBrainMaterial(), []);

  useMemo(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = mat;
      }
    });
  }, [scene, mat]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003;
    (mat as unknown as { tick?: (dt: number) => void }).tick?.(delta);
  });

  return <primitive ref={groupRef} object={scene} scale={0.6} />; // Más pequeño
}

function NeuralParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.02;
      const x = Math.random() * 3 - 1.5;
      const y = Math.random() * 3 - 1.5;
      const z = Math.random() * 3 - 1.5;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle) => {
      particle.time += particle.speed;
      if (particle.time > 1) particle.time = 0;
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={`neural-particle-${i}`} position={[particle.x, particle.y, particle.z]}>
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
    const temp = [];
    for (let i = 0; i < count; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      const color = Math.random() > 0.5 ? '#10b981' : '#3b82f6';
      const speed = 0.01 + Math.random() * 0.02;
      temp.push({ start, end, color, speed, time: Math.random() * 100 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    connections.forEach((connection) => {
      connection.time += connection.speed;
      if (connection.time > 1) connection.time = 0;
    });
  });

  return (
    <group>
      {connections.map((connection, i) => (
        <line key={`connection-${i}`}>
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
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const speed = 0.02 + Math.random() * 0.03;
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      const color = Math.random() > 0.6 ? '#10b981' : Math.random() > 0.3 ? '#3b82f6' : '#a78bfa';
      temp.push({ time, speed, x, y, z, color });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle) => {
      particle.time += particle.speed;
      if (particle.time > 1) particle.time = 0;
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={`neuro-particle-${i}`} position={[particle.x, particle.y, particle.z]}>
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
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const speed = 0.005 + Math.random() * 0.01;
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      const color = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
      temp.push({ time, speed, x, y, z, color });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    explosions.forEach((explosion) => {
      explosion.time += explosion.speed;
      if (explosion.time > 1) explosion.time = 0;
    });
  });

  return (
    <group>
      {explosions.map((explosion, i) => (
        <group key={`explosion-${i}`} position={[explosion.x, explosion.y, explosion.z]}>
          {[...Array(12)].map((_, j) => (
            <mesh key={`explosion-particle-${i}-${j}`} position={[
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
      
      <GLBBrain />
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
