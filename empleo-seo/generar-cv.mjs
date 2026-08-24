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
const LEFT = 48;
const WIDTH = 499;
const BOTTOM = 812;

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 36, left: 48, right: 48 },
  bufferPages: true,
  info: {
    Title: 'CV — Jairo Saul Salas Quiñones',
    Author: 'Jairo Saul Salas Quiñones',
    Subject: 'Desarrollo web y SEO técnico',
  },
});

doc.registerFont('Reg', path.join(FONTS, 'calibri.ttf'));
doc.registerFont('Bold', path.join(FONTS, 'calibrib.ttf'));
doc.registerFont('Italic', path.join(FONTS, 'calibrii.ttf'));
doc.registerFont('Serif', path.join(FONTS, 'georgia.ttf'));
doc.registerFont('SerifBold', path.join(FONTS, 'georgiab.ttf'));

const outPath = path.join(OUT_DIR, FILE);
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

let y = 40;

function rule(at) {
  doc.save().strokeColor(RULE).lineWidth(0.55).moveTo(LEFT, at).lineTo(LEFT + WIDTH, at).stroke().restore();
}

function ensure(h) {
  if (y + h > BOTTOM) {
    doc.addPage();
    y = 40;
    doc.font('Reg').fontSize(8).fillColor(MUTED).text(
      'Jairo Saul Salas Quiñones  ·  Desarrollo web y SEO técnico  ·  Cusco',
      LEFT,
      y,
      { width: WIDTH, align: 'center' },
    );
    y += 16;
    rule(y);
    y += 12;
  }
}

function section(title) {
  ensure(36);
  doc.font('Bold').fontSize(9).fillColor(ACCENT).text(title.toUpperCase(), LEFT, y, {
    characterSpacing: 0.7,
  });
  rule(y + 13);
  y += 17;
}

function roleHead(title, meta) {
  ensure(22);
  doc.font('Bold').fontSize(10.1).fillColor(INK).text(title, LEFT, y, { width: 330 });
  doc.font('Reg').fontSize(8.8).fillColor(MUTED).text(meta, LEFT, y, {
    width: WIDTH,
    align: 'right',
  });
  y += 13;
}

function bullets(items) {
  for (const item of items) {
    doc.font('Reg').fontSize(9.25).fillColor(INK);
    const h = doc.heightOfString(item, { width: WIDTH - 20, lineGap: 1.15 });
    ensure(h + 6);
    doc.circle(LEFT + 5.5, y + 5, 1.1).fill(ACCENT);
    doc.font('Reg').fontSize(9.25).fillColor(INK).text(item, LEFT + 16, y, {
      width: WIDTH - 16,
      lineGap: 1.15,
      align: 'justify',
    });
    y += h + 2.6;
  }
}

function para(text, size = 9.3) {
  doc.font('Reg').fontSize(size).fillColor(INK);
  const h = doc.heightOfString(text, { width: WIDTH, lineGap: 1.35 });
  ensure(h + 6);
  doc.text(text, LEFT, y, { width: WIDTH, align: 'justify', lineGap: 1.35 });
  y += h + 4;
}

function skillLine(label, body) {
  doc.font('Bold').fontSize(9.1).fillColor(INK);
  const prefix = `${label}.  `;
  const rest = body;
  const full = prefix + rest;
  const h = doc.heightOfString(full, { width: WIDTH, lineGap: 1.05 });
  ensure(h + 5);
  doc.font('Bold').fontSize(9.1).fillColor(INK).text(prefix, LEFT, y, {
    continued: true,
    width: WIDTH,
  });
  doc.font('Reg').fontSize(9.1).fillColor(INK).text(rest, { width: WIDTH, lineGap: 1.05 });
  y = doc.y + 3;
}

// Header
doc.font('SerifBold').fontSize(19.5).fillColor(INK).text('Jairo Saul Salas Quiñones', LEFT, y, {
  width: WIDTH,
  align: 'center',
});
y += 24;
doc.font('Bold').fontSize(10.3).fillColor(ACCENT).text(
  'Desarrollador web  ·  SEO técnico e internacionalización',
  LEFT,
  y,
  { width: WIDTH, align: 'center' },
);
y += 15;
doc.font('Reg').fontSize(9).fillColor(MUTED).text(
  'Cusco, Perú   ·   +51 953 865 163   ·   JairoProDev@gmail.com',
  LEFT,
  y,
  { width: WIDTH, align: 'center' },
);
y += 12;
doc.font('Reg').fontSize(9).fillColor(MUTED).text(
  'jairosaul.com   ·   github.com/JairoProDev   ·   linkedin.com/in/jairosaulprodev',
  LEFT,
  y,
  { width: WIDTH, align: 'center' },
);
y += 18;

