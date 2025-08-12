'use client';

import { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
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

type BrainStyle = 'segmented' | 'wireframe' | 'crystal' | 'hologram' | 'lowpoly';

function ProceduralBrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 8); // Más subdivisiones para más detalle
    const pos = geom.attributes.position as THREE.BufferAttribute;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = clamp((x - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i); const vy = pos.getY(i); const vz = pos.getZ(i);
      const dir = new THREE.Vector3(vx, vy, vz).normalize();

      // Forma base del cerebro: elipsoide asimétrico
      const scaleX = 1.4; // Más ancho
      const scaleY = 1.1; // Altura media
      const scaleZ = 1.6; // Más profundo
      let x = dir.x * scaleX;
      let y = dir.y * scaleY;
      let z = dir.z * scaleZ;

      // Cisura longitudinal (división entre hemisferios)
      const fissureDepth = 0.15;
      const fissureWidth = 0.3;
      const fissure = smoothstep(0, fissureWidth, Math.abs(dir.x));
      const fissureEffect = (1 - fissure) * fissureDepth;
      x *= (1 - fissureEffect);

      // Lóbulos específicos
      // Frontal (superior-anterior)
      if (dir.y > 0.3 && dir.z > -0.2) {
        const frontal = smoothstep(0.3, 0.8, dir.y) * smoothstep(-0.2, 0.5, dir.z);
        const bulge = 0.12 * frontal;
        x *= (1 + bulge * Math.abs(dir.x));
        y *= (1 + bulge);
      }

      // Temporal (lateral)
      if (Math.abs(dir.x) > 0.6 && dir.y < 0.2) {
        const temporal = smoothstep(0.6, 0.9, Math.abs(dir.x)) * smoothstep(0.2, -0.3, dir.y);
        const bulge = 0.08 * temporal;
        x *= (1 + bulge);
        z *= (1 + bulge * 0.5);
      }

      // Parietal (superior-posterior)
      if (dir.y > 0.2 && dir.z < -0.3) {
        const parietal = smoothstep(0.2, 0.7, dir.y) * smoothstep(-0.3, -0.8, dir.z);
        const bulge = 0.10 * parietal;
        y *= (1 + bulge);
        z *= (1 + bulge * 0.3);
      }

      // Occipital (posterior)
      if (dir.z < -0.5) {
        const occipital = smoothstep(-0.5, -0.9, dir.z);
        const bulge = 0.15 * occipital;
        z *= (1 + bulge);
        y *= (1 + bulge * 0.2);
      }

      // Cerebelo (inferior-posterior)
      if (dir.y < -0.2 && dir.z < -0.2) {
        const cerebellum = smoothstep(-0.2, -0.6, dir.y) * smoothstep(-0.2, -0.7, dir.z);
        const bulge = 0.20 * cerebellum;
        y *= (1 + bulge);
        z *= (1 + bulge * 0.4);
      }

      // Tallo cerebral (inferior-central)
      if (dir.y < -0.4 && Math.abs(dir.x) < 0.3) {
        const stem = smoothstep(-0.4, -0.8, dir.y) * smoothstep(0.3, 0, Math.abs(dir.x));
        const extension = 0.25 * stem;
        y -= extension;
        z *= (1 + extension * 0.2);
      }

      // Pliegues (gyri y sulci) con múltiples frecuencias
      const g1 = Math.sin(x * 25.0) * Math.cos(y * 23.0) * Math.sin(z * 27.0) * 0.008;
      const g2 = Math.sin(x * 45.0 + y * 5.0) * Math.cos(z * 43.0) * 0.005;
      const g3 = Math.sin(y * 35.0 + z * 7.0) * Math.cos(x * 33.0) * 0.004;
      const folds = g1 + g2 + g3;

      // Aplicar deformación final
      const radial = 1.0 + folds;
      x *= radial; y *= radial; z *= radial;

      pos.setXYZ(i, x, y, z);
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

function GLBBrain({ style }: { style: BrainStyle }) {
  // Use procedural brain instead of loading GLB to avoid 404 errors
  if (style === 'crystal') {
    return <ProceduralBrain />;
  }
  return <WireframeBrain />;
}

// Disabled GLB loading to avoid 404 errors
/*
function GLBBrainOriginal({ style }: { style: BrainStyle }) {
  const { scene } = useGLTF('/models/brain.glb');
  const groupRef = useRef<THREE.Group>(null);

  const mat = useMemo(() => {
    if (style === 'crystal') {
      const m = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#7dd3fc'),
        roughness: 0.05,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.9,
        ior: 1.52,
        thickness: 1.2,
        transparent: true,
      });
      return m;
    }
    return createBrainMaterial();
  }, [style]);

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
*/

function SegmentedBrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 3); // lowpoly para ver facetas
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const colors: number[] = [];
    const colorA = new THREE.Color('#ef4444'); // rojo
    const colorB = new THREE.Color('#10b981'); // verde
    const colorC = new THREE.Color('#a78bfa'); // violeta
    const colorD = new THREE.Color('#f59e0b'); // naranja
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).normalize();
      let c: THREE.Color;
      if (v.x >= 0.15 && v.y >= 0) c = colorA; // frontal
      else if (v.x < -0.05 && v.z > 0) c = colorB; // temporal
      else if (v.y > 0.4) c = colorD; // parietal
      else c = colorC; // occipital
      colors.push(c.r, c.g, c.b);
    }
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.003; });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.05} castShadow receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.35} metalness={0.05} />
    </mesh>
  );
}

