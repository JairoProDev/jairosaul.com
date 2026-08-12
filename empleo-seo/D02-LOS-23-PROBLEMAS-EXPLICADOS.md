# D02 — Los 23 problemas: ficha técnica de cada uno

**Para memorizar.** Cada ficha tiene: qué es · cómo lo detecté · por qué importa técnicamente · cómo se soluciona · **cómo lo defiendo si me lo cuestionan**.

> **Antes de usar esto:** vuelve a verificar cada punto el día que lo entregues. Los comandos están incluidos. Si arreglaron algo y tú lo reportas, pierdes toda la credibilidad de golpe.

---

## Índice de severidad

| # | Problema | Severidad |
|---|---|---|
| 1 | Ausencia total de hreflang | 🔴 Crítica |
| 2 | `Offer` sin `priceCurrency` | 🔴 Crítica |
| 3 | `Product` sin `Offer` en el dominio PT | 🔴 Crítica |
| 4 | Cero `aggregateRating`/`Review` en schema | 🟠 Alta |
| 5 | Sitio EN sin blog | 🟠 Alta |
| 6 | Caché de página desactivada en EN | 🟠 Alta |
| 7 | Canibalización interna en ES | 🟠 Alta |
| 8 | 19 productos ausentes en PT-BR | 🟠 Alta (comercial) |
| 9 | Carga de render sobredimensionada | 🟠 Alta |
| 10 | Google Fonts con subset devanagari | 🟡 Media |
| 11 | Sin `preload`/`fetchpriority` en LCP | 🟡 Media |
| 12 | `Disallow` con URL absoluta en robots.txt EN | 🟡 Media |
| 13 | `Disallow: //wp-includes/` en ES | 🟡 Media |
| 14 | Bloqueo de paginación `*/page/*` | 🟡 Media |
| 15 | Sin directiva `Sitemap:` en EN y ES | 🟡 Media |
| 16 | Cadena de redirección en apex | 🟡 Media |
| 17 | `Organization` genérico en vez de `TravelAgency` | 🟡 Media |
| 18 | `priceValidUntil` fijo para todo el catálogo | 🟡 Media |
| 19 | `availability` con `http://` | 🟢 Baja |
| 20 | WAF devuelve 406 a UAs no-navegador | 🟢 Baja (operativa) |
| 21 | Inconsistencia de `admin-ajax.php` entre dominios | 🟢 Baja |
| 22 | Imágenes sin `alt` | 🟢 Baja |
| 23 | Credencial de Camino Inca no declarada | 🟢 Oportunidad |

---

# 🔴 CRÍTICOS

## Problema 1 — Ausencia total de `hreflang`

**Qué es.** `hreflang` es el atributo con el que se declara que varias URLs son la misma página en distintos idiomas o regiones. Se emite dentro de `<link rel="alternate">`, o en cabecera HTTP, o en el sitemap XML. Los tres dominios de la red no emiten ninguno, por ninguna vía.

**Cómo lo detecté.**
```bash
curl -s -A "Mozilla/5.0" https://www.perugrandtravel.com/ | grep -c hreflang   # → 0
curl -s -A "Mozilla/5.0" https://www.viajesmachupicchutours.com/ | grep -c hreflang   # → 0
curl -s -A "Mozilla/5.0" https://www.machupicchupacotes.com/ | grep -c hreflang   # → 0
```

**Por qué importa técnicamente.** Sin la anotación, Google no dispone de la información de que las tres URLs pertenecen al mismo grupo. Consecuencias en cadena:

1. **Selección de versión no controlada.** Google decide con señales indirectas (idioma detectado, país del servidor, enlaces) qué versión sirve a cada usuario. Un brasileño buscando *"pacote Machu Picchu"* puede recibir la versión española.
2. **Sin consolidación de grupo.** Las señales de las tres versiones no se refuerzan entre sí.
3. **Riesgo de agrupación como duplicado** en pares que comparten idioma o estructura muy similar.

Afecta a **50 productos que existen en los tres idiomas** más 12 que existen en dos, según el mapa de equivalencias.

**Cómo se soluciona.**
- Construir el mapa de equivalencias URL a URL (hecho: 62 grupos).
- Emitir bloques recíprocos con autorreferencia y `x-default`.
- En su caso —tres instalaciones WordPress independientes— no sirve WPML ni Polylang, que operan dentro de una instalación. Se necesita un mapa compartido inyectado en `wp_head` por un snippet idéntico en las tres, o emisión vía sitemap.

