# Auditoría SEO Técnica — Red de dominios Peru Grand Travel

**Alcance:** `perugrandtravel.com` (EN) · `viajesmachupicchutours.com` (ES) · `machupicchupacotes.com` (PT) · `viaggiomachupicchu.it` (IT) · `paquetesdeviajesperu.com` (legacy, redirige al ES)
**Fecha del crawl:** EN/ES/PT el 09/08/2026; dominio italiano el 13/08/2026
**Metodología:** rastreo HTTP con user-agent de navegador; análisis de cabeceras, robots.txt, sitemaps XML, `<head>`, JSON-LD y recursos de render.
**Alcance del diagnóstico:** sin acceso a Google Search Console ni Analytics. Los hallazgos son verificables de forma independiente. Donde hay estimación de impacto, está indicada como tal.

---

## Resumen ejecutivo

La red opera **~620 URLs indexables en cuatro idiomas y cuatro dominios en vivo**, más un quinto dominio en español que ya redirige al actual. La arquitectura de dominio-por-idioma es una decisión válida... pero implementada **sin el mecanismo que la hace funcionar**.

Cinco hallazgos priorizados:

| # | Hallazgo | Severidad | Esfuerzo | Impacto estimado |
|---|---|---|---|---|
| 1 | **Cero anotaciones `hreflang`** entre los cuatro dominios | 🔴 Crítica | Media | Alto — canibalización y mercado equivocado servido |
| 2 | **`Offer` sin `priceCurrency`** en fichas de tour | 🔴 Crítica | Baja | Alto — bloquea rich results de precio |
| 3 | **Cero `aggregateRating`/`Review` en schema** pese a cientos de reseñas reales | 🟠 Alta | Baja | Alto — estrellas en SERP = CTR |
| 4 | **Sitio EN sin blog (0 posts) e IT con 2**, vs 100+ en ES y PT | 🟠 Alta | Alta | Alto — mercados de mayor ticket sin contenido de captación |
| 5 | **Carga de render sobrecargada** (23-31 CSS, 35-72 scripts, fuentes completas) | 🟠 Alta | Media | Medio-alto — Core Web Vitals y conversión móvil |

Más siete hallazgos secundarios en el anexo.

---

## HALLAZGO 1 — Ausencia total de `hreflang` en una arquitectura multidominio 🔴

### Qué encontré
Ninguno de los cuatro dominios en vivo emite una sola etiqueta `<link rel="alternate" hreflang="...">`. Tampoco existe en cabeceras HTTP ni en los sitemaps XML. Los sitios se enlazan entre sí **únicamente home → home**, desde el selector de banderas; no hay equivalencia a nivel de página.

El cuarto dominio, `viaggiomachupicchu.it` (italiano), está enlazado desde el encabezado de los otros sitios (bandera `it.webp`, subida en enero de 2026). Tiene 33 tours, 11 páginas y 2 artículos. Mismos problemas técnicos que el resto de la red.

```bash
# Verificación
curl -s -A "Mozilla/5.0" https://www.perugrandtravel.com/ | grep -c hreflang   # → 0
curl -s -A "Mozilla/5.0" https://www.viajesmachupicchutours.com/ | grep -c hreflang   # → 0
curl -s -A "Mozilla/5.0" https://www.machupicchupacotes.com/ | grep -c hreflang   # → 0
curl -s -A "Mozilla/5.0" https://www.viaggiomachupicchu.it/ | grep -c hreflang   # → 0
```

### Por qué importa
`hreflang` es el mecanismo con el que Google entiende que varias URLs distintas son **la misma oferta en distintos idiomas** y no páginas compitiendo entre sí. Sin él:

- Google decide por su cuenta qué versión mostrar a cada usuario. Un brasileño buscando *"pacote Machu Picchu"* o un italiano buscando *"tour Machu Picchu"* puede recibir la URL en español, o peor, la de la competencia.
- Las versiones del mismo tour compiten por señales en lugar de sumarlas.
- Se pierde la consolidación de autoridad entre versiones equivalentes.

Con ~620 URLs y **31 productos que ya existen en los cuatro idiomas** (más decenas en dos o tres), esto afecta a la mayoría del catálogo comercial.

### Solución propuesta
Mapa de equivalencias URL a URL entre los cuatro dominios y emisión de bloques recíprocos completos, incluyendo autorreferencia y `x-default`:

