import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/article/Callout';
import { Compare } from '@/components/article/Compare';
import { Figure } from '@/components/article/Figure';
import { Stat, StatRow } from '@/components/article/Stat';
import { Step, Steps } from '@/components/article/Steps';
import { slugifyHeading } from '@/lib/headings';
import { cn } from '@/lib/utils';

function flatten(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flatten).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    return flatten((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return '';
}

function Heading({
  as: Tag,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as: 'h2' | 'h3' | 'h4' }) {
  const id = slugifyHeading(flatten(children));
  return (
    <Tag id={id} className={className} {...props}>
      <a href={`#${id}`} className="font-inherit text-inherit no-underline hover:underline">
        {children}
      </a>
    </Tag>
  );
}

export const articleMdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-2 font-serif text-3xl font-bold text-glutamate-500 md:text-4xl',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, children, ...props }) => (
    <Heading
      as="h2"
      className={cn(
        'mb-4 mt-12 scroll-mt-28 font-serif text-2xl font-bold text-dopamine-500 md:text-3xl',
        className,
      )}
      {...props}
    >
      {children}
    </Heading>
  ),
  h3: ({ className, children, ...props }) => (
    <Heading
      as="h3"
      className={cn(
        'mb-3 mt-8 scroll-mt-28 font-serif text-xl font-semibold text-acetylcholine-500 md:text-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </Heading>
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'mb-2 mt-6 font-serif text-lg font-semibold text-glutamate-500',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('mb-4 leading-relaxed text-cortex-300', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn('mb-6 list-disc space-y-2 pl-5 text-cortex-300', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn('mb-6 list-decimal space-y-2 pl-5 text-cortex-300', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('leading-relaxed', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-6 rounded-r-xl border-l-4 border-serotonin-500 bg-cortex-800/50 py-3 pl-5 pr-4 italic text-cortex-300',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className={cn('font-mono text-[0.85em]', className)} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className={cn(
          'rounded bg-cortex-800 px-1.5 py-0.5 font-mono text-[0.9em] text-acetylcholine-400',
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mb-6 overflow-x-auto rounded-xl border border-cortex-700 bg-[#0b1220] p-4 text-sm leading-relaxed text-cortex-200',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          className={cn(
            'text-acetylcholine-500 underline decoration-acetylcholine-500/40 underline-offset-2 hover:text-acetylcholine-400',
            className,
          )}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href || '#'}
        className={cn(
          'text-acetylcholine-500 underline decoration-acetylcholine-500/40 underline-offset-2 hover:text-acetylcholine-400',
          className,
        )}
        {...props}
      />
    );
  },
  hr: ({ className, ...props }) => (
    <hr className={cn('my-10 border-cortex-700', className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-cortex-700">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn('bg-cortex-800', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border-b border-cortex-600 px-3 py-2 text-left font-semibold text-glutamate-500',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border-b border-cortex-700 px-3 py-2 text-cortex-300', className)}
      {...props}
    />
  ),
  Callout,
  Compare,
  Figure,
  Stat,
  StatRow,
  Step,
  Steps,
};