**Cómo lo defiendo.**
> *"No es que falte una etiqueta. Es que la arquitectura que eligieron —un dominio por idioma— solo funciona si existe el mecanismo que le dice a Google que son la misma oferta. Sin eso, tienen tres sitios compitiendo en vez de una red sumando. Su competidor TreXperience ya lo tiene implementado entre dos idiomas; ustedes tienen tres."*

**Si te dicen "pero ya tenemos el selector de idioma":** el selector enlaza home con home. No declara equivalencia a nivel de página, y las 62 fichas equivalentes no tienen ninguna relación declarada entre sí.

---

## Problema 2 — `Offer` sin `priceCurrency`

**Qué es.** El objeto `Offer` de schema.org describe la oferta comercial. Google exige tres campos para ser elegible al resultado enriquecido de producto: `price`, `priceCurrency`, `availability`. Sus fichas emiten dos de los tres.

**Lo que emiten hoy:**
```json
{"@type":"Offer",
 "url":"https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/",
 "price":"150",
 "priceValidUntil":"2027-01-01",
 "availability":"http://schema.org/InStock"}
```

**Cómo lo detecté.**
```bash
curl -s -A "Mozilla/5.0" "https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/" | grep -c priceCurrency   # → 0
```

**Por qué importa técnicamente.** Es un **campo obligatorio**. Search Console reporta el error "Falta el campo priceCurrency" y la página queda **inelegible** para mostrar precio y disponibilidad en el resultado de búsqueda. Con ~69 fichas en EN y ~54 en PT, son **más de 120 fichas comerciales sin acceso a su resultado enriquecido principal**.

Además hay un problema semántico: "150" sin moneda es ambiguo en una empresa que vende a tres mercados con tres monedas (USD, PEN, BRL). Una máquina no puede resolverlo.

**Cómo se soluciona.** Añadir `"priceCurrency": "USD"` (o la moneda real de cotización) en la plantilla de datos estructurados de `tourmaster`. **Es una línea.**

**Cómo lo defiendo.**
> *"Es el arreglo más barato de toda la auditoría y el de efecto más inmediato: una línea en la plantilla, y 120 fichas pasan de inelegibles a elegibles para mostrar precio en Google. Se puede verificar en el informe de Fragmentos de producto de Search Console a los siete días."*

---

## Problema 3 — `Product` sin `Offer` en el dominio portugués

**Qué es.** En el dominio PT, las fichas emiten `Product` pero **sin ningún objeto `Offer`**. Verificado en `/pacote/vale-sul/`.

**Por qué importa.** `Product` sin `offers` no genera resultado enriquecido de producto en absoluto. Es peor que el problema 2: allí falta un campo; aquí falta el objeto entero.

**El problema de fondo es la inconsistencia:** tres dominios de la misma red emitiendo datos estructurados distintos. Indica que las plantillas divergieron y que **no hay control de calidad de schema en el grupo**. Eso es un problema de proceso, no solo de código.

**Cómo se soluciona.** Homogeneizar la plantilla de `Product` en las tres instalaciones. Definir un estándar de datos estructurados del grupo y validarlo automáticamente (para eso sirve `auditor_seo.py`).

**Cómo lo defiendo.**
> *"El mercado brasileño es el principal y es el que peor marcado tiene. No es una diferencia estética: sus fichas en portugués no pueden mostrar precio en Google de ninguna forma."*

---

# 🟠 ALTOS

## Problema 4 — Cientos de reseñas reales, cero en schema

**Qué es.** Muestran reseñas de Google y Tripadvisor mediante widgets (`shortcode-google-reviews`, `shortcode-tripadvisor-reviews`, Trustindex) y **no emiten `aggregateRating` ni `Review` en JSON-LD**.

**Cómo lo detecté.**
```bash
curl -s -A "Mozilla/5.0" "https://www.perugrandtravel.com/tour/ballestas-huacachina-islands-full-day/" | grep -c aggregateRating   # → 0
```

**Por qué importa.** Las estrellas en el resultado de búsqueda son el mayor multiplicador de clics disponible **sin ganar posiciones**. Tienen el activo (reputación real y abundante) y no lo declaran de forma legible por máquina. Es valor ya ganado y no cobrado.

