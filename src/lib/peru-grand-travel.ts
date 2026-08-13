/**
 * Datos de la página /peru-grand-travel.
 * Teléfono personal (no el de la startup). GitHub real: JairoProDev.
 */
export const GITHUB_CODE_URL =
  'https://github.com/JairoProDev/jairosaul.com/tree/main/public/peru-grand-travel';

export const AUDIT_DATE_ISO = '2026-08-13';
export const AUDIT_DATE_LABEL = '13 de agosto de 2026';

export const PAGE_PATH = '/peru-grand-travel';
export const PAGE_URL = `https://jairosaul.com${PAGE_PATH}`;

export const PAGE_TITLE = 'Auditoría SEO Técnica — Peru Grand Travel';
export const PAGE_DESCRIPTION =
  'Análisis de los cuatro dominios en vivo de Peru Grand Travel (EN, ES, PT, IT): hreflang, datos estructurados, reseñas y rendimiento. Hallazgos verificables y propuesta de implementación. Jairo, Cusco.';

const PHONE_DISPLAY = '+51 953 865 163';
const WHATSAPP = 'https://wa.me/51953865163';
const EMAIL = 'JairoProDev@gmail.com';
const LINKEDIN = 'https://linkedin.com/in/JairoSaulProDev';

const waText = encodeURIComponent(
  'Hola Jairo, vi la auditoría SEO de Peru Grand Travel y quiero conversar.',
);

export const contact = {
  name: 'Jairo Saul Salas Quiñones',
  shortName: 'Jairo',
  location: 'Cusco',
  email: EMAIL,
  phone: PHONE_DISPLAY,
  avatar: '/peru-grand-travel/avatar.webp',
  whatsapp: `${WHATSAPP}?text=${waText}`,
  mailto: `mailto:${EMAIL}?subject=${encodeURIComponent('Auditoría SEO — Peru Grand Travel')}`,
  linkedin: LINKEDIN,
};

export const domains = [
  { host: 'perugrandtravel.com', lang: 'EN', market: 'USA / Europa' },
  { host: 'viajesmachupicchutours.com', lang: 'ES', market: 'LATAM / España' },
  { host: 'machupicchupacotes.com', lang: 'PT', market: 'Brasil' },
  { host: 'viaggiomachupicchu.it', lang: 'IT', market: 'Italia' },
] as const;

export type Severity = 'critica' | 'alta' | 'media';

export const findings: {
  id: string;
  n: string;
  title: string;
  severity: Severity;
  severityLabel: string;
  impact: string;
  effort: string;
  body: string[];
  solution: string;
}[] = [
  {
    id: 'hreflang',
    n: '1',
    title: 'Los cuatro dominios no tienen hreflang',
    severity: 'critica',
    severityLabel: 'Crítica',
    impact:
      'Google decide qué idioma mostrar. Un italiano o un brasileño puede terminar en la versión en español.',
    effort: 'Esfuerzo medio',
    body: [
      'La red en vivo son cuatro WordPress: inglés, español, portugués e italiano. Ninguno declara equivalencias entre idiomas: ni en HTML, ni en cabeceras HTTP, ni en los sitemaps. El selector de banderas solo enlaza home con home.',
      'El dominio italiano (viaggiomachupicchu.it) está en el encabezado de los otros sitios — bandera subida en enero de 2026 — y tiene los mismos 33 tours sin hreflang que el resto.',
      'Sin esas anotaciones, Google trata las versiones de un mismo tour como páginas distintas que compiten entre sí, y elige por su cuenta cuál mostrar en cada mercado. Afecta a los 31 productos que ya existen en los cuatro idiomas, sobre una red de unas 620 URLs.',
    ],
    solution:
      'El CSV de esta página mapea URL con URL, ahora con columna italiana. El plugin PHP inyecta el bloque recíproco en wp_head de las cuatro instalaciones. WPML y Polylang no aplican: cada idioma vive en un WordPress aparte.',
  },
  {
    id: 'price-currency',
    n: '2',
    title: 'Las fichas de tour no declaran la moneda del precio',
    severity: 'critica',
    severityLabel: 'Crítica',
    impact:
      'Más de 150 fichas no pueden mostrar precio en Google. Se corrige en la plantilla.',
    effort: 'Esfuerzo bajo',
    body: [
      'En inglés e italiano el objeto Offer lleva un número (150, 372) y no dice si son dólares, soles, reales o euros.',
      'En el dominio en portugués, las fichas emiten Product sin Offer. Los cuatro sitios no hablan el mismo idioma de datos.',
      'Google exige priceCurrency. Sin ese campo, Search Console marca error y la ficha queda fuera del resultado enriquecido de producto.',
    ],
    solution:
      'Añadir priceCurrency (la moneda real de cotización) en la plantilla de tourmaster, emitir Offer completo también en ES y PT, y revisar priceValidUntil: hoy está fijo en 2027-01-01 en EN e IT.',
  },
  {
    id: 'reviews',
    n: '3',
    title: 'Cientos de reseñas reales, ninguna estrella en Google',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      'Las estrellas en el resultado suben el clic sin necesidad de ganar posiciones.',
    effort: 'Esfuerzo bajo',
    body: [
      'Las reseñas de Google y Tripadvisor se ven en el sitio (widgets). En el código no hay aggregateRating ni Review, tampoco en el dominio italiano.',
      'Las reseñas ya están. Falta declararlas para que el buscador pueda pintar estrellas en los resultados.',
    ],
    solution:
      'Emitir aggregateRating dentro del Product de cada tour, solo con reseñas de ese tour. Pegar la nota global de la empresa en cada ficha es riesgo de acción manual. En la home, marcado TravelAgency en lugar del Organization genérico.',
  },
  {
    id: 'blog-en',
    n: '4',
    title: 'Inglés e italiano casi no tienen blog',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      '0 artículos en EN y 2 en IT, frente a 101 en ES y 105 en PT. Los mercados europeos de mayor ticket no captan búsquedas de investigación.',
    effort: 'Esfuerzo alto',
    body: [
      'El post-sitemap de perugrandtravel.com está vacío. El italiano tiene dos notas. Español y portugués ya tienen más de cien artículos cada uno.',
      'Quien reserva desde EE.UU., Europa o Italia investiga durante meses (días en Cusco, Inca Trail vs Salkantay, mal de altura). Ese tráfico hoy se lo llevan los competidores.',
    ],
    solution:
      'Una página pilar por destino ancla (Machu Picchu, Inca Trail, Valle Sagrado, Montaña de Colores, Cusco) y 8–12 artículos alrededor, con enlace a la ficha de tour. Adaptar la intención de búsqueda de cada mercado; no traducir literal desde ES o PT.',
  },
  {
    id: 'rendimiento',
    n: '5',
    title: 'El inglés y el italiano cargan varias veces más lento que el portugués',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      'TTFB 1,04 s en EN y ~1,3 s en IT, frente a 0,10 s en PT. Inglés se sirve sin caché de página.',
    effort: 'Esfuerzo medio',
    body: [
      'Mismo stack, cuatro hosts. EN responde cache-control: no-store. ES y PT responden public. El HTML en inglés no se está cacheando. El italiano tampoco envía una política de caché útil.',
      'Además: 23–31 hojas de estilo, 35–72 scripts, y Google Fonts carga Poppins en 18 variantes más DM Sans con subset devanagari, un alfabeto que no usa ningún cliente de esta empresa.',
      'En móvil, sobre 4G, eso se nota antes de ver el precio.',
    ],
    solution:
      'Activar caché de página en EN e IT. Recortar fuentes a los pesos que realmente se usan, preload de la imagen principal de cada plantilla, y diferir CSS y JS que no hacen falta para el primer pintado.',
  },
];

