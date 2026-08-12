# D03 — El stack explicado desde cero

Todo lo que preguntaste, empezando por no saber qué es la palabra.

---

# PARTE 1 — WORDPRESS

## Qué es

**WordPress** es un **CMS**: *Content Management System*, sistema de gestión de contenidos. Un programa que se instala en un servidor y permite crear y editar un sitio web sin escribir código.

Componentes: **PHP** (el lenguaje que ejecuta la lógica en el servidor) + **MySQL** (la base de datos donde vive el contenido) + archivos (imágenes, plantillas).

**Cuota de mercado:** alrededor del 43% de todos los sitios web del mundo. Es, con mucha diferencia, el CMS dominante. Por eso saber SEO técnico para WordPress es una habilidad con demanda real en cualquier mercado.

**No confundir:**
- **WordPress.org** — el software libre que instalas en tu servidor. Control total. Es lo que usa PGT.
- **WordPress.com** — servicio alojado de una empresa (Automattic). Limitado.

## Cómo se genera una página (importa para SEO)

```
Visita → servidor → PHP consulta MySQL → el TEMA arma el HTML
      → los PLUGINS añaden o modifican cosas → HTML final → navegador
```

**La consecuencia clave:** ese proceso ocurre **en cada visita**. Es lento por naturaleza. Por eso existe la **caché de página**: guardar el HTML ya generado y servirlo directamente sin ejecutar PHP ni tocar la base de datos.

**Aquí está el problema 6 de la auditoría:** el dominio inglés tiene esa caché desactivada (`cache-control: no-store`). Ejecuta todo el proceso en cada visita. De ahí el TTFB de 1,04 s frente a 0,10 s del portugués.

## Los conceptos internos que aparecen en la auditoría

| Concepto | Qué es |
|---|---|
| **Post** | Entrada de blog. Tiene fecha, autor, categorías |
| **Page** | Página estática (Nosotros, Contacto). Sin fecha ni categorías |
| **Custom Post Type (CPT)** | Tipo de contenido inventado por un plugin o tema. **`tour` y `pacote` son CPTs** creados por su plugin de tours. Por eso hay un `tour-sitemap.xml` separado |
| **Taxonomía** | Sistema de clasificación. Categorías y etiquetas son taxonomías. `tour_category` es una taxonomía personalizada |
| **Slug** | La parte legible de la URL. En `/tour/city-tour-in-cusco/`, el slug es `city-tour-in-cusco` |
| **Permalink** | La estructura de URL configurada |
| **`wp_head`** | El "gancho" (hook) donde temas y plugins inyectan cosas en el `<head>`. **Es donde va tu snippet de hreflang** |
| **`wp-content/`** | Carpeta con temas, plugins y subidas. Por eso las URLs de imágenes son `/wp-content/uploads/2024/08/foto.webp` |
| **`wp-admin/`** | El panel de administración. Por eso se bloquea en robots.txt |
| **`admin-ajax.php`** | Archivo que procesa peticiones asíncronas. **Debe permitirse en robots.txt** o Google puede no renderizar componentes que dependan de él (problema 21) |

---

# PARTE 2 — TEMAS Y GOODLAYERS

## Qué es un tema

Un **tema** (*theme*) es el conjunto de plantillas PHP + CSS + JS que define **cómo se ve** un sitio WordPress y **qué HTML genera**. Cambias el tema, cambia el sitio entero sin tocar el contenido.

**Por qué le importa a un SEO:** el tema decide qué HTML sale. Los títulos, las etiquetas de encabezado, si hay uno o cinco `<h1>`, cuántas hojas de estilo se cargan, si las imágenes llevan dimensiones. **La mitad de los problemas técnicos de un sitio WordPress son del tema.**

## Tema hijo (child theme)

Detectaste `traveltour` y `traveltour-child`. Un **tema hijo** hereda todo del padre pero permite modificaciones que **sobreviven a las actualizaciones** del padre.

**Esto es una buena noticia para ti:** significa que hay un lugar seguro donde meter tu código. El `functions.php` del tema hijo es donde iría el snippet de hreflang sin riesgo de perderlo en la próxima actualización.

## Goodlayers y `traveltour`

**Goodlayers** es un estudio que desarrolla y vende temas comerciales de WordPress en marketplaces (principalmente ThemeForest). **TravelTour** es su tema para agencias de viajes.

Un tema comercial de este tipo trae:
- Un **page builder** propio (constructor visual de páginas por bloques)
- Docenas de "elementos" prediseñados: carruseles, contadores, testimonios, mapas
- Un sistema de reservas y gestión de tours
- Demos importables

