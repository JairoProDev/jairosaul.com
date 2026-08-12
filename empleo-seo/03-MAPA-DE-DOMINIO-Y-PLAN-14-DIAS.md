# Mapa de dominio SEO Técnico + Plan de ejecución de 14 días

---

## Parte 0 — Una corrección de estrategia antes de empezar

Escribiste que tendrías que amanecerte estudiando. **No lo hagas, y no por moralina: por matemática de resultados.**

El trabajo que te va a conseguir este puesto no es acumular horas de video. Es **detectar errores técnicos reales en un sitio ajeno y explicarlos con precisión**. Eso es trabajo de detección de patrones y juicio fino — exactamente la capacidad que más se degrada con privación de sueño, y la que más rápido se recupera con descanso. Un hallazgo falso en tu auditoría (reportar un error que no existe, o que ya arreglaron) te descalifica al instante ante alguien técnico. Cuatro noches en vela garantizan ese error.

Además, si te contratan tienes que **rendir presencialmente desde el día uno**. Llegar quemado a la semana 1 es la forma más rápida de perder un empleo recién ganado.

**Régimen realista:** 6-8 h de trabajo profundo al día durante 14 días, dormido. Eso son ~100 horas enfocadas. Es más que suficiente para lo que necesitas. Si sientes que necesitas amanecerte es señal de que el plan tiene demasiado alcance — recorta alcance, no sueño.

---

## Parte 1 — Mapa de dominio: qué significa realmente "SEO Técnico"

Seis bloques. Debes poder **hacer, explicar y medir** cada uno. La columna "profundidad" indica hasta dónde necesitas llegar en 14 días.

### Bloque 1 — Rastreo (Crawling)
| Concepto | Profundidad |
|---|---|
| `robots.txt`: sintaxis, rutas relativas, orden de precedencia, comodines `*` y `$`, `Allow` vs `Disallow` | **Dominio total** |
| Presupuesto de rastreo: qué lo consume, cuándo importa (>10k URLs), cuándo no | Conceptual + saber cuándo NO aplica |
| Estadísticas de rastreo en GSC: leer picos, códigos de respuesta, tiempos de respuesta | **Dominio total** |
| Sitemaps XML: índice, límites (50k URLs / 50MB), `lastmod`, sitemaps de imágenes | **Dominio total** |
| Cadenas y bucles de redirección; 301 vs 302 vs 307 vs 308 | **Dominio total** |
| Códigos de estado: 200, 301, 302, 304, 404, 410, 429, 500, 503 y qué implica cada uno para el rastreador | **Dominio total** |
| Renderizado JS: cola de renderizado, DOM inicial vs renderizado, SSR/SSG/CSR | Conceptual sólido |
| `noindex` en robots.txt no existe (error clásico); bloquear ≠ desindexar | **Dominio total** |

### Bloque 2 — Indexación
| Concepto | Profundidad |
|---|---|
| Informe de Indexación de páginas en GSC: todas las categorías y qué hacer con cada una | **Dominio total** |
| "Rastreada, actualmente sin indexar" vs "Detectada, actualmente sin indexar" — la diferencia y qué la causa | **Dominio total** |
| Canonicalización: `rel=canonical`, canónica declarada vs canónica seleccionada por Google, señales conflictivas | **Dominio total** |
| Contenido duplicado, casi duplicado y canibalización | **Dominio total** |
| Meta robots vs cabecera `X-Robots-Tag` (para PDFs, imágenes, no-HTML) | **Dominio total** |
| Herramienta de Inspección de URL: prueba en vivo, HTML renderizado, recursos bloqueados | **Dominio total** |
| Parámetros de URL, facetas, paginación (`rel=next/prev` está muerto — qué se usa hoy) | Sólido |

### Bloque 3 — Arquitectura e internacional
| Concepto | Profundidad |
|---|---|
| **`hreflang`: sintaxis, reciprocidad, autorreferencia, `x-default`, códigos ISO 639-1/3166-1** | **Dominio total — es TU hallazgo estrella** |
| Tres formas de implementar hreflang: HTML, cabecera HTTP, sitemap XML — pros y contras | **Dominio total** |
| Errores típicos: falta de retorno, códigos inválidos, apuntar a URLs con redirección o no canónicas | **Dominio total** |
| Estructura de dominio: ccTLD vs subdominio vs subcarpeta vs dominio-por-idioma (lo que ellos usan) | **Dominio total** |
| Profundidad de clic, enlazado interno, silos temáticos, páginas huérfanas | **Dominio total** |
| Migraciones: mapeo de redirecciones, checklist previo y posterior | Sólido |

