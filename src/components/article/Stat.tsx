export function Stat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-cortex-700 bg-cortex-800/60 px-4 py-5 text-center">
      <p className="font-serif text-3xl font-bold text-acetylcholine-400 sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-glutamate-500">{label}</p>
      {hint ? <p className="mt-1 text-xs text-cortex-400">{hint}</p> : null}
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">{children}</div>
  );
}
