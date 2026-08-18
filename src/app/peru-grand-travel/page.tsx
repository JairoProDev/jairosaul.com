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
  GITHUB_CODE_URL,
  MARKET_LABEL,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PAGE_URL,
  codeFiles,
  contact,
  domains,
  downloads,
  findings,
  isHttpUrl,
  methodNotes,
  parseCsv,
  relatedNotes,
  secondaryFindings,
  type CsvTable,
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
  const equivalencias = parseCsv(
    readFileSync(join(ASSETS, 'equivalencias-hreflang.csv'), 'utf8'),
  );
  const gaps = parseCsv(readFileSync(join(ASSETS, 'gaps-de-catalogo.csv'), 'utf8'));

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
          <nav aria-label="Secciones" className="flex items-center gap-2">
            <Link
              href="/seo"
              className={`rounded-lg border border-cortex-600 px-3 py-2 text-sm font-medium text-cortex-100 hover:border-cortex-400 ${focusRing}`}
            >
              Notas SEO
            </Link>
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
          <p className="text-sm font-medium text-acetylcholine-300">
            Cusco · 13 de agosto de 2026
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight text-white text-balance sm:text-5xl">
            Revisión técnica de los cuatro sitios
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cortex-300 sm:text-lg">
            Abrí perugrandtravel.com, viajesmachupicchutours.com,
            machupicchupacotes.com y viaggiomachupicchu.it. También el dominio
            viejo en español, que ya redirige bien, página a página. Abajo
            están los hallazgos, el mapa de 74 productos y el PHP para
            staging. Si quieren el detalle de hreflang, WAF o GetYourGuide,
            está en{' '}
            <Link
              href="/seo"
              className={`text-acetylcholine-300 underline-offset-2 hover:underline ${focusRing}`}
            >
              las notas
            </Link>
            .
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Dominios analizados">
            {domains.map((d) => (
              <li
                key={d.host}
                className="rounded-xl border border-cortex-600 bg-cortex-800 px-3 py-2 text-xs text-cortex-200 sm:text-sm"
              >
                <span className="font-semibold text-white">{d.lang}</span>
                <span className="mx-1.5 text-cortex-500" aria-hidden="true">
                  ·
                </span>
                <span>{d.market}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-cortex-400 sm:text-xs">
                  {d.host}
                </span>
              </li>
            ))}
          </ul>

          <nav
            aria-label="En esta página"
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-cortex-300"
          >
            <a href="#resumen-heading" className={`hover:text-white ${focusRing} rounded`}>
              Hallazgos
            </a>
            <a href="#notas-heading" className={`hover:text-white ${focusRing} rounded`}>
              Notas SEO
            </a>
            <a href="#descargas-heading" className={`hover:text-white ${focusRing} rounded`}>
              Descargas
            </a>
            <a href="#codigo-heading" className={`hover:text-white ${focusRing} rounded`}>
              Código
            </a>
          </nav>

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
                {contact.role} · {contact.location}
              </p>
              <p className="text-xs text-cortex-400">{contact.previous}</p>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="metodo-heading">
          <h2
            id="metodo-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Cómo lo miré
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            Sin acceso a Search Console ni Analytics. Lo que está abajo se
            puede repetir con curl.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {methodNotes.map((note) => (
              <div
                key={note.label}
                className="rounded-xl border border-cortex-700 bg-cortex-800 px-4 py-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-cortex-400">
                  {note.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cortex-200">
                  {note.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14" aria-labelledby="resumen-heading">
          <h2
            id="resumen-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Resumen ejecutivo
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            Cinco puntos, por impacto. El detalle se abre abajo.
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

        <section className="mt-16" aria-labelledby="notas-heading">
          <h2
            id="notas-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Notas sobre este stack
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-cortex-300">
            Las escribí en{' '}
            <Link
              href="/seo"
              className={`text-acetylcholine-300 underline-offset-2 hover:underline ${focusRing}`}
            >
              jairosaul.com/seo
            </Link>
            . Estas cinco tocan lo que vi en los cuatro sitios.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedNotes.map((note) => (
              <li key={note.href}>
                <Link
                  href={note.href}
                  className={`block h-full rounded-xl border border-cortex-700 bg-cortex-800 px-4 py-4 hover:border-cortex-500 ${focusRing}`}
                >
                  <p className="font-medium text-white">{note.title}</p>
                  <p className="mt-1 text-sm text-cortex-300">{note.why}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 audit-defer" aria-labelledby="descargas-heading">
          <h2
            id="descargas-heading"
            className="font-serif text-2xl font-semibold text-white sm:text-3xl"
          >
            Descargas
          </h2>
          <p className="mt-2 text-sm text-cortex-300">
            El PDF se abre en el navegador. Los CSV se leen aquí; el botón de
            descarga es por si quieren Excel.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {downloads.map((file) => {
              const size = fileSizeLabel(file.filename);
              const Icon = file.format === 'PDF' ? FileText : FileSpreadsheet;
              const previewHref =
                'previewHref' in file ? file.previewHref : undefined;
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
                          href={previewHref ?? file.href}
                          target={previewHref ? undefined : '_blank'}
                          rel={previewHref ? undefined : 'noopener noreferrer'}
                          className={`inline-flex items-center gap-1.5 rounded-lg bg-acetylcholine-600 px-3 py-2 text-sm font-medium text-white hover:bg-acetylcholine-500 ${focusRing}`}
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          {previewHref ? 'Ver tabla' : 'Abrir'}
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

          <CsvPreview
            id="equivalencias"
            title="Mapa de equivalencias"
            caption={`${equivalencias.rows.length} productos. EN, ES, PT e IT. Un enlace abre la ficha. El guion es que ese mercado no tiene el tour.`}
            table={equivalencias}
            urlHeaders={['url_en', 'url_es', 'url_pt_BR', 'url_it']}
          />
          <CsvPreview
            id="gaps"
            title="Gaps de catálogo"
            caption={`${gaps.rows.length} huecos. Italia es el mercado con más productos sin publicar.`}
            table={gaps}
            urlHeaders={['url_referencia']}
          />
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
            Para sistemas: WordPress + Goodlayers, cuatro instalaciones. El
            plugin no toca Tourmaster. WPML no habla entre estos cuatro MySQL.
            El Python usa UA de navegador porque el WAF corta el de
            herramienta.
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
            Si quieren mirar el PHP en staging o el mapa con sistemas, estoy en
            Cusco. El análisis queda de ustedes.
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

function csvHeaderLabel(header: string) {
  const labels: Record<string, string> = {
    producto: 'Producto',
    url_en: 'EN',
    url_es: 'ES',
    url_pt_BR: 'PT',
    url_it: 'IT',
    idiomas: 'Idiomas',
    confianza: 'Confianza',
    mercado_faltante: 'Falta en',
    existe_en: 'Existe en',
    url_referencia: 'Referencia',
  };
  return labels[header] ?? header;
}

function formatCsvCell(header: string, value: string) {
  if (header === 'mercado_faltante') {
    return MARKET_LABEL[value] ?? value;
  }
  if (header === 'existe_en') {
    return value
      .split(',')
      .map((part) => MARKET_LABEL[part.trim()] ?? part.trim())
      .join(', ');
  }
  if (value === '— NO EXISTE —') return '-';
  return value;
}

function CsvPreview({
  id,
  title,
  caption,
  table,
  urlHeaders,
}: {
  id: string;
  title: string;
  caption: string;
  table: CsvTable;
  urlHeaders: string[];
}) {
  return (
    <figure
      id={id}
      className="audit-defer mt-8 scroll-mt-24 rounded-xl border border-cortex-700 bg-cortex-800"
    >
      <figcaption className="border-b border-cortex-700 px-4 py-4 sm:px-5">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-cortex-300">{caption}</p>
      </figcaption>
      <div className="audit-table-wrap" tabIndex={0}>
        <table className="audit-table">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th key={header} scope="col">
                  {csvHeaderLabel(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join('|')}>
                {table.headers.map((header, i) => {
                  const raw = row[i] ?? '';
                  const url = urlHeaders.includes(header) && isHttpUrl(raw);
                  return (
                    <td key={header} data-col={header}>
                      {url ? (
                        <a
                          href={raw}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-acetylcholine-300 underline-offset-2 hover:underline ${focusRing}`}
                        >
                          Ver
                        </a>
                      ) : (
                        formatCsvCell(header, raw)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
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
