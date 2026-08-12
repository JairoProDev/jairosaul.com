# T02 — Indexación y canonicalización

**Definición operativa:** la indexación es la decisión de **guardar** un documento en el índice y bajo qué forma canónica. Es una decisión de Google, no tuya. Tú emites señales; Google elige.

Esa asimetría es el concepto central del bloque. Todo lo demás se deriva de ella.

---

## 1. El ciclo de vida de una URL

```
Descubierta → En cola → Rastreada → Renderizada → Agrupada con duplicados
   → Canónica seleccionada → Evaluada → Indexada (o no) → Servida
```

Cada flecha puede fallar y cada fallo tiene un nombre en el informe de Search Console. Aprender ese mapeo es el 80% del diagnóstico de indexación.

---

## 2. El informe de Indexación de páginas de GSC, estado por estado

Este es el documento de referencia más útil que puedes memorizar.

### Estados de **no indexada** y qué significan de verdad

| Estado | Qué significa | Causa habitual | Acción |
|---|---|---|---|
| **Descubierta: actualmente sin indexar** | Google la conoce pero **nunca la ha rastreado** | Presupuesto/demanda de rastreo insuficiente, o baja prioridad percibida. Suele ser problema de **calidad o arquitectura**, no técnico | Mejorar enlazado interno, reducir profundidad, elevar la calidad del segmento. Reenviar el sitemap no resuelve |
| **Rastreada: actualmente sin indexar** | La leyó y **decidió no indexarla** | Contenido delgado, duplicado o sin valor diferencial. Es un **juicio de calidad** | Mejorar el contenido, consolidar o eliminar. El más incomprendido de todos |
| **Página alternativa con etiqueta canónica adecuada** | Correcto: es un duplicado que apunta bien | Ninguna | Ninguna. **No es un error** |
| **Duplicada: Google eligió una canónica distinta** | Declaraste una y eligió otra | Tus señales se contradicen | Alinear canonical, enlaces internos, sitemap y hreflang. Ver §5 |
| **Duplicada sin canónica seleccionada por el usuario** | Hay duplicados y no declaraste canónica | Falta `rel=canonical` | Declararla |
| **Excluida por etiqueta `noindex`** | Funcionando como pediste | — | Verificar que era intencional |
| **Bloqueada por robots.txt** | No pudo leerla | — | Si querías desindexar, esto es el error clásico |
| **Soft 404** | 200 con contenido de "no hay nada" | Buscador interno, categoría vacía, producto agotado | Devolver 404/410 o dar contenido real |
| **Error de rastreo del servidor (5xx)** | Infraestructura | — | Urgente |
| **Página con redirección** | Es una redirección, no un destino | Suele indicar sitemap sucio | Limpiar sitemap |
| **Anomalía en el rastreo** | Cajón de sastre (4xx/5xx no clasificados) | — | Investigar con logs |

> **La distinción más importante de todo el SEO técnico:** *Descubierta sin indexar* = problema de **rastreo/arquitectura**. *Rastreada sin indexar* = problema de **calidad**. Confundirlas te hace optimizar la cosa equivocada durante meses. En una entrevista, esta pregunta separa a quien ha operado un GSC real de quien ha leído sobre él.

### Limitaciones del informe
- Muestra datos, no exhaustivos.
- Latencia de días.
- La categorización a veces es imprecisa: contrasta con Inspección de URL para casos concretos.

---

## 3. Control de indexación: las herramientas y cuál usar

### `<meta name="robots">` y `X-Robots-Tag`

```html
<meta name="robots" content="noindex, follow">
```
```
X-Robots-Tag: noindex, nofollow
```

La cabecera HTTP sirve para **archivos no HTML** (PDF, imágenes, JSON) donde no puedes poner una meta etiqueta. Es la respuesta a "¿cómo desindexo un PDF?".

**Directivas útiles:**

| Directiva | Efecto |
|---|---|
| `noindex` | No indexar |
| `nofollow` | No seguir enlaces de esta página |
| `none` | `noindex, nofollow` |
| `noarchive` | Sin versión en caché |
| `nosnippet` | Sin fragmento de texto |
| `max-snippet:[n]` | Límite de caracteres del fragmento |
| `max-image-preview:[none/standard/large]` | Tamaño de vista previa |
| `max-video-preview:[n]` | Segundos de vídeo |
| `notranslate` | No ofrecer traducción |
| `indexifembedded` | Indexar solo si está embebida (iframes) |
| `unavailable_after:[fecha]` | Desindexar tras una fecha. **Útil para eventos y tours de temporada** |

