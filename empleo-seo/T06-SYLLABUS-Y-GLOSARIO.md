# T06 — Syllabus y glosario completo

**Cómo usarlo.** Tres niveles: 🟢 imprescindible (debes poder explicarlo sin pensar) · 🟡 profesional (te esperan que lo sepas) · 🔵 avanzado (te distingue). Marca lo que no sabes, vuelve en tres días, vuelve a marcar.

---

## A. Infraestructura y web (la base que muchos SEO no tienen)

| Término | Qué es | Nivel |
|---|---|---|
| **HTTP / HTTPS** | Protocolo de transferencia de hipertexto. La S es cifrado TLS. HTTPS es factor de ranking (leve) desde 2014 | 🟢 |
| **HTTP/2, HTTP/3** | Versiones modernas. Multiplexación (varias descargas en una conexión). HTTP/3 usa QUIC sobre UDP | 🟡 |
| **Cabecera HTTP** (*header*) | Metadatos de petición o respuesta: `User-Agent`, `Accept`, `Cache-Control`, `Content-Type`, `Location`, `X-Robots-Tag`, `Link` | 🟢 |
| **Código de estado** | Número de la respuesta: 200, 301, 404, 500... | 🟢 |
| **TTFB** | *Time To First Byte*. Tiempo hasta el primer byte | 🟢 |
| **Latencia** | Retraso de ida y vuelta en la red | 🟢 |
| **Ancho de banda** | Datos por segundo. Distinto de latencia | 🟢 |
| **DNS** | Traduce dominio → IP | 🟢 |
| **Registro A / CNAME** | Tipos de registro DNS. A→IP, CNAME→otro nombre | 🟡 |
| **TLS / SSL / certificado** | Cifrado de la conexión | 🟢 |
| **Apex / dominio raíz** | `ejemplo.com` sin subdominio. `www` **es** un subdominio | 🟢 |
| **Subdominio** | `blog.ejemplo.com` | 🟢 |
| **ccTLD** | *Country Code Top Level Domain*: `.pe`, `.br`, `.es` | 🟡 |
| **gTLD** | Genérico: `.com`, `.org`, `.travel` | 🟡 |
| **CDN** | *Content Delivery Network*. Servidores distribuidos que sirven desde el nodo más cercano | 🟢 |
| **Caché** | Copia guardada para no regenerar. De página, de objeto, de navegador, de CDN | 🟢 |
| **`Cache-Control`** | Cabecera que gobierna la caché: `no-store`, `no-cache`, `must-revalidate`, `public`, `max-age` | 🟡 |
| **ETag / `Last-Modified`** | Identificadores de versión que permiten responder `304 Not Modified` | 🔵 |
| **Proxy inverso** | Servidor delante del tuyo (Nginx, Cloudflare) | 🟡 |
| **WAF** | *Web Application Firewall*. Filtra peticiones maliciosas | 🟡 |
| **Rate limiting** | Límite de peticiones por tiempo. Devuelve 429 | 🟡 |
| **Gzip / Brotli** | Compresión. Brotli comprime más | 🟡 |
| **DOM** | *Document Object Model*. El árbol de la página en memoria | 🟢 |
| **Render-blocking** | Recurso que impide pintar hasta descargarse (CSS, JS síncrono) | 🟢 |
| **`async` / `defer`** | Atributos de `<script>`. `async` ejecuta al llegar; `defer` tras parsear el HTML | 🟡 |
| **SSR / SSG / CSR / ISR** | Renderizado en servidor / estático / en cliente / incremental | 🟡 |
| **Hidratación** | Proceso por el que JS "activa" HTML ya renderizado. Fuente clásica de INP malo | 🔵 |
| **Islas / hidratación parcial** | Hidratar solo partes interactivas | 🔵 |
| **SPA** | *Single Page Application* | 🟡 |
| **Soft navigation** | Cambio de vista en SPA sin recarga. Métrica emergente para medir CWV en SPAs | 🔵 |

---

## B. Rastreo

