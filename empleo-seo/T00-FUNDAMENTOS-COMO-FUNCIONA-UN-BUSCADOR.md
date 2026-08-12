# T00 — Fundamentos: cómo funciona realmente un buscador

> **Cómo leer esta serie.** Diez documentos (T00–T09). Este es el suelo: sin él, todo lo demás son recetas memorizadas. Lee este entero antes de tocar los otros. Cada término aparece la primera vez con su origen, su porqué y su forma de fallar.

---

## 1. El problema original

Un buscador resuelve un problema que parece simple y no lo es: **dado un texto de tres palabras, devolver, de entre ~10¹¹ documentos, los diez mejores, en menos de 300 milisegundos.**

Descomponer ese problema da la arquitectura completa. Necesitas:

1. **Descubrir** que los documentos existen → *crawling* (rastreo)
2. **Entenderlos** y guardarlos de forma consultable → *indexing* (indexación)
3. **Ordenarlos** según la consulta → *ranking* (clasificación)
4. **Presentarlos** → *serving* (servicio) y SERP

Todo el SEO técnico vive en los pasos 1 y 2. El SEO de contenidos y enlaces vive en el 3. El CRO y los datos estructurados viven en el 4. Esa división es el mapa mental que necesitas para no confundir problemas.

---

## 2. Genealogía de los términos (por qué se llaman así)

Entender la etimología no es anécdota: te dice qué problema resolvía originalmente cada cosa, y por eso te dice cuándo dejará de aplicar.

| Término | Origen | Qué revela |
|---|---|---|
| **Crawler / spider** | 1993, *World Wide Web Wanderer*. La web se imaginó como una telaraña; el programa que la recorre "gatea" o "araña" por ella. | El rastreo es **navegación por enlaces**. Una página sin enlaces entrantes es, para un crawler, invisible. Ese es el concepto de *página huérfana*. |
| **Robot / robots.txt** | 1994, Martijn Koster. Su servidor colapsó por un crawler mal escrito. Escribió el *Robots Exclusion Protocol* como acuerdo de caballeros. | robots.txt nació para **proteger servidores**, no para gestionar índices. De ahí viene el error #1 del sector: creer que bloquear ahí desindexa. No: solo evita la descarga. |
| **Índice** | De los índices de libros y de las fichas bibliotecarias. | Es literalmente lo mismo: una lista de términos y en qué documentos aparecen. La estructura se llama **índice invertido** porque invierte la relación natural: en vez de "documento → palabras", guarda "palabra → documentos". |
| **PageRank** | 1996, Larry Page. Juego de palabras con su apellido y con "page". | Lo importante: **el modelo del navegante aleatorio**. Un enlace es un voto ponderado por la autoridad de quien vota. |
| **SEO** | ~1997. | El nombre es engañoso: hoy no se optimiza "para el motor", se optimiza para que el motor pueda **entender y confiar**. |
| **SERP** | *Search Engine Results Page*. | Ya casi no es una "página de resultados": es una interfaz con módulos, respuestas y ahora resúmenes generados. Ver T07. |
| **Canonical** | Del griego *kanōn* (regla, vara de medir). En textos religiosos, la versión "oficial". | Declara **cuál versión es la oficial** entre duplicados. |
| **hreflang** | `href` + `lang`. | Es un atributo, no una etiqueta. Vive dentro de `<link rel="alternate">`. |
| **Core Web Vitals** | Google, 2020. "Vitals" como signos vitales médicos. | La metáfora es deliberada: son **indicadores de salud**, no la salud completa. |

---

## 3. La arquitectura real, pieza por pieza

### 3.1 El planificador de rastreo (crawl scheduler)

No existe "un crawler". Existe un **sistema de planificación** que decide, en cada momento, qué URL descargar. Sus entradas:

- **Frontera de rastreo** (*crawl frontier*): la cola de URLs conocidas y no visitadas. Se alimenta de enlaces descubiertos, sitemaps, redirecciones, envíos por API.
- **Prioridad**: estimada por autoridad de la página, frecuencia de cambio histórica, profundidad de clic, señales del sitemap.
- **Cortesía** (*politeness*): límite de peticiones por servidor para no tumbarlo. Es la razón de que un sitio lento se rastree menos: **si tu servidor tarda, Google reduce el ritmo para no dañarte.** Esta relación es la conexión directa entre rendimiento y rastreo, y casi nadie la explica.

