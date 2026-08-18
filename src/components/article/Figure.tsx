export function Figure({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-cortex-700 bg-cortex-800/30">
      <div className="p-4 sm:p-5">{children}</div>
      <figcaption className="border-t border-cortex-700 px-4 py-3 text-sm text-cortex-400 sm:px-5">
        {caption}
      </figcaption>
    </figure>
  );
}