**Cómo se soluciona — y aquí está el matiz que te distingue.** Google exige que la valoración marcada:
1. corresponda a **la entidad de esa página concreta**,
2. esté **visible** en la página,
3. provenga de **usuarios reales**.

Pegar la valoración global de la agencia en las 69 fichas es exactamente lo que Google considera spam de datos estructurados, y expone a una **acción manual**. La implementación correcta requiere valoraciones **por tour**.

**Cómo lo defiendo.**
> *"Esto hay que hacerlo bien o no hacerlo. Si marcamos la valoración global de la empresa en cada ficha, arriesgamos una acción manual. Lo correcto es agregar valoraciones por tour, mostrarlas en la ficha y marcarlas. Es más trabajo y es la única versión que no pone en riesgo el sitio."*

*Decir esto en una entrevista demuestra que conoces el riesgo, no solo la técnica. Es lo que separa a un implementador de alguien que copia plantillas.*

---

## Problema 5 — El sitio en inglés no tiene blog

**Qué es.** `post-sitemap.xml` de `perugrandtravel.com` está **vacío: 0 artículos**. ES tiene 101, PT tiene 105.

**Por qué importa.** Sin contenido de embudo superior, el sitio solo compite por consultas transaccionales — las más caras y disputadas. El viajero anglófono investiga meses antes de reservar. (Desarrollo completo en D01 §Parte 4 y en el plan editorial 09.)

Detalle adicional: **tampoco hay sitemap de categorías de blog**. No existe la arquitectura, no solo el contenido.

**Cómo se soluciona.** Clústeres temáticos: 5 pilares (Machu Picchu, Inca Trail, Cusco, Valle Sagrado, Rainbow Mountain) + 6-10 satélites cada uno, con enlace contextual a la ficha de tour correspondiente. Plan de 12 semanas en el documento 09.

**Cómo lo defiendo.**
> *"No es 'hagan un blog'. Es que el mercado que paga más por reserva es el único sin embudo superior, y ya tienen la estructura probada en español y portugués."*

**Advertencia honesta que debes dar:** el contenido nuevo en un dominio sin historial de blog **no produce tráfico antes del mes 4**. Decirlo por adelantado te protege y te da credibilidad.

---

## Problema 6 — Caché de página desactivada en el dominio inglés

**Qué es.** El dominio EN devuelve `cache-control: no-store, no-cache, must-revalidate`. Los dominios ES y PT devuelven `public, max-age=0`.

**Traducción de la cabecera:**
- `no-store` = no guardes esta respuesta en ninguna caché, en ningún sitio.
- `no-cache` = revalida siempre antes de usar una copia.
- `must-revalidate` = si la copia caducó, no la uses.

En conjunto: **cada visita ejecuta WordPress y PHP desde cero.**

**La medición que lo confirma:**

| Dominio | TTFB |
|---|---|
| EN | **1,04 s** |
| ES | 0,29 s |
| PT | **0,10 s** |

Mismo stack, mismo tipo de hosting. **El inglés es 10 veces más lento que el portugués** en tiempo hasta el primer byte.

**Por qué importa.** El TTFB es la primera de las cuatro subpartes del LCP (ver T04 §3). Un segundo perdido antes de descargar el primer recurso es un segundo que ya no se recupera. Y hay un efecto secundario: **un servidor lento reduce el límite de capacidad de rastreo** — Google rastrea menos para no dañarte.

**Cómo se soluciona.** Diagnosticar por qué esa instalación no cachea: plugin de caché ausente o desactivado, sesión iniciada que fuerza bypass, conflicto de plugin, o configuración de servidor. Activar caché de página y verificar con la cabecera.

**Cómo lo defiendo.**
> *"El mismo grupo, el mismo stack: portugués responde en 0,10 segundos, inglés en 1,04. La diferencia está en una cabecera. Es probablemente el arreglo con mejor retorno por hora de toda la auditoría, y afecta al mercado de mayor ticket."*

---

## Problema 7 — Canibalización interna en el dominio español

**Qué es.** Dos URLs distintas para el mismo producto, ambas en el sitemap, ambas indexables:
```
/tour/bike-maras-moray-salineras/
/tour/maras-moray-en-bicicleta/
```

**Por qué importa.** No es duplicado penalizado (eso no existe): es **dilución**. Las dos se reparten señales y compiten entre sí por la misma consulta. Google acabará eligiendo una y la otra habrá consumido rastreo para nada.