> **Concepto clave — `crawl rate limit` vs `crawl demand`.** El *límite* es cuánto puede rastrear sin dañar tu servidor. La *demanda* es cuánto quiere rastrear según el interés y frescura de tu contenido. El **presupuesto de rastreo** (*crawl budget*) es el mínimo de ambos. Si tu problema es el límite, se arregla con infraestructura. Si es la demanda, se arregla con calidad y enlaces. Diagnosticar mal esto hace perder meses.

### 3.2 El descargador (fetcher)

Hace la petición HTTP. Aquí importan cosas que suelen ignorarse:

- **User-agent**: `Googlebot` se declara. Verificable por DNS inverso (nunca confíes en la cadena de UA sola: cualquiera puede falsificarla).
- **Códigos de estado**: cada uno le dice algo distinto al planificador. Ver T01.
- **Cabeceras condicionales**: `If-Modified-Since` / `ETag`. Si respondes `304 Not Modified`, ahorras ancho de banda y el crawler puede visitarte más. Optimización real y casi nunca implementada.
- **Compresión**: `gzip`/`brotli`. Menos bytes = más URLs rastreadas con el mismo presupuesto.

### 3.3 El renderizador

Aquí ocurre lo que rompe la mitad de los sitios modernos.

Googlebot hace **dos pasadas**:

1. **HTML inicial**: descarga el HTML crudo, extrae enlaces y contenido inmediatamente.
2. **Renderizado**: encola la página en el *Web Rendering Service* (un Chromium sin interfaz), ejecuta el JavaScript, y obtiene el **DOM renderizado**.

La segunda pasada ocurre **más tarde** — antes eran días, hoy suele ser minutos u horas, pero **no es simultánea ni está garantizada**. Consecuencias prácticas:

- Contenido que solo existe tras ejecutar JS **existe para Google, pero con retraso y con riesgo**.
- Enlaces generados por JS se descubren en la segunda pasada: tu arquitectura de enlaces se retrasa.
- Contenido que depende de la interacción del usuario (clic en "ver más") **no se indexa**: el renderizador no hace clic.
- Un fallo de JS silencioso = página en blanco para Google, normal para ti.

> **Regla operativa:** todo lo crítico —título, contenido principal, enlaces internos, canonical, hreflang, datos estructurados— debe estar en el **HTML inicial**. Comprobación: `curl -s URL | grep "tu contenido"`. Si no aparece ahí, depende del renderizado.

Esto explica la existencia de SSR (renderizado en servidor), SSG (generación estática) e hidratación parcial. No son modas de frontend: son respuestas a este problema.

### 3.4 El indexador

Toma el documento renderizado y produce entradas de índice:

- **Tokenización y normalización**: separar en términos, minúsculas, quitar acentos según idioma, *stemming*/lematización (reducir "corriendo/corrió/correr" a una raíz).
- **Índice invertido**: `término → [(doc_id, posiciones, pesos)]`. Las **posiciones** permiten búsquedas por frase y proximidad.
- **Deduplicación**: agrupar duplicados en un *clúster* y elegir un representante — la **canónica seleccionada por Google**, que puede no ser la que tú declaraste. Ver T02.
- **Extracción de entidades**: vincular texto a nodos del *Knowledge Graph* (Machu Picchu como lugar, no como cadena de caracteres). Aquí entra el paso de **cadenas a cosas** (*strings to things*, Google 2012), que es el fundamento conceptual de los datos estructurados.
- **Señales por documento**: idioma, país, tipo de página, calidad estimada, frescura, señales de spam.

### 3.5 El clasificador (ranking)

Simplificando brutalmente, hay dos etapas:

1. **Recuperación** (*retrieval*): de miles de millones a unos pocos miles de candidatos. Rápida, basada en el índice invertido y, cada vez más, en **búsqueda vectorial** (embeddings: representar significado como coordenadas en un espacio de cientos de dimensiones, donde "hotel barato Cusco" y "alojamiento económico Cusco" quedan cerca aunque no compartan palabras).
2. **Reordenación** (*re-ranking*): modelos pesados sobre esos candidatos. Cientos de señales.

Modelos que debes conocer por nombre porque explican cambios de comportamiento reales:

| Sistema | Año | Qué introdujo |
|---|---|---|
| **PageRank** | 1998 | Autoridad por enlaces |
| **Panda** | 2011 | Penalización de contenido de baja calidad a escala de sitio |
| **Penguin** | 2012 | Penalización de perfiles de enlaces manipulados |
| **Hummingbird** | 2013 | Interpretación semántica de la consulta completa, no palabra a palabra |
| **RankBrain** | 2015 | Aprendizaje automático para consultas nunca vistas (~15% del total) |
| **BERT** | 2019 | Comprensión bidireccional del contexto: preposiciones y matices importan |
| **MUM** | 2021 | Multimodal y multilingüe |
| **Helpful Content / core updates** | 2022→ | Evaluación a nivel de sitio de si el contenido se hizo para personas |
| **AI Overviews / AI Mode** | 2024→ | Generación de respuesta sobre resultados recuperados. Ver T07 |

