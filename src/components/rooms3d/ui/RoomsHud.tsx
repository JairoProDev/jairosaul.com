import clsx from 'clsx';
import type { Hotspot, RoomsMode, RoomsQuality, RoomsSceneId } from '@/components/rooms3d/types';
import { ROOMS_SCENES, ROOMS_SCENE_ORDER } from '@/components/rooms3d/config/scenes';

export function RoomsHud({
  sceneId,
  mode,
  quality,
  activeHotspot,
  onSelectHotspot,
  onResetView,
  onSetMode,
  onSetQuality,
  showSceneTabs = false,
  onSelectScene,
  variant = 'overlay',
}: {
  sceneId: RoomsSceneId;
  mode: RoomsMode;
  quality: RoomsQuality;
  activeHotspot: Hotspot;
  onSelectHotspot: (h: Hotspot) => void;
  onResetView: () => void;
  onSetMode: (m: RoomsMode) => void;
  onSetQuality: (q: RoomsQuality) => void;
  showSceneTabs?: boolean;
  onSelectScene?: (s: RoomsSceneId) => void;
  variant?: 'overlay' | 'side';
}) {
  const scene = ROOMS_SCENES[sceneId];
  const isOverlay = variant === 'overlay';

  return (
    <div className={clsx('pointer-events-none z-10', isOverlay && 'absolute inset-0')}>
      <div
        className={clsx(
          'pointer-events-auto rounded-2xl border border-cortex-600/50 bg-cortex-900/70 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(59,130,246,0.14)]',
          isOverlay
            ? 'absolute left-4 bottom-4 w-[340px] max-w-[calc(100vw-2rem)]'
            : 'relative w-full'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="text-xs font-semibold text-cortex-100">Habitación 3D</div>
          <div className="text-[10px] text-cortex-300">Status: ONLINE</div>
          <button
            onClick={onResetView}
            className="ml-auto rounded-lg border border-cortex-700/60 bg-cortex-800/60 px-2 py-1 text-[10px] text-cortex-200 hover:bg-cortex-800"
          >
            Reset
          </button>
        </div>

        <div className="mt-2">
          <div className="text-[10px] text-cortex-400">Current User</div>
          <div className="text-xs font-semibold" style={{ color: scene.accent }}>
            Founder / Hacker / Scientist
          </div>
        </div>

        <div className="mt-2">
          <div className="text-[10px] text-cortex-400">Focus</div>
          <div className="text-xs font-semibold text-cortex-100">{activeHotspot.title}</div>
          <div className="text-[11px] text-cortex-300">{activeHotspot.subtitle}</div>
        </div>

        {(activeHotspot.signals?.length || activeHotspot.projects?.length) && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-cortex-800/60 bg-cortex-950/30 p-3">
              <div className="text-[10px] text-cortex-400">Signals</div>
              <ul className="mt-1 space-y-1 text-[11px] text-cortex-200">
                {(activeHotspot.signals ?? []).slice(0, 4).map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-cortex-800/60 bg-cortex-950/30 p-3">
              <div className="text-[10px] text-cortex-400">Current Projects</div>
              <ul className="mt-1 space-y-1 text-[11px] text-cortex-200">
                {(activeHotspot.projects ?? []).slice(0, 4).map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          {scene.hotspots.slice(0, 6).map((h) => (
            <button
              key={h.id}
              onClick={() => onSelectHotspot(h)}
              className={clsx(
                'rounded-xl border px-2 py-2 text-[11px] transition',
                h.id === activeHotspot.id
                  ? 'border-cyan-400/50 bg-cortex-800/70 text-white'
                  : 'border-cortex-800/60 bg-cortex-950/20 text-cortex-200 hover:bg-cortex-800/50'
              )}
            >
              {h.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => onSetMode('auto')}
            className={clsx(
              'rounded-xl border px-3 py-2 text-[11px]',
              mode === 'auto'
                ? 'border-cyan-400/50 bg-cortex-800/70 text-white'
                : 'border-cortex-800/60 bg-cortex-950/20 text-cortex-200 hover:bg-cortex-800/50'
            )}
          >
            Auto-rotate
          </button>
          <button
            onClick={() => onSetMode('cinematic')}
            className={clsx(
              'rounded-xl border px-3 py-2 text-[11px]',
              mode === 'cinematic'
                ? 'border-cyan-400/50 bg-cortex-800/70 text-white'
                : 'border-cortex-800/60 bg-cortex-950/20 text-cortex-200 hover:bg-cortex-800/50'
            )}
          >
            Cinematic
          </button>
          <button
            onClick={() => onSetMode('tour')}
            className={clsx(
              'rounded-xl border px-3 py-2 text-[11px]',
              mode === 'tour'
                ? 'border-cyan-400/50 bg-cortex-800/70 text-white'
                : 'border-cortex-800/60 bg-cortex-950/20 text-cortex-200 hover:bg-cortex-800/50'
            )}
          >
            Tour
          </button>
          <button
            onClick={() => onSetQuality(quality === 'balanced' ? 'cinematic' : 'balanced')}
            className="ml-auto rounded-xl border border-cortex-800/60 bg-cortex-950/20 px-3 py-2 text-[11px] text-cortex-200 hover:bg-cortex-800/50"
          >
            {quality === 'balanced' ? 'Quality: Balanced' : 'Quality: Cinematic'}
          </button>
        </div>

        <div className="mt-2 text-[10px] text-cortex-400">
          Tip: hover hotspots to preview, click to focus.
        </div>
      </div>

      {showSceneTabs && (
        <div
          className={clsx(
            'pointer-events-auto flex flex-wrap gap-2 rounded-2xl border border-cortex-600/50 bg-cortex-900/70 backdrop-blur-xl p-3',
            isOverlay ? 'absolute right-4 bottom-4' : 'relative'
          )}
        >
          {ROOMS_SCENE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => onSelectScene?.(id)}
              className={clsx(
                'rounded-xl border px-3 py-2 text-[11px] transition',
                id === sceneId
                  ? 'border-cyan-400/50 bg-cortex-800/70 text-white'
                  : 'border-cortex-800/60 bg-cortex-950/20 text-cortex-200 hover:bg-cortex-800/50'
              )}
            >
              {ROOMS_SCENES[id].title.split(' ')[0]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

