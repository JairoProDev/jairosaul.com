# T04 — Rendimiento y Core Web Vitals

Este bloque es donde tu perfil de desarrollador vale más que el de cualquier analista SEO. Es también donde más gente repite consejos de 2018 sin saber que las métricas cambiaron.

---

## 1. Por qué existen los Core Web Vitals

Google necesitaba medir "experiencia de página" de forma **objetiva, comparable entre sitios y medible en usuarios reales**. Las métricas antiguas (tiempo de carga, `DOMContentLoaded`, `onload`) no servían: no reflejan lo que el usuario percibe. Una página puede disparar `onload` en 1 s y estar visualmente vacía; otra puede tardar 4 s y sentirse instantánea.

De ahí el enfoque: **medir la percepción**, no el evento técnico.

- ¿Cuándo veo el contenido principal? → **LCP**
- ¿Responde cuando toco? → **INP**
- ¿Se me mueve la página bajo el dedo? → **CLS**

**Historia:** anunciadas en mayo de 2020, factor de ranking desde junio de 2021 (móvil) y febrero de 2022 (escritorio). **FID fue reemplazado por INP el 12 de marzo de 2024.** Si alguien te habla de FID hoy, está desactualizado dos años.

**Magnitud real como factor de ranking:** pequeña. Google lo llama *desempate*: entre contenidos de calidad comparable, el mejor experimentado gana. **El argumento fuerte no es el ranking, es la conversión.** Y eso es lo que debes decir en una entrevista: no vendas CWV como truco de posicionamiento, véndelo como dinero.

---

## 2. Campo vs laboratorio — la distinción que separa niveles

| | **Campo** (field / RUM) | **Laboratorio** (lab / synthetic) |
|---|---|---|
| Qué es | Usuarios reales, sus dispositivos, sus redes | Un entorno controlado, un dispositivo simulado |
| Fuente | **CrUX** (Chrome User Experience Report), tu propio RUM | Lighthouse, PageSpeed Insights (sección lab), WebPageTest, DevTools |
| Ventaja | Es la verdad. Es lo que Google usa | Reproducible, diagnóstico, permite depurar |
| Límite | No dice **por qué**; latencia de 28 días; requiere tráfico suficiente | No dice **si de verdad pasa** |
| Qué métricas | LCP, INP, CLS reales | LCP, TBT, CLS simulados, más auditorías |

**Puntos que debes tener grabados:**

1. **CrUX evalúa el percentil 75.** No la media. Significa: el 75% de tus visitas deben cumplir el umbral. Una media buena con una cola larga de usuarios lentos **falla**.
2. **La ventana es de 28 días móviles.** Un arreglo de hoy no se refleja hasta dentro de semanas. Anticípalo cuando reportes.
3. **INP no existe en laboratorio** — requiere interacción real. El sustituto de laboratorio es **TBT** (Total Blocking Time), que correlaciona pero no es lo mismo.
4. **Se evalúa por URL**, y cuando no hay datos suficientes, se agrupa por origen (todo el dominio). Sitios pequeños suelen ver solo datos de origen.
5. **Lighthouse 100 con CWV en rojo es perfectamente posible y frecuente.**

---

## 3. LCP — Largest Contentful Paint

### Qué mide
El tiempo hasta que se pinta el **elemento de contenido más grande visible en el viewport inicial**. Candidatos: `<img>`, imagen de fondo CSS, `<video>` con póster, o un bloque de texto.

### Umbrales
- **Bueno: ≤ 2,5 s** · Mejorable: 2,5–4 s · Malo: > 4 s

### Las cuatro subpartes (el modelo mental que hay que usar)

Descomponer LCP es lo que convierte "está lento" en un plan de trabajo:

| Subparte | Qué es | Objetivo | Cómo se arregla |
|---|---|---|---|
| **TTFB** | Hasta el primer byte | ≤ 40% del LCP | Caché de página, CDN, backend, base de datos, redirecciones |
| **Retraso de carga del recurso** | Desde TTFB hasta que empieza a descargarse el recurso LCP | ≤ 10% | `preload`, `fetchpriority="high"`, sacarlo de `lazy`, que esté en el HTML inicial y no lo inyecte JS |
| **Duración de la carga** | Descarga del recurso | ≤ 40% | Formato (AVIF/WebP), compresión, tamaño responsivo, CDN de imágenes |
| **Retraso de renderizado** | Desde que está descargado hasta que se pinta | ≤ 10% | CSS y fuentes bloqueantes, hidratación, JS que bloquea |

