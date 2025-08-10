import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Permite pasar estilos personalizados a los componentes
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'font-serif text-3xl md:text-4xl font-bold text-glutamate-500 mb-6 mt-8',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'font-serif text-2xl md:text-3xl font-bold text-dopamine-500 mb-4 mt-8',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'font-serif text-xl md:text-2xl font-semibold text-acetylcholine-500 mb-3 mt-6',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'font-serif text-lg font-semibold text-glutamate-500 mb-2 mt-4',
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'text-cortex-300 leading-relaxed mb-4',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'list-disc list-inside space-y-2 mb-4 text-cortex-300',
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'list-decimal list-inside space-y-2 mb-4 text-cortex-300',
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={cn(
          'text-cortex-300',
          className
        )}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'border-l-4 border-serotonin-500 pl-4 italic text-cortex-300 bg-cortex-800/50 py-2 rounded-r-lg',
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'bg-cortex-800 text-acetylcholine-400 px-2 py-1 rounded text-sm font-mono',
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'bg-cortex-800 p-4 rounded-lg overflow-x-auto mb-4',
          className
        )}
        {...props}
      />
    ),
    a: ({ className, href, ...props }) => {
      const isExternal = href?.startsWith('http');
      const Component = isExternal ? 'a' : Link;
      
      return (
        <Component
          href={href || '#'}
          className={cn(
            'text-acetylcholine-500 hover:text-acetylcholine-400 underline underline-offset-2 transition-colors',
            className
          )}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        />
      );
    },
    img: ({ className, alt, ...props }) => (
      <div className="my-6">
        <Image
          className={cn(
            'rounded-lg shadow-lg w-full',
            className
          )}
          alt={alt || ''}
          width={800}
          height={400}
          {...props}
        />
      </div>
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn(
          'border-cortex-700 my-8',
          className
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table
          className={cn(
            'w-full border-collapse',
            className
          )}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'border border-cortex-600 px-4 py-2 text-left bg-cortex-800 font-semibold text-glutamate-500',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          'border border-cortex-600 px-4 py-2 text-left text-cortex-300',
          className
        )}
        {...props}
      />
    ),
    // Componentes personalizados para el blog
    Callout: ({ children, type = 'info', ...props }) => {
      const styles = {
        info: 'bg-acetylcholine-500/10 border-acetylcholine-500/20 text-acetylcholine-300',
        warning: 'bg-dopamine-500/10 border-dopamine-500/20 text-dopamine-300',
        error: 'bg-red-500/10 border-red-500/20 text-red-300',
        success: 'bg-green-500/10 border-green-500/20 text-green-300',
      };
      
      return (
        <div
          className={cn(
            'border-l-4 p-4 rounded-r-lg mb-6',
            styles[type as keyof typeof styles]
          )}
          {...props}
        >
          {children}
        </div>
      );
    },
    ...components,
  };
}