section('Perfil');
para(
  'Desarrollo web y SEO técnico: rastreo, indexación, hreflang, datos estructurados (JSON-LD), canonical, robots.txt, sitemaps y Core Web Vitals. Trabajo sobre WordPress (PHP, child theme, Yoast, wp_head) y sobre Next.js / TypeScript. Diagnostico en vivo con curl, cabeceras HTTP y Search Console, y subo el cambio a plantilla o a un mapa compartido entre instalaciones. Fui CTO en Cachimboz y en La Tatuadora (México), y fundador técnico de Buscadis y Publicadis. Desde 2020 construyo sitios y productos en producción, con clientes en Cusco, Arequipa y LatAm.',
);

section('Muestra de trabajo');
roleHead('Revisión SEO técnica — red de 4 WordPress (turismo, Cusco)', 'Ago. 2026');
bullets([
  'Cuatro instalaciones (EN, ES, PT, IT). Hallazgos: hreflang recíproco en cero, Offer sin priceCurrency, reseñas sin declarar por tour, cache-control no-store en el idioma de mayor ticket, WAF 406 sin user-agent de navegador, Disallow absoluto en robots.txt (RFC 9309 pide rutas relativas).',
  'Entrega: mapa URL a URL entre catálogos, prototipo PHP para emitir hreflang en wp_head (WPML no aplica: cada idioma es otro WordPress), auditor en Python (sitemaps, reciprocidad, schema, TTFB) y PDF de hallazgos. Código y tablas en jairosaul.com/peru-grand-travel.',
]);
y += 4;

section('Experiencia');
roleHead('Fundador técnico — Buscadis, Publicadis y adis.lat', 'Dic. 2022 – presente');
bullets([
  'Arquitectura, código y deploy: marketplace Buscadis (Next.js, TypeScript, Supabase), publicación de sitios y catálogos (Publicadis) y hub adis.lat. Clientes en Cusco y LatAm. Scrapers, normalización de precios/ubicaciones, SEO on-page en landings, Git y deploy en Vercel.',
  'Diagnóstico, implementación y medición en Search Console. Línea base, cambio en plantilla, verificación.',
]);
y += 2;

roleHead('CTO — DiverEdu', 'May. 2023 – Nov. 2023');
bullets([
  'Visión técnica y producto de aprendizaje (React, TypeScript, Node.js, Express, MongoDB Atlas, AWS). Prototipos web y móvil. Grafo de conocimiento y recomendaciones para estudio.',
]);
y += 2;

roleHead('CTO — Cachimboz', 'Ago. 2022 – Dic. 2022');
bullets([
  'Dirección técnica de plataforma edtech (producto posterior: Edugow / línea DiverEdu). Arquitectura, stack y salida a producción. Co-fundación; después continué con producto propio.',
]);
y += 2;

roleHead('CTO interino — La Tatuadora (México)', 'Jul. 2022 – Dic. 2022');
bullets([
  'Automatización de procesos, integración de APIs con LMS Thinkific y mejora de UX. Dirección técnica con un equipo en México, desde Cusco: entregas, código y operación del producto.',
]);
y += 2;

roleHead('Webmaster / frontend — Sap Adventures', 'Ene. 2021 – Dic. 2021');
bullets([
  'Operador de turismo: WordPress, frontend, publicación de contenido, redes y operación del canal digital. Temas, fichas de tour, WhatsApp como cierre. Stack típico de agencia de Cusco.',
]);
y += 2;

roleHead('Full-stack — Midas AI y Burse AI (proyecto Duke University)', 'Dic. 2024 – Feb. 2025');
bullets([
  'MVP de reembolsos: frontend/backend, APIs de pago, flujos de aprobación.',
]);
y += 2;

roleHead('Inicios — JoinuStudy y Club Cienciano', '2020');
bullets([
  'JoinuStudy (mar.–dic. 2020): red social educativa gamificada, primer rol en producto vivo. Club Cienciano (dic. 2020): recuperación de cuentas de Facebook y accesos de marketing.',
]);
y += 3;

section('Freelance y clientes');
para(
  'Sitios, catálogos y SEO local para negocios reales, sobre todo vía Publicadis / Buscadis.',
  9.2,
);
bullets([
  'Villa Chaco (2026): landing estática, deploy a Buscadis. buscadis.com/villachaco.',
  'Agril Sur (2026): sitio Next.js / TypeScript, catálogo en Publicadis y Vercel (agrilsur.vercel.app). github.com/JairoProDev/agrilsur.',
  'Cristalimag, Arequipa (2026): vidrios, aluminios y construcción; cotizador y SEO local. jairosaul.com/demos/cristalimag.',
  'Corporación Quival, Cusco (2025–2026): catálogo de ferretería y materiales (~510 productos), ficha comercial en ADIS.',
  'Shantall Zarai (2025): sitio Node.js / EJS. github.com/JairoProDev/ShantallZaraiWeb.',
  'Eco Terra Lodge y otras landings del programa ADIS (web, catálogo, keywords locales). Hub: adis.lat.',
]);
y += 3;

