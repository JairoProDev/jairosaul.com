import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Hotspot, RoomsQuality } from '@/components/rooms3d/types';
import { mulberry32, hashStringToSeed } from '@/components/rooms3d/utils/seededRandom';

function useReducedMotionFlag() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(Boolean(mq?.matches));
    update();
    mq?.addEventListener?.('change', update);
    return () => mq?.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

function useCanvasTexture(
  draw: (ctx: CanvasRenderingContext2D, t: number) => void,
  opts?: { w?: number; h?: number; fps?: number }
) {
  const { w = 512, h = 256, fps = 12 } = opts ?? {};
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const texture = useMemo(() => {
    const tx = new THREE.CanvasTexture(canvas);
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.wrapS = THREE.ClampToEdgeWrapping;
    tx.wrapT = THREE.ClampToEdgeWrapping;
    tx.minFilter = THREE.LinearMipmapLinearFilter;
    tx.magFilter = THREE.LinearFilter;
    tx.anisotropy = 4;
    tx.needsUpdate = true;
    return tx;
  }, [canvas]);

  const acc = useRef(0);
  useFrame(({ clock }, delta) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    acc.current += delta;
    const step = 1 / fps;
    if (acc.current < step) return;
    acc.current = 0;
    draw(ctx, clock.elapsedTime);
    texture.needsUpdate = true;
  });

  return texture;
}

function createCompositeMaterial({
  base = '#0b1220',
  metalness = 0.2,
  roughness = 0.7,
  emissive = '#000000',
  emissiveIntensity = 0,
} = {}) {
  type Mat = THREE.MeshStandardMaterial & { _shader?: { uniforms: Record<string, { value: number }> } };
  // Force Three.js to define UV varyings needed by our fragment injections.
  // We use `vMapUv` (depends on USE_MAP) instead of `vUv` (depends on USE_UV).
  const dummyMap = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  dummyMap.needsUpdate = true;
  dummyMap.colorSpace = THREE.SRGBColorSpace;
  dummyMap.minFilter = THREE.NearestFilter;
  dummyMap.magFilter = THREE.NearestFilter;

  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(base),
    metalness,
    roughness,
    emissive: new THREE.Color(emissive),
    emissiveIntensity,
    map: dummyMap,
  }) as Mat;

  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nuniform float uTime;`);
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      vec2 uvw = vMapUv * vec2(160.0, 110.0);
      float weave = (sin(uvw.x) * cos(uvw.y)) * 0.04;
      float scratches = smoothstep(0.98, 1.0, abs(sin(uvw.x * 0.35 + uTime * 0.15))) * 0.03;
      gl_FragColor.rgb += weave + scratches;
      #include <dithering_fragment>
      `
    );
    (m as Mat)._shader = shader as unknown as Mat['_shader'];
  };
  (m as Mat).customProgramCacheKey = () => 'composite-v1';
  (m as Mat).needsUpdate = true;
  return m;
}

function MaterialTicker({ material }: { material: THREE.Material }) {
  useFrame((_s, delta) => {
    const m = material as THREE.MeshStandardMaterial & { _shader?: { uniforms: Record<string, { value: number }> } };
    if (!m._shader?.uniforms?.uTime) return;
    m._shader.uniforms.uTime.value += delta;
  });
  return null;
}