*Caso PGT: TTFB de 1,04 s en el dominio EN contra 0,10 s en el PT, con cabecera `cache-control: no-store`. Solo con eso, el LCP en inglés arranca con casi un segundo de desventaja antes de descargar nada. Es la corrección de mejor retorno del sitio.*

### Errores clásicos
- **La imagen hero con `loading="lazy"`.** El error más común y más caro. El LCP nunca debe ser lazy.
- Imagen LCP como fondo CSS → se descubre tarde (hay que parsear el CSS). Usar `<img>`.
- Imagen inyectada por JS o por un carrusel → descubrimiento tardío.
- Fuente web que bloquea el texto → si el LCP es texto, el LCP espera a la fuente.
- Carruseles: el LCP es el primer slide; no precargues los cinco.

### Herramientas
DevTools → Rendimiento → marcador LCP. PageSpeed Insights señala el elemento. `web-vitals` (librería JS oficial) para medirlo en tus usuarios reales.

---

## 4. INP — Interaction to Next Paint

### Qué mide
De **todas** las interacciones del usuario en la visita (clic, toque, tecla — **no** scroll ni hover), el tiempo desde la interacción hasta el siguiente pintado. Se reporta aproximadamente la peor, con ajuste en páginas con muchas interacciones.

### Umbrales
- **Bueno: ≤ 200 ms** · Mejorable: 200–500 ms · Malo: > 500 ms

### Las tres fases
1. **Retraso de entrada** (*input delay*): el hilo principal está ocupado y no atiende. Causa: tareas largas de JS.
2. **Tiempo de procesamiento**: ejecución de tus manejadores de eventos.
3. **Retraso de presentación**: recálculo de estilo, layout y pintado.

### Por qué INP es más duro que FID
FID medía solo la **primera** interacción y solo el **retraso**, no el procesamiento. Era una métrica indulgente: casi todos la aprobaban. INP mide todo el ciclo y todas las interacciones. **Muchos sitios que aprobaban FID suspenden INP.**

### Cómo se arregla
- **Romper tareas largas** (>50 ms): `yield` al hilo principal con `scheduler.yield()` o `setTimeout(0)`.
- `requestIdleCallback` para trabajo no urgente.
- **Actualizar la UI antes que el estado**: dar respuesta visual inmediata (spinner, estado activo) y luego procesar.
- Reducir trabajo en el hilo principal: menos JS, menos scripts de terceros.
- Cuidado con la hidratación de frameworks: es una fuente clásica de INP malo. Islas / hidratación parcial / componentes de servidor son respuestas a este problema.
- Evitar `document.write`, listeners no pasivos, layouts forzados síncronos (leer `offsetHeight` justo después de escribir estilos).
- Auditar etiquetas de terceros: chats, píxeles, pruebas A/B, mapas de calor. Suelen ser la causa principal.

---

## 5. CLS — Cumulative Layout Shift

### Qué mide
Suma de los desplazamientos visuales inesperados. Puntuación sin unidad: *fracción de impacto × fracción de distancia*, agregada por **ventanas de sesión** (grupos de cambios en ≤5 s, con máximo de 5 s por ventana; se reporta la peor ventana).

### Umbrales
- **Bueno: ≤ 0,1** · Mejorable: 0,1–0,25 · Malo: > 0,25

### Causas y soluciones

| Causa | Solución |
|---|---|
| Imágenes sin `width`/`height` | Atributos explícitos, o `aspect-ratio` en CSS |
| Anuncios / iframes | Reservar el espacio con contenedor de tamaño fijo |
| Fuentes web (FOIT/FOUT) | `font-display: optional` o `swap` + `size-adjust` para casar métricas con la fuente de respaldo |
| Contenido inyectado (banners de cookies, avisos) | Reservar espacio o superponer sin empujar |
| Animaciones de `top`/`left`/`height` | Animar `transform` y `opacity` (no provocan layout) |
| Carga diferida que empuja | Placeholder del tamaño final |

**Matiz importante:** los cambios ocurridos **dentro de 500 ms tras una interacción del usuario** no cuentan. Abrir un acordeón no penaliza.

---

## 6. Métricas de apoyo que debes conocer