| Término | Qué es | Nivel |
|---|---|---|
| **Crawler / spider / bot / robot** | Programa que descarga páginas siguiendo enlaces | 🟢 |
| **Googlebot** | El de Google. Variantes: Smartphone (principal), Desktop, Image, News | 🟢 |
| **Crawl frontier** | La cola de URLs conocidas pendientes de rastrear | 🔵 |
| **Crawl budget** | Presupuesto de rastreo | 🟡 |
| **Crawl rate limit / capacity limit** | Cuánto **puede** rastrear sin dañar tu servidor | 🟡 |
| **Crawl demand** | Cuánto **quiere** rastrear | 🟡 |
| **Politeness** | Límite de peticiones concurrentes por cortesía | 🔵 |
| **`robots.txt`** | Archivo de exclusión en la raíz del host | 🟢 |
| **REP / RFC 9309** | *Robots Exclusion Protocol*, estandarizado en 2022 | 🔵 |
| **`Disallow` / `Allow`** | Directivas. Gana la más específica | 🟢 |
| **`Crawl-delay`** | Directiva. **Google no la soporta**; Bing y Yandex sí | 🟡 |
| **Sitemap XML** | Lista de URLs. Máx. 50.000 y 50 MB | 🟢 |
| **Índice de sitemaps** | Sitemap de sitemaps | 🟢 |
| **`lastmod`** | Única etiqueta de sitemap que Google usa, y solo si es veraz | 🟡 |
| **`changefreq` / `priority`** | **Ignoradas por Google.** Saberlo te distingue | 🟡 |
| **Página huérfana** | Sin enlaces internos entrantes | 🟢 |
| **Profundidad de clic** | Clics mínimos desde la portada | 🟢 |
| **Log file analysis** | Analizar los registros del servidor para ver qué rastrea Google de verdad. **La única fuente de verdad sobre rastreo** | 🔵 |
| **DNS inverso** | Verificar que una IP realmente es de Google. El UA es falsificable | 🔵 |
| **WRS** | *Web Rendering Service*. El Chromium de Google que ejecuta JS | 🟡 |
| **Cola de renderizado** | La segunda pasada, diferida | 🟡 |

---

## C. Indexación

| Término | Qué es | Nivel |
|---|---|---|
| **Índice invertido** | `término → documentos`. Estructura base de un buscador | 🔵 |
| **Tokenización** | Separar texto en unidades | 🔵 |
| **Stemming / lematización** | Reducir palabras a su raíz o lema | 🔵 |
| **`noindex`** | Directiva de no indexar. Meta o cabecera | 🟢 |
| **`nofollow`** | No seguir enlaces. Desde 2019 es "pista", no directiva | 🟢 |
| **`sponsored` / `ugc`** | Atributos de enlace para publicidad y contenido de usuario | 🟡 |
| **`X-Robots-Tag`** | Directivas en cabecera HTTP. **La forma de desindexar PDFs** | 🟡 |
| **`unavailable_after`** | Desindexa tras una fecha. Útil para eventos | 🔵 |
| **`indexifembedded`** | Indexar solo si está embebida | 🔵 |
| **Canonical** | Declara la versión preferida | 🟢 |
| **Canónica declarada vs seleccionada** | La que pones vs la que Google elige | 🟡 |
| **Canónica cruzada de dominio** | Entre dominios distintos | 🔵 |
| **Contenido duplicado** | Idéntico en varias URLs. **No hay penalización, hay consolidación** | 🟢 |
| **Casi duplicado** | Diferencias mínimas. El caso difícil | 🟡 |
| **Canibalización** | Dos URLs tuyas compitiendo por la misma consulta | 🟢 |
| **Boilerplate** | Menú, pie, barra lateral. Google lo descuenta | 🟡 |
| **Shingling / SimHash** | Técnicas de detección de similitud por huellas | 🔵 |
| **Soft 404** | 200 con contenido de "no hay nada" | 🟡 |
| **Content pruning** | Podar contenido sin valor para subir la calidad media | 🟡 |
| **Index bloat** | Índice inflado con URLs sin valor | 🟡 |
| **Cobertura / Indexación de páginas** | El informe de GSC | 🟢 |

---

## D. Internacional