```html
<link rel="alternate" hreflang="en" href="https://www.perugrandtravel.com/tour/machu-picchu-full-day/" />
<link rel="alternate" hreflang="es" href="https://www.viajesmachupicchutours.com/tour/machu-picchu-1-dia/" />
<link rel="alternate" hreflang="pt-BR" href="https://www.machupicchupacotes.com/pacote/machu-picchu-full-day/" />
<link rel="alternate" hreflang="it" href="https://www.viaggiomachupicchu.it/tour/machu-picchu-1-giorno/" />
<link rel="alternate" hreflang="x-default" href="https://www.perugrandtravel.com/tour/machu-picchu-full-day/" />
```

Reglas no negociables: **bidireccionalidad** (si A apunta a B, B debe apuntar a A), **autorreferencia** en cada página, URLs absolutas y canónicas (no las variantes con redirección), `pt-BR` en vez de `pt` genérico (el mercado real es Brasil) e `it` para Italia.

**Vía de implementación en su stack:** son cuatro instalaciones WordPress separadas, así que no sirve un plugin multilingüe estándar (WPML/Polylang funcionan intra-sitio). La ruta correcta es un mapeo de equivalencias (campo personalizado o tabla de correspondencia) inyectado en `wp_head` vía snippet, o emisión en los sitemaps XML.

**Cómo se mide:** informe de Segmentación internacional en Search Console + caída de impresiones cruzadas por país en el informe de Rendimiento segmentado por país.

---

## HALLAZGO 2 — `Offer` incompleto: falta `priceCurrency` 🔴

### Qué encontré
Las fichas de tour de los dominios EN e IT emiten `Product` + `Offer`, pero el objeto `Offer` **no incluye `priceCurrency`**:

```json
{"@type":"Offer",
 "url":"https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/",
 "price":"150",
 "priceValidUntil":"2027-01-01",
 "availability":"http://schema.org/InStock"}
```

En italiano el patrón es el mismo, con otro número (`"price":"372"` en `/tour/machu-picchu-1-giorno/`). En el dominio PT las fichas emiten `Product` **sin ningún objeto `Offer`**. Es decir: inconsistencia de datos estructurados entre dominios de la misma red.

```bash
curl -s -A "Mozilla/5.0" "https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/" | grep -c priceCurrency   # → 0
```

### Por qué importa
`priceCurrency` es **campo obligatorio** de `Offer` en la documentación de datos estructurados de producto de Google. Sin él, Search Console reporta el error *"Falta el campo priceCurrency"* y la página queda **inelegible para el rich result de producto** (precio y disponibilidad en el resultado de búsqueda). Con ~69 fichas en EN, ~54 en PT y ~33 en IT, hablamos de **más de 150 fichas comerciales sin elegibilidad para su rich result principal**.

Además, "150" o "372" sin moneda es ambiguo: ¿USD, PEN, BRL, EUR? Para un catálogo que vende a cuatro mercados, es un error semántico grave.

### Solución propuesta
1. Añadir `"priceCurrency"` (la moneda real de cotización de cada dominio) al objeto `Offer` en la plantilla de `tourmaster`.
2. Homogeneizar: emitir `Offer` completo también en los dominios ES y PT.
3. Revisar `priceValidUntil` — está fijo en `2027-01-01` en EN e IT; debe reflejar vigencia real de tarifa o se convierte en dato falso.

**Cómo se mide:** informe de Fragmentos de producto en Search Console → errores a 0, elementos válidos ≈ nº de fichas de tour.

---

## HALLAZGO 3 — Cientos de reseñas reales, cero `aggregateRating` en schema 🟠

### Qué encontré
La empresa acumula reseñas verificadas en Google y Tripadvisor, las muestra en el sitio mediante widgets (`shortcode-google-reviews`, `shortcode-tripadvisor-reviews`, Trustindex) — y **no emite ni un solo `aggregateRating` ni `Review` en JSON-LD**.

```bash
curl -s -A "Mozilla/5.0" "https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/" | grep -c aggregateRating   # → 0
```

Nota adicional: el `robots.txt` de EN intenta bloquear esas rutas de widget, pero **con directivas inválidas** (ver anexo A2).

