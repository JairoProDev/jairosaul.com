import type { SceneConfig, Hotspot, RoomsQuality } from '@/components/rooms3d/types';
import { FutureLabBase } from '@/components/rooms3d/scenes/FutureLabBase';
import { LowPolyAvatar } from '@/components/rooms3d/avatar/LowPolyAvatar';

export function RoomsScene({
  scene,
  quality,
  activeHotspot,
  onSelectHotspot,
  showHotspotTooltips = false,
}: {
  scene: SceneConfig;
  quality: RoomsQuality;
  activeHotspot: Hotspot;
  onSelectHotspot: (h: Hotspot) => void;
  showHotspotTooltips?: boolean;
}) {
  const kind =
    scene.id === 'coder'
      ? 'coder'
      : scene.id === 'founder'
        ? 'founder'
        : scene.id === 'research'
          ? 'research'
          : 'human';

  return (
    <>
      <FutureLabBase
        scale={0.8}
        accent={scene.accent}
        seedKey={`rooms3d:${scene.id}`}
        quality={quality}
        kind={kind}
        hotspots={scene.hotspots}
        activeHotspotId={activeHotspot.id}
        onSelectHotspot={onSelectHotspot}
        showHotspotTooltips={showHotspotTooltips}
      />
      <LowPolyAvatar sceneId={scene.id} seedKey="rooms3d-avatar-v1" />
    </>
  );
}

