import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mdPath = join(root, 'empleo-seo/02-AUDITORIA-SEO-TECNICA-preliminar.md');
const outPath = join(root, 'public/peru-grand-travel/auditoria-peru-grand-travel.pdf');
const htmlPath = join(tmpdir(), 'audit-pgt.html');

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let i = 0;
  let inCode = false;
  let codeLang = '';
  let codeBuf = [];
  let inTable = false;
  let tableBuf = [];

  const flushTable = () => {
    if (!tableBuf.length) return;
    const rows = tableBuf.filter((r) => !/^\|?\s*-+\s*\|/.test(r));
    html += '<table>';
    rows.forEach((row, idx) => {
      const cells = row
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim());
      const tag = idx === 0 ? 'th' : 'td';
      html += '<tr>' + cells.map((c) => `<${tag}>${inline(c)}</${tag}>`).join('') + '</tr>';
    });
    html += '</table>';
    tableBuf = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
        codeBuf = [];
        inCode = false;
      } else {
        if (inTable) flushTable();
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      i += 1;
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      i += 1;
      continue;
    }

    if (line.startsWith('|')) {
      inTable = true;
      tableBuf.push(line);
      i += 1;
      continue;
    }
    if (inTable) flushTable();

    if (line.startsWith('# ')) {
      html += `<h1>${inline(line.slice(2))}</h1>`;
    } else if (line.startsWith('## ')) {
      html += `<h2>${inline(line.slice(3))}</h2>`;
    } else if (line.startsWith('### ')) {
      html += `<h3>${inline(line.slice(4))}</h3>`;
    } else if (line.startsWith('> ')) {
      html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
    } else if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i += 1;
      }
      html += `<ul>${items.join('')}</ul>`;
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i += 1;
      }
      html += `<ol>${items.join('')}</ol>`;
      continue;
    } else if (line === '---') {
      html += '<hr />';
    } else if (line.trim() === '') {
      html += '';
    } else {
      html += `<p>${inline(line)}</p>`;
    }
    i += 1;
  }
  if (inTable) flushTable();
  return html;
}

const body = mdToHtml(readFileSync(mdPath, 'utf8'));

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Auditoría SEO Técnica — Peru Grand Travel</title>
  <style>
    @page { size: A4; margin: 18mm 16mm 20mm; }
    body {
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1e293b;
    }
    h1 { font-size: 18pt; margin: 0 0 12pt; color: #0f172a; }
    h2 { font-size: 13pt; margin: 18pt 0 8pt; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4pt; }
    h3 { font-size: 11pt; margin: 12pt 0 6pt; color: #1e3a8a; }
    p { margin: 0 0 8pt; }
    table { width: 100%; border-collapse: collapse; margin: 8pt 0 12pt; font-size: 9.5pt; }
    th, td { border: 1px solid #cbd5e1; padding: 5pt 6pt; text-align: left; vertical-align: top; }
    th { background: #f1f5f9; }
    code { font-family: ui-monospace, Consolas, monospace; font-size: 8.5pt; background: #f1f5f9; padding: 0 3pt; }
    pre { background: #0f172a; color: #e2e8f0; padding: 10pt; font-size: 8pt; overflow: hidden; white-space: pre-wrap; }
    pre code { background: none; color: inherit; padding: 0; }
    ul, ol { margin: 0 0 10pt; padding-left: 18pt; }
    blockquote { margin: 8pt 0; padding: 8pt 10pt; background: #f8fafc; border-left: 3pt solid #3b82f6; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 14pt 0; }
    .meta { color: #475569; font-size: 9.5pt; margin-bottom: 14pt; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

mkdirSync(dirname(htmlPath), { recursive: true });
writeFileSync(htmlPath, html);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
});
await browser.close();
console.log('PDF escrito en', outPath);