### Por qué importa
Las estrellas en el resultado de Google son el factor de clic más barato que existe: no hace falta ganar posiciones. Las reseñas ya están; falta declararlas para que el buscador pueda mostrarlas.

### Solución propuesta
Emitir `aggregateRating` dentro del `Product` de cada tour, **alimentado solo por reseñas reales y específicas de ese tour**, más marcado `Review` para reseñas destacadas. Regla de cumplimiento: Google exige que la valoración marcada corresponda a la entidad de la página y sea visible en ella. Nada de puntuaciones globales pegadas en fichas individuales — eso es riesgo de acción manual.

Complemento: marcado `TravelAgency` (subtipo de `LocalBusiness`) en la home con dirección, teléfono, horario y `sameAs`, en vez del `Organization` genérico actual.

---

## HALLAZGO 4 — El mercado más rentable no tiene captación de contenido 🟠

### Qué encontré

| Dominio | Artículos de blog |
|---|---|
| perugrandtravel.com (EN) | **0** — el `post-sitemap.xml` está vacío |
| viaggiomachupicchu.it (IT) | **2** |
| viajesmachupicchutours.com (ES) | 101 |
| machupicchupacotes.com (PT) | 105 |

### Por qué importa
El viajero anglófono e italiano investiga durante meses antes de reservar (*"how many days in Cusco"*, *"Cammino Inca o Salkantay"*, *"mal d'altitudine Cusco"*). Ese es tráfico de investigación de alto volumen, y es exactamente donde los competidores grandes de Cusco capturan la demanda y luego la convierten. Sin blog en EN y con dos notas en IT, esos sitios solo pueden competir por consultas transaccionales de fondo de embudo, que son las más caras y disputadas.

Además: el sitio EN tampoco tiene sitemap de categorías de blog, así que no hay arquitectura de contenido preparada — hay que construirla desde cero, no solo escribir.

### Solución propuesta
Clúster temático en EN (y, en paralelo, ampliar el italiano): 1 página pilar por destino ancla (Machu Picchu, Inca Trail, Sacred Valley, Rainbow Mountain, Cusco) + 8-12 artículos satélite por clúster, todos con enlace interno contextual hacia la ficha de tour correspondiente. Reutilizar la estructura ya probada en ES/PT (no traducir literal: adaptar intención de búsqueda, que difiere por mercado).

**Cómo se mide:** impresiones y clics del segmento `/blog/` en GSC filtrado por país (US, UK, CA, AU) + asistencia a conversión en GA4.

---

## HALLAZGO 5 — Carga de render sobredimensionada 🟠

### Qué medí (medición directa, 09/08/2026)

| Métrica | EN | ES | PT | IT |
|---|---|---|---|---|
| TTFB | 1,04 s | 0,29 s | 0,10 s | ~1,3 s |
| HTML descargado | 214 KB | 244 KB | **313 KB** | ~149 KB |
| Etiquetas `<script>` | 57 | 46 | **72** | 35 |
| Hojas de estilo `<link rel=stylesheet>` | 29 | 28 | 31 | 23 |
| `rel=preload` para recurso LCP | **0** | — | — | — |
| `fetchpriority` | 1 | — | — | — |

Además: Google Fonts carga **Poppins en 18 variantes (100 a 900, con itálicas) + DM Sans**, incluyendo el subset **`devanagari`** — un alfabeto que ningún cliente de esta empresa usa.

### Por qué importa
El TTFB de 1,04 s del sitio EN y ~1,3 s del italiano son **varias veces peores que el del sitio PT** con el mismo stack — señal de problema de caché o de recurso servidor en esos hosts. 23-31 hojas de estilo son otros tantos recursos bloqueantes de render. El subset devanagari es peso puro descargado y nunca usado. Todo esto degrada LCP y, en móvil sobre red 4G, se traduce en abandono antes de ver el precio.

### Solución propuesta (por orden de retorno)
1. Recortar Google Fonts a los pesos realmente usados (típicamente 3-4) y eliminar subsets no usados; `font-display: swap` + preconnect, o autoalojar.
2. Combinar/diferir CSS y JS no crítico; el stack ya admite plugins de optimización compatibles con Goodlayers.
3. `rel=preload` + `fetchpriority=high` en la imagen LCP de cada plantilla (hero de tour), y sacarla de `loading=lazy`.
4. Diagnosticar el TTFB de los hosts EN e IT por separado (caché de página: la cabecera del dominio EN devuelve `cache-control: no-store, no-cache, must-revalidate`, mientras ES y PT devuelven `public, max-age=0` — **el sitio en inglés está sirviendo sin caché**; el italiano no declara una política útil).

