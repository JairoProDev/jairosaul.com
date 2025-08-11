'use client';

import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function createBrainMaterial() {
  type PulseMaterial = THREE.MeshPhysicalMaterial & { tick?: (dt: number) => void };
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'), // Color blanco para mejor visibilidad
    roughness: 0.3,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.3,
    transmission: 0.05,
    ior: 1.2,
    thickness: 0.3,
    emissive: new THREE.Color('#3b82f6'),
    emissiveIntensity: 0.15,
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
      `vec3 p = vPos * 8.0;\n float grid = (sin(p.x)+sin(p.y*1.3)+sin(p.z*1.7))/3.0;\n float lines = smoothstep(0.85, 0.95, abs(grid));\n vec3 circuitColor = vec3(0.2,0.8,0.4);\n outgoingLight += circuitColor * lines * 0.3;\n gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
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

  return <primitive ref={groupRef} object={scene} scale={0.8} />;
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
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
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
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        minDistance={2}
        maxDistance={8}
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
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <BrainScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
