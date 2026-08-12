# T01 — Rastreo (Crawling)

**Definición operativa:** el rastreo es el proceso por el que un buscador **descubre** URLs y **descarga** su contenido. Nada más. No decide qué se indexa ni qué posiciona. Confundir rastreo con indexación es el error que genera más daño en SEO técnico.

---

## 1. Descubrimiento: cómo Google sabe que existes

Cinco vías, por orden de peso real:

1. **Enlaces internos.** La principal. Un crawler navega enlaces; una URL sin enlaces entrantes es **huérfana** y solo se descubre por otras vías.
2. **Enlaces externos.** Un enlace desde un sitio ya rastreado.
3. **Sitemaps XML.** Sugerencia explícita, no garantía.
4. **Redirecciones y canónicas.** Apuntar a una URL la da a conocer.
5. **Envío manual / API.** Inspección de URL en GSC (una a una) e **Indexing API** (oficialmente solo para ofertas de empleo y eventos en directo; usarla fuera de eso es incumplir los términos).

> Corolario que cambia decisiones: **la arquitectura de enlaces internos es tu principal herramienta de rastreo.** Un sitemap con 500 URLs no compensa una arquitectura donde 200 de ellas están a seis clics de la portada.

---

## 2. `robots.txt` a fondo

### Qué es
Archivo de texto plano en la **raíz del host**, servido con `200` y `text/plain`. Implementa el *Robots Exclusion Protocol*, estandarizado en 2022 como **RFC 9309**.

Un host = un robots.txt. `https://ejemplo.com/robots.txt`, `https://www.ejemplo.com/robots.txt` y `https://sub.ejemplo.com/robots.txt` son **tres archivos distintos**. El puerto también cuenta.

### Sintaxis y reglas de precedencia

```
User-agent: *
Disallow: /admin/
Allow: /admin/publico/
Sitemap: https://ejemplo.com/sitemap_index.xml
```

Reglas que causan la mayoría de los errores reales:

- **Las rutas son relativas.** `Disallow: https://ejemplo.com/x/` es **inválido** y no bloquea nada. (Error encontrado en producción en la auditoría de PGT.)
- **Gana la regla más específica**, no el orden. Con `Disallow: /a/` y `Allow: /a/b/`, la ruta `/a/b/c` está permitida porque `/a/b/` es más larga. En empate exacto, gana `Allow`.
- **Solo aplica un grupo de `User-agent`**: el más específico que coincida. Si existe un grupo `Googlebot`, Googlebot **ignora por completo** el grupo `*`. Error frecuente: añadir un grupo específico y perder todas las reglas generales sin darse cuenta.
- **Comodines:** `*` (cualquier secuencia) y `$` (fin de URL). `Disallow: /*.pdf$` bloquea PDFs.
- **Distingue mayúsculas** en las rutas.
- **`Crawl-delay` no lo soporta Google** (sí Bing y Yandex). En Google se ajusta desde GSC o, mejor, arreglando el servidor.
- **Límite de tamaño en Google: 500 KiB.** Lo que exceda se ignora.
- **`noindex` en robots.txt no existe.** Google dejó de soportarlo (no oficialmente) en septiembre de 2019.

### Qué pasa según la respuesta del archivo

| Respuesta | Comportamiento de Google |
|---|---|
| `200` con contenido | Se aplican las reglas |
| `404` / `410` | **Rastreo libre.** Sin robots.txt, todo permitido |
| `5xx` durante <12 h | Se detiene el rastreo (asume bloqueo total) |
| `5xx` prolongado | Usa la última versión cacheada; luego rastrea libre |
| `403` | Tratado como error de servidor en la práctica |

> **Esto es un riesgo operativo real:** un robots.txt caído 5xx puede **parar tu rastreo entero**. Monitorízalo.

### El punto conceptual que separa a un profesional

**`robots.txt` controla el rastreo, no la indexación.** Una URL bloqueada puede aparecer en resultados si tiene enlaces externos —sin descripción, con el texto "no hay información disponible"— porque Google sabe que existe pero no puede leer su contenido. Es el peor de los dos mundos: indexada y muda.

**Para desindexar:** permite el rastreo y usa `noindex`. Solo cuando ya esté fuera del índice puedes bloquearla, si quieres ahorrar rastreo.

---

## 3. Sitemaps XML