**Las implicaciones técnicas — esto es lo importante:**

| Característica | Consecuencia SEO |
|---|---|
| El constructor carga CSS y JS de **todos** los elementos posibles, no solo los usados | **Las 29 hojas de estilo del problema 9** |
| El HTML está muy anidado (divs dentro de divs) | HTML pesado: 214-313 KB |
| Genera su propio marcado de datos estructurados | **De ahí sale el `Offer` incompleto del problema 2** |
| El schema y la estructura vienen de la plantilla | Un arreglo en la plantilla corrige las 69 fichas a la vez |
| Los temas comerciales priorizan versatilidad sobre rendimiento | Es un compromiso de diseño, no un error de nadie |

**Por qué esto es útil para ti:** sabes exactamente **dónde tocar**. No hay que arreglar 69 páginas: hay que arreglar una plantilla. Poder decir *"el `priceCurrency` sale de la plantilla de tourmaster, se corrige una vez y afecta a todo el catálogo"* demuestra que entiendes el sistema, no solo el síntoma.

**Advertencia real:** optimizar un tema de constructor a lo bruto (combinar y diferir todo el CSS) **rompe el diseño**. Hay que ir por etapas y verificar visualmente. Decir esto en una entrevista te separa de quien recomienda "activen un plugin de optimización" sin más.

---

# PARTE 3 — PLUGINS

## Qué es un plugin

Un **plugin** es un paquete de código que añade funcionalidad a WordPress sin modificar el núcleo. Se instala, se activa, y engancha su código a los "hooks" que WordPress ofrece.

**Analogía:** WordPress es el sistema operativo, el tema es la apariencia, los plugins son las apps.

**El problema estructural de los plugins:** cada uno carga sus propios CSS y JS **en todas las páginas**, aunque solo se use en una. Un sitio con 30 plugins puede cargar 30 hojas de estilo innecesarias. Es la causa principal de la sobrecarga del problema 9.

## Los plugins detectados en su stack

| Plugin | Qué hace | Implicación SEO |
|---|---|---|
| **`tourmaster`** | Motor de tours: crea el CPT `tour`, gestiona itinerarios, precios, disponibilidad y reservas | **Es el que genera el `Product`/`Offer`.** Es donde se arregla el `priceCurrency` |
| **`goodlayers-core`** | Núcleo del constructor visual del tema | Genera el HTML anidado y el CSS masivo |
| **`quadmenu`** | Megamenús | Muchos enlaces en el menú → dilución de autoridad interna. Y CSS/JS extra |
| **`contact-form-7`** | Formularios de contacto | El plugin de formularios más usado del mundo. Carga su CSS/JS en todas las páginas por defecto |
| **`country-phone-field-cf7`** | Añade selector de país al teléfono | **Insight:** que se molesten en esto confirma que reciben consultas internacionales de muchos países |
| **`click-to-chat-for-whatsapp`** | Botón de WhatsApp | **Su canal comercial real.** Confirma que la conversión no es un carrito: es una conversación |
| **`pixelyoursite`** | Inserta píxeles de seguimiento (Meta, GA) | Hacen remarketing y miden. Hay datos que pedir en la entrevista |
| **Trustindex / shortcodes de reseñas** | Muestran reseñas de Google y Tripadvisor | **Muestran las reseñas pero no las marcan en schema** → problema 4 |

## Yoast SEO

**Qué es.** El plugin de SEO más usado del mundo (más de 10 millones de instalaciones). No "hace SEO": **da control sobre las señales técnicas** que WordPress no expone por defecto.

**Qué gestiona:**

| Función | Qué controla |
|---|---|
| Título y meta descripción | Con plantillas por tipo de contenido |
| Canonical | Automática (autorreferencial) y editable |
| Meta robots | `noindex`/`nofollow` por página o por tipo |
| **Sitemaps XML** | Genera `sitemap_index.xml` y los sub-sitemaps. **Por eso su red tiene `tour-sitemap.xml`, `post-sitemap.xml`, etc.** |
| **robots.txt** | Permite editarlo desde el panel |
| **Schema graph** | Genera datos estructurados automáticamente |
| Migas de pan | `BreadcrumbList` |
| Redirecciones | Solo en la versión de pago |
| Análisis de contenido | Los semáforos verde/naranja/rojo. **Ignóralos: son heurísticas simplistas, no reflejan cómo funciona Google.** Un texto con todo en verde puede ser malísimo |

### Qué es el "schema graph" de Yoast

