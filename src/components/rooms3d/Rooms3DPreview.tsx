'use client';

import Rooms3DViewer from '@/components/rooms3d/Rooms3DViewer';
import type { RoomsSceneId } from '@/components/rooms3d/types';

export default function Rooms3DPreview({
  sceneId,
  hudPortalTargetId,
  hudVariant,
}: {
  sceneId: RoomsSceneId;
  hudPortalTargetId?: string;
  hudVariant?: 'overlay' | 'side';
}) {
  return (
    <Rooms3DViewer
      initialSceneId={sceneId}
      fullscreen={false}
      className="h-full w-full"
      hudPortalTargetId={hudPortalTargetId}
      hudVariant={hudVariant}
    />
  );
}