| Término | Qué es | Nivel |
|---|---|---|
| **`hreflang`** | Anotación de equivalencia entre idiomas/regiones | 🟢 |
| **`x-default`** | Versión por defecto para quien no encaja | 🟡 |
| **Reciprocidad / etiqueta de retorno** | Si A→B, B debe→A. Sin ella, se ignora el grupo | 🟢 |
| **Autorreferencia** | Cada página se incluye a sí misma | 🟡 |
| **ISO 639-1** | Códigos de idioma de 2 letras: `es`, `en`, `pt` | 🟡 |
| **ISO 3166-1 alpha-2** | Códigos de país: `PE`, `BR`, `GB`. **`en-UK` no existe: es `en-GB`** | 🟡 |
| **i18n / L10n** | *Internationalization* / *Localization*. Los números son las letras omitidas | 🟡 |
| **Transcreación** | Reescribir para el mercado destino, no traducir | 🟡 |
| **Segmentación geográfica** | Ajuste de país en GSC | 🟡 |
| **Redirección por IP** | Forzar versión por ubicación. **Grave: Googlebot rastrea desde EE. UU.** | 🟡 |

---

## E. Rendimiento

| Término | Qué es | Nivel |
|---|---|---|
| **Core Web Vitals (CWV)** | LCP, INP, CLS | 🟢 |
| **LCP** | *Largest Contentful Paint*. ≤2,5 s | 🟢 |
| **INP** | *Interaction to Next Paint*. ≤200 ms. **Reemplazó a FID en marzo de 2024** | 🟢 |
| **CLS** | *Cumulative Layout Shift*. ≤0,1 | 🟢 |
| **FID** | *First Input Delay*. **Obsoleto**. Saber que ya no existe es la señal | 🟢 |
| **FCP** | *First Contentful Paint* | 🟡 |
| **TBT** | *Total Blocking Time*. Sustituto de laboratorio para INP | 🟡 |
| **TTI** | *Time to Interactive*. En desuso | 🟡 |
| **Speed Index** | Velocidad de llenado visual | 🟡 |
| **CrUX** | *Chrome User Experience Report*. Datos de campo. **Percentil 75, ventana de 28 días** | 🟡 |
| **RUM** | *Real User Monitoring*. Medición en usuarios reales | 🟡 |
| **Campo vs laboratorio** | Usuarios reales vs entorno simulado | 🟢 |
| **Lighthouse** | Auditor de laboratorio | 🟢 |
| **PageSpeed Insights (PSI)** | Interfaz que combina CrUX + Lighthouse | 🟢 |
| **WebPageTest** | Herramienta de laboratorio avanzada | 🟡 |
| **Cadena crítica de solicitudes** | Secuencia de recursos que bloquean el render | 🟡 |
| **`preload` / `preconnect` / `prefetch` / `dns-prefetch`** | Sugerencias de recurso al navegador | 🟡 |
| **`fetchpriority`** | Prioridad de descarga: `high`, `low`, `auto` | 🟡 |
| **`loading="lazy"`** | Carga diferida. **Nunca en el elemento LCP** | 🟢 |
| **`decoding="async"`** | Decodificación de imagen sin bloquear | 🔵 |
| **`srcset` / `sizes`** | Imágenes responsivas | 🟡 |
| **WebP / AVIF** | Formatos modernos de imagen | 🟢 |
| **`font-display`** | `swap`, `optional`, `block`, `fallback` | 🟡 |
| **FOIT / FOUT** | *Flash of Invisible/Unstyled Text*. Efectos de carga de fuentes | 🔵 |
| **Subset de fuente** | Incluir solo los caracteres necesarios | 🟡 |
| **`size-adjust`** | Ajustar métricas de la fuente de respaldo para evitar CLS | 🔵 |
| **Tarea larga** | >50 ms bloqueando el hilo principal | 🟡 |
| **Hilo principal** | Donde el navegador ejecuta JS, layout y pintado | 🟡 |
| **`scheduler.yield()`** | API para ceder el hilo y romper tareas largas | 🔵 |
| **Ventana de sesión (CLS)** | Agrupación de cambios en ≤5 s | 🔵 |
| **Cobertura (DevTools)** | Pestaña que mide qué % de CSS/JS se usa | 🟡 |

---

## F. Datos estructurados