| Métrica | Qué es | Para qué sirve |
|---|---|---|
| **TTFB** | Primer byte | Diagnóstico de servidor; entrada de LCP. Objetivo: <0,8 s |
| **FCP** | Primer contenido pintado | Percepción de que "algo pasa" |
| **TBT** | Suma de bloqueo del hilo principal | Sustituto de laboratorio para INP |
| **TTI** | Interactivo | En desuso, poco fiable |
| **Speed Index** | Velocidad de llenado visual | Complementario |
| **Soft navigations** | Cambios de vista en SPA | Métrica emergente para medir CWV en aplicaciones de página única |

---

## 7. Manual de optimización, por orden de retorno

### Nivel 1 — Servidor y entrega (mayor impacto, menor riesgo)
1. **Caché de página.** Que HTML dinámico se sirva desde caché. *(Justo lo que falta en el dominio EN de PGT.)*
2. **CDN** con nodos cerca del mercado real. Para Brasil, nodos en São Paulo.
3. **Compresión**: Brotli sobre gzip.
4. **HTTP/2 o HTTP/3**: multiplexación; elimina la necesidad de trucos como los sprites.
5. **Eliminar cadenas de redirección**: cada salto es un viaje completo.
6. **Caché del navegador** con `cache-control` correcto y activos versionados.

### Nivel 2 — Recursos críticos
7. **Fuentes**: subset al alfabeto que usas, solo los pesos reales, `font-display: swap`, `preconnect`, o autoalojar. *(PGT carga 18 variantes de Poppins más el subset devanagari. Es peso puro no usado.)*
8. **CSS crítico en línea**, el resto diferido.
9. **JS**: `defer` por defecto, `async` solo para lo independiente, dividir por rutas.
10. **`preload` + `fetchpriority="high"`** en la imagen LCP; `preconnect` a orígenes de terceros críticos.

### Nivel 3 — Imágenes
11. Formatos modernos: **AVIF > WebP > JPEG**.
12. `srcset` + `sizes` para servir el tamaño real necesario.
13. `loading="lazy"` en **todo menos** lo que está sobre el pliegue.
14. Dimensiones explícitas siempre (previene CLS).
15. `decoding="async"`.

### Nivel 4 — Terceros
16. Auditar cada script de terceros: ¿cuánto cuesta, cuánto aporta?
17. Cargar chats y widgets **bajo demanda** (al primer scroll o clic), no al inicio.
18. Facades para vídeos incrustados (imagen que carga el iframe al hacer clic).
19. Consolidar en un gestor de etiquetas y auditarlo trimestralmente.

### Nivel 5 — Arquitectura (mayor esfuerzo)
20. SSR o SSG en vez de renderizado en cliente.
21. Hidratación parcial / islas.
22. Menos framework donde no hace falta.

---

## 8. Metodología profesional de trabajo

1. **Medir campo primero** (CrUX/GSC). Si el campo está en verde, no toques nada aunque Lighthouse dé 60.
2. **Identificar la plantilla, no la URL.** Los problemas son de plantilla: portada, ficha de tour, artículo. Arregla la plantilla y arreglas cientos de URLs.
3. **Segmentar por dispositivo.** Móvil y escritorio son mundos distintos; el problema casi siempre es móvil.
4. **Un cambio cada vez, con medición aislada.** Es la única forma de saber qué funcionó y de defender el trabajo.
5. **Esperar la ventana de 28 días** antes de declarar victoria.
6. **Documentar antes/después.** Es tu estudio de caso y tu argumento de aumento.

---

## 9. Laboratorio

1. Instala la librería `web-vitals` en un sitio propio y envía las métricas a tu propio endpoint. Ahora tienes RUM.
2. Toma tu peor plantilla. Descompón el LCP en las cuatro subpartes con DevTools. Escribe qué porcentaje es cada una.
3. Pon `loading="lazy"` en tu imagen hero, mide, quítalo, mide. Documenta la diferencia.
4. Carga una fuente completa con todos los pesos, mide; redúcela a dos pesos con subset, mide.
5. Añade un script de terceros pesado y mide el TBT antes y después.
6. Provoca CLS quitando `width`/`height` de las imágenes y obsérvalo en DevTools (capa de cambios de diseño).

## 10. Autoevaluación

- ¿Por qué Lighthouse 95 puede convivir con CWV en rojo?
- ¿Qué percentil usa CrUX y por qué importa?
- Las cuatro subpartes del LCP y qué arregla cada una.
- ¿Por qué INP es más exigente que FID?
- ¿Cómo se calcula CLS y qué cambios están exentos?
- Tienes TTFB de 1,2 s: enumera cinco causas posibles en orden de probabilidad.
- ¿Por qué el argumento de CWV en una reunión de negocio no debe ser el ranking?
