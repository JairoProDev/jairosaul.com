import * as THREE from 'three';

export type RoomsSceneId = 'founder' | 'coder' | 'research' | 'human';

export type RoomsMode = 'auto' | 'cinematic' | 'tour';

export type RoomsQuality = 'balanced' | 'cinematic';

export type HotspotId =
  | 'nexus'
  | 'server'
  | 'rnd'
  | 'traction'
  | 'knowledge'
  | 'board'
  | 'finance'
  | 'training'
  | 'meditation';

export type Hotspot = {
  id: HotspotId;
  title: string;
  subtitle: string;
  accent: string;
  point: THREE.Vector3;
  cameraPos: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  signals?: string[];
  projects?: string[];
};

export type SceneConfig = {
  id: RoomsSceneId;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  environmentPreset: 'city' | 'apartment' | 'night' | 'warehouse' | 'studio';
  defaultCameraPos: THREE.Vector3;
  defaultCameraTarget: THREE.Vector3;
  hotspots: Hotspot[];
};

