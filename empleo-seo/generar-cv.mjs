import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

const FONTS = '/mnt/c/Windows/Fonts';
const OUT_DIR = '/home/jairoprodev/proyectos/jairosaul.com/empleo-seo';
const DOWNLOADS = '/mnt/c/Users/jairo/Downloads';
const FILE = 'CV_Jairo_Saul_Salas_Quinones_SEO_Tecnico.pdf';

const INK = '#1a1d23';
const MUTED = '#4b5563';
const RULE = '#d6d3cd';
const ACCENT = '#1f3d2b';

function addFonts(doc) {
  doc.registerFont('Reg', path.join(FONTS, 'calibri.ttf'));
  doc.registerFont('Bold', path.join(FONTS, 'calibrib.ttf'));
  doc.registerFont('Italic', path.join(FONTS, 'calibrii.ttf'));
  doc.registerFont('Serif', path.join(FONTS, 'georgia.ttf'));
  doc.registerFont('SerifBold', path.join(FONTS, 'georgiab.ttf'));
}

function rule(doc, y) {
  doc.save().strokeColor(RULE).lineWidth(0.6).moveTo(48, y).lineTo(547, y).stroke().restore();
}

function section(doc, title, y) {
  doc.font('Bold').fontSize(9).fillColor(ACCENT).text(title.toUpperCase(), 48, y, {
    characterSpacing: 0.8,
  });
  rule(doc, y + 14);
  return y + 22;
}

function roleHead(doc, y, title, meta) {
  doc.font('Bold').fontSize(10.2).fillColor(INK).text(title, 48, y, { width: 360 });
  doc.font('Reg').fontSize(9).fillColor(MUTED).text(meta, 48, y, {
    width: 499,
    align: 'right',
  });
  return y + 15;
}

function bullets(doc, y, items) {
  for (const item of items) {
    const h = doc.heightOfString(item, { width: 478, lineGap: 1.2 });
    doc.font('Reg').fontSize(9.4).fillColor(INK);
    doc.circle(54, y + 5.2, 1.15).fill(ACCENT);
    doc.text(item, 64, y, { width: 483, lineGap: 1.2, align: 'justify' });
    y += h + 4;
  }
  return y;
}

const outPath = path.join(OUT_DIR, FILE);
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 42, bottom: 40, left: 48, right: 48 },
  info: {
    Title: 'CV — Jairo Saul Salas Quiñones',
    Author: 'Jairo Saul Salas Quiñones',
    Subject: 'Desarrollo web y SEO técnico',
  },
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);
addFonts(doc);

let y = 44;
doc.font('SerifBold').fontSize(20).fillColor(INK).text('Jairo Saul Salas Quiñones', 48, y, {
  width: 499,
  align: 'center',
});
y += 26;
doc.font('Bold').fontSize(10.5).fillColor(ACCENT).text(
  'Desarrollador web  ·  SEO técnico e internacionalización',
  48,
  y,
  { width: 499, align: 'center', characterSpacing: 0.2 },
);
y += 16;
doc.font('Reg').fontSize(9).fillColor(MUTED).text(
  'Cusco, Perú   ·   +51 953 865 163   ·   JairoProDev@gmail.com',
  48,
  y,
  { width: 499, align: 'center' },
);
y += 13;
doc.font('Reg').fontSize(9).fillColor(MUTED).text(
  'jairosaul.com   ·   github.com/JairoProDev   ·   linkedin.com/in/jairosaulprodev',
  48,
  y,
  { width: 499, align: 'center' },
);
y += 22;

y = section(doc, 'Perfil', y);
doc.font('Reg').fontSize(9.6).fillColor(INK).text(
  'Desarrollo e implemento la capa técnica de sitios que venden: rastreo, indexación, hreflang, datos estructurados y Core Web Vitals. Diagnostico en WordPress y subo el arreglo (PHP, plantilla, mapa entre idiomas). Fui CTO en producto propio y en un equipo en México. El trabajo se mide en Search Console, no en un PDF de recomendaciones.',
  48,
  y,
  { width: 499, align: 'justify', lineGap: 1.6 },
);
y += 52;