### Formato y límites
- Máximo **50.000 URLs** y **50 MB sin comprimir** por archivo. Más → índice de sitemaps.
- Codificación UTF-8, URLs absolutas y escapadas.
- Solo URLs del mismo host (salvo excepciones con propiedad verificada).

```xml
<url>
  <loc>https://ejemplo.com/pagina/</loc>
  <lastmod>2026-08-09T10:00:00+00:00</lastmod>
</url>
```

- **`lastmod` es la única etiqueta que Google usa**, y solo si es **consistentemente veraz**. `changefreq` y `priority` se ignoran. Si tu CMS pone la fecha de hoy en todas las URLs cada noche, Google deja de creerte y pierdes la señal completa.

### Buenas prácticas
- Incluir **solo URLs canónicas, indexables y con respuesta 200**. Un sitemap con redirecciones, 404 o páginas `noindex` es ruido que degrada la confianza en el archivo entero.
- **Segmentar por tipo** (páginas, productos, blog, imágenes). Permite diagnosticar en GSC qué segmento tiene problema de indexación.
- Declararlo en robots.txt **y** enviarlo en Search Console.
- Sitemaps de imágenes y de vídeo si esos activos importan.
- `hreflang` puede declararse en el sitemap: útil cuando no controlas el `<head>`.

### El uso diagnóstico que casi nadie hace
El informe de sitemaps de GSC te da **URLs enviadas vs indexadas por segmento**. Si el sitemap de tours indexa al 95% y el de blog al 40%, ya sabes dónde está el problema sin rastrear nada.

---

## 4. Códigos de estado HTTP: qué le dice cada uno al crawler

| Código | Significado | Efecto en rastreo/indexación |
|---|---|---|
| **200** | OK | Se procesa normalmente |
| **301** | Movido permanentemente | Se transfieren señales; la URL destino sustituye a la origen en el índice |
| **302 / 307** | Temporal | La URL **origen** permanece como canónica. Si en realidad es permanente y lo dejas en 302, pierdes la consolidación |
| **304** | No modificado | Ahorra ancho de banda; buena señal de eficiencia |
| **404** | No encontrado | Se elimina del índice tras varios intentos |
| **410** | Eliminado permanentemente | Igual que 404 pero **más rápido**. Úsalo cuando sabes que no volverá |
| **403** | Prohibido | Tratado como error; puede desindexar |
| **406** | No aceptable | Lo que devuelve el WAF de PGT a UAs no-navegador. **Bloquea herramientas de auditoría** |
| **429** | Demasiadas peticiones | Google reduce el ritmo. Correcto si es intencional |
| **500 / 502 / 503** | Error de servidor | Google reduce rastreo. Si persiste, desindexa |
| **503 + `Retry-After`** | Mantenimiento | **La forma correcta** de bajar un sitio temporalmente |

### Redirecciones: reglas duras

- **Máximo práctico: 3 saltos.** Google sigue hasta ~10 pero cada salto es pérdida de eficiencia y riesgo.
- **Nunca redirijas todo a la portada** en una migración. Google la trata como **soft 404** y pierdes todo el valor de esas URLs. Es el error más caro y más frecuente en migraciones.
- **Cadenas** (A→B→C) y **bucles** (A→B→A): auditar siempre.
- `301` vs `308`: el 308 preserva el método HTTP. Para GET de páginas, 301 sigue siendo el estándar.
- Redirección con JavaScript o meta refresh: funciona, pero es lenta, depende del renderizado y no debe usarse en producción para SEO.

### Soft 404
Página que devuelve `200` pero cuyo contenido dice que no hay nada ("Sin resultados", "Producto no disponible"). Google lo detecta y la trata como 404. **Devuelve el código correcto.** Un buscador interno sin resultados, un tour agotado, una categoría vacía: si no hay contenido útil, no devuelvas 200 con una página vacía.

---

## 5. Presupuesto de rastreo (crawl budget)

### Los dos componentes

- **Límite de capacidad** (*crawl capacity limit*): cuánto puede rastrear sin dañar tu servidor. Sube si respondes rápido y sin errores; baja si respondes lento o con 5xx.
- **Demanda de rastreo** (*crawl demand*): cuánto quiere rastrear. Depende de popularidad, frescura, y de que no perciba tu inventario como de baja calidad.

**Presupuesto = mínimo de ambos.**

### Cuándo importa de verdad
Google es explícito: **por debajo de unos pocos miles de URLs, no es tu problema.** Importa en sitios grandes (>10k URLs), sitios con generación dinámica masiva (facetas, filtros, calendarios) o sitios que publican mucho a diario.