> El punto 4 es probablemente el hallazgo de mayor retorno por hora invertida de toda la auditoría.

---

## Anexo — Hallazgos secundarios

**A1 · `robots.txt` sin directiva `Sitemap`** en EN y ES. PT e IT (bloque Yoast) sí declaran su sitemap. Se corrige añadiendo una línea.

**A2 · Directivas `Disallow` inválidas en el `robots.txt` de EN.** Tres líneas usan URL absoluta:
```
Disallow: https://www.perugrandtravel.com/tptscode/shortcode-google-reviews/
```
El estándar exige rutas relativas. Estas líneas **no bloquean nada**: la intención de bloqueo está fallando en silencio. Correcto: `Disallow: /tptscode/`.

**A3 · Directiva malformada en ES:** `Disallow: //wp-includes/` (doble barra) no coincide con `/wp-includes/`.

**A4 · `Disallow: */page/*` en EN y ES** bloquea toda la paginación de archivos. Corta rutas de rastreo hacia contenido profundo. Recomendado: permitir rastreo de paginación y controlar indexación con `noindex` si se desea, en lugar de bloquear el rastreo.

**A5 · Cadena de redirección en apex.** `http://perugrandtravel.com` → `https://perugrandtravel.com` → `https://www.perugrandtravel.com`: dos saltos. Consolidable en uno.

**A6 · WAF devuelve 406 a user-agents no-navegador.** Bloquea herramientas de auditoría legítimas (Screaming Frog con UA por defecto). Conviene verificar en GSC que no esté afectando ocasionalmente a rastreadores de Google, y en todo caso documentar la excepción para el equipo.

**A7 · Migración `paquetesdeviajesperu.com` → `viajesmachupicchutours.com`: bien hecha.** Verifiqué que los 301 son **página a página** (`/full-day-tours-cusco/` → `/full-day-cusco/`), no todos a la home. Es el error más frecuente en migraciones y aquí no está. Pendiente: confirmar que la propiedad legacy sigue en GSC para monitorear residuales.

**A8 · Catálogo italiano incompleto.** `viaggiomachupicchu.it` publica 33 tours frente a 69 en inglés. Al mercado italiano le faltan 40 productos que sí existen en otro idioma de la red (Valle Sagrado, Salkantay, Amazonía, paquetes Grand Deluxe, City Tour Cusco, entre otros). No es un fallo de rastreo: es inventario que Italia no puede comprar hoy en su idioma.

---

## Qué NO pude evaluar sin accesos

Deliberadamente fuera de alcance por falta de credenciales:

- **Core Web Vitals de campo (CrUX)** — requiere GSC o API con clave. Las cifras arriba son de laboratorio/red, no de usuarios reales.
- **Cobertura de indexación real** — cuántas de las ~620 URLs están efectivamente indexadas y cuántas caen en "Detectada, actualmente sin indexar".
- **Canibalización de keywords entre ES y el dominio legacy migrado.**
- **Perfil de enlaces y autoridad relativa** frente a competidores de Cusco.
- **Datos de conversión** — sin GA4 no puedo atribuir tráfico a reservas.

**Con acceso de lectura a Search Console y GA4, estos cinco puntos se cierran en la primera semana.**

---

## Plan de 30 días propuesto

| Semana | Foco | Entregable |
|---|---|---|
| 1 | Accesos, crawl completo con Screaming Frog, baseline de métricas | Informe de línea base + inventario real de indexación |
| 2 | Quick wins: `priceCurrency`, robots.txt, Google Fonts, caché EN, preload LCP | Errores de fragmentos de producto a 0; mejora medible de LCP |
| 3 | Mapa de equivalencias e implementación de `hreflang` en los 4 dominios | Segmentación internacional sin errores en GSC |
| 4 | `aggregateRating` + `TravelAgency` + arquitectura de contenido EN e IT | Elegibilidad de estrellas + plan editorial de 12 semanas |

---

*Documento preparado por Jairo Saul Salas Quiñones — Cusco · JairoProDev@gmail.com · +51 953 865 163 · jairosaul.com/peru-grand-travel*