### Bloque 4 — Rendimiento / Core Web Vitals
| Concepto | Profundidad |
|---|---|
| **LCP**: qué elemento es, causas típicas (TTFB, recursos bloqueantes, lazy-load del hero, imagen pesada) | **Dominio total** |
| **INP** (reemplazó a FID en 2024): qué mide, causas, cómo se arregla | **Dominio total** |
| **CLS**: dimensiones de imagen, fuentes, inyecciones tardías, banners | **Dominio total** |
| Datos de campo (CrUX) vs laboratorio (Lighthouse) — por qué difieren y cuál manda | **Dominio total — separa juniors de seniors** |
| Cadena de solicitudes críticas, render-blocking, `preload` / `preconnect` / `fetchpriority` | **Dominio total** |
| Estrategia de fuentes: `font-display`, subsets, autoalojar vs Google Fonts | **Dominio total** |
| Imágenes: WebP/AVIF, `srcset`, dimensiones explícitas, lazy-load correcto (nunca el LCP) | **Dominio total** |
| Caché: `cache-control`, CDN, caché de página en WordPress | Sólido |

### Bloque 5 — Datos estructurados
| Concepto | Profundidad |
|---|---|
| JSON-LD, sintaxis, el grafo de schema, `@id` y referencias | **Dominio total** |
| Tipos críticos para turismo: `Product`, `Offer` (**`priceCurrency` obligatorio**), `AggregateRating`, `Review`, `FAQPage`, `BreadcrumbList`, `TravelAgency`, `TouristAttraction`, `TouristTrip`, `Trip` | **Dominio total** |
| Políticas de reseñas de Google: qué se puede marcar y qué provoca acción manual | **Dominio total** |
| Prueba de resultados enriquecidos + Validador de Schema.org + informes de mejoras en GSC | **Dominio total** |

### Bloque 6 — Medición e instrumentación
| Concepto | Profundidad |
|---|---|
| GSC: Rendimiento (consultas/páginas/países/dispositivos), filtros, comparativas, exportación | **Dominio total** |
| Límites de GSC: muestreo, 1000 filas en UI, 16 meses, uso de la API | Sólido |
| GA4: eventos, conversiones, exploraciones, atribución del canal orgánico | Sólido |
| Looker Studio: conectar GSC + GA4 y montar un panel | **Hacer uno real** |
| Definir KPIs de negocio, no de vanidad: reservas asistidas > impresiones | **Dominio total** |

### Herramientas que debes tocar con las manos
- **Screaming Frog** (versión gratis: 500 URLs — suficiente; aprende: modo lista, extracción personalizada con XPath, configurar UA, crawl de JS, informe de duplicados)
- **Google Search Console** (monta uno en un sitio tuyo — es la única forma de aprenderlo de verdad)
- **PageSpeed Insights / Lighthouse / WebPageTest / DevTools** (pestaña Rendimiento y Cobertura)
- **Ahrefs / Semrush** — el coste es real; usa **pruebas gratuitas de 7 días programadas para la semana 2**, además de Ahrefs Webmaster Tools (gratis para sitios verificados) y las funciones gratuitas de Semrush
- **Alternativas gratuitas creíbles:** Google Trends, Search Console propio, `curl`, Rich Results Test, Sitebulb (prueba), Ubersuggest limitado

---

## Parte 2 — Tu ventaja injusta (no la desperdicies)

Los otros postulantes son marketeros que aprendieron SEO. **Tú eres programador.** Eso significa:

1. Puedes **implementar**, no solo recomendar. El 90% de auditorías SEO mueren en un PDF porque nadie las ejecuta. Tú llegas y dices: *"puedo escribir el snippet de hreflang para las tres instalaciones WordPress yo mismo."* Eso vale el doble del sueldo publicado.
2. Puedes **automatizar**: scripts en Python que rastrean las 570 URLs, validan reciprocidad de hreflang, verifican el schema y emiten un reporte diario. Ningún analista SEO promedio en Cusco hace eso.
3. Entiendes **el rendimiento desde el código**, no desde un plugin.
4. Tienes experiencia real construyendo productos web. Eso no es "no tengo experiencia": es experiencia adyacente demostrable.

**Reformulación de tu brecha:** no eres un junior sin 3 años de SEO. Eres un desarrollador que hace SEO técnico — el perfil que las agencias grandes pagan más caro y no encuentran.

---

## Parte 3 — Plan de 14 días

Cada día: **bloque de aprendizaje** (input) + **bloque de construcción** (output). Nunca solo input.

### Días 1-3 — Fundamentos + tu laboratorio

**Día 1**
- Input (3 h): Documentación de Google Search Central completa, secciones de rastreo e indexación. Es la fuente primaria y es gratis. Léela entera, no resúmenes de blog.
- Build (3 h): monta **tu laboratorio**. Un WordPress limpio (o usa tus propios dominios ADIS) verificado en Search Console + GA4. Rompe cosas a propósito: mete un `noindex`, un canonical cruzado, un robots.txt mal escrito. Observa qué reporta GSC.
- Entregable: capturas de tu GSC con propiedades verificadas.

**Día 2**
- Input (3 h): `hreflang` — documentación oficial de Google sobre versiones localizadas + los casos de error documentados.
- Build (4 h): implementa `hreflang` real entre dos idiomas en tu laboratorio. Rompe la reciprocidad a propósito y mira el informe de Segmentación internacional.
- Entregable: **script en Python que valide reciprocidad de hreflang** dado un listado de URLs. Este script es un artefacto de portafolio por sí solo.