**Cómo se soluciona.** Elegir la preferida (la que tenga más enlaces internos y mejor rendimiento histórico en GSC), `301` desde la otra, actualizar enlaces internos y sitemap.

**Cómo lo defiendo.**
> *"Lo encontré ordenando los slugs del sitemap alfabéticamente. Es probable que haya más pares así; para confirmarlo hace falta cruzar el catálogo completo con datos de rendimiento, que requiere acceso a Search Console."*

*Ese "es probable que haya más y necesito accesos para confirmarlo" es exactamente la honestidad calibrada que quieres proyectar.*

---

## Problema 8 — 19 productos ausentes en portugués

**Qué es.** Del cruce de los tres catálogos: 74 productos únicos, solo 50 en los tres idiomas. Al mercado brasileño le faltan **19** que sí se venden en inglés y español — incluidos los **seis paquetes Grand Deluxe** (Belmond, Inkaterra, Casa Andina, Luxury Collection, Andean Explorer), que son los de mayor ticket y existen **solo en inglés**.

**Por qué importa.** Esto no es SEO: es **inventario sin publicar en el mercado principal**. Un brasileño no puede comprar hoy Waqrapukara, Ballestas + Huacachina, Valle Sagrado VIP, Amazonía/Tambopata ni ningún paquete de lujo.

**Cómo se soluciona.** Traducción y publicación de fichas existentes. No es desarrollo de producto nuevo: el producto ya existe y ya se opera.

**Cómo lo defiendo.**
> *"Crucé los tres catálogos producto por producto. Brasil es su mercado principal —su página de Facebook es la brasileña, responden reseñas en portugués— y es el peor surtido. Los seis paquetes de lujo, los de mayor ticket, solo existen en inglés."*

**Esta es la carta que guardas para la reunión presencial, no para el correo frío.**

---

## Problema 9 — Carga de render sobredimensionada

**Qué medí:**

| | EN | ES | PT |
|---|---|---|---|
| HTML | 214 KB | 244 KB | **313 KB** |
| `<script>` | 57 | 46 | **72** |
| `<link rel=stylesheet>` | 29 | 28 | 31 |

**Por qué importa.** Cada hoja de estilo en el `<head>` es un recurso **bloqueante de renderizado**: el navegador no pinta hasta tenerlas todas. 29 hojas son 29 viajes de red antes del primer píxel. El JS compite por el hilo principal, lo que degrada INP.

**Cómo se soluciona.** Medir uso real con la pestaña Cobertura de DevTools antes de tocar nada. Luego: CSS crítico en línea y el resto diferido, `defer` en JS no crítico, combinar donde el stack lo permita. Con temas de constructor hay que probar por etapas porque rompe diseños.

**Cómo lo defiendo.**
> *"No voy a decir 'eliminen 20 archivos'. Primero hay que medir qué porcentaje de ese CSS se usa realmente. Con temas de constructor, optimizar a ciegas rompe el diseño."*

---

# 🟡 MEDIOS

## Problema 10 — Google Fonts sobrecargado

Cargan **Poppins en 18 variantes** (pesos 100 a 900 con itálicas) **+ DM Sans**, incluyendo el subset **`devanagari`** — el alfabeto del hindi y el sánscrito. Ningún cliente de esta empresa lo usa.

**Solución:** reducir a los 3-4 pesos realmente usados, eliminar subsets no usados, `font-display: swap`, `preconnect`, o autoalojar. **Es de los arreglos más baratos con efecto visible en LCP y CLS.**

## Problema 11 — Sin `preload` ni `fetchpriority` en el LCP

`rel=preload`: 0 · `fetchpriority`: 1. El navegador descubre la imagen principal tarde, cuando ya parseó el HTML y el CSS.

**Solución:** `<link rel="preload" as="image">` para la imagen hero de cada plantilla + `fetchpriority="high"` en la etiqueta `<img>`, y asegurarse de que **no** lleve `loading="lazy"`. (El LCP nunca debe ser lazy — ver T04 §3.)

## Problema 12 — `Disallow` con URL absoluta (EN)

```
Disallow: https://www.perugrandtravel.com/tptscode/shortcode-google-reviews/
```
El estándar (RFC 9309) exige **rutas relativas**. Esta línea **no bloquea nada**. La intención de bloqueo está fallando en silencio. Correcto: `Disallow: /tptscode/`.