| Término | Qué es | Nivel |
|---|---|---|
| **Datos estructurados** | Marcado legible por máquina | 🟢 |
| **schema.org** | El vocabulario. Consorcio desde 2011 | 🟢 |
| **JSON-LD** | La sintaxis recomendada | 🟢 |
| **Microdatos / RDFa** | Sintaxis alternativas. Legado | 🟡 |
| **`@context` / `@type` / `@id` / `@graph`** | Estructura de JSON-LD | 🟡 |
| **Grafo** | Entidades conectadas por relaciones | 🟡 |
| **Rich result / resultado enriquecido** | Presentación mejorada en la SERP | 🟢 |
| **Knowledge Graph** | Base de entidades de Google. "De cadenas a cosas", 2012 | 🟡 |
| **Entidad** | Cosa del mundo real con identidad propia | 🟡 |
| **`sameAs`** | Enlaza tu entidad con su versión canónica (Wikidata, redes) | 🟡 |
| **Desambiguación** | Resolver a qué entidad concreta te refieres | 🔵 |
| **`Product` / `Offer`** | Tipos comerciales. `priceCurrency` **obligatorio** | 🟢 |
| **`AggregateRating` / `Review`** | Valoraciones. Reglas estrictas | 🟡 |
| **`TravelAgency` / `TouristTrip` / `TouristAttraction`** | Tipos de turismo | 🟡 |
| **`BreadcrumbList` / `FAQPage` / `Event`** | Otros tipos comunes | 🟡 |
| **Acción manual** | Penalización aplicada por un revisor humano | 🟡 |
| **Web semántica** | La visión original (2001). schema.org es su versión pragmática | 🔵 |

---

## G. Medición y analítica

| Término | Qué es | Nivel |
|---|---|---|
| **GSC** | Google Search Console | 🟢 |
| **Impresión** | Tu URL apareció en un resultado | 🟢 |
| **Clic** | Alguien la pulsó | 🟢 |
| **CTR** | *Click-Through Rate* = clics ÷ impresiones | 🟢 |
| **Posición media** | Promedio ponderado. **Engañosa: mezcla consultas** | 🟡 |
| **Inspección de URL** | Herramienta de diagnóstico por URL | 🟢 |
| **Prueba en vivo** | Rastrea la URL ahora, no muestra la versión indexada | 🟡 |
| **Muestreo** | GSC no muestra todo. Límite de 1.000 filas en la interfaz | 🟡 |
| **Search Console API** | Acceso programático. Supera los límites de la interfaz | 🔵 |
| **GA4** | *Google Analytics 4*. Modelo de eventos, no de sesiones | 🟢 |
| **Evento / conversión** | Unidad de medida en GA4 | 🟢 |
| **Atribución** | Cómo se reparte el crédito entre canales | 🟡 |
| **Looker Studio** | Paneles conectados a GSC y GA4 | 🟡 |
| **Línea base (*baseline*)** | Estado inicial medido. **Sin ella no puedes demostrar mejora** | 🟢 |
| **Año contra año (YoY)** | Comparación que neutraliza estacionalidad | 🟢 |
| **Split testing SEO** | Grupos de URLs comparables, control y variante | 🔵 |
| **Correlación vs causalidad** | La distinción que evita conclusiones falsas | 🟢 |

---

## H. Estrategia y contenido

| Término | Qué es | Nivel |
|---|---|---|
| **Intención de búsqueda** | Qué quiere el usuario: informativa, navegacional, comercial, transaccional | 🟢 |
| **TOFU / MOFU / BOFU** | *Top / Middle / Bottom of Funnel*. Fases del embudo | 🟢 |
| **Clúster temático / página pilar** | Arquitectura de contenido | 🟢 |
| **Silo** | Agrupación temática con enlazado interno denso | 🟡 |
| **Cola larga (*long tail*)** | Consultas específicas de bajo volumen. Suman más que las genéricas | 🟢 |
| **Volumen de búsqueda** | Búsquedas mensuales estimadas. **Estimación, no dato** | 🟢 |
| **Dificultad de keyword (KD)** | Métrica **propietaria** de cada herramienta. No comparable entre ellas | 🟡 |
| **SERP** | *Search Engine Results Page* | 🟢 |
| **Featured snippet** | Fragmento destacado | 🟢 |
| **People Also Ask (PAA)** | "Otras preguntas" | 🟡 |
| **E-E-A-T** | *Experience, Expertise, Authoritativeness, Trustworthiness*. **No es un factor de ranking** | 🟢 |
| **YMYL** | *Your Money or Your Life*. Temas de alto riesgo | 🟡 |
| **Quality Rater Guidelines** | Manual público de los evaluadores humanos | 🟡 |
| **Core update** | Actualización general del algoritmo | 🟢 |
| **PageRank** | Algoritmo de autoridad por enlaces, 1998 | 🟡 |
| **Backlink / perfil de enlaces** | Enlaces entrantes | 🟢 |
| **Anchor text** | Texto del enlace | 🟢 |
| **Link equity / "link juice"** | Valor transmitido por un enlace | 🟡 |
| **Black hat / white hat / grey hat** | Ético vs manipulador | 🟢 |
| **Cloaking** | Servir contenido distinto a bot y a usuario. **Prohibido** | 🟡 |
| **Doorway pages** | Páginas puente sin valor propio. **Prohibido** | 🟡 |
| **Panda / Penguin / Hummingbird / RankBrain / BERT / MUM** | Sistemas históricos de Google | 🟡 |

