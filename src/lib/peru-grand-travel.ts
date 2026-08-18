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

export const PAGE_TITLE = 'Auditoría técnica: Peru Grand Travel (EN, ES, PT, IT)';
export const PAGE_DESCRIPTION =
  'Revisión de los cuatro sitios en vivo: hreflang, precios en Google, reseñas, blog e inglés lento. Mapa URL a URL, plugin PHP y auditor en Python.';

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
  mailto: `mailto:${EMAIL}?subject=${encodeURIComponent('Auditoría SEO, Peru Grand Travel')}`,
  linkedin: LINKEDIN,
  role: 'Desarrollo web y SEO técnico',
  previous: 'CTO en Cachimboz y La Tatuadora',
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
      'Google elige qué idioma mostrar. Un brasileño o un italiano puede caer en la ficha en español.',
    effort: 'Medio',
    body: [
      'Pedí las cuatro homes con curl y user-agent de Chrome. grep hreflang da 0 en las cuatro. Tampoco está en cabeceras HTTP ni en los sitemaps. Las banderas del header solo saltan de portada a portada.',
      'viaggiomachupicchu.it está en el encabezado desde enero de 2026 (bandera it.webp). 33 tours. Mismo hueco que el resto.',
      'Crucé los catálogos a mano: 74 productos, 31 en los cuatro idiomas. Sin la anotación, Google trata esas URLs como páginas distintas. WPML no entra aquí: son cuatro WordPress, cuatro bases.',
    ],
    solution:
      'El CSV mapea URL con URL (incluida Italia). El PHP inyecta el bloque recíproco en wp_head de las cuatro instalaciones, el mismo archivo en las cuatro. Si una ficha no existe en un idioma, esa fila lleva guion: no apunto a la home.',
  },
  {
    id: 'price-currency',
    n: '2',
    title: 'Las fichas de tour no declaran la moneda del precio',
    severity: 'critica',
    severityLabel: 'Crítica',
    impact:
      'Más de 150 fichas quedan fuera del resultado con precio. Se corrige en la plantilla, no ficha por ficha.',
    effort: 'Bajo',
    body: [
      'En una ficha EN el Offer lleva "price":"150". En una IT, "372". Ninguna dice la moneda. Google pide priceCurrency (ISO 4217) para pintar el precio en el resultado.',
      'En portugués, al menos en /pacote/vale-sul/, hay Product y no hay Offer. Los cuatro sitios no emiten el mismo grafo.',
      'priceValidUntil está fijo en 2027-01-01 en EN e IT para todo el catálogo. Si la tarifa cambia antes, el dato queda falso.',
    ],
    solution:
      'Una línea en la plantilla de Tourmaster: priceCurrency con la moneda real de ese dominio. Offer completo también en PT. Vigencia por tour, no una fecha única.',
  },
  {
    id: 'reviews',
    n: '3',
    title: 'Cientos de reseñas reales, ninguna estrella en Google',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      'Las estrellas en el resultado suben el clic. El trabajo de conseguir las reseñas ya está hecho.',
    effort: 'Bajo, si hay nota por tour',
    body: [
      'Los widgets de Google y Tripadvisor se ven. En el HTML de una ficha, grep aggregateRating da 0. Italia igual.',
      'Google pide que la nota corresponda a esa página, esté visible, y venga de usuarios reales. Copiar el 4.9 de la empresa en las 69 fichas es el atajo que suele terminar en acción manual.',
    ],
    solution:
      'AggregateRating por tour, con las reseñas de ese producto, visibles en la ficha. En la home, TravelAgency en lugar de Organization genérico (dirección, teléfono, sameAs a Tripadvisor e Instagram).',
  },
  {
    id: 'blog-en',
    n: '4',
    title: 'Inglés e italiano casi no tienen blog',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      '0 posts en EN, 2 en IT, 101 en ES, 105 en PT. El mercado de mayor ticket no tiene embudo de investigación.',
    effort: 'Alto',
    body: [
      'El post-sitemap de perugrandtravel.com está vacío. En italiano hay dos notas. En ES y PT el blog ya existe.',
      'Quien vuela desde EE.UU. o Italia suele investigar meses antes: permisos del Camino Inca, Inca Trail vs Salkantay, mal de altura. Eso hoy se lo llevan otros. Tampoco hay categorías de blog en inglés: falta la arquitectura, no solo un artículo.',
    ],
    solution:
      'Cinco pilares (Machu Picchu, Inca Trail, Cusco, Valle Sagrado, Rainbow Mountain) y satélites con enlace a la ficha. Intención de cada mercado; no traducir el blog ES o PT. El tráfico de contenido nuevo no llega el primer mes. A 90 días lo razonable es taxonomía + un pilar + tres satélites indexados.',
  },
  {
    id: 'rendimiento',
    n: '5',
    title: 'El inglés y el italiano cargan varias veces más lento que el portugués',
    severity: 'alta',
    severityLabel: 'Alta',
    impact:
      'TTFB 1,04 s en EN y ~1,3 s en IT, contra 0,10 s en PT. El inglés manda no-store.',
    effort: 'Medio',
    body: [
      'Mismo stack. EN responde cache-control: no-store, no-cache, must-revalidate. ES y PT responden public. Cada visita anónima al inglés ejecuta PHP. Si fuera el VPS, el portugués también estaría en 1 s.',
      'En el HTML: 23 a 31 CSS, 35 a 72 scripts. Google Fonts pide Poppins 100-900 con itálicas, más DM Sans, con subset devanagari. Ese alfabeto no lo usa nadie en estos mercados.',
      'En el celular, en 4G, se nota antes de ver el precio.',
    ],
    solution:
      'Alinear la caché de página del EN (e IT) con la del PT. Recortar fuentes a 3 o 4 pesos, preload del hero, fetchpriority en esa imagen, y diferir lo que no pinta el primer viewport. Coverage de DevTools antes de borrar CSS: con constructor, a ciegas se rompe el menú.',
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
      'paquetesdeviajesperu.com apunta a viajesmachupicchutours.com página a página, no todo a la home. Lo verifiqué con curl -sIL. Es el error más frecuente en migraciones y aquí no está.',
  },
  {
    title: 'Italia es el catálogo más corto',
    detail:
      '33 tours frente a 69 en inglés. Al italiano le faltan unos 40 que sí se venden en otro idioma (Valle Sagrado, Salkantay, Amazonía, lujo). A Brasil le faltan 19, incluidos paquetes de lujo que solo vi en inglés.',
  },
  {
    title: 'Lo que ya vi en otras agencias de Cusco',
    detail:
      'TreXperience declara hreflang entre inglés y español. Valencia Travel emite TravelAgency, TouristTrip y AggregateRating en portada. Nadie que medí tiene el combo completo. Ustedes tienen cuatro dominios: más que ganar si se anota, y más que perder si Google sigue eligiendo el idioma solo.',
  },
];