## Problema 13 — `Disallow: //wp-includes/` (ES)

Doble barra. No coincide con `/wp-includes/`. Tampoco bloquea nada.

## Problema 14 — `Disallow: */page/*` (EN y ES)

Bloquea toda la paginación de archivos. Corta rutas de rastreo hacia contenido profundo, y **no evita la indexación** (bloquear ≠ desindexar). Si el objetivo era limpiar el índice, la herramienta es la equivocada: sería `noindex` con rastreo permitido.

## Problema 15 — Sin directiva `Sitemap:` en EN y ES

Solo el dominio PT la declara. Corrección de un minuto. No es crítico (los sitemaps también se envían por GSC) pero es higiene básica y se nota.

## Problema 16 — Cadena de redirección en el apex

`http://perugrandtravel.com` → `https://perugrandtravel.com` → `https://www.perugrandtravel.com` = dos saltos. Consolidable en uno con una regla de servidor.

## Problema 17 — `Organization` en vez de `TravelAgency`

Emiten `Organization` genérico. El tipo correcto es **`TravelAgency`**, subtipo de `LocalBusiness`, que habilita dirección postal, horario, coordenadas y teléfono como propiedades de negocio local. Su competidor Valencia Travel ya lo emite.

## Problema 18 — `priceValidUntil` fijo en `2027-01-01`

Todo el catálogo con la misma fecha de vigencia. Si no refleja la vigencia real de tarifa, es un dato falso en datos estructurados. Debe generarse por tour.

## Problema 19 — `availability` con `http://schema.org/InStock`

Funciona, pero el formato actual es `https://`. Higiene.

## Problema 20 — WAF devuelve 406 a UAs no-navegador

Su firewall bloquea user-agents de herramientas. Bloquea auditorías legítimas (Screaming Frog por defecto). Conviene verificar en GSC que no afecte ocasionalmente a rastreadores de Google y documentar la excepción para el equipo. (Explicación completa en D03.)

## Problema 21 — Inconsistencia de `admin-ajax.php`

ES permite `admin-ajax.php`, EN no. Sin ese `Allow`, Google puede no poder renderizar componentes que dependen de AJAX. Homogeneizar.

## Problema 22 — Imágenes sin `alt`

Detectadas en el rastreo. Afecta accesibilidad, búsqueda de imágenes y comprensión del contenido. En turismo, donde la imagen vende, la búsqueda de imágenes es un canal real.

## Problema 23 — Credencial de Camino Inca no declarada (oportunidad)

Son **operadores autorizados del Camino Inca** en la lista oficial. Es una barrera de entrada real y verificable, y **no la declaran de forma prominente ni estructurada**. Es autoridad regalada. (Ver D01.)

---

# Lo que hicieron BIEN (y por qué debes decirlo)

**La migración de `paquetesdeviajesperu.com` está bien hecha.** Verifiqué que los 301 son **página a página** (`/full-day-tours-cusco/` → `/full-day-cusco/`), no todos a la portada.

```bash
curl -sIL -A "Mozilla/5.0" "https://www.paquetesdeviajesperu.com/full-day-tours-cusco/" | grep -Ei "^(HTTP|location)"
```

Redirigir todo a la portada es el error más frecuente y más caro en migraciones — Google lo trata como soft 404 y se pierde el valor de las URLs. Aquí no lo cometieron.

**Por qué decirlo importa más de lo que parece:** una auditoría que solo critica se lee como un vendedor buscando trabajo. Una que reconoce lo bien hecho **con un detalle específico y verificable** demuestra que miraste de verdad. Además es tu seguro: si el sitio lo hizo un familiar del dueño o él mismo, acabas de evitar la única forma de ofender que existía.

---

# Lo que NO pude evaluar (dilo siempre)

- Core Web Vitals de campo (CrUX) — requiere GSC
- Cobertura de indexación real: cuántas de las ~570 URLs están indexadas
- Canibalización completa entre ES y el dominio legacy migrado
- Perfil de enlaces y autoridad relativa
- Datos de conversión — sin GA4 no hay atribución a reservas

> *"Con acceso de lectura a Search Console y Analytics, estos cinco puntos se cierran en la primera semana."*

**Un diagnóstico honesto vale más que uno completo e inventado.** Esta sección es la que hace creíble todo lo anterior.
