'use client';

import { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import DNAHelix from './DNAHelix';

const LOBES = [
  { key: 'frontal', name: 'Lóbulo Frontal', desc: 'Proyectos y Creaciones', color: '#4f46e5', href: '/proyectos', position: new THREE.Vector3(0.95, 0.2, 0.25) },
  { key: 'temporal', name: 'Lóbulo Temporal', desc: 'Ideas y Pensamientos', color: '#10b981', href: '/ideas', position: new THREE.Vector3(-0.7, -0.05, 0.65) },
  { key: 'parietal', name: 'Lóbulo Parietal', desc: 'El Manifiesto', color: '#f59e0b', href: '/manifiesto', position: new THREE.Vector3(0.2, 0.85, -0.2) },
  { key: 'occipital', name: 'Lóbulo Occipital', desc: 'Visión y Futuro', color: '#a78bfa', href: '/vision', position: new THREE.Vector3(-0.25, -0.7, -0.55) },
];

function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    return () => { try { ctxRef.current?.close(); } catch { /* noop */ } };
  }, []);
  return (freq = 660, duration = 0.07, gain = 0.02) => {
    type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const w = window as AudioWindow;
    const AudioCtx = w.AudioContext ?? w.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = ctxRef.current || new AudioCtx();
    ctxRef.current = ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + duration);
  };
}

