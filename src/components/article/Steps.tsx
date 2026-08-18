export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <ol className="article-steps my-8 list-none space-y-4 p-0">{children}</ol>
  );
}

export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acetylcholine-500/20 font-mono text-sm font-bold text-acetylcholine-400">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="font-semibold text-glutamate-500">{title}</p>
        <div className="mt-1 text-cortex-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </li>
  );
}
