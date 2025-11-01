'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  theme?: 'dark' | 'light';
}

export default function GiscusComments({ theme = 'dark' }: GiscusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'JairoSaulProDev/jairosaul.com');
    script.setAttribute('data-repo-id', 'R_kgDONPbqkA'); // Necesitarás el tuyo real
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDONPbqkM4CkxFy'); // Necesitarás el tuyo real
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [theme]);

  return (
    <div className="giscus-comments">
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Comentarios
        </h3>
        <p className="text-cortex-300 text-sm">
          Comparte tus pensamientos, preguntas o feedback.
        </p>
      </div>
      <div ref={commentsRef} />
    </div>
  );
}