export const secondaryFindings = [
  {
    title: 'robots.txt sin Sitemap en EN y ES',
    detail:
      'PT e IT sí declaran el sitemap (bloque Yoast). EN y ES no. Se corrige añadiendo una línea.',
  },
  {
    title: 'Disallow inválidos en EN',
    detail:
      'Tres reglas usan URL absoluta. robots.txt exige rutas relativas, así que esas líneas no bloquean nada.',
  },
  {
    title: 'Directiva malformada en ES',
    detail: 'Disallow: //wp-includes/ (doble barra) no coincide con /wp-includes/.',
  },
  {
    title: 'Paginación bloqueada',
    detail:
      'Disallow: */page/* en EN y ES corta el rastreo hacia contenido profundo. Si no se quiere indexar la paginación, mejor noindex que bloquear el rastreo.',
  },
  {
    title: 'Dos saltos hasta el www',
    detail:
      'http://perugrandtravel.com redirige a https://perugrandtravel.com y de ahí a www. Se puede dejar en un solo 301.',
  },
  {
    title: 'La migración del dominio anterior está bien hecha',
    detail:
      'paquetesdeviajesperu.com apunta a viajesmachupicchutours.com página a página, no todo a la home. Es el error más frecuente en migraciones y aquí no está.',
  },
  {
    title: 'Italia es el catálogo más corto de la red en vivo',
    detail:
      '33 tours frente a 69 en inglés. Al mercado italiano le faltan 40 productos que sí se venden en otro idioma, incluido el Valle Sagrado, Salkantay, Amazonía y los paquetes de lujo.',
  },
];

export const downloads = [
  {
    id: 'pdf',
    href: '/peru-grand-travel/auditoria-peru-grand-travel.pdf',
    filename: 'auditoria-peru-grand-travel.pdf',
    title: 'Auditoría completa',
    format: 'PDF' as const,
    hint: 'Informe con hallazgos, verificación y plan de 30 días',
  },
  {
    id: 'csv',
    href: '/peru-grand-travel/equivalencias-hreflang.csv',
    filename: 'equivalencias-hreflang.csv',
    title: 'Mapa de equivalencias',
    format: 'CSV' as const,
    hint: '74 productos mapeados EN / ES / PT / IT',
    previewHref: '#equivalencias',
  },
  {
    id: 'gaps',
    href: '/peru-grand-travel/gaps-de-catalogo.csv',
    filename: 'gaps-de-catalogo.csv',
    title: 'Gaps de catálogo',
    format: 'CSV' as const,
    hint: 'Tours que no existen en los cuatro idiomas',
    previewHref: '#gaps',
  },
] as const;

export const codeFiles = [
  {
    id: 'php',
    href: '/peru-grand-travel/hreflang-multidominio.php',
    filename: 'hreflang-multidominio.php',
    title: 'hreflang-multidominio.php',
    language: 'php' as const,
    hint: 'Plugin WordPress para emitir hreflang entre las cuatro instalaciones',
  },
  {
    id: 'python',
    href: '/peru-grand-travel/auditor_seo.py',
    filename: 'auditor_seo.py',
    title: 'auditor_seo.py',
    language: 'python' as const,
    hint: 'Auditor de sitemaps, TTFB, schema y reciprocidad hreflang',
  },
] as const;

export type CsvTable = {
  headers: string[];
  rows: string[][];
};

export function parseCsv(text: string): CsvTable {
  const src = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }

  const [headers = [], ...body] = rows;
  return { headers, rows: body };
}

export function isHttpUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://');
}

export const MARKET_LABEL: Record<string, string> = {
  en: 'Inglés',
  es: 'Español',
  'pt-BR': 'Portugués',
  it: 'Italiano',
};