Un **grafo** es un conjunto de nodos (entidades) conectados por relaciones. Yoast no emite bloques JSON-LD sueltos: emite **un solo bloque `@graph`** con todas las entidades de la página conectadas entre sí por `@id`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://ejemplo.com/#website",
      "publisher": { "@id": "https://ejemplo.com/#organization" } },
    { "@type": "Organization", "@id": "https://ejemplo.com/#organization",
      "name": "Peru Grand Travel" },
    { "@type": "WebPage", "@id": "https://ejemplo.com/pagina/#webpage",
      "isPartOf": { "@id": "https://ejemplo.com/#website" } },
    { "@type": "BreadcrumbList", "@id": "https://ejemplo.com/pagina/#breadcrumb" }
  ]
}
```

**Por qué el grafo es mejor que bloques sueltos:** el `@id` permite que una entidad se declare **una vez** y se referencie desde muchas. Sin `@id`, si emites `Organization` dentro de `WebSite` y otra vez dentro de `Product`, un sistema podría interpretar que son dos organizaciones distintas. Con `@id`, sabe que es la misma.

**Dónde está el problema en su caso:** hay **dos fuentes de schema conviviendo** — Yoast emitiendo el grafo de sitio (`Organization`, `WebPage`, `BreadcrumbList`) y `tourmaster` emitiendo el `Product`/`Offer` de la ficha. La del tema es la que tiene el `Offer` incompleto.

**Las dos rutas para arreglarlo:**
1. **Extender el grafo de Yoast** con sus filtros (`wpseo_schema_graph_pieces`). Limpio, mantenible, sobrevive a actualizaciones. La ruta correcta a medio plazo.
2. **Corregir el bloque de `tourmaster`** directamente. Se puede hacer esta semana.

Decir *"hago la 2 ahora y migro a la 1 después"* demuestra criterio de priorización, que es lo que de verdad se evalúa en un puesto técnico.

**Alternativas a Yoast** (por si te preguntan): Rank Math, SEO Framework, All in One SEO. Rank Math es el que más ha crecido; Yoast sigue siendo el estándar de facto.

---

# PARTE 4 — USER AGENTS, WAF Y EL ERROR 406

## Qué es un User-Agent

Cada vez que un programa pide una página web, envía **cabeceras HTTP**: metadatos sobre la petición. Una de ellas es **`User-Agent`**: una cadena de texto que dice *"soy este programa, en este sistema operativo"*.

**User-agent de navegador (Chrome en Windows):**
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```

**User-agent de Googlebot:**
```
Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
```

**User-agent por defecto de curl:**
```
curl/8.5.0
```

**User-agent por defecto de Screaming Frog:**
```
Screaming Frog SEO Spider/x.x
```

### Por qué todos empiezan por "Mozilla/5.0"

Anécdota que explica mucho sobre la web: en los años 90, los servidores servían HTML avanzado solo a Netscape (nombre en clave: Mozilla). Los demás navegadores empezaron a **mentir** diciendo "Mozilla" para recibir el buen contenido. Todos copiaron a todos. Hoy **todos los navegadores dicen ser Mozilla** aunque ninguno lo sea. Es un fósil histórico.

**La lección real:** el User-Agent es **texto libre y falsificable**. Cualquiera puede decir que es Googlebot. Por eso, para verificar de verdad si una petición es de Google, se hace **DNS inverso** sobre la IP. Nunca confíes en la cadena sola.

### Para qué sirve el User-Agent

- Servir contenido adaptado (móvil vs escritorio) — aunque hoy se hace mejor con CSS responsivo
- Analítica y logs
- **Aplicar reglas de robots.txt** (los grupos `User-agent:` son exactamente esto)
- **Bloquear tráfico no deseado** ← aquí entra el WAF

## Qué es un WAF

**WAF** = *Web Application Firewall*, cortafuegos de aplicación web. Un filtro que se coloca **delante** del sitio e inspecciona cada petición antes de que llegue a WordPress. Si detecta algo sospechoso, la rechaza.

**Qué filtra:**
- Patrones de ataque (inyección SQL, XSS)
- Fuerza bruta contra el login
- Ritmo excesivo de peticiones
- **User-agents que no parecen navegadores** ← el caso de PGT

**Dónde vive:** puede estar en un plugin (Wordfence), en el hosting, o en un CDN/proxy (Cloudflare, Sucuri).

## El error 406

**`406 Not Acceptable`** es un código de estado HTTP. Su significado estándar es: *"el servidor no puede producir una respuesta que coincida con lo que el cliente declaró aceptar en sus cabeceras `Accept`."*

