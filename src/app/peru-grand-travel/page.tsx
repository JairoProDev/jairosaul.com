import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Brain,
  ChevronDown,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { highlightCode } from '@/lib/highlight-code';
import {
  AUDIT_DATE_LABEL,
  GITHUB_CODE_URL,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PAGE_URL,
  codeFiles,
  contact,
  domains,
  downloads,
  findings,
  secondaryFindings,
  type Severity,
} from '@/lib/peru-grand-travel';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: 'JairoSaul.com',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const ASSETS = join(process.cwd(), 'public', 'peru-grand-travel');

function previewSource(source: string, maxLines = 60) {
  const lines = source.split('\n');
  if (lines.length <= maxLines) {
    return { text: source, total: lines.length, truncated: false };
  }
  return {
    text: `${lines.slice(0, maxLines).join('\n')}\n`,
    total: lines.length,
    truncated: true,
  };
}

function fileSizeLabel(filename: string) {
  const bytes = statSync(join(ASSETS, filename)).size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function severityStyles(severity: Severity) {
  if (severity === 'critica') {
    return {
      bar: 'border-l-red-500',
      badge: 'bg-red-950 text-red-200 border-red-500/50',
    };
  }
  if (severity === 'alta') {
    return {
      bar: 'border-l-orange-400',
      badge: 'bg-orange-950 text-orange-200 border-orange-400/50',
    };
  }
  return {
    bar: 'border-l-yellow-400',
    badge: 'bg-yellow-950 text-yellow-100 border-yellow-400/50',
  };
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acetylcholine-400';

export default function PeruGrandTravelPage() {
  const phpSource = readFileSync(join(ASSETS, 'hreflang-multidominio.php'), 'utf8');
  const pySource = readFileSync(join(ASSETS, 'auditor_seo.py'), 'utf8');
  const phpPreview = previewSource(phpSource);
  const pyPreview = previewSource(pySource);

  return (
    <div className="relative min-h-screen bg-cortex-900 text-cortex-100">
      <a
        href="#contenido"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-acetylcholine-600 focus:px-4 focus:py-2 focus:text-white ${focusRing}`}
      >
        Saltar al contenido
      </a>

      <header className="border-b border-cortex-700 bg-cortex-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-lg ${focusRing}`}
          >
            <Brain className="h-7 w-7 text-acetylcholine-400" aria-hidden="true" />
            <span className="font-serif text-lg font-semibold text-white">
              JairoSaul
            </span>
          </Link>
          <nav aria-label="Contacto rápido" className="flex items-center gap-2">
            <ContactChip
              href={contact.whatsapp}
              label="WhatsApp"
              icon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
              variant="whatsapp"
            />
            <ContactChip
              href={contact.mailto}
              label="Correo"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
            />
            <ContactChip
              href={contact.linkedin}
              label="LinkedIn"
              icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
              className="hidden sm:inline-flex"
            />
          </nav>
        </div>
      </header>

      <main
        id="contenido"
        className="mx-auto max-w-5xl px-4 pb-28 pt-10 sm:px-6 sm:pt-14 lg:pb-16"
      >
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-acetylcholine-300">
            Cusco · sin compromiso
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight text-white text-balance sm:text-5xl">
            Auditoría SEO Técnica — Peru Grand Travel
          </h1>
          <p className="mt-4 text-base text-cortex-200 sm:text-lg">
            Preparada por {contact.shortName} · {contact.location} · {AUDIT_DATE_LABEL}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cortex-300">
            Revisé la parte técnica de los tres sitios y dejé los hallazgos, el
            mapa de equivalencias y el código para implementarlos.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Dominios analizados">
            {domains.map((d) => (
              <li
                key={d.host}
                className="rounded-full border border-cortex-600 bg-cortex-800 px-3 py-1 text-xs text-cortex-200 sm:text-sm"
              >
                <span className="font-semibold text-white">{d.lang}</span>
                <span className="mx-1.5 text-cortex-500" aria-hidden="true">
                  ·
                </span>
                {d.host}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4">
            {/* Avatar local ya está en WebP; next/image añadiría JS de cliente innecesario en esta página. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={contact.avatar}
              alt={`Foto de ${contact.name}`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-cortex-600"
            />
            <div className="min-w-0">
              <p className="font-medium text-white">{contact.name}</p>
              <p className="text-sm text-cortex-300">
                Desarrollador web · {contact.location}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="resumen-heading">
          <h2
            id="resumen-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Resumen ejecutivo
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            Cinco puntos, ordenados por impacto en reservas.
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            {findings.map((item) => {
              const styles = severityStyles(item.severity);
              return (
                <li key={item.id}>
                  <a
                    href={`#hallazgo-${item.id}`}
                    className={`block h-full scroll-mt-24 rounded-xl border border-cortex-700 border-l-4 bg-cortex-800 p-4 ${styles.bar} ${focusRing} hover:border-cortex-500`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-cortex-400">
                        {item.n}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles.badge}`}
                      >
                        {item.severityLabel}
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cortex-300">
                      {item.impact}
                    </p>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16 audit-defer" aria-labelledby="descargas-heading">
          <h2
            id="descargas-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Descargas
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            El informe completo, el mapa de URLs y el código. Cada archivo se
            puede abrir en el navegador o descargar.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {downloads.map((file) => {
              const size = fileSizeLabel(file.filename);
              const Icon = file.format === 'PDF' ? FileText : FileSpreadsheet;
              return (
                <li
                  key={file.id}
                  className="rounded-xl border border-cortex-700 bg-cortex-800 p-5"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-6 w-6 shrink-0 text-acetylcholine-400"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{file.title}</p>
                      <p className="mt-1 text-sm text-cortex-300">{file.hint}</p>
                      <p className="mt-1 text-xs text-cortex-400">
                        {file.format} · {size}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={file.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-lg bg-acetylcholine-600 px-3 py-2 text-sm font-medium text-white hover:bg-acetylcholine-500 ${focusRing}`}
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          Abrir
                        </a>
                        <a
                          href={file.href}
                          download={file.filename}
                          className={`inline-flex items-center gap-1.5 rounded-lg border border-cortex-600 px-3 py-2 text-sm font-medium text-cortex-100 hover:border-cortex-400 ${focusRing}`}
                        >
                          <Download className="h-4 w-4" aria-hidden="true" />
                          Descargar
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}

            <li className="rounded-xl border border-cortex-700 bg-cortex-800 p-5">
              <div className="flex items-start gap-3">
                <Github
                  className="mt-0.5 h-6 w-6 shrink-0 text-acetylcholine-400"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">Código en GitHub</p>
                  <p className="mt-1 text-sm text-cortex-300">
                    Plugin PHP y auditor Python, en esta misma página y en el
                    repositorio.
                  </p>
                  <p className="mt-1 text-xs text-cortex-400">github.com/JairoProDev</p>
                  <a
                    href={GITHUB_CODE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-flex items-center gap-1.5 rounded-lg border border-cortex-600 px-3 py-2 text-sm font-medium text-cortex-100 hover:border-cortex-400 ${focusRing}`}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Ver código en GitHub
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="mt-16 audit-defer" aria-labelledby="detalle-heading">
          <h2
            id="detalle-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Detalle de hallazgos
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            El detalle de cada punto, si quieren leerlo aquí antes del PDF.
          </p>

          <div className="mt-6 space-y-3">
            {findings.map((item) => {
              const styles = severityStyles(item.severity);
              return (
                <details
                  key={item.id}
                  id={`hallazgo-${item.id}`}
                  name="hallazgos"
                  className={`audit-details scroll-mt-24 rounded-xl border border-cortex-700 border-l-4 bg-cortex-800 ${styles.bar}`}
                >
                  <summary
                    className={`cursor-pointer rounded-xl px-4 py-4 sm:px-5 ${focusRing}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-cortex-400">
                            {item.n}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles.badge}`}
                          >
                            {item.severityLabel}
                          </span>
                          <span className="text-[11px] text-cortex-400">
                            {item.effort}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className="audit-chevron mt-1 h-5 w-5 shrink-0 text-cortex-400 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </summary>
                  <div className="space-y-3 border-t border-cortex-700 px-4 py-4 text-sm leading-relaxed text-cortex-200 sm:px-5">
                    {item.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <p>
                      <span className="font-semibold text-white">
                        Propuesta:{' '}
                      </span>
                      {item.solution}
                    </p>
                  </div>
                </details>
              );
            })}

            <details
              name="hallazgos"
              className="audit-details rounded-xl border border-cortex-700 bg-cortex-800"
            >
              <summary
                className={`cursor-pointer rounded-xl px-4 py-4 sm:px-5 ${focusRing}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-cortex-400">
                      Anexo
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-white">
                      Hallazgos secundarios y lo que está bien hecho
                    </h3>
                  </div>
                  <ChevronDown
                    className="audit-chevron mt-1 h-5 w-5 shrink-0 text-cortex-400 transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </summary>
              <ul className="space-y-3 border-t border-cortex-700 px-4 py-4 text-sm text-cortex-200 sm:px-5">
                {secondaryFindings.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-cortex-300">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        <section className="mt-16 audit-defer" aria-labelledby="codigo-heading">
          <h2
            id="codigo-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Código de implementación
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            Escrito para WordPress + Goodlayers, tres instalaciones aparte, y
            el WAF que bloquea crawlers con user-agent de herramienta.
          </p>

          <CodePanel
            title={codeFiles[0].title}
            hint={codeFiles[0].hint}
            href={codeFiles[0].href}
            filename={codeFiles[0].filename}
            size={fileSizeLabel(codeFiles[0].filename)}
            html={highlightCode(phpPreview.text, 'php')}
            truncated={phpPreview.truncated}
            totalLines={phpPreview.total}
          />
          <CodePanel
            title={codeFiles[1].title}
            hint={codeFiles[1].hint}
            href={codeFiles[1].href}
            filename={codeFiles[1].filename}
            size={fileSizeLabel(codeFiles[1].filename)}
            html={highlightCode(pyPreview.text, 'python')}
            truncated={pyPreview.truncated}
            totalLines={pyPreview.total}
          />
        </section>

        <section
          className="mt-16 rounded-2xl border border-cortex-700 bg-cortex-800 px-5 py-8 text-center sm:px-8"
          aria-labelledby="cierre-heading"
        >
          <h2
            id="cierre-heading"
            className="font-serif text-2xl font-semibold text-white"
          >
            Conversemos
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cortex-300">
            Si algo de esto les sirve, lo vemos en persona — vivo en Cusco.
            El análisis queda de ustedes, sin compromiso.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 ${focusRing}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={contact.mailto}
              className={`inline-flex items-center gap-2 rounded-lg border border-cortex-600 px-5 py-3 text-sm font-semibold text-white hover:border-cortex-400 ${focusRing}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Correo
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border border-cortex-600 px-5 py-3 text-sm font-semibold text-white hover:border-cortex-400 ${focusRing}`}
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
          <p className="mt-6 text-xs text-cortex-400">
            {contact.email} · {contact.phone} · {contact.location}
          </p>
        </section>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){function o(){var i=location.hash.slice(1);if(!i)return;var e=document.getElementById(i);if(e&&e.tagName==="DETAILS")e.setAttribute("open","");}o();addEventListener("hashchange",o);})();`,
        }}
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cortex-700 bg-cortex-900/95 p-3 backdrop-blur-md lg:hidden">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 ${focusRing}`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}

function ContactChip({
  href,
  label,
  icon,
  variant,
  className = '',
}: {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: 'whatsapp';
  className?: string;
}) {
  const styles =
    variant === 'whatsapp'
      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
      : 'border border-cortex-600 text-cortex-100 hover:border-cortex-400';

  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${styles} ${focusRing} ${className}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function CodePanel({
  title,
  hint,
  href,
  filename,
  size,
  html,
  truncated = false,
  totalLines,
}: {
  title: string;
  hint: string;
  href: string;
  filename: string;
  size: string;
  html: string;
  truncated?: boolean;
  totalLines?: number;
}) {
  return (
    <details
      className="audit-details mt-4 overflow-hidden rounded-xl border border-cortex-700 bg-cortex-950"
    >
      <summary className={`cursor-pointer px-4 py-4 sm:px-5 ${focusRing}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs text-cortex-300">{hint}</p>
            <p className="mt-1 text-xs text-cortex-400">{size}</p>
          </div>
          <ChevronDown
            className="audit-chevron mt-1 h-5 w-5 shrink-0 text-cortex-400 transition-transform"
            aria-hidden="true"
          />
        </div>
      </summary>
      <div className="border-t border-cortex-800">
        <div className="flex flex-wrap gap-2 px-4 py-3 sm:px-5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-lg border border-cortex-600 px-3 py-1.5 text-xs font-medium text-cortex-100 hover:border-cortex-400 ${focusRing}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Abrir archivo
          </a>
          <a
            href={href}
            download={filename}
            className={`inline-flex items-center gap-1.5 rounded-lg border border-cortex-600 px-3 py-1.5 text-xs font-medium text-cortex-100 hover:border-cortex-400 ${focusRing}`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Descargar
          </a>
        </div>
        <pre className="audit-code max-h-[28rem] overflow-auto px-4 pb-5 sm:px-5">
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
        {truncated && totalLines ? (
          <p className="border-t border-cortex-800 px-4 py-3 text-xs text-cortex-400 sm:px-5">
            Vista previa: primeras 60 de {totalLines} líneas. El archivo completo
            se abre o descarga con los botones de arriba.
          </p>
        ) : null}
      </div>
    </details>
  );
}
