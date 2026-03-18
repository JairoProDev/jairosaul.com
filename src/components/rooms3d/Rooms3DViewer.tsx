'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ROOMS_SCENES } from '@/components/rooms3d/config/scenes';
import type { Hotspot, RoomsMode, RoomsQuality, RoomsSceneId } from '@/components/rooms3d/types';
import { RoomsHud } from '@/components/rooms3d/ui/RoomsHud';
import { RoomsScene } from '@/components/rooms3d/scenes/RoomsScene';
import { easeInOutQuad, type CameraTransitionState } from '@/components/rooms3d/utils/cameraTransition';

function CameraRig({
  sceneId,
  mode,
  activeHotspot,
  transitionRef,
  controlsRef,
}: {
  sceneId: RoomsSceneId;
  mode: RoomsMode;
  activeHotspot: Hotspot;
  transitionRef: React.MutableRefObject<CameraTransitionState | null>;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const camRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    camRef.current = camera as THREE.PerspectiveCamera;
  }, [camera]);

  useFrame((_s, delta) => {
    const tr = transitionRef.current;
    const cam = camRef.current;
    const ctl = controlsRef.current;
    if (!cam || !ctl) return;

    // Transition animation
    if (tr) {
      tr.t += delta;
      const k = Math.min(1, tr.t / tr.dur);
      const e = easeInOutQuad(k);
      cam.position.copy(tr.startPos.clone().lerp(tr.endPos, e));
      ctl.target.copy(tr.startTarget.clone().lerp(tr.endTarget, e));
      ctl.update();
      if (k >= 1) transitionRef.current = null;
      return;
    }

    // Mode behaviors
    if (mode === 'tour') {
      // subtle orbit around target (no nausea)
      const v = cam.position.clone().sub(ctl.target);
      v.applyAxisAngle(new THREE.Vector3(0, 1, 0), delta * 0.15);
      cam.position.copy(ctl.target.clone().add(v));
      ctl.update();
    }
  });

  // Keep controls aligned to active hotspot when scene changes
  useEffect(() => {
    const ctl = controlsRef.current;
    const cam = camRef.current;
    if (!ctl || !cam) return;
    const scene = ROOMS_SCENES[sceneId];
    cam.position.copy(scene.defaultCameraPos);
    ctl.target.copy(scene.defaultCameraTarget);
    ctl.update();
  }, [sceneId, controlsRef]);

  // Focus when hotspot changes (via transition)
  useEffect(() => {
    const ctl = controlsRef.current;
    const cam = camRef.current;
    if (!ctl || !cam) return;
    transitionRef.current = {
      t: 0,
      dur: 0.95,
      startPos: cam.position.clone(),
      startTarget: (ctl.target as THREE.Vector3).clone(),
      endPos: activeHotspot.cameraPos.clone(),
      endTarget: activeHotspot.cameraTarget.clone(),
    };
  }, [activeHotspot, controlsRef, transitionRef]);

  return null;
}