**Pero en la práctica**, muchos WAF lo usan como respuesta genérica de rechazo. Traducción real: *"no me gusta tu petición y no te voy a explicar por qué."* Es preferido frente a un `403` porque es menos informativo para un atacante.

### Qué pasa exactamente con los sitios de PGT

```bash
# Con UA por defecto de curl → 406
curl -sI https://www.perugrandtravel.com/

# Con UA de navegador + cabecera Accept → 200
curl -sI -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36" \
     -H "Accept: text/html,application/xhtml+xml" https://www.perugrandtravel.com/
```

El WAF está configurado para rechazar peticiones que no parecen de un navegador real.

### "Screaming Frog con UA por defecto" — qué significa

**Screaming Frog SEO Spider** es la herramienta estándar de rastreo del sector. Simula ser un crawler: descarga todas las URLs de un sitio y extrae títulos, canónicas, encabezados, enlaces, códigos de estado.

Por defecto se identifica como `Screaming Frog SEO Spider`. Ese UA **no parece un navegador**, así que el WAF de PGT lo rechaza con 406.

**Lo que ve un auditor que no sabe esto:** abre Screaming Frog, mete el dominio, y obtiene **una sola URL con estado 406**. Conclusión errónea: "el sitio está caído" o "no se puede rastrear".

**La solución** (en Screaming Frog: `Configuration → User-Agent`): cambiar a **Chrome** o a **Googlebot**, y verificar que se envíen cabeceras `Accept` razonables.

### Por qué esto es tu mejor detalle de entrevista

Es un dato:
- **Verificable en 10 segundos** delante de quien sea
- Que **solo conoce quien de verdad rastreó su sitio**, no quien leyó su web
- Que demuestra **capacidad de diagnóstico**, no memorización de teoría

> *"Su firewall devuelve 406 a cualquier user-agent que no parezca un navegador. Cualquiera que intente auditarlos con Screaming Frog en configuración por defecto va a reportar que el sitio no responde. Yo tuve que cambiar el UA y añadir cabecera Accept para poder rastrearlos."*

**El matiz profesional que debes añadir:** el WAF está haciendo su trabajo, y bloquear bots es legítimo. Lo que hay que verificar es que **no esté afectando ocasionalmente a Googlebot** — eso se comprueba en Search Console (Estadísticas de rastreo, buscando picos de 4xx) — y documentar la excepción para que el equipo sepa cómo auditar en el futuro.

## El paisaje de bots en 2026 (contexto que suma)

Ya no son solo buscadores. Hay una capa entera de rastreadores de IA que la mayoría de los sitios no gestiona:

- **`GPTBot`** — OpenAI, entrenamiento
- **`ChatGPT-User`** — OpenAI, cuando un usuario pide leer una página concreta
- **`OAI-SearchBot`** — OpenAI, para su buscador
- **`ClaudeBot`** — Anthropic
- **`PerplexityBot`** — Perplexity
- **`Google-Extended`** — controla el uso para entrenar Gemini, **sin afectar** a Googlebot ni al posicionamiento

**El punto clave:** son user-agents distintos precisamente para que puedas decidir por separado. Bloquear el de entrenamiento no te saca de las respuestas; bloquear los de búsqueda sí. Confundirlos hace que un sitio se vuelva invisible en superficies de IA sin querer.

Y sobre `llms.txt`: <cite index="14-1">un estudio de SE Ranking sobre 300.000 dominios encontró una adopción del 10,13%, y el interés de los rastreadores es prácticamente nulo</cite>. <cite index="14-1">Google ha declarado explícitamente que no lo soporta ni planea hacerlo</cite>. **No es un mecanismo de control.** Si alguien te lo vende como táctica de visibilidad en IA, está desinformado.

---

# Ejercicios

1. Ejecuta la misma petición con UA de curl y con UA de navegador contra los tres dominios. Documenta los códigos.
2. Instala Screaming Frog, intenta rastrear `perugrandtravel.com` por defecto, observa el 406, cambia el UA a Chrome, vuelve a intentarlo.
3. Instala WordPress local con un tema de constructor. Cuenta cuántos CSS carga una página vacía.
4. Activa Yoast, mira el `@graph` que emite en el código fuente. Identifica cada `@id`.
5. Desactiva la caché de página en tu instalación local y mide el TTFB antes y después.
6. Escribe un snippet en `functions.php` del tema hijo que inyecte un comentario HTML en `wp_head`. Verifica que aparece. **Ese es el mecanismo exacto por el que entra tu hreflang.**