---

## I. IA y búsqueda generativa

| Término | Qué es | Nivel |
|---|---|---|
| **AI Overviews (AIO)** | Resumen generado sobre los resultados | 🟢 |
| **AI Mode** | Interfaz conversacional que **sustituye** los resultados orgánicos | 🟢 |
| **Zero-click** | Búsqueda que termina sin clic | 🟢 |
| **GEO / AEO / LLMO** | *Generative Engine / Answer Engine / LLM Optimization*. Nombres en disputa para lo mismo | 🟡 |
| **RAG** | *Retrieval-Augmented Generation*. Recuperar documentos y generar sobre ellos. **Es el mecanismo real detrás de las respuestas con citas** | 🟡 |
| **Embedding** | Representación del significado como vector numérico | 🟡 |
| **Búsqueda vectorial / semántica** | Recuperar por proximidad de significado, no por coincidencia de palabras | 🟡 |
| **Citación** | Que tu URL aparezca como fuente en una respuesta generada | 🟢 |
| **Query fan-out** | El sistema descompone una consulta en varias sub-consultas | 🔵 |
| **`llms.txt`** | Archivo propuesto para guiar a LLMs. **~10% de adopción, ignorado por los principales rastreadores, Google dijo que no lo soporta** | 🟡 |
| **`GPTBot` / `ChatGPT-User` / `OAI-SearchBot`** | Bots de OpenAI: entrenamiento / lectura bajo demanda / búsqueda | 🟡 |
| **`ClaudeBot` / `PerplexityBot`** | Otros rastreadores de IA | 🟡 |
| **`Google-Extended`** | Controla el uso para entrenar Gemini **sin afectar** al posicionamiento | 🟡 |
| **B2A** | *Business to Agent*. Publicar una superficie legible por agentes | 🔵 |
| **Alucinación** | Que un modelo genere información falsa con confianza | 🟢 |

---

## J. Negocio y sector

| Término | Qué es | Nivel |
|---|---|---|
| **OTA** | *Online Travel Agency*. Comisión típica 20-30% en tours | 🟢 |
| **GetYourGuide / Viator / Klook / Civitatis** | OTAs de tours y actividades | 🟢 |
| **Operador de turismo** | Quien organiza y ejecuta, no solo revende | 🟢 |
| **Ticket promedio** | Valor medio por reserva | 🟢 |
| **Margen** | Lo que queda tras costes | 🟢 |
| **LTV / CAC** | Valor de vida del cliente / coste de adquisición | 🟡 |
| **RUC** | Registro Único de Contribuyentes (SUNAT) | 🟢 |
| **SUNAT** | Autoridad tributaria peruana | 🟢 |
| **CIIU** | Clasificación Industrial Internacional Uniforme. Códigos de actividad económica | 🟡 |
| **S.A.C. / E.I.R.L.** | Formas societarias peruanas | 🟡 |
| **RNP** | Registro Nacional de Proveedores. Habilita contratar con el Estado | 🟡 |
| **OSCE / OECE** | Organismo que administra el RNP | 🔵 |
| **MINCETUR / DIRCETUR** | Ministerio y Dirección Regional de Turismo | 🟡 |
| **SERNANP** | Servicio de Áreas Naturales Protegidas | 🟡 |
| **Operador autorizado del Camino Inca** | Licencia limitada por lista oficial anual | 🟡 |
| **Estacionalidad** | Variación por temporada. **En turismo domina cualquier otro efecto** | 🟢 |
| **KPI** | *Key Performance Indicator* | 🟢 |
| **Métrica de vanidad** | La que sube y no significa nada (impresiones sin conversión) | 🟢 |

---

## K. Herramientas