y = section(doc, 'Muestra de trabajo', y);
y = roleHead(
  doc,
  y,
  'Revisión SEO técnica — red de 4 WordPress (turismo, Cusco)',
  'Ago. 2026',
);
y = bullets(doc, y, [
  'Cuatro instalaciones (EN, ES, PT, IT): cero hreflang recíproco, Offer sin moneda, reseñas reales sin declarar, inglés sin caché de página frente a un hermano en décimas.',
  'Entrega: mapa URL a URL, prototipo PHP para wp_head (el stack no admite WPML entre sitios) y auditor en Python. No es un informe para que otro implemente.',
  'jairosaul.com/peru-grand-travel',
]);
y += 6;

y = section(doc, 'Experiencia', y);

y = roleHead(doc, y, 'Fundador técnico — Buscadis y Publicadis', 'Dic. 2022 — presente');
y = bullets(doc, y, [
  'Arquitectura, código y puesta en producción de productos propios (Next.js, TypeScript). Publicadis publica sitios y catálogos de negocios; Buscadis es el marketplace. Clientes reales en Cusco y LatAm.',
  'Dueño del ciclo completo: diagnóstico, implementación, deploy y medición. Es el mismo modo de trabajo que pide un SEO técnico sobre varios dominios.',
]);
y += 3;

y = roleHead(doc, y, 'CTO — DiverEdu', 'May. 2023 — Nov. 2023');
y = bullets(doc, y, [
  'Visión técnica y producto de aprendizaje (React, Node, MongoDB). Prototipos web y móvil.',
]);
y += 3;

y = roleHead(doc, y, 'CTO — Cachimboz', 'Ago. 2022 — Dic. 2022');
y = bullets(doc, y, [
  'Dirección técnica de plataforma edtech. Responsable de arquitectura y de que el producto saliera, no de un backlog ajeno.',
]);
y += 3;

y = roleHead(doc, y, 'CTO interino — La Tatuadora (México)', 'Jul. 2022 — Dic. 2022');
y = bullets(doc, y, [
  'Automatización, APIs con LMS (Thinkific) y mejora de UX. Dirección técnica con un equipo en México, desde Cusco.',
]);
y += 3;

y = roleHead(doc, y, 'Webmaster / frontend — Sap Adventures', 'Ene. 2021 — Dic. 2021');
y = bullets(doc, y, [
  'Sitio de operador de turismo: WordPress, frontend, publicación y operación del canal digital. El stack de agencia de Cusco no me es ajeno.',
]);
y += 8;

y = section(doc, 'Competencias', y);
const skills = [
  ['SEO técnico', 'hreflang recíproco · JSON-LD (Offer, TravelAgency, reseñas por entidad) · canonical · robots.txt / sitemaps · GSC · GA4 · CWV (LCP, INP, CLS) · WAF / rastreo'],
  ['Implementación', 'WordPress · PHP (child theme, wp_head) · Yoast · Python (crawlers) · Next.js · TypeScript · Git'],
  ['Operación', 'Varios dominios, un mapa. Línea base antes de tocar producción. Informe corto, criterio escrito, código en el repo del cliente.'],
];
for (const [k, v] of skills) {
  doc.font('Bold').fontSize(9.3).fillColor(INK).text(`${k}.  `, 48, y, { continued: true });
  doc.font('Reg').fontSize(9.3).fillColor(INK).text(v, { width: 499, lineGap: 1.1 });
  y = doc.y + 5;
}
y += 6;

y = section(doc, 'Idiomas y formación', y);
doc.font('Reg').fontSize(9.4).fillColor(INK).text(
  'Español nativo. Inglés B2 (lectura técnica y documentación). Portugués: lectura técnica, en aprendizaje activo — audité el sitio en portugués yo.',
  48,
  y,
  { width: 499, lineGap: 1.3 },
);
y = doc.y + 6;
doc.font('Reg').fontSize(9.4).fillColor(INK).text(
  'Formación autodirigida en producción. Platzi (Backend, Programación, GitHub Copilot). EDteam, freeCodeCamp, documentación de Google Search Central. Paqarina Wasi (1er lugar, Vector) · IdeaLab · Startup Perú 13.ª generación (ProInnovate).',
  48,
  y,
  { width: 499, lineGap: 1.3 },
);

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

const dest = path.join(DOWNLOADS, FILE);
fs.copyFileSync(outPath, dest);
const bytes = fs.statSync(outPath).size;
console.log(`OK ${outPath}`);
console.log(`OK ${dest}`);
console.log(`bytes ${bytes}`);
