import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";

const FONTS = "/mnt/c/Windows/Fonts";
const OUT_DIR = "/home/jairoprodev/proyectos/jairosaul.com/empleo-mkt";
const FILE = "CV_Shantall_Zarai_Ascue_Valdez_CPS.pdf";

const INK = "#1a2744";
const MUTED = "#4a5568";
const RULE = "#d5dbe3";
const ACCENT = "#9b1c2c";
const LEFT = 48;
const WIDTH = 499;

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: 48, right: 48 },
  info: {
    Title: "CV — Shantall Zarai Ascue Valdez",
    Author: "Shantall Zarai Ascue Valdez",
    Subject: "Asistente de Marketing · Clínica Peruano Suiza",
  },
});

doc.registerFont("Reg", path.join(FONTS, "calibri.ttf"));
doc.registerFont("Bold", path.join(FONTS, "calibrib.ttf"));
doc.registerFont("Italic", path.join(FONTS, "calibrii.ttf"));

const outPath = path.join(OUT_DIR, FILE);
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

let y = 42;

function rule(at) {
  doc.save().strokeColor(RULE).lineWidth(0.6).moveTo(LEFT, at).lineTo(LEFT + WIDTH, at).stroke().restore();
}

function section(title) {
  y += 4;
  doc.font("Bold").fontSize(9).fillColor(ACCENT).text(title.toUpperCase(), LEFT, y, { characterSpacing: 0.8 });
  rule(y + 12);
  y += 18;
}

function roleHead(title, meta) {
  doc.font("Bold").fontSize(10.2).fillColor(INK).text(title, LEFT, y, { width: 310 });
  doc.font("Reg").fontSize(8.6).fillColor(MUTED).text(meta, LEFT, y, { width: WIDTH, align: "right" });
  y += 14;
}

function bullets(items) {
  for (const item of items) {
    const h = doc.font("Reg").fontSize(9.4).heightOfString(item, { width: WIDTH - 14 });
    doc.fillColor(INK).circle(LEFT + 3, y + 5, 1.1).fill();
    doc.fillColor(INK).text(item, LEFT + 14, y, { width: WIDTH - 14 });
    y += h + 3;
  }
}

doc.font("Bold").fontSize(16.5).fillColor(INK).text("Shantall Zarai Ascue Valdez", LEFT, y);
y += 20;
doc.font("Reg").fontSize(10).fillColor(ACCENT).text("Comunicadora  ·  Contenido, marca y redes", LEFT, y);
y += 16;
doc.font("Reg").fontSize(9).fillColor(MUTED).text(
  "Cusco, Perú  ·  990 551 461  ·  linkedin.com/in/shantallzarai",
  LEFT,
  y,
);
y += 18;
rule(y);
y += 14;

doc.font("Reg").fontSize(9.6).fillColor(INK).text(
  "Bachiller en Ciencias de la Comunicación (UNSAAC). Cofundadora y responsable de comunicación de ADIS, donde diseño y ejecuto estrategia de contenido, piezas gráficas y audiovisuales, redes y relación con clientes reales en Cusco. Experiencia institucional (Biblioteca Municipal) y de medio (Exitosa Noticias). Postulo a Asistente de Marketing con producción de punta a punta y criterio para comunicar en salud sin vender milagros.",
  LEFT,
  y,
  { width: WIDTH, align: "justify" },
);
y += 52;

section("Experiencia");

roleHead("Cofundadora / CMO — ADIS (Publicadis · Buscadis)", "Cusco  ·  2023 – presente");
bullets([
  "Estrategia de contenido y marca para el ecosistema ADIS y para negocios locales de servicios, turismo y retail.",
  "Producción de piezas gráficas y audiovisuales: concepto, diseño, video corto, publicación y seguimiento básico.",
  "Gestión de redes, tono de marca, outreach y reportes simples de alcance e interacción.",
  "Trabajo de punta a punta: del diagnóstico al calendario, sin agencia en el medio.",
]);
y += 6;

roleHead("Comunicaciones y RR.PP. — Biblioteca Municipal del Cusco", "sep 2023 – feb 2024");
doc.font("Italic").fontSize(8.6).fillColor(MUTED).text("“Gustavo Pérez Ocampo”", LEFT, y);
y += 12;
bullets([
  "Fotografía oficial, diseño gráfico y visibilidad en redes de una institución pública.",
  "Organización y protocolo de eventos institucionales.",
]);
y += 6;

roleHead("Practicante / corresponsal Cusco — Exitosa Noticias", "prácticas preprofesionales");
bullets([
  "Cobertura, fotografía y video en ritmo de medio: plazos, precisión y cara pública.",
]);

section("Formación");
doc.font("Bold").fontSize(10.2).fillColor(INK).text("Bachiller en Ciencias de la Comunicación", LEFT, y);
y += 13;
doc.font("Reg").fontSize(9.3).fillColor(MUTED).text(
  "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)  ·  2019 – 2024",
  LEFT,
  y,
);
y += 18;

section("Herramientas");
doc.font("Reg").fontSize(9.4).fillColor(INK).text(
  "Gestión de redes  ·  Canva  ·  CapCut  ·  Fotografía  ·  Copy  ·  Calendario editorial  ·  Analítica básica (Meta)  ·  Protocolo de eventos  ·  Trabajo en equipo",
  LEFT,
  y,
  { width: WIDTH },
);
y += 28;

section("Idiomas");
doc.font("Reg").fontSize(9.4).fillColor(INK).text("Español (nativo)  ·  Inglés (completar nivel real antes de imprimir)", LEFT, y);

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

const downloads = "/mnt/c/Users/jairo/Downloads";
try {
  fs.copyFileSync(outPath, path.join(downloads, FILE));
} catch {
  /* Downloads may be unavailable from this environment */
}

console.log("Wrote", outPath);