| Herramienta | Para qué | Coste |
|---|---|---|
| **Google Search Console** | La fuente de verdad de tu sitio | Gratis |
| **Google Analytics 4** | Comportamiento y conversión | Gratis |
| **Looker Studio** | Paneles | Gratis |
| **PageSpeed Insights** | CrUX + Lighthouse | Gratis |
| **Chrome DevTools** | Diagnóstico profundo | Gratis |
| **Prueba de resultados enriquecidos** | Validar schema | Gratis |
| **Screaming Frog** | Rastreo de escritorio. Estándar del sector | Gratis hasta 500 URLs |
| **Ahrefs / Semrush** | Enlaces, keywords, competencia | De pago (~US$100+/mes) |
| **Ahrefs Webmaster Tools** | Versión gratuita para sitios verificados | Gratis |
| **Sitebulb** | Rastreo con priorización visual | De pago, con prueba |
| **`curl`** | Verificación de cabeceras y HTML crudo | Gratis |
| **`web-vitals` (JS)** | RUM propio | Gratis |
| **Google Trends** | Estacionalidad y tendencias relativas | Gratis |
| **Wayback Machine** | Historial de un sitio | Gratis |

---

## L. Palabras poco comunes que aparecen en la literatura

| Palabra | Significado en este contexto |
|---|---|
| **Idempotente** | Operación que repetida da el mismo resultado |
| **Determinista** | Mismo input → mismo output, siempre |
| **Heurística** | Regla práctica aproximada, no exacta (los semáforos de Yoast lo son) |
| **Ortogonal** | Independiente; que no interfiere con otra cosa |
| **Canónico** | La versión oficial de referencia |
| **Agnóstico** | Que funciona sin depender de una tecnología concreta |
| **Granularidad** | Nivel de detalle |
| **Latencia** | Retraso |
| **Throughput** | Volumen procesado por unidad de tiempo |
| **Regresión** | Que algo que funcionaba deja de funcionar tras un cambio |
| **Mitigación** | Reducir el impacto sin eliminar la causa |
| **Sistémico** | Que afecta a todo el sistema, no a un caso |
| **Nominal** | Estado esperado y normal |
| **Efímero** | De vida corta, no persistente |
| **Idiosincrático** | Particular de un caso concreto |
| **Espurio** | Falso; correlación sin causa real |
| **Confundidor** (*confounder*) | Variable oculta que distorsiona una relación aparente |
| **Percentil** | Valor por debajo del cual cae un % de la muestra. **CrUX usa el 75** |
| **Mediana vs media** | La mediana resiste a los valores extremos; la media no |
| **Cola larga de una distribución** | Los muchos casos poco frecuentes |
| **Sesgo de supervivencia** | Analizar solo lo que sobrevivió. **El pecado de los "estudios de factores de ranking"** |
| **Falso positivo / negativo** | Detectar lo que no hay / no detectar lo que hay |
| **Línea base** | Punto de partida medido |
| **Cadencia** | Ritmo de repetición |
| **Alcance** (*scope*) | Los límites de un trabajo |
| **Entregable** | Producto concreto de un trabajo |
| **Stakeholder** | Parte interesada en un proyecto |
| **Post-mortem** | Análisis tras un incidente |
| **Deuda técnica** | Coste acumulado de atajos pasados |
| **Boilerplate** | Código o contenido repetido y estándar |
| **Fallar en silencio** | Fallar sin avisar. **Las tres directivas de robots.txt de PGT fallan así** |

---

## Ruta de estudio: qué en qué orden

**Días 1-3 — Suelo.** T00 completo. Columnas A y B de este glosario. Al final debes poder dibujar el flujo de un buscador de memoria.

**Días 4-6 — Rastreo e indexación.** T01 y T02. Columnas B y C. Monta tu GSC y rompe cosas.

**Días 7-8 — Tu especialidad.** T03. Columna D. Implementa hreflang real entre dos idiomas.

**Días 9-10 — Rendimiento.** T04. Columna E. Lleva una plantilla de rojo a verde y documenta.

**Día 11 — Semántica.** T05. Columna F.

**Día 12 — Medición.** Columna G. Monta un panel de Looker Studio.

**Día 13 — Negocio.** D01 completo. Columna J. Es lo que te hace hablar con el dueño, no con el programador.

**Día 14 — Consolidación.** D02 y D03. Columnas H, I, K, L. Simulacro de entrevista.

**Regla de autoevaluación:** si no puedes explicar un término **a alguien que no sabe nada**, no lo dominas. Esa es la prueba, no reconocerlo en una lista.