function WireframeBrain() {
  const group = useRef<THREE.Group>(null);
  const baseGeom = useMemo(() => new THREE.IcosahedronGeometry(1, 3), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(baseGeom), [baseGeom]);
  const positions = useMemo(() => baseGeom.attributes.position.array as Float32Array, [baseGeom]);
  useFrame(() => { if (group.current) group.current.rotation.y += 0.003; });
  return (
    <group ref={group} scale={1.05}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#93c5fd" size={0.04} sizeAttenuation transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

function HologramBrain() {
  // Use wireframe fallback instead of trying to load the model
  return <WireframeBrain />;
};

// Disabled Hologram loading to avoid 404 errors
/*
function HologramBrainOriginal() {
  const { scene } = useGLTF('/models/brain_hologram.glb');
  const groupRef = useRef<THREE.Group>(null);

  useMemo(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Material holográfico con emisión
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#22d3ee'),
          emissive: new THREE.Color('#3b82f6'),
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9,
          metalness: 0.1,
          roughness: 0.2,
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  return <primitive ref={groupRef} object={scene} scale={1.05} />;
}
*/

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

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(clock.elapsedTime * 1.2) * 0.1;
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
        <group key={`tube-${idx}`}>
          <mesh>
            <tubeGeometry args={[t.curve, 32, 0.009, 8, false]} />
            <meshBasicMaterial color={t.color} transparent opacity={0.3} />
          </mesh>
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
    <group ref={group} position={[2.2, -0.8, -0.8]} rotation={[0, -0.3, 0]}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Brazo principal */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.06, 0.8, 0.06]} />
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Articulación */}
      <mesh position={[0.2, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Brazo secundario */}
      <mesh position={[0.4, 0.65, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.05, 0.6, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Pinza */}
      <group position={[0.6, 0.35, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Dedos de la pinza */}
        <mesh position={[0.02, 0.15, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.02]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.02, 0.15, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.02]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      
      {/* Luz de estado */}
      <mesh position={[0.2, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.8} />
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
        <NeuralParticles />
        <SynapseArcs />
        <LobeHotspots onFocus={onFocus} />
        <DNAHelix position={[-2.5, 0, 0]} scale={0.8} />
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
  const [_hasModel, setHasModel] = useState<boolean | null>(null);
  const [style, setStyle] = useState<BrainStyle>('wireframe');
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const transitionRef = useRef<{
    t: number; dur: number; startPos: THREE.Vector3; startTarget: THREE.Vector3; endPos: THREE.Vector3; endTarget: THREE.Vector3; href?: string;
  } | null>(null);

  // Comprobar si existe el GLB para usarlo; fallback a procedimental
  useEffect(() => {
    // Set hasModel directly to false to avoid the fetch issues
    setHasModel(false);
  }, []);

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
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        onCreated={({ camera }) => { cameraRef.current = camera as THREE.PerspectiveCamera; }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <BrainScene onFocus={startTransition} />
          {/* Elegimos estilo/modelo */}
          {style === 'segmented' ? (
            <SegmentedBrain />
          ) : style === 'wireframe' ? (
            <WireframeBrain />
          ) : style === 'hologram' ? (
            <WireframeBrain />
          ) : style === 'crystal' ? (
            <ProceduralBrain />
          ) : (
            <ProceduralBrain />
          )}
        </Suspense>
        <OrbitControls ref={controlsRef as unknown as React.RefObject<OrbitControlsImpl>} enablePan={true} minDistance={2.5} maxDistance={8} autoRotate autoRotateSpeed={0.3} />
        <CameraTransition cameraRef={cameraRef} controlsRef={controlsRef} transitionRef={transitionRef} />
      </Canvas>
      {/* HUD de estilos */}
      <div className="pointer-events-auto absolute left-4 bottom-4 z-20 flex gap-2 text-xs">
        {([
          { k: 'segmented', label: 'Segmentado' },
          { k: 'wireframe', label: 'Wireframe' },
          { k: 'hologram', label: 'Holograma' },
          { k: 'crystal', label: 'Cristal' },
          { k: 'lowpoly', label: 'Low‑poly' },
        ] as { k: BrainStyle; label: string }[]).map((opt) => (
          <button
            key={opt.k}
            onClick={() => setStyle(opt.k)}
            className={`px-2 py-1 rounded-md border ${style === opt.k ? 'bg-acetylcholine-500/20 border-acetylcholine-500 text-white' : 'bg-cortex-800/70 border-cortex-700 text-cortex-200'} backdrop-blur`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