**Nota sobre `noindex, follow`:** históricamente se usaba para pasar señales sin indexar. Google ha indicado que a largo plazo trata las páginas con `noindex` persistente como `nofollow` de facto, porque deja de rastrearlas. No construyas arquitectura dependiendo de ese patrón.

### Regla de oro
**Para que `noindex` funcione, la página debe ser rastreable.** `noindex` + `Disallow` = `noindex` invisible.

### Herramienta de eliminaciones de GSC
Oculta una URL de los resultados durante **~6 meses**. Es una tirita para urgencias (datos filtrados, contenido erróneo), no una solución. La solución real es `noindex` o `410`.

---

## 4. Canonicalización

### Qué es
Elegir, entre varias URLs con contenido igual o muy parecido, cuál es **la representante** que se indexa y acumula señales.

### Por qué existen duplicados sin que hagas nada mal
- `http` / `https`
- `www` / sin `www`
- Barra final / sin barra final
- Mayúsculas/minúsculas en la ruta
- Parámetros de orden, filtro, seguimiento (`?utm_source=`, `?sort=price`)
- Versiones de impresión, AMP, paginación
- El mismo producto en varias categorías
- Índices y páginas de archivo

### Las señales que Google pondera para elegir canónica

`rel=canonical` es **una** de ellas. Las demás:

1. Redirecciones 301
2. Enlaces internos (a cuál apuntas más)
3. Presencia en el sitemap
4. `hreflang` (las anotaciones deben apuntar a canónicas)
5. HTTPS sobre HTTP
6. URLs "más limpias"
7. Enlaces externos

**Si estas señales se contradicen, Google decide** — y verás "Duplicada: Google eligió una canónica distinta".

### Canónica declarada vs canónica seleccionada
- **Declarada**: la que pusiste en `rel=canonical`.
- **Seleccionada**: la que Google eligió. Visible en Inspección de URL.

Cuando difieren, no discutas con Google: **busca la señal contradictoria**. Casi siempre es un enlace interno masivo a la versión "equivocada" o un sitemap desalineado.

### Reglas de implementación

```html
<link rel="canonical" href="https://www.ejemplo.com/pagina/" />
```

- **Absoluta**, siempre.
- **Autorreferencial** en cada página indexable. No es obligatorio pero elimina ambigüedad y protege contra scraping y parámetros añadidos.
- Una sola por página. Dos canónicas = ambas ignoradas.
- Debe apuntar a una URL **200 e indexable**. Canónica a una página `noindex`, redirigida o 404 = señal rota.
- Debe estar en el `<head>`. Insertada por JS: funciona a veces, pero si el HTML inicial ya trae otra, Google puede quedarse con la primera. **No la pongas por JS.**
- También existe `Link: <url>; rel="canonical"` como cabecera HTTP, para no-HTML.

### Canónicas entre dominios
Válida y útil: contenido sindicado que quiere atribuir el original. Pero es una señal fuerte de "no me indexes a mí" — no la uses entre versiones de idioma. **Para idiomas, hreflang; nunca canonical cruzada.** Ese error mata el sitio secundario entero (ver T03).

### Paginación
`rel=next` / `rel=prev` **están muertos** (Google dejó de usarlos en 2019, anunciado retroactivamente).

Práctica actual:
- Cada página paginada es **autocanónica** (nunca canonical a la página 1: pierdes las URLs profundas).
- Es indexable, aunque puedas usar `noindex` si el valor es nulo — pero entonces asegúrate de que el contenido profundo tenga otra ruta de enlace.
- Si existe una vista "ver todo" razonable, puede ser la canónica.
- El enlazado a las páginas paginadas debe ser real (`<a href>`), no JS.

---

## 5. Contenido duplicado, casi duplicado y canibalización

### Duplicado
Contenido idéntico en varias URLs. **No hay penalización.** Hay consolidación: una gana, las demás desaparecen del índice y su valor se reparte o se pierde.

### Casi duplicado
El caso real y difícil: fichas de producto que difieren en dos palabras, páginas de ubicación generadas por plantilla ("fontanero en {ciudad}" × 200). Google las agrupa igual y **la mayoría cae en "Rastreada sin indexar"**.

