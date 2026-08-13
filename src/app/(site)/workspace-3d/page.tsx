import { use } from 'react';
import Rooms3DViewer from '@/components/rooms3d/Rooms3DViewer';
import { ROOMS_SCENES } from '@/components/rooms3d/config/scenes';
import type { RoomsSceneId } from '@/components/rooms3d/types';

export default function Workspace3DPage({
  searchParams,
}: {
  // Next.js 15 treats `searchParams` as a dynamic value that may be a Promise.
  searchParams?: Promise<{ scene?: string | string[] }>;
}) {
  const params = searchParams ? use(searchParams) : undefined;
  const rawScene = params?.scene;
  const firstScene = Array.isArray(rawScene) ? rawScene[0] : rawScene;
  const initialSceneId = (firstScene &&
    Object.prototype.hasOwnProperty.call(ROOMS_SCENES, firstScene)
    ? firstScene
    : 'coder') as RoomsSceneId;

  return (
    <div className="fixed inset-0 z-[60] bg-black">
      <Rooms3DViewer initialSceneId={initialSceneId} fullscreen className="h-full w-full" />
    </div>
  );
}