function HotspotDot({
  hotspot,
  active,
  onSelect,
  showHotspotTooltips,
}: {
  hotspot: Hotspot;
  active: boolean;
  onSelect: (h: Hotspot) => void;
  showHotspotTooltips: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotionFlag();
  // Shift the tooltip away from the room center (avoid covering HUD/other UI).
  // If the hotspot is on the left, move tooltip to the right (and vice-versa).
  const dirX = hotspot.point.x >= 0 ? -1 : 1;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 2.2) * 0.08;
    const scale = active ? 1.25 : hovered ? 1.15 : 1.0;
    ref.current.scale.setScalar(scale * pulse);
  });

  return (
    <group position={hotspot.point.toArray()}>
      <mesh
        ref={ref}
        onClick={() => onSelect(hotspot)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={hotspot.accent}
          emissive={hotspot.accent}
          emissiveIntensity={active ? 1.2 : hovered ? 0.95 : 0.55}
          transparent
          opacity={0.9}
        />
      </mesh>
      {showHotspotTooltips && (hovered || active) && (
        <Html
          center
          distanceFactor={10}
          zIndexRange={[1000, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="bg-cortex-800/90 border border-cortex-700 rounded-md px-2 py-1 text-[10px] shadow-lg"
            style={{
              maxWidth: 175,
              transform: `translate3d(${dirX * 36}px, -14px, 0)`,
              willChange: 'transform',
            }}
          >
            <div className="font-semibold" style={{ color: hotspot.accent }}>
              {hotspot.title}
            </div>
            <div className="text-cortex-300">{hotspot.subtitle}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CeilingPanels({ accent }: { accent: string }) {
  const panelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b1220'),
        roughness: 0.6,
        metalness: 0.25,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.08,
      }),
    [accent]
  );

  return (
    <group position={[0, 3.45, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.0, 8.0, 1, 1]} />
        <meshStandardMaterial color="#0a1222" roughness={0.95} metalness={0.0} />
      </mesh>
      <group>
        {[
          [-1.9, 0.01, -1.2],
          [1.9, 0.01, -1.2],
          [-1.9, 0.01, 1.3],
          [1.9, 0.01, 1.3],
        ].map((p, i) => (
          <mesh key={`panel-${i}`} position={p as [number, number, number]} castShadow>
            <boxGeometry args={[2.4, 0.04, 1.5]} />
            <primitive object={panelMat} attach="material" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CircuitFloor({ quality }: { quality: RoomsQuality }) {
  type ShaderMat = THREE.MeshStandardMaterial & { _shader?: { uniforms: { uTime?: { value: number } } } };
  const mat = useMemo(() => {
    const dummyMap = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    dummyMap.needsUpdate = true;
    dummyMap.colorSpace = THREE.SRGBColorSpace;
    dummyMap.minFilter = THREE.NearestFilter;
    dummyMap.magFilter = THREE.NearestFilter;

    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b1020'),
      roughness: 0.85,
      metalness: 0.15,
      emissive: new THREE.Color('#1d4ed8'),
      emissiveIntensity: 0.05,
      map: dummyMap,
    }) as ShaderMat;
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nuniform float uTime;`);
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `
        #include <emissivemap_fragment>
        vec2 uv = vMapUv * 14.0;
        float grid = 1.0 - smoothstep(0.0, 0.06, abs(fract(uv.x) - 0.5)) * smoothstep(0.0, 0.06, abs(fract(uv.y) - 0.5));
        float traces = smoothstep(0.98, 1.0, abs(sin(uv.x * 3.0 + uTime * 0.2))) * 0.6 + smoothstep(0.98, 1.0, abs(sin(uv.y * 2.2 - uTime * 0.18))) * 0.6;
        float glow = clamp(grid * 0.15 + traces * 0.08, 0.0, 0.25);
        totalEmissiveRadiance += vec3(0.12, 0.45, 1.0) * glow;
        `
      );
      m._shader = shader as unknown as ShaderMat['_shader'];
    };
    (m as ShaderMat).customProgramCacheKey = () => 'circuit-floor-v1';
    return m;
  }, []);

  useFrame((_s, delta) => {
    const m = mat as ShaderMat;
    const u = m._shader?.uniforms?.uTime;
    if (!u) return;
    u.value += delta;
  });

  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8, 1, 1]} />
      <primitive attach="material" object={mat} />
      {quality === 'cinematic' && <meshStandardMaterial transparent opacity={0} />}
    </mesh>
  );
}

function RoomShell() {
  const wall = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.95, metalness: 0.05 }), []);
  const wall2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.92, metalness: 0.08 }), []);

  return (
    <group>
      <mesh position={[0, 1.0, -4]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <primitive attach="material" object={wall2} />
      </mesh>
      <mesh position={[-4, 1.0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <primitive attach="material" object={wall} />
      </mesh>
      <mesh position={[4, 1.0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <primitive attach="material" object={wall} />
      </mesh>
    </group>
  );
}

function TractionMapRug({ accent }: { accent: string }) {
  const tex = useCanvasTexture(
    (ctx, t) => {
      const { width: w, height: h } = ctx.canvas;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#240307');
      g.addColorStop(1, '#4b0610');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 2;
      for (let i = 0; i < 18; i++) {
        const y = (i / 18) * h;
        ctx.strokeStyle = i % 3 === 0 ? 'rgba(255,210,90,0.55)' : 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        for (let x = 0; x <= w; x += 16) {
          const n = Math.sin((x / w) * 7 + i * 0.6 + t * 0.35) * 10 + Math.cos((x / w) * 3 + t * 0.2) * 6;
          const yy = y + n;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }

      const nodes = [
        { x: 0.18, y: 0.65, c: '#22d3ee', label: 'MRR' },
        { x: 0.42, y: 0.35, c: '#34d399', label: 'CAC' },
        { x: 0.73, y: 0.55, c: '#60a5fa', label: 'CHURN' },
        { x: 0.6, y: 0.22, c: '#f59e0b', label: 'GTM' },
      ];
      ctx.globalAlpha = 0.9;
      nodes.forEach((n, idx) => {
        const px = n.x * w;
        const py = n.y * h;
        ctx.strokeStyle = 'rgba(255,255,255,0.14)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, 18 + Math.sin(t * 1.4 + idx) * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = n.c;
        ctx.beginPath();
        ctx.arc(px, py, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = '600 16px ui-sans-serif, system-ui, -apple-system';
        ctx.fillText(n.label, px + 10, py - 10);
      });

      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x * w, nodes[0].y * h);
      ctx.quadraticCurveTo(0.36 * w, 0.52 * h, nodes[1].x * w, nodes[1].y * h);
      ctx.quadraticCurveTo(0.58 * w, 0.22 * h, nodes[3].x * w, nodes[3].y * h);
      ctx.quadraticCurveTo(0.72 * w, 0.38 * h, nodes[2].x * w, nodes[2].y * h);
      ctx.stroke();
    },
    { w: 512, h: 320, fps: 10 }
  );

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: tex,
        emissive: new THREE.Color('#ffb454'),
        emissiveIntensity: 0.18,
        roughness: 0.95,
        metalness: 0.0,
      }),
    [tex]
  );

  return (
    <mesh position={[0, -1.48, 1.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[3.3, 2.2, 1, 1]} />
      <primitive attach="material" object={mat} />
    </mesh>
  );
}

function KnowledgeWall({
  seedKey,
  accent,
  variant,
}: {
  seedKey: string;
  accent: string;
  variant: 'knowledge' | 'strategy' | 'labNotes' | 'humanNotes';
}) {
  const seed = useMemo(() => hashStringToSeed(seedKey), [seedKey]);
  const rnd = useMemo(() => mulberry32(seed), [seed]);

  const tex = useCanvasTexture(
    (ctx, t) => {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0b1220';
      ctx.fillRect(0, 0, w, h);

      // deterministic dither
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 8000; i++) {
        const x = rnd() * w;
        const y = rnd() * h;
        ctx.fillStyle = i % 3 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(96,165,250,0.7)';
        ctx.fillRect(x, y, 1, 1);
      }

      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = 'rgba(226,232,240,0.22)';
      ctx.lineWidth = 2;
      ctx.strokeRect(18, 18, w - 36, h - 36);

      ctx.fillStyle = accent;
      ctx.font = '800 22px ui-sans-serif, system-ui';
      ctx.fillText(
        variant === 'strategy'
          ? 'Strategy Board'
          : variant === 'labNotes'
            ? 'Lab Notes'
            : variant === 'humanNotes'
              ? 'Human Studio Notes'
              : 'Knowledge Wall',
        28,
        54
      );
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.font = '600 16px ui-sans-serif, system-ui';
      ctx.fillText(
        variant === 'strategy'
          ? 'GTM • distribution • decisions'
          : variant === 'labNotes'
            ? 'experiments • logs • systems'
            : variant === 'humanNotes'
              ? 'study • training • reflection'
              : 'research flows & plans',
        28,
        78
      );

      // content blocks
      const blocks =
        variant === 'strategy'
          ? [
              { t: 'Goals', x: 0.08, y: 0.22, w: 0.36, h: 0.16 },
              { t: 'GTM', x: 0.50, y: 0.22, w: 0.42, h: 0.16 },
              { t: 'Moat', x: 0.08, y: 0.44, w: 0.84, h: 0.14 },
              { t: 'Next actions', x: 0.08, y: 0.63, w: 0.84, h: 0.22 },
            ]
          : variant === 'labNotes'
            ? [
                { t: 'Hypothesis', x: 0.08, y: 0.22, w: 0.84, h: 0.16 },
                { t: 'Experiment', x: 0.08, y: 0.44, w: 0.84, h: 0.16 },
                { t: 'Results', x: 0.08, y: 0.66, w: 0.40, h: 0.18 },
                { t: 'Next', x: 0.52, y: 0.66, w: 0.40, h: 0.18 },
              ]
            : variant === 'humanNotes'
              ? [
                  { t: 'Training', x: 0.08, y: 0.22, w: 0.84, h: 0.16 },
                  { t: 'Study', x: 0.08, y: 0.44, w: 0.40, h: 0.40 },
                  { t: 'Meditation', x: 0.52, y: 0.44, w: 0.40, h: 0.40 },
                ]
              : [
                  { t: 'Inputs', x: 0.08, y: 0.22, w: 0.40, h: 0.18 },
                  { t: 'Pipelines', x: 0.52, y: 0.22, w: 0.40, h: 0.18 },
                  { t: 'Architecture', x: 0.08, y: 0.46, w: 0.84, h: 0.18 },
                  { t: 'Roadmap', x: 0.08, y: 0.68, w: 0.84, h: 0.18 },
                ];

      blocks.forEach((b, i) => {
        const x = b.x * w;
        const y = b.y * h;
        const bw = b.w * w;
        const bh = b.h * h;
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = i % 2 === 0 ? accent : 'rgba(96,165,250,0.75)';
        ctx.fillRect(x, y, bw, bh);
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, bw, bh);
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '800 14px ui-sans-serif, system-ui';
        ctx.fillText(b.t, x + 12, y + 24);
      });

      // animated path (subtle)
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = 'rgba(52,211,153,0.45)';
      ctx.lineWidth = 3;
      const p = 0.5 + 0.5 * Math.sin(t * 0.9);
      ctx.beginPath();
      ctx.moveTo(0.26 * w, 0.37 * h);
      ctx.bezierCurveTo(0.35 * w, 0.42 * h, 0.45 * w, 0.35 * h, (0.48 + p * 0.22) * w, 0.37 * h);
      ctx.stroke();
    },
    { w: 768, h: 512, fps: 8 }
  );

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: tex,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.12,
        roughness: 0.65,
        metalness: 0.15,
      }),
    [tex, accent]
  );

  return (
    <mesh position={[-3.95, 1.35, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
      <planeGeometry args={[3.8, 2.9]} />
      <primitive attach="material" object={mat} />
    </mesh>
  );
}

function NexusDesk({ accent }: { accent: string }) {
  const composite = useMemo(() => createCompositeMaterial({ base: '#0b1220', metalness: 0.25, roughness: 0.65 }), []);
  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#111827'),
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  );
  const wood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5b3a22'),
        roughness: 0.8,
        metalness: 0.0,
      }),
    []
  );
  const strip = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0b1020',
        emissive: accent,
        emissiveIntensity: 0.55,
        roughness: 0.4,
        metalness: 0.25,
      }),
    [accent]
  );

  return (
    <group position={[0, 0, 0]}>
      <MaterialTicker material={composite} />
      <mesh position={[2.2, -0.55, -2.0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.08, 1.3]} />
        <primitive attach="material" object={composite} />
      </mesh>
      <mesh position={[2.2, -0.35, -2.35]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.06, 0.45]} />
        <primitive attach="material" object={wood} />
      </mesh>
      {[
        [1.35, -1.08, -1.55],
        [3.05, -1.08, -1.55],
        [1.55, -1.08, -2.55],
      ].map((p, i) => (
        <mesh key={`leg-${i}`} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 1.05, 0.08]} />
          <primitive attach="material" object={metal} />
        </mesh>
      ))}
      <mesh position={[2.85, -0.32, -2.05]} castShadow>
        <boxGeometry args={[0.04, 0.02, 0.65]} />
        <primitive attach="material" object={strip} />
      </mesh>
    </group>
  );
}

function MonitorArray({ accent, kind }: { accent: string; kind: 'coder' | 'founder' | 'research' | 'human' }) {
  const armMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b1220'),
        metalness: 0.85,
        roughness: 0.2,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.05,
      }),
    [accent]
  );

  const screenTexMain = useCanvasTexture(
    (ctx, t) => {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#050a16');
      g.addColorStop(1, kind === 'founder' ? '#2a0b16' : kind === 'research' ? '#0b1430' : '#071b3a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 0.95;
      ctx.fillStyle = 'rgba(16,185,129,0.95)';
      ctx.font = '600 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
      ctx.fillText(kind === 'founder' ? 'kpi.ts  •  runway / mrr' : 'train.py  •  v4/neuro-link', 18, 32);

      const lines =
        kind === 'founder'
          ? ['MRR +12%', 'CAC ↓', 'Churn 2.4%', 'Next: Distribution', 'Decision: ship v2']
          : ['class Trainer:', '  def step(self, batch):', '    loss = self.model(batch).mean()', '    loss.backward()', '    self.opt.step()', '    return loss.item()'];
      ctx.font = kind === 'founder' ? '700 18px ui-sans-serif, system-ui' : '16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
      lines.forEach((l, i) => {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(147,197,253,0.9)' : 'rgba(226,232,240,0.75)';
        ctx.fillText(l, 18, 72 + i * 22);
      });

      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = 'rgba(34,211,238,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 40; i++) {
        const x = 18 + (i / 39) * (w - 36);
        const y = 205 + Math.sin(t * 0.8 + i * 0.25) * 12 + (i / 39) * 25;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    },
    { w: 640, h: 360, fps: 12 }
  );

  const mkScreenMat = (tex: THREE.Texture, emissive: string) =>
    new THREE.MeshStandardMaterial({
      map: tex,
      emissive: new THREE.Color(emissive),
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.05,
    });

  const matMain = useMemo(() => mkScreenMat(screenTexMain, accent), [screenTexMain, accent]);
  const bezel = useMemo(() => new THREE.MeshStandardMaterial({ color: '#05060a', metalness: 0.6, roughness: 0.35 }), []);

  return (
    <group position={[2.2, -0.35, -2.15]}>
      <mesh position={[0, 0.65, -0.2]} rotation={[0.1, 0.18, 0]} castShadow>
        <torusGeometry args={[0.65, 0.03, 10, 40, Math.PI * 1.1]} />
        <primitive attach="material" object={armMat} />
      </mesh>
      <mesh position={[0, 0.22, 0.05]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.65, 18]} />
        <primitive attach="material" object={armMat} />
      </mesh>
      <group position={[0, 0.75, -0.55]} rotation={[0.02, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.58, 0.05]} />
          <primitive attach="material" object={bezel} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <boxGeometry args={[0.88, 0.51, 0.01]} />
          <primitive attach="material" object={matMain} />
        </mesh>
      </group>
    </group>
  );
}

function SimpleRack({ accent }: { accent: string }) {
  const frame = useMemo(() => createCompositeMaterial({ base: '#0a1222', metalness: 0.35, roughness: 0.7 }), []);
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#08101f'),
        roughness: 0.08,
        metalness: 0.0,
        transmission: 0.45,
        thickness: 0.5,
        ior: 1.35,
        envMapIntensity: 0.35,
      }),
    []
  );
  const ledMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0b1020',
        emissive: accent,
        emissiveIntensity: 0.9,
        roughness: 0.4,
        metalness: 0.1,
      }),
    [accent]
  );

  const leds = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    leds.current.forEach((m, i) => {
      if (!m) return;
      const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 2.6 + i * 0.7));
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = a;
    });
  });

  return (
    <group position={[-2.55, 0.55, -3.55]}>
      <MaterialTicker material={frame} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.35, 3.5, 0.5]} />
        <primitive attach="material" object={frame} />
      </mesh>
      <mesh position={[0, 0.0, 0.26]}>
        <boxGeometry args={[1.25, 3.35, 0.04]} />
        <primitive attach="material" object={glass} />
      </mesh>
      {new Array(7).fill(0).map((_, i) => (
        <group key={`mod-${i}`} position={[0, -1.45 + i * 0.48, 0.0]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 0.34, 0.42]} />
            <meshStandardMaterial color="#0b1020" roughness={0.8} metalness={0.2} />
          </mesh>
          {new Array(6).fill(0).map((__, j) => (
            <mesh
              key={`led-${i}-${j}`}
              ref={(el) => {
                if (el) leds.current[i * 6 + j] = el;
              }}
              position={[-0.48 + j * 0.06, 0.1, 0.22]}
            >
              <boxGeometry args={[0.03, 0.03, 0.01]} />
              <primitive attach="material" object={ledMat} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0.38, 1.45, 0.22]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#220005" emissive="#ef4444" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function RnDCorner({ accent }: { accent: string }) {
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.25 }), []);
  const table = useMemo(() => createCompositeMaterial({ base: '#0a1222', metalness: 0.25, roughness: 0.7 }), []);
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#89c2ff'),
        roughness: 0.08,
        metalness: 0.0,
        transmission: 0.65,
        thickness: 0.4,
        ior: 1.3,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );
  const uvGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#07101c',
        emissive: accent,
        emissiveIntensity: 0.65,
        roughness: 0.3,
        metalness: 0.3,
      }),
    [accent]
  );

  return (
    <group position={[3.15, -0.35, -0.9]}>
      <MaterialTicker material={table} />
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.08, 1.1]} />
        <primitive attach="material" object={table} />
      </mesh>
      <mesh position={[0, -0.62, 0]} castShadow>
        <boxGeometry args={[0.08, 1.05, 0.08]} />
        <primitive attach="material" object={metal} />
      </mesh>
      <group position={[-0.4, 0.18, -0.1]} rotation={[0, 0.3, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.08, 18]} />
          <primitive attach="material" object={metal} />
        </mesh>
        <mesh position={[0.0, 0.22, 0]} rotation={[0.5, 0, 0.3]} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
          <primitive attach="material" object={metal} />
        </mesh>
        <mesh position={[0.14, 0.52, 0.1]} castShadow>
          <sphereGeometry args={[0.035, 12, 12]} />
          <primitive attach="material" object={uvGlow} />
        </mesh>
      </group>
      <group position={[0.45, 0.16, 0.18]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.48, 0.38]} />
          <meshStandardMaterial color="#0a0f1b" roughness={0.7} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.02, 0.195]}>
          <boxGeometry args={[0.36, 0.42, 0.02]} />
          <primitive attach="material" object={glass} />
        </mesh>
        <mesh position={[0.14, -0.15, 0.205]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <primitive attach="material" object={uvGlow} />
        </mesh>
      </group>
      <group position={[0.1, 0.12, -0.32]}>
        {new Array(5).fill(0).map((_, i) => (
          <group key={`tube-${i}`} position={[-0.24 + i * 0.12, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
              <meshPhysicalMaterial color="#bfe6ff" transmission={0.9} thickness={0.25} roughness={0.08} ior={1.33} envMapIntensity={0.25} />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.08, 12]} />
              <meshStandardMaterial color="#0b1020" emissive={i % 2 === 0 ? '#22d3ee' : accent} emissiveIntensity={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function SmartWindow() {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#8fd3ff'),
        roughness: 0.06,
        metalness: 0.0,
        transmission: 0.65,
        thickness: 0.35,
        ior: 1.35,
        transparent: true,
        opacity: 0.65,
      }),
    []
  );
  const tintRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!tintRef.current) return;
    const m = tintRef.current.material as THREE.MeshPhysicalMaterial;
    const tint = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 0.35);
    m.opacity = 0.45 + tint * 0.25;
  });

  return (
    <mesh ref={tintRef} position={[3.98, 1.55, -1.0]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[1.6, 2.15]} />
      <primitive attach="material" object={mat} />
    </mesh>
  );
}

export function FutureLabBase({
  scale = 0.8,
  accent,
  seedKey,
  quality,
  kind,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  showHotspotTooltips,
}: {
  scale?: number;
  accent: string;
  seedKey: string;
  quality: RoomsQuality;
  kind: 'coder' | 'founder' | 'research' | 'human';
  hotspots: Hotspot[];
  activeHotspotId: Hotspot['id'];
  onSelectHotspot: (h: Hotspot) => void;
  showHotspotTooltips: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotionFlag();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (reducedMotion) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.02;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* we keep a diorama-style ceiling frame */}
      <group position={[0, 3.6, 0]}>
        <mesh position={[0, 0, -4.0]} receiveShadow>
          <boxGeometry args={[8.0, 0.08, 0.18]} />
          <meshStandardMaterial color="#0b1220" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 4.0]} receiveShadow>
          <boxGeometry args={[8.0, 0.08, 0.18]} />
          <meshStandardMaterial color="#0b1220" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[-4.0, 0, 0]} receiveShadow>
          <boxGeometry args={[0.18, 0.08, 8.0]} />
          <meshStandardMaterial color="#0b1220" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[4.0, 0, 0]} receiveShadow>
          <boxGeometry args={[0.18, 0.08, 8.0]} />
          <meshStandardMaterial color="#0b1220" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>

      <CeilingPanels accent={accent} />
      <CircuitFloor quality={quality} />
      <RoomShell />

      <NexusDesk accent={accent} />
      <MonitorArray accent={accent} kind={kind} />
      {kind !== 'human' && <SimpleRack accent={kind === 'founder' ? '#fb7185' : '#34d399'} />}
      {kind !== 'human' && <RnDCorner accent={kind === 'research' ? '#a78bfa' : '#22d3ee'} />}
      <SmartWindow />
      <TractionMapRug accent={accent} />
      <KnowledgeWall
        seedKey={seedKey}
        accent={accent}
        variant={kind === 'founder' ? 'strategy' : kind === 'research' ? 'labNotes' : kind === 'human' ? 'humanNotes' : 'knowledge'}
      />

      {/* Human Studio extras */}
      {kind === 'human' && (
        <group position={[-1.0, -1.46, 1.3]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1.4, 1.0]} />
            <meshStandardMaterial color="#0a0f1b" roughness={0.95} metalness={0.0} />
          </mesh>
          <mesh position={[0.35, 0.06, -0.05]} castShadow>
            <boxGeometry args={[0.35, 0.12, 0.2]} />
            <meshStandardMaterial color="#111827" roughness={0.85} metalness={0.1} />
          </mesh>
          <mesh position={[-0.25, 0.04, 0.15]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 22]} />
            <meshStandardMaterial color="#1f2937" roughness={0.9} metalness={0.05} />
          </mesh>
        </group>
      )}

      {/* hotspot constellation */}
      {hotspots.map((h) => (
        <HotspotDot
          key={h.id}
          hotspot={h}
          active={h.id === activeHotspotId}
          onSelect={onSelectHotspot}
          showHotspotTooltips={showHotspotTooltips}
        />
      ))}
    </group>
  );
}