Solución: diferenciación real (contenido único por página) o consolidación (una página fuerte en vez de 200 débiles).

### Canibalización
Dos URLs **tuyas** compitiendo por la misma consulta. No es lo mismo que duplicado: pueden ser contenidos distintos con la misma intención de búsqueda.

**Cómo detectarla:**
GSC → Rendimiento → filtro por consulta → pestaña Páginas. Si varias URLs se turnan posiciones para el mismo término a lo largo del tiempo, hay canibalización.

**Cómo resolverla, por orden de preferencia:**
1. **Consolidar**: fusionar en una pieza mejor y redirigir 301 la otra.
2. **Diferenciar la intención**: una informativa, otra transaccional, con enlazado entre ambas.
3. **Canonicalizar** una hacia la otra si son realmente lo mismo.
4. `noindex` en la débil (última opción: pierdes la URL).

*Caso real de la auditoría: `/tour/bike-maras-moray-salineras/` y `/tour/maras-moray-en-bicicleta/` en el mismo dominio. Mismo producto, dos URLs, ambas en sitemap. Es canibalización de manual y la solución es la opción 1.*

---

## 6. Poda de contenido (content pruning)

Concepto contraintuitivo pero bien documentado: **eliminar contenido malo puede subir el rendimiento del resto**. Razones: mejora la calidad media percibida del sitio, concentra el rastreo y elimina canibalización.

Método:
1. Exportar todas las URLs con sus clics/impresiones de 12 meses.
2. Clasificar: mantener / mejorar / consolidar / eliminar.
3. Eliminar = `410` o `301` a algo relevante (nunca a la portada masivamente).
4. Medir a 60-90 días.

Precaución: URLs sin clics pero con enlaces externos valiosos → redirigir, no borrar.

---

## 7. Cómo funciona la deduplicación por dentro (para entender, no para memorizar)

Google agrupa documentos parecidos usando huellas del contenido (técnicas tipo *shingling* / *SimHash*: se trocea el texto en secuencias solapadas y se comparan huellas). Ese clúster recibe una canónica. Por eso:

- Cambiar dos frases no rompe la agrupación.
- El **contenido único que importa** es el del cuerpo principal, no el de menú y pie —que Google identifica como *boilerplate* y descuenta.
- Un sitio con 90% de plantilla y 10% de contenido único en cada ficha es un candidato natural a la agrupación.

---

## 8. Errores frecuentes con consecuencias graves

1. `noindex` + `Disallow` juntos → nunca se lee el noindex.
2. Canonical a la portada desde todas las páginas (fallo de plantilla) → desindexación masiva. **Verifica siempre después de un despliegue.**
3. Canonical cruzada entre idiomas → mata el sitio secundario.
4. Sitemap lleno de URLs no canónicas → señales contradictorias.
5. Migración con redirección a la portada → soft 404 masivo.
6. `noindex` dejado en producción tras un lanzamiento. **Ocurre constantemente.** Ponlo en la lista de verificación de todo despliegue.
7. Parámetros de seguimiento indexados (`?utm_...`) → duplicados. Canónica autorreferencial los neutraliza.

---

## 9. Laboratorio

1. Crea dos páginas casi idénticas, canonicaliza una hacia la otra y observa en GSC cómo aparece "Página alternativa con etiqueta canónica adecuada".
2. Provoca deliberadamente el conflicto: canonical hacia A, todos los enlaces internos hacia B. Observa qué elige Google.
3. Pon `noindex` + `Disallow` en la misma URL y comprueba que la página sigue indexada.
4. Usa `X-Robots-Tag: noindex` sobre un PDF y verifica en Inspección de URL.
5. Encuentra una canibalización real en un sitio propio usando el filtro de consulta en GSC.

## 10. Autoevaluación

- Diferencia exacta entre "Descubierta sin indexar" y "Rastreada sin indexar", y qué harías con cada una.
- ¿Por qué `rel=canonical` es una señal y no una orden? Nombra tres señales que compiten con ella.
- ¿Cómo desindexas un PDF?
- ¿Qué reemplazó a `rel=next/prev` y cómo se maneja hoy la paginación?
- ¿Por qué eliminar contenido puede mejorar el rendimiento?
- ¿Qué le pasa a un sitio si canonicalizas su versión en español hacia la inglesa?
