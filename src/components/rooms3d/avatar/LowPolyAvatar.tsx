import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { RoomsSceneId } from '@/components/rooms3d/types';
import { mulberry32, hashStringToSeed } from '@/components/rooms3d/utils/seededRandom';

type AvatarAction = 'idle' | 'type' | 'write' | 'inspect' | 'stretch' | 'breathe';

function pickNextAction(sceneId: RoomsSceneId, r: () => number): AvatarAction {
  const roll = r();
  if (sceneId === 'founder') return roll < 0.55 ? 'write' : roll < 0.85 ? 'idle' : 'inspect';
  if (sceneId === 'coder') return roll < 0.6 ? 'type' : roll < 0.85 ? 'idle' : 'inspect';
  if (sceneId === 'research') return roll < 0.6 ? 'inspect' : roll < 0.85 ? 'write' : 'idle';
  return roll < 0.45 ? 'breathe' : roll < 0.75 ? 'stretch' : 'idle';
}

function avatarAnchor(sceneId: RoomsSceneId) {
  switch (sceneId) {
    case 'founder':
      return { pos: new THREE.Vector3(-2.9, -1.45, 0.3), rotY: Math.PI / 2 };
    case 'coder':
      return { pos: new THREE.Vector3(1.7, -1.45, -1.3), rotY: -0.25 };
    case 'research':
      return { pos: new THREE.Vector3(2.9, -1.45, -0.7), rotY: -0.9 };
    case 'human':
      return { pos: new THREE.Vector3(-0.8, -1.45, 1.25), rotY: 0.1 };
  }
}

