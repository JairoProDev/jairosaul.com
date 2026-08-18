export function Compare({
  leftTitle,
  rightTitle,
  left,
  right,
}: {
  leftTitle: string;
  rightTitle: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-cortex-700 bg-cortex-800/40 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cortex-400">
          {leftTitle}
        </p>
        <div className="space-y-2 text-cortex-300 [&>p]:mb-0">{left}</div>
      </div>
      <div className="rounded-xl border border-acetylcholine-500/30 bg-acetylcholine-500/5 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-acetylcholine-400">
          {rightTitle}
        </p>
        <div className="space-y-2 text-cortex-300 [&>p]:mb-0">{right}</div>
      </div>
    </div>
  );
}