**El patrón histórico:** cada iteración reduce el valor de manipular la superficie y aumenta el valor de **ser realmente la mejor respuesta**. Quien entiende esa dirección no necesita perseguir cada actualización.

---

## 4. E-E-A-T y los Quality Rater Guidelines

**E-E-A-T** = *Experience, Expertise, Authoritativeness, Trustworthiness* (Experiencia, Pericia, Autoridad, Confianza). La primera E se añadió en diciembre de 2022.

Precisiones que casi todo el mundo se salta:

- **No es un factor de ranking.** Es un marco conceptual de los *Search Quality Rater Guidelines*, el manual (público, cientos de páginas) que Google entrega a evaluadores humanos. Esos evaluadores **no modifican posiciones**: puntúan resultados para evaluar si un cambio de algoritmo mejoró o empeoró las cosas.
- Su utilidad real: describe **qué está intentando aproximar el algoritmo**. No optimizas "el E-E-A-T"; construyes las cosas que un evaluador reconocería como pericia y confianza — autoría real, credenciales verificables, transparencia, precisión.
- **YMYL** (*Your Money or Your Life*): temas donde un mal resultado puede dañar a alguien — salud, finanzas, seguridad, legal. Google aplica estándares más altos. **Turismo de aventura en alta montaña roza el YMYL**: mal de altura, seguridad en treks. Es un argumento real para invertir en autoría experta.

---

## 5. Cómo se mide todo esto (y por qué te equivocarás)

- **Correlación ≠ causalidad.** Los "estudios de factores de ranking" correlacionan características de páginas bien posicionadas. Que las páginas top tengan más enlaces no prueba que los enlaces causen la posición.
- **Casi nada es aislable.** No puedes hacer un A/B limpio con Google como variable dependiente. Lo más cercano es la **prueba dividida por grupos de URLs** (*SEO split testing*): dos grupos comparables de páginas, cambias uno, comparas evolución. Requiere volumen (cientos de URLs) y estadística.
- **La ventana de atribución es larga.** Un cambio técnico puede tardar semanas en reflejarse: hay que esperar al re-rastreo, la re-indexación y la re-evaluación.
- **Confusión estacional.** En turismo, el tráfico se mueve por temporada más que por cualquier cambio que hagas. Comparar siempre **año contra año**, no mes contra mes.

> **Marco honesto que debes adoptar desde hoy:** en SEO técnico hay una capa de **certezas documentadas** (lo que Google publica y puedes verificar: hreflang, códigos de estado, campos obligatorios de schema) y una capa de **inferencias del sector** (qué "pesa" más). La primera es donde se trabaja. La segunda es donde se discute. Confundir las dos es lo que produce a los charlatanes.

---

## 6. Los cinco errores conceptuales fundacionales

1. **"Bloqueo en robots.txt para desindexar."** No. Bloquear impide leer el `noindex`. Ver T01/T02.
2. **"Tengo contenido duplicado, Google me penalizará."** No existe penalización por duplicado interno. Existe **consolidación**: Google elige una y las demás dejan de rendir. Es un problema de dilución, no de castigo.
3. **"El crawl budget es mi problema."** Casi nunca lo es por debajo de ~10.000 URLs.
4. **"Lighthouse 100 = Core Web Vitals en verde."** No. Laboratorio ≠ campo. Ver T04.
5. **"Si sube el tráfico, funcionó."** Puede ser estacionalidad, una consulta de marca, o una actualización general. Sin línea base y sin segmentar, no sabes nada.

---

## 7. Ejercicio de dominio (hazlo antes de pasar a T01)

1. Ejecuta `curl -s https://ejemplo.com | wc -c` y luego mira la misma página en el navegador. Localiza qué contenido existe solo tras el JS.
2. Abre las *Estadísticas de rastreo* de Search Console de un sitio propio. Identifica: peticiones totales, tiempo medio de respuesta, distribución de códigos.
3. Dibuja a mano, sin mirar, el flujo completo: URL descubierta → cola → descarga → renderizado → indexación → recuperación → reordenación → SERP. Si no puedes, vuelve a la sección 3.