export function LowPolyAvatar({
  sceneId,
  seedKey = 'avatar',
}: {
  sceneId: RoomsSceneId;
  seedKey?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);

  const rng = useMemo(() => mulberry32(hashStringToSeed(`${seedKey}:${sceneId}`)), [seedKey, sceneId]);
  const stateRef = useRef<{
    action: AvatarAction;
    t: number;
    phase: number;
    dur: number;
  }>({
    action: 'idle',
    t: 0,
    phase: rng() * Math.PI * 2,
    dur: 3 + rng() * 2.5,
  });

  const palette = useMemo(() => {
    const skin = new THREE.Color('#f2c9a0');
    const hair = new THREE.Color('#0b1220');
    const shirt = sceneId === 'founder' ? new THREE.Color('#0f172a') : sceneId === 'coder' ? new THREE.Color('#111827') : new THREE.Color('#0f172a');
    const jacket = sceneId === 'founder' ? new THREE.Color('#1f2937') : sceneId === 'research' ? new THREE.Color('#e5e7eb') : null;
    const pants = sceneId === 'founder' ? new THREE.Color('#111827') : sceneId === 'human' ? new THREE.Color('#0f172a') : new THREE.Color('#0b1220');
    const accent = sceneId === 'research' ? new THREE.Color('#a78bfa') : sceneId === 'human' ? new THREE.Color('#34d399') : new THREE.Color('#60a5fa');
    return { skin, hair, shirt, jacket, pants, accent };
  }, [sceneId]);

  const materials = useMemo(() => {
    const mk = (c: THREE.Color, roughness = 0.85) =>
      new THREE.MeshStandardMaterial({ color: c, roughness, metalness: 0.05 });
    return {
      skin: mk(palette.skin, 0.9),
      hair: mk(palette.hair, 0.75),
      shirt: mk(palette.shirt, 0.8),
      jacket: palette.jacket ? mk(palette.jacket, 0.65) : null,
      pants: mk(palette.pants, 0.85),
      glasses: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b1220'),
        emissive: palette.accent,
        emissiveIntensity: 0.25,
        roughness: 0.35,
        metalness: 0.2,
        transparent: true,
        opacity: 0.75,
      }),
    };
  }, [palette]);

  useFrame((_s, delta) => {
    const st = stateRef.current;
    st.t += delta;
    if (st.t > st.dur) {
      st.t = 0;
      st.dur = 2.6 + rng() * 3.0;
      st.phase = rng() * Math.PI * 2;
      st.action = pickNextAction(sceneId, rng);
    }

    const a = st.action;
    const k = st.t / st.dur;
    const w = Math.sin(st.phase + st.t * 2.2);
    const micro = 0.02 * Math.sin(st.phase + st.t * 7.3);

    // base pose
    if (headRef.current) headRef.current.rotation.y = micro * 0.6;
    if (torsoRef.current) torsoRef.current.rotation.y = micro * 0.35;
    if (armLRef.current) armLRef.current.rotation.x = -0.25;
    if (armRRef.current) armRRef.current.rotation.x = -0.25;

    if (a === 'type') {
      if (armLRef.current) armLRef.current.rotation.x = -0.9 + 0.25 * w;
      if (armRRef.current) armRRef.current.rotation.x = -0.85 - 0.22 * w;
      if (headRef.current) headRef.current.rotation.x = 0.18;
    } else if (a === 'write') {
      if (armRRef.current) armRRef.current.rotation.x = -1.15 + 0.18 * w;
      if (armLRef.current) armLRef.current.rotation.x = -0.55;
      if (headRef.current) headRef.current.rotation.x = 0.1;
    } else if (a === 'inspect') {
      if (armRRef.current) armRRef.current.rotation.x = -0.65 + 0.12 * w;
      if (headRef.current) headRef.current.rotation.x = -0.05 + 0.08 * w;
    } else if (a === 'stretch') {
      if (armLRef.current) armLRef.current.rotation.x = -1.4 + 0.25 * w;
      if (armRRef.current) armRRef.current.rotation.x = -1.35 - 0.22 * w;
      if (torsoRef.current) torsoRef.current.rotation.x = 0.08 * Math.sin(k * Math.PI);
    } else if (a === 'breathe') {
      if (torsoRef.current) torsoRef.current.scale.y = 1 + 0.02 * Math.sin(st.t * 1.2);
      if (headRef.current) headRef.current.rotation.x = -0.03;
      if (armLRef.current) armLRef.current.rotation.x = -0.2;
      if (armRRef.current) armRRef.current.rotation.x = -0.2;
    }

    // subtle sway for infinite feel
    if (groupRef.current) {
      groupRef.current.position.y = avatarAnchor(sceneId).pos.y + (sceneId === 'human' ? 0.01 : 0.0) + 0.01 * Math.sin(st.phase + st.t * 0.9);
    }
  });

  const anchor = useMemo(() => avatarAnchor(sceneId), [sceneId]);

  return (
    <group ref={groupRef} position={anchor.pos.toArray()} rotation={[0, anchor.rotY, 0]} scale={0.9}>
      {/* Legs */}
      <mesh position={[-0.08, 0.28, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <primitive object={materials.pants} attach="material" />
      </mesh>
      <mesh position={[0.08, 0.28, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <primitive object={materials.pants} attach="material" />
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, 0.68, 0]} castShadow>
        <boxGeometry args={[0.36, 0.42, 0.2]} />
        <primitive object={materials.shirt} attach="material" />
      </mesh>

      {/* Jacket / lab coat */}
      {materials.jacket && (
        <mesh position={[0, 0.68, 0.04]} castShadow>
          <boxGeometry args={[0.42, 0.46, 0.22]} />
          <primitive object={materials.jacket} attach="material" />
        </mesh>
      )}

      {/* Arms */}
      <mesh ref={armLRef} position={[-0.28, 0.72, 0]} castShadow>
        <boxGeometry args={[0.12, 0.42, 0.12]} />
        <primitive object={materials.shirt} attach="material" />
      </mesh>
      <mesh ref={armRRef} position={[0.28, 0.72, 0]} castShadow>
        <boxGeometry args={[0.12, 0.42, 0.12]} />
        <primitive object={materials.shirt} attach="material" />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.26, 0.26, 0.26]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>
      <mesh position={[0, 1.1, -0.02]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.26]} />
        <primitive object={materials.hair} attach="material" />
      </mesh>

      {/* Glasses (vary by scene via emissive) */}
      <mesh position={[0, 1.0, 0.14]}>
        <boxGeometry args={[0.22, 0.06, 0.02]} />
        <primitive object={materials.glasses} attach="material" />
      </mesh>
    </group>
  );
}