function createBrainMaterial() {
  type PulseMaterial = THREE.MeshPhysicalMaterial & { tick?: (dt: number) => void };
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#cbd5e1'),
    roughness: 0.35,
    metalness: 0.0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    transmission: 0.12,
    ior: 1.18,
    thickness: 0.5,
    emissive: new THREE.Color('#3b82f6'),
    emissiveIntensity: 0.22,
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
      `vec3 p = vPos * 6.0;\n float grid = (sin(p.x)+sin(p.y*1.3)+sin(p.z*1.7))/3.0;\n float lines = smoothstep(0.88, 0.98, abs(grid));\n vec3 circuitColor = vec3(0.25,0.55,1.0);\n outgoingLight += circuitColor * lines * 0.25;\n gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
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
  const meshRef = useRef<THREE.Mesh>(null);
  // const materialRef = useRef<THREE.Material | null>(null); // not needed

  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 6);
    const pos = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const y = pos.getY(i); const z = pos.getZ(i);
      const r = Math.sqrt(x * x + y * y + z * z);
      const folds = Math.sin(x * 8.0) * Math.cos(y * 7.0) * Math.sin(z * 9.0) * 0.06;
      const scale = 1.0 + folds + (Math.sin(r * 12.0) * 0.03);
      pos.setXYZ(i, x * scale, y * scale, z * scale);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial & { tick?: (dt: number) => void };
    if (mat?.tick) mat.tick(delta);
  });

  const mat = useMemo(() => createBrainMaterial(), []);

  return <mesh ref={meshRef} geometry={geometry} material={mat} castShadow receiveShadow scale={1.05} />;
}

function NeuralParticles({ count = 1000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr: number[] = [];
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.push(x, y, z);
    }
    return new Float32Array(arr);
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.018} sizeAttenuation transparent opacity={0.35} />
    </points>
  );
}

function SynapseArcs({ arcs = 20 }: { arcs?: number }) {
  const group = useRef<THREE.Group>(null);
  const tubes = useMemo(() => {
    const items: { curve: THREE.CatmullRomCurve3; color: string; phase: number }[] = [];
    for (let i = 0; i < arcs; i++) {
      const a1 = new THREE.Vector3().randomDirection().multiplyScalar(1.15);
      const a2 = new THREE.Vector3().randomDirection().multiplyScalar(1.15);
      const mid = a1.clone().add(a2).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.25, 0));
      const curve = new THREE.CatmullRomCurve3([a1, mid, a2]);
      const colors = ['#22d3ee', '#f59e0b', '#a78bfa', '#34d399', '#60a5fa'];
      const color = colors[i % colors.length];
      items.push({ curve, color, phase: Math.random() });
    }
    return items;
  }, [arcs]);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <group ref={group}>
      {tubes.map((t, idx) => (
        <group key={idx}>
          <mesh>
            <tubeGeometry args={[t.curve, 32, 0.009, 8, false]} />
            <meshBasicMaterial color={t.color} transparent opacity={0.3} />
          </mesh>
          {/* pulso luminoso que recorre el arco */}
          <PulseAlongCurve curve={t.curve} color={t.color} phase={t.phase} />
        </group>
      ))}
    </group>
  );
}

function PulseAlongCurve({ curve, color, phase = 0 }: { curve: THREE.Curve<THREE.Vector3>; color: string; phase?: number }) {
  const m = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!m.current) return;
    const t = (phase + (clock.elapsedTime * 0.2) % 1);
    const p = curve.getPointAt(t % 1);
    m.current.position.copy(p);
  });
  return (
    <mesh ref={m}>
      <sphereGeometry args={[0.02, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function LobeHotspots({ onFocus }: { onFocus: (lobe: typeof LOBES[number]) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const sphereRef = useRef<THREE.Mesh[]>([]);
  const beep = useBeep();

  useFrame(() => {
    sphereRef.current.forEach((m, idx) => {
      if (!m) return;
      m.scale.setScalar(1 + (hovered === LOBES[idx].key ? 0.25 : 0));
    });
  });

  return (
    <group>
      {LOBES.map((lobe, idx) => (
        <group key={lobe.key} position={lobe.position.multiplyScalar(1.18)}>
          <mesh
            ref={(el) => { if (el) sphereRef.current[idx] = el; }}
            onClick={() => { beep(820, 0.08, 0.03); onFocus(lobe); }}
            onPointerOver={() => { setHovered(lobe.key); beep(520, 0.05, 0.02); }}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshStandardMaterial color={lobe.color} emissive={lobe.color} emissiveIntensity={hovered === lobe.key ? 1.0 : 0.45} transparent opacity={0.9} />
          </mesh>
          {hovered === lobe.key && (
            <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
              <div className="bg-cortex-800/90 border border-cortex-700 rounded-md px-2 py-1 text-[10px] text-glutamate-500 shadow-lg">
                <div className="font-semibold" style={{ color: lobe.color }}>{lobe.name}</div>
                <div className="text-cortex-300">{lobe.desc}</div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

function RoboticArm() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.2;
  });
  return (
    <group ref={group} position={[1.7, -0.6, -0.6]} rotation={[0, -0.5, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.5, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function BrainScene({ onFocus }: { onFocus: (lobe: typeof LOBES[number]) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 8, 5]} angle={0.45} penumbra={0.5} intensity={1.2} castShadow />
      <directionalLight position={[-6, 5, -3]} intensity={0.6} />

      <group>
        <ProceduralBrain />
        <NeuralParticles />
        <SynapseArcs />
        <LobeHotspots onFocus={onFocus} />
        <DNAHelix position={[-1.6, -0.1, 0.6]} scale={0.85} />
        <RoboticArm />
      </group>
    </>
  );
}

function CameraTransition({
  cameraRef,
  controlsRef,
  transitionRef,
}: {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  transitionRef: React.MutableRefObject<{
    t: number; dur: number; startPos: THREE.Vector3; startTarget: THREE.Vector3; endPos: THREE.Vector3; endTarget: THREE.Vector3; href?: string;
  } | null>;
}) {
  useFrame((_, delta) => {
    if (!transitionRef.current || !cameraRef.current || !controlsRef.current) return;
    const tr = transitionRef.current;
    tr.t += delta;
    const k = Math.min(tr.t / tr.dur, 1);
    const ease = k < 0.5 ? 2 * k * k : -1 + (4 - 2 * k) * k; // easeInOutQuad
    const pos = tr.startPos.clone().lerp(tr.endPos, ease);
    const tgt = tr.startTarget.clone().lerp(tr.endTarget, ease);
    cameraRef.current.position.copy(pos);
    controlsRef.current.target.copy(tgt);
    controlsRef.current.update();
    if (k >= 1 && tr.href) {
      const href = tr.href; transitionRef.current = null;
      setTimeout(() => { window.location.href = href; }, 120);
    }
  });
  return null;
}

export default function BrainShowcase() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const transitionRef = useRef<{
    t: number; dur: number; startPos: THREE.Vector3; startTarget: THREE.Vector3; endPos: THREE.Vector3; endTarget: THREE.Vector3; href?: string;
  } | null>(null);

  const startTransition = (lobe: typeof LOBES[number]) => {
    const cam = cameraRef.current as THREE.PerspectiveCamera;
    const aim = lobe.position.clone().normalize();
    const endTarget = aim.clone().multiplyScalar(0.3);
    const endPos = aim.clone().multiplyScalar(2.2).add(new THREE.Vector3(0.15, 0.12, 0.1));
    transitionRef.current = {
      t: 0,
      dur: 0.9,
      startPos: cam.position.clone(),
      startTarget: (controlsRef.current?.target as THREE.Vector3).clone(),
      endPos,
      endTarget,
      href: lobe.href,
    };
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.3], fov: 55 }}
        onCreated={({ camera }) => { cameraRef.current = camera as THREE.PerspectiveCamera; }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <BrainScene onFocus={startTransition} />
        </Suspense>
        <OrbitControls ref={controlsRef as unknown as React.RefObject<OrbitControlsImpl>} enablePan={false} minDistance={2.2} maxDistance={6} autoRotate autoRotateSpeed={0.5} />
        <CameraTransition cameraRef={cameraRef} controlsRef={controlsRef} transitionRef={transitionRef} />
      </Canvas>
    </div>
  );
}
