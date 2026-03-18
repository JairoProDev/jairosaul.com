'use client';

import Rooms3DViewer from '@/components/rooms3d/Rooms3DViewer';

interface Room3DProps {
  modelPath?: string;
  scale?: number;
}

export default function Room3DViewer({ modelPath, scale }: Room3DProps) {
  // Backwards compatible wrapper.
  // The new implementation is scene-based; `modelPath`/`scale` will be reintroduced
  // later as per-scene asset overrides.
  void modelPath;
  void scale;

  return <Rooms3DViewer initialSceneId="coder" />;
}