export const methodNotes = [
  {
    label: 'Fecha',
    value: 'EN, ES y PT el 9 de agosto de 2026. Italiano el 13.',
  },
  {
    label: 'Cómo',
    value:
      'curl con User-Agent de Chrome y header Accept. El WAF responde 406 a UA de herramienta; Screaming Frog en default va a decir que el sitio no carga.',
  },
  {
    label: 'Stack que vi',
    value:
      'WordPress, tema traveltour (Goodlayers) + child, Tourmaster, Yoast, click-to-chat, PixelYourSite.',
  },
  {
    label: 'Qué no pude ver',
    value:
      'Search Console, Analytics, CrUX de campo. Sin eso no afirmo indexación real ni conversiones. Con lectura de las cuatro propiedades se cierra en la primera semana.',
  },
];

export const relatedNotes = [
  {
    href: '/seo/hreflang-turismo-idioma-equivocado',
    title: 'Hreflang cuando cada idioma es otro dominio',
    why: 'El grep, la reciprocidad y por qué la bandera no alcanza.',
  },
  {
    href: '/seo/wpml-no-sirve-wordpress-aparte',
    title: 'Por qué no usaría WPML aquí',
    why: 'Cuatro MySQL. Un mapa compartido y el mismo snippet en wp_head.',
  },
  {
    href: '/seo/precio-google-offer-pricecurrency',
    title: 'Offer sin moneda',
    why: 'Lo que pide Google para pintar el precio y dónde se toca en Tourmaster.',
  },
  {
    href: '/seo/waf-screaming-frog-406',
    title: 'El 406 del WAF',
    why: 'Cómo lo rastreé y qué le pediría a sistemas (Googlebot sí, scrapers no).',
  },
  {
    href: '/seo/margen-getyourguide-sin-pelea',
    title: 'GetYourGuide y la web propia',
    why: 'Paridad de ficha. No propongo borrar la cuenta.',
  },
];

export const relatedTurismoNotes = [
  {
    href: '/industrias/turismo/brasil-crecio-quince',
    title: 'Brasil creció 15%',
    why: 'Mincetur 2025. 19 tours que el PT no publica, varios de lujo.',
  },
  {
    href: '/industrias/turismo/cupo-camino-inca-quinientos',
    title: '500 al día, unas 200 son turistas',
    why: 'El cupo del clásico y por qué junio se acaba.',
  },
  {
    href: '/industrias/turismo/cuatro-sitios-un-piso-cusco',
    title: 'Cuatro sitios, un piso en Cusco',
    why: 'El mismo stack, distinta config. El porqué de negocio de la revisión.',
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
    hint: 'Plugin para wp_head. El mismo archivo en las cuatro instalaciones.',
  },
  {
    id: 'python',
    href: '/peru-grand-travel/auditor_seo.py',
    filename: 'auditor_seo.py',
    title: 'auditor_seo.py',
    language: 'python' as const,
    hint: 'Sitemaps, TTFB, schema y si el hreflang se responde entre sí. UA de navegador: el WAF da 406 si no.',
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
