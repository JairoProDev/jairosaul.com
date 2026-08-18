import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
  info: {
    box: 'border-acetylcholine-500/40 bg-acetylcholine-500/10 text-cortex-200',
    icon: 'text-acetylcholine-400',
    Icon: Info,
    label: 'Nota',
  },
  warning: {
    box: 'border-dopamine-500/40 bg-dopamine-500/10 text-cortex-200',
    icon: 'text-dopamine-400',
    Icon: AlertTriangle,
    label: 'Cuidado',
  },
  error: {
    box: 'border-red-500/40 bg-red-500/10 text-cortex-200',
    icon: 'text-red-400',
    Icon: XCircle,
    label: 'Error',
  },
  success: {
    box: 'border-serotonin-500/40 bg-serotonin-500/10 text-cortex-200',
    icon: 'text-serotonin-400',
    Icon: CheckCircle2,
    label: 'Hecho',
  },
} as const;

export function Callout({
  children,
  type = 'info',
  title,
}: {
  children: React.ReactNode;
  type?: keyof typeof styles;
  title?: string;
}) {
  const s = styles[type];
  const Icon = s.Icon;

  return (
    <aside
      className={cn('my-8 flex gap-3 rounded-xl border p-4 sm:p-5', s.box)}
      role="note"
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', s.icon)} aria-hidden />
      <div className="min-w-0 space-y-2 text-[0.95rem] leading-relaxed [&>p]:mb-0 [&>p:not(:last-child)]:mb-2">
        <p className="font-semibold tracking-wide text-glutamate-500">
          {title || s.label}
        </p>
        {children}
      </div>
    </aside>
  );
}