**Día 3**
- Input (3 h): Core Web Vitals — documentación de web.dev sobre LCP, INP y CLS.
- Build (4 h): toma la peor página de tu laboratorio y llévala de rojo a verde. Documenta cada cambio con antes/después medido.
- Entregable: estudio de caso "de X a Y en LCP" con capturas.

### Días 4-6 — Herramientas y crawling profesional

**Día 4** — Screaming Frog a fondo: configuración de UA, modo lista, extracción personalizada, renderizado JS, informes de duplicados. Rastrea 5 sitios de agencias de Cusco. **Build:** matriz comparativa de salud técnica de 5 competidores.

**Día 5** — Datos estructurados. Implementa `Product` + `Offer` + `AggregateRating` + `FAQPage` completos y válidos en tu laboratorio. **Build:** una **librería de plantillas JSON-LD para turismo** lista para pegar. Este es un entregable regalable de altísimo valor percibido.

**Día 6** — GSC + GA4 + Looker Studio. **Build:** un panel de Looker Studio reutilizable que muestre salud técnica + rendimiento orgánico. Te sirve para el portafolio Y para el primer día de trabajo.

### Días 7-9 — El activo principal: la auditoría de ellos

**Día 7** — Verifica de punta a punta la auditoría preliminar del documento 02. Cada hallazgo, con tu propio crawl. Añade lo que encuentres tú. **Elimina lo que ya hayan corregido.**

**Día 8** — Rastrea las 570 URLs de sus tres dominios con Screaming Frog. Busca: páginas huérfanas, cadenas de redirección, títulos duplicados entre ES y el dominio legacy, profundidad de clic, imágenes sin dimensiones, enlaces rotos.

**Día 9** — Construye el **mapa de equivalencias hreflang de sus 3 dominios** (hoja de cálculo con las ~50-60 correspondencias de tours). Este es el entregable que nadie más va a traer, porque requiere trabajo manual real y conocimiento de sus tres catálogos.

### Días 10-11 — Prototipo funcional (tu arma de programador)

**Día 10** — Escribe el **snippet PHP de `hreflang` para WordPress** que consume tu mapa de equivalencias e inyecta las etiquetas en `wp_head`. Pruébalo en tu laboratorio con tres instalaciones.

**Día 11** — Escribe el **auditor automático en Python**: rastrea los tres dominios, valida schema, verifica reciprocidad de hreflang, mide TTFB, detecta `priceCurrency` faltante, y genera un reporte HTML. Súbelo a GitHub con README decente.

### Días 12-13 — Empaquetado y contacto

**Día 12** — Maqueta la auditoría como documento profesional (PDF con portada, índice, severidades, capturas). Graba un **Loom de 5 minutos** explicando los 3 hallazgos principales sobre pantalla compartida. El video es lo que convierte: demuestra que puedes explicar, no solo detectar.

**Día 13** — **Envío.** Documento 05: guiones exactos. Multicanal el mismo día: correo + WhatsApp + LinkedIn + Instagram.

### Día 14 — Preparación de entrevista y seguimiento
- Simulacro de las 30 preguntas técnicas del documento 05.
- Prepara la conversación de salario.
- Si no hubo respuesta al día 13: seguimiento con **hallazgo nuevo**, nunca con "¿pudo revisar mi correo?".

---

## Parte 4 — Portugués en 14 días (lo justo y necesario)

No vas a hablarlo. Vas a **leerlo técnicamente**, que es lo que el puesto realmente exige.

- 30 min/día. Nada más.
- **Método:** lee su propio sitio PT en paralelo con el ES. Mismo contenido, dos idiomas. Es el corpus perfecto de aprendizaje y además te obliga a conocer su catálogo.
- Construye un glosario de **80 términos SEO + turismo en PT-BR**: *palavra-chave, taxa de rejeição, pacote, passeio, ingresso, roteiro, trilha, hospedagem, traslado, reserva, avaliação, mecanismo de busca, rastreamento, indexação, velocidade de carregamento*.
- Lee 5 reseñas en portugués de su Tripadvisor cada día.
- **En el mensaje y en la entrevista, di la verdad exacta:** *"Portugués: nivel lector técnico, en aprendizaje activo. Puedo auditar y optimizar contenido en PT-BR desde hoy; conversacional aún no."* Y entonces enseñas la auditoría del sitio PT que ya hiciste. La demostración desactiva la objeción.

---

## Parte 5 — Los 5 errores que te costarían el puesto

1. **Reportar un error que no existe o que ya corrigieron.** Verifica todo el mismo día del envío.
2. **Prometer posiciones o tráfico garantizado.** Nadie serio lo hace; te delata como novato.
3. **Entregar solo un PDF.** El PDF lo tira cualquiera. El video y el prototipo funcional no.
4. **Hablar de tareas en vez de dinero.** No digas "optimizaré el hreflang". Di "esto hace que un brasileño vea la página en portugués y no en español, y eso son reservas que hoy se pierden".
5. **Rendirte al primer silencio.** El fundador de una agencia en temporada no lee correos el mismo día. La secuencia de seguimiento del documento 05 asume 3 contactos a lo largo de 12 días.