export default function Rooms3DViewer({
  initialSceneId = 'coder',
  fullscreen = false,
  className = '',
  hudPortalTargetId,
  hudVariant = 'overlay',
}: {
  initialSceneId?: RoomsSceneId;
  fullscreen?: boolean;
  className?: string;
  hudPortalTargetId?: string;
  hudVariant?: 'overlay' | 'side';
}) {
  const [sceneId, setSceneId] = useState<RoomsSceneId>(initialSceneId);
  const [mode, setMode] = useState<RoomsMode>('auto');
  const [quality, setQuality] = useState<RoomsQuality>('balanced');

  const scene = ROOMS_SCENES[sceneId];
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(scene.hotspots[0]);

  // Keep hotspot valid on scene change
  useEffect(() => {
    const s = ROOMS_SCENES[sceneId];
    setActiveHotspot(s.hotspots[0]);
  }, [sceneId]);

  // URL sync for fullscreen: ?scene=founder|coder|research|human
  useEffect(() => {
    if (!fullscreen) return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get('scene') as RoomsSceneId | null;
    if (s && s in ROOMS_SCENES) setSceneId(s);
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const url = new URL(window.location.href);
    url.searchParams.set('scene', sceneId);
    window.history.replaceState({}, '', url.toString());
  }, [sceneId, fullscreen]);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const transitionRef = useRef<CameraTransitionState | null>(null);

  const [hudPortalEl, setHudPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!hudPortalTargetId) {
      setHudPortalEl(null);
      return;
    }
    setHudPortalEl(document.getElementById(hudPortalTargetId));
  }, [hudPortalTargetId]);

  const envPreset = scene.environmentPreset === 'studio' ? 'apartment' : scene.environmentPreset;

  const orbitProps = useMemo(
    () => ({
      enableZoom: true,
      enablePan: false,
      minDistance: fullscreen ? 4 : 8,
      maxDistance: fullscreen ? 18 : 15,
      autoRotate: mode === 'auto',
      autoRotateSpeed: fullscreen ? 0.35 : 0.5,
      maxPolarAngle: Math.PI / 2.15,
      minPolarAngle: Math.PI / 6,
    }),
    [mode, fullscreen]
  );

  const onResetView = () => {
    const ctl = controlsRef.current;
    if (!ctl) return;
    setMode('auto');
    setActiveHotspot(scene.hotspots[0]);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [6, 4, 6], fov: 45 }}
        shadows
        dpr={[1, quality === 'cinematic' ? 2 : 1.6]}
        gl={{ powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.28} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.95}
          castShadow={quality === 'cinematic'}
          shadow-mapSize-width={quality === 'cinematic' ? 2048 : 1536}
          shadow-mapSize-height={quality === 'cinematic' ? 2048 : 1536}
          shadow-camera-near={0.1}
          shadow-camera-far={40}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[0, 3.1, 0]} intensity={0.55} color="#ffffff" />
        <pointLight position={[4, 2.2, -2]} intensity={0.35} color="#60a5fa" />
        <pointLight position={[-4, 1.5, -3]} intensity={0.28} color="#34d399" />

        <Suspense fallback={null}>
          <RoomsScene
            scene={scene}
            quality={quality}
            activeHotspot={activeHotspot}
            onSelectHotspot={(h) => setActiveHotspot(h)}
            showHotspotTooltips={fullscreen}
          />
        </Suspense>

        <ContactShadows
          opacity={0.45}
          blur={2.8}
          far={12}
          resolution={quality === 'cinematic' ? 1024 : 512}
          scale={14}
          position={[0, -1.54, 0]}
        />

        <Environment preset={envPreset} />

        <OrbitControls ref={controlsRef} {...orbitProps} />

        <CameraRig
          sceneId={sceneId}
          mode={mode}
          activeHotspot={activeHotspot}
          transitionRef={transitionRef}
          controlsRef={controlsRef}
        />
      </Canvas>

      {hudPortalTargetId ? (
        hudPortalEl ? (
          createPortal(
            <RoomsHud
              sceneId={sceneId}
              mode={mode}
              quality={quality}
              activeHotspot={activeHotspot}
              onSelectHotspot={(h) => setActiveHotspot(h)}
              onResetView={onResetView}
              onSetMode={setMode}
              onSetQuality={setQuality}
              showSceneTabs={fullscreen}
              onSelectScene={setSceneId}
              variant={hudVariant}
            />,
            hudPortalEl
          )
        ) : null
      ) : (
        <RoomsHud
          sceneId={sceneId}
          mode={mode}
          quality={quality}
          activeHotspot={activeHotspot}
          onSelectHotspot={(h) => setActiveHotspot(h)}
          onResetView={onResetView}
          onSetMode={setMode}
          onSetQuality={setQuality}
          showSceneTabs={fullscreen}
          onSelectScene={setSceneId}
          variant={hudVariant}
        />
      )}
    </div>
  );
}