section('Proyectos personales y producto');
bullets([
  'Vector / Vectorify (convectorify.com): orquestador de misiones en Next.js y TypeScript. 1.er lugar, hackathon Paqarina Wasi (UNSAAC).',
  'Conectadis: PWA de networking en eventos (Vite, React, TypeScript). adis.lat/conectadis.',
  'Edugow: primera webapp educativa (HTML/CSS), previa a DiverEdu.',
  'jairosaul.com (Next.js): notas de SEO técnico (hreflang, schema de tours, WAF, CWV) e industria turismo (Mincetur, cupo del Camino Inca).',
]);
y += 3;

section('SEO técnico (herramientas y práctica)');
skillLine(
  'Internacionalización',
  'hreflang recíproco, autorreferencia, x-default; dominio por idioma vs subcarpeta vs ccTLD; mapa de equivalencias URL a URL; WPML/Polylang cuando el idioma vive en la misma instalación, snippet PHP cuando cada idioma es otro WordPress.',
);
skillLine(
  'Rastreo e indexación',
  'robots.txt (RFC 9309, rutas relativas, Sitemap:), sitemaps XML (post, page, product), canonical como señal, noindex vs Disallow, rastreada vs descubierta sin indexar, crawl budget en sitios chicos, parámetros y facetas, cadenas de 301 (apex / www / http).',
);
skillLine(
  'Datos estructurados',
  'JSON-LD: Organization / TravelAgency, Product + Offer (price, priceCurrency, availability), AggregateRating y Review por ficha, BreadcrumbList, FAQPage. Prueba de resultados enriquecidos e informe de producto en GSC.',
);
skillLine(
  'Rendimiento',
  'Core Web Vitals de campo (CrUX / GSC): LCP, INP, CLS. TTFB, cache-control (public vs no-store), fuentes (font-display, subset), peso de CSS/JS en temas constructor, Lighthouse como laboratorio.',
);
skillLine(
  'Medición',
  'Google Search Console (propiedades por host, sitemaps, cobertura, internacionalización, rendimiento por país), GA4, UTM, línea base antes de tocar producción.',
);
skillLine(
  'Auditoría',
  'curl y cabeceras, user-agent de navegador (WAF 406), Screaming Frog, DevTools (cobertura, LCP element), Python para cruzar sitemaps y validar reciprocidad.',
);
y += 4;

section('Stack');
skillLine(
  'Frontend',
  'HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js, Astro, EJS, React Native (prototipos).',
);
skillLine(
  'Backend y datos',
  'Node.js, Express, NestJS, PHP, Python, FastAPI. MongoDB, PostgreSQL, MySQL, Redis, SQLite, Supabase. REST, webhooks, scrapers.',
);
skillLine(
  'CMS y turismo',
  'WordPress, child themes, wp_head, Yoast, constructores (Goodlayers / Tourmaster en auditoría de operadoras), click-to-chat / WhatsApp como checkout.',
);
skillLine(
  'Cloud y Git',
  'Git, GitHub, Vercel, AWS (EC2, S3, RDS), Docker (básico), CI/CD básico, Netlify, Cloudflare / CDN a nivel de cabeceras y caché.',
);
skillLine(
  'IA aplicada',
  'Claude API, function calling, RAG / embeddings en producto propio (Buscadis, Vectorify).',
);
y += 4;

section('Formación, certificaciones y reconocimientos');
para(
  'Formación autodirigida en producción. Documentación de Google Search Central de referencia habitual.',
  9.15,
);
bullets([
  'Platzi: GitHub Copilot, Backend, Programación básica, Emprendimiento para jóvenes, Finanzas, Habilidades blandas, Personal branding, Inglés. Comunidad: 11.500+ puntos.',
  'EDteam (Web Developer, Computer Programming). freeCodeCamp (Software Developer / Engineering). Y Combinator Startup School. LinkedIn Learning y W3Schools.',
  '1.er lugar, hackathon Paqarina Wasi (UNSAAC), Vector. 2.º incubación Paqarina y IdeaLab (ADIS). 4.º IdeaLab (Vectorify). Startup Perú 13.ª generación (ProInnovate). Programa FLIT, Demo Day Arequipa.',
]);
y += 3;

section('Idiomas');
para(
  'Español nativo. Inglés B2 (lectura técnica, documentación, interfaces). Portugués: lectura técnica, en aprendizaje activo. Quechua básico.',
  9.15,
);

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

const range = doc.bufferedPageRange();
console.log('pages_buffered', range.count);

fs.copyFileSync(outPath, path.join(DOWNLOADS, FILE));
console.log('OK', outPath);
console.log('OK', path.join(DOWNLOADS, FILE));
console.log('bytes', fs.statSync(outPath).size);