### Qué lo malgasta
- URLs con parámetros que generan combinaciones infinitas (filtros, orden, sesiones)
- Navegación facetada sin control
- Calendarios con "mes siguiente" al infinito
- Contenido duplicado a escala
- Redirecciones encadenadas
- Páginas de error que devuelven 200

### Qué hacer
- Bloquear en robots.txt lo que **nunca** debe rastrearse (facetas combinatorias)
- Devolver códigos correctos
- Mejorar el tiempo de respuesta (sube el límite de capacidad directamente)
- Consolidar duplicados
- Podar contenido sin valor (menos URLs de calidad > más URLs vacías)

---

## 6. Rastreo y JavaScript

Repaso del mecanismo (ver T00 §3.3) y sus implicaciones de rastreo:

- Los enlaces solo se siguen si están en `<a href="...">`. **Un `<div onclick>` o un `<button>` con router no es un enlace** para el crawler.
- URLs con fragmento (`#seccion`) no son URLs distintas. Las de tipo `#!` (hashbang) están obsoletas desde 2015.
- Contenido tras interacción (pestañas, "cargar más", scroll infinito) → **no se indexa** salvo que exista en el DOM inicial o haya URLs paginadas reales detrás.
- El renderizado consume presupuesto: renderizar es mucho más caro que descargar HTML.

**Diagnóstico:** Inspección de URL en GSC → "Probar URL publicada" → ver HTML renderizado y **recursos bloqueados**. Si bloqueas en robots.txt el JS o CSS que la página necesita para renderizar, Google ve una página rota.

---

## 7. Estadísticas de rastreo en Search Console

El informe menos usado y de los más informativos. Qué leer:

| Señal | Diagnóstico |
|---|---|
| **Tiempo medio de respuesta** subiendo | El límite de capacidad va a bajar. Problema de infraestructura antes de que sea visible en tráfico |
| **Picos de 5xx** | Rastreo detenido; riesgo de desindexación si persiste |
| Muchas peticiones a **archivos de recurso** (JS/CSS) | Dependencia fuerte del renderizado |
| Alta proporción de **"Actualización"** vs "Descubrimiento" | Google no está encontrando contenido nuevo: revisa enlazado interno y sitemaps |
| Peticiones concentradas en URLs sin valor | Fuga de presupuesto |

---

## 8. Rastreo en la era de la IA (adelanto de T07)

`robots.txt` está haciendo hoy un trabajo para el que no fue diseñado: arbitrar el acceso de crawlers de IA. Lo esencial ahora:

- **Distinguir tipos de bot es lo importante.** `GPTBot` entrena; `ChatGPT-User` busca la página cuando un usuario la pide; `OAI-SearchBot` rastrea para el buscador de OpenAI. Bloquear el primero no te saca de las respuestas; bloquear los otros dos sí.
- `Google-Extended` controla el uso para entrenar Gemini **sin afectar** a Googlebot ni a tu posicionamiento.
- El cumplimiento es **voluntario**; la aplicación real ocurre en el servidor o el CDN.
- **`llms.txt` no es un mecanismo de control** y los principales rastreadores apenas lo solicitan. Detalle y datos en T07.

---

## 9. Laboratorio del bloque

1. Escribe un robots.txt con `Disallow: /a/` + `Allow: /a/b/` y comprueba en el probador de GSC qué pasa con `/a/b/c`.
2. Provoca una cadena A→B→C en un sitio de pruebas y mírala en Screaming Frog (informe de redirecciones).
3. Crea una página que solo muestre su contenido tras un `setTimeout` y compárala en Inspección de URL: HTML crudo vs renderizado.
4. Devuelve `503` con `Retry-After` durante una hora y observa las Estadísticas de rastreo.
5. Rastrea un sitio con UA por defecto y con UA de navegador. Documenta la diferencia. *(Con los dominios de PGT verás el 406.)*

## 10. Autoevaluación

- ¿Por qué bloquear en robots.txt impide desindexar?
- ¿Qué gana `Disallow: /a/` frente a `Allow: /a/b/` en `/a/b/c/d` y por qué?
- ¿Diferencia práctica entre 404 y 410?
- ¿Qué le pasa a tu rastreo si robots.txt devuelve 503 doce horas?
- ¿Por qué un sitio lento se rastrea menos?
- ¿Cuándo es legítimo hablar de crawl budget?
