# Playbook de aportes — 90 días en Peru Grand Travel

Inventario para ejecutar, no para impresionar. Cada ítem: problema, solución, esfuerzo, quién, métrica. Esfuerzo: **S** horas, **M** 1–3 días, **L** una semana o más.

Si te dan **20 minutos extra** en la reunión, salta a la última sección y léela. El resto es tu sistema operativo el día que entren.

**Quién.** **Tú** = SEO técnico. **Sis** = equipo de tecnología (3–4). **Mkt** = marketing (4–5). **Ops** = reservas / operaciones. Nada se sube a producción el viernes de temporada sin Sis.

**Lo que no prometes nunca:** posiciones, “en 30 días primeros”, rediseño, pelearte con quien armó Goodlayers, matar GetYourGuide, tráfico de blog EN antes del mes 4.

---

# Semana 1 — Accesos y línea base

No toques diseño. No instales 8 plugins. Si rompes el home el día 3, el remoto se muere y el sueldo también.

| # | Qué | Por qué | Esfuerzo | Quién | Métrica de “listo” |
|---|---|---|---|---|---|
| 1.1 | GSC de EN, ES, PT, IT: propiedad + verificación + usuario | Sin esto opinas | S | Tú + Admin | 4 propiedades visibles |
| 1.2 | Exportar 16 meses (o lo que haya) de Rendimiento: país, página, query | Línea base para el pacto de 90 días | S | Tú | CSV guardado, fecha en el informe |
| 1.3 | Informe de indexación + fragmentos de producto / datos estructurados | Errores de Offer y cobertura | S | Tú | Captura de errores actuales |
| 1.4 | GA4 (o lo que usen) + cómo marcan una reserva / lead de WhatsApp | Sin conversión, el dueño no ve SEO | M | Tú + Mkt | Evento de reserva o de clic a wa.me documentado |
| 1.5 | WP admin de las 4 instalaciones: rol que no sea admin total si se puede | Implementar sin borrar el sitio | S | Sis | Usuario tuyo |
| 1.6 | Hosting / CDN / plugin de caché: por qué EN manda `no-store` | El win de TTFB | M | Sis + Tú | Diagnóstico escrito: plugin off, cookie, servidor |
| 1.7 | Crawl con UA de navegador (`auditor_seo.py` o SF) de los 4 | WAF 406 si no | M | Tú | 4 reportes, fecha |
| 1.8 | Lista de quién aprueba un cambio de plantilla | Flujo real | S | Sis | Nombre y canal (WhatsApp interno / ticket) |
| 1.9 | Inventario de plugins SEO (Yoast) y de schema (Tourmaster) | Dónde se edita Offer | S | Tú + Sis | Captura de la plantilla |
| 1.10 | Informe de 1 página al admin: “qué hay, qué no, qué no toco aún” | Confianza | S | Tú | Enviado viernes semana 1 |

**Criterio de éxito de la semana 1:** el dueño puede ver un PDF de 1–2 páginas con números de GSC (aunque sean feos) y la frase “aún no cambiamos producción”. Eso es profesional.

---

# Días 8–30 — Quick wins (los 23, priorizados)

Orden: impacto ÷ esfuerzo, y lo que se ve en GSC. Detalle técnico en `D02`. Aquí, la cola de trabajo.

## P0 — Esta quincena

### P0.1 Moneda en `Offer` (EN, ES, IT)

- **Problema.** `price` sin `priceCurrency` → inelegible a rich result de producto.
- **Solución.** Una línea en la plantilla Tourmaster / Yoast graph: `"priceCurrency": "USD"` (o la moneda real de cotización de ese dominio). Verificar con Rich Results Test.
- **Esfuerzo.** S–M. **Quién.** Tú + Sis.
- **Métrica.** Error “falta priceCurrency” → 0 en GSC a 7–14 días. Muestreo de 5 URLs por dominio.

### P0.2 Objeto `Offer` en PT

- **Problema.** `Product` sin `offers` en el mercado principal.
- **Solución.** Homogeneizar plantilla con EN. El estándar del grupo es uno, no tres.
- **Esfuerzo.** M. **Quién.** Tú + Sis.
- **Métrica.** 5 fichas PT con Offer + moneda en el HTML. GSC PT, informe de producto.

### P0.3 Caché de página en EN

- **Problema.** `cache-control: no-store`. TTFB 1,04 s vs 0,10 s PT.
- **Solución.** Encender / alinear el plugin de caché o la regla de servidor. Cuidado con cookies de sesión y con “carrito”. Probar logged-out.
- **Esfuerzo.** M. **Quién.** Sis (tú mides antes/después).
- **Métrica.** Cabecera `public` o equivalente; TTFB de portada y de una ficha en el orden de ES/PT. No prometas Lighthouse 100.

### P0.4 Hreflang piloto

- **Problema.** 0 anotaciones en 4 dominios.
- **Solución.** Mapa ya existe. Snippet `hreflang-multidominio.php` + `hreflang-mapa.php`. Primero: homes + 10 tours que existan en los 4 idiomas (el PDF/landing ya tiene la tabla). Reciprocidad + autorreferencia + `x-default` (EN, salvo que ellos quieran otro).
- **Esfuerzo.** M–L. **Quién.** Tú implementa, Sis revisa y despliega en las 4.
- **Métrica.** `grep hreflang` > 0 en las 4 homes. GSC → mejoras internacionales (puede tardar semanas en poblar). No prometas ranking.

### P0.5 `Sitemap:` en robots EN y ES + arreglar Disallow rotos

- **Problema.** PT declara sitemap; EN/ES no. Disallow con URL absoluta; `//wp-includes/`; `*/page/*` que corta paginación.
- **Solución.** Correcciones de `correcciones-robots-txt.md`. No uses robots para desindexar.
- **Esfuerzo.** S. **Quién.** Tú + Sis.
- **Métrica.** robots.txt válido (tester de GSC). Paginación rastreable o `noindex` consciente, no Disallow.

## P1 — Antes del día 30

### P1.1 `TravelAgency` en vez de `Organization`

- **Solución.** Tipo correcto + `PostalAddress` + `ContactPoint` + `sameAs` (IG, TA, Facebook BR, YouTube). Valencia ya lo hace.
- **Esfuerzo.** S. **Quién.** Tú.
- **Métrica.** Prueba de schema.org / Rich Results. Panel de conocimiento no se promete.

### P1.2 Cadena de redirección apex

- **Problema.** http → https apex → www = 2 hops.
- **Solución.** Una regla de servidor.
- **Esfuerzo.** S. **Quién.** Sis.
- **Métrica.** `curl -sIL` un solo 301 al www canónico.

### P1.3 Canónica del par duplicado ES

- **Problema.** `/tour/bike-maras-moray-salineras/` vs `/tour/maras-moray-en-bicicleta/`.
- **Solución.** GSC: cuál rankea. 301 a la ganadora. Actualizar menú y sitemap.
- **Esfuerzo.** S–M. **Quién.** Tú + Sis + Mkt (enlaces internos).
- **Métrica.** Una URL 200, la otra 301. Query consolidada en 2–4 semanas (paciencia).

### P1.4 Preload / fetchpriority del LCP

- **Problema.** Hero tarde; lazy en LCP.
- **Solución.** `preload` as image + `fetchpriority=high` en plantilla de tour y home. Quitar lazy del LCP.
- **Esfuerzo.** M. **Quién.** Tú + Sis.
- **Métrica.** DevTools: LCP element con prioridad alta. Campo CrUX tarda; no lo uses de KPI semana 3.

### P1.5 Fonts: matar devanagari y pesos muertos

- **Problema.** Poppins 100–900 + italic + DM Sans + subset hindi.
- **Solución.** 3–4 pesos usados, `font-display: swap`, `preconnect`, o autoalojar.
- **Esfuerzo.** M. **Quién.** Sis + Tú (mides Cobertura).
- **Métrica.** Menos KB de fuentes. CLS no empeora.

### P1.6 Licencia Camino Inca en entidad y en fichas de trek

- **Problema.** Operador autorizado y no se declara.
- **Solución.** Página / bloque con número y enlace a lista oficial. `sameAs` o texto de autoridad. Internal link desde Classic / Short Inca Trail.
- **Esfuerzo.** M. **Quién.** Mkt redacta, Tú schema y enlazado, Ops valida el número.
- **Métrica.** URL indexable. No “posición 1 por Inca Trail”.

## P2 — Días 30–60 (hacer bien o no hacer)

### P2.1 Reseñas en schema **por tour**

- **Problema.** Cientos de reviews visibles, 0 `aggregateRating`.
- **Solución.** Agregar notas **de esa ficha** (GYG/TA/Google filtradas por producto, o sistema interno). Mostrarlas en la página. Marcar. **Prohibido** pegar 4.9 de la empresa en 69 tours.
- **Esfuerzo.** L. **Quién.** Tú + Mkt + Sis.
- **Métrica.** Estrellas en SERP en un subconjunto (GSC mejoras). Cero acción manual.

### P2.2 Hreflang del catálogo completo

- **Solución.** Los 31 grupos de 4 idiomas + pares de 2–3. Gaps: no inventar equivalencias. IT sin ficha → no hreflang a 404.
- **Esfuerzo.** L. **Quién.** Tú.
- **Métrica.** Auditor: 0 bloques no recíprocos. GSC internacional sin errores graves.

### P2.3 Homogeneizar `admin-ajax.php` Allow y WAF

- **Problema.** ES permite ajax, EN no. WAF 406 a crawlers.
- **Solución.** Misma política de robots. Documentar UA permitidos. Excepción para Googlebot (verificar en GSC rastreo).
- **Esfuerzo.** M. **Quién.** Sis + Tú.
- **Métrica.** SF con UA default documentado; Googlebot 200 en muestra.

### P2.4 `priceValidUntil` real y `availability` https

- **Esfuerzo.** S–M. **Quién.** Tú + Ops (vigencia de tarifas).
- **Métrica.** No un solo 2027-01-01 en todo el catálogo.

### P2.5 Alt en imágenes de plantilla de tour

- **Esfuerzo.** M (plantilla + lote de destacadas). **Quién.** Mkt + Tú.
- **Métrica.** Muestra de 20 fichas con alt descriptivo, no “IMG_4032”.

---

# Días 30–90 — Contenido y catálogo (donde está el dinero lento)

## Inventario, no “hagan posts”

| Ítem | Problema | Solución | Esfuerzo | Quién | Métrica |
|---|---|---|---|---|---|
| 3.1 | 19 productos ausentes en PT, lujo solo EN | Publicar fichas que **ya se operan**. Traducción real, precio en BRL si cotizan así | L | Mkt + Ops + Tú (slug, canonical, hreflang al nacer) | 19 URLs 200 en PT, en sitemap, con Offer |
| 3.2 | IT: 33 tours vs 69 EN, 2 posts | Priorizar los 10 tours que más margen / más búsqueda IT. No traducir los 40 de golpe | L | Mkt + Tú | 10 fichas IT nuevas o las que Ops confirme que sí se venden a italianos |
| 3.3 | EN: 0 posts, 0 taxonomía de blog | Arquitectura primero: categoría, pilar, plantilla. Luego plan 09: 5 pilares. Ritmo 2 artículos/semana **máximo** sostenible | L | Mkt escribe, Tú IA (información architecture), Ops/guías 20 min de entrevista | 1 pilar + 3 satélites al día 90. **No** tráfico como KPI aún |
| 3.4 | Traducir ES→EN | Prohibido como estrategia. Intención distinta (visado BR vs altitud USA) | — | Mkt | Checklist editorial |
| 3.5 | Selector bandera = home→home | Cuando exista equivalencia, la bandera debe ir a la ficha hermana, no al home | M–L | Sis + Tú | 10 tours estrella, bandera contextual |
| 3.6 | Blog ES/PT canibalizando fichas | GSC: queries donde un post le gana a un tour. Ajustar canónica o intención | M | Tú + Mkt | Lista de 10 caníbales, 5 resueltos |

Honestidad que dices el día 1 y el día 90: **contenido nuevo en un dominio sin historial de blog no es aguja antes del mes 4.** El KPI a 90 días del EN es *arquitectura + N URLs indexadas*, no *+40% tráfico*.

---

# OTAs y ventas (sin declarar la guerra)

| Ítem | Qué | Quién | Métrica |
|---|---|---|---|
| 4.1 | Mix real: % web / WhatsApp / GYG / otros | Admin + Ops + Tú | Una tabla, aunque sea a ojo calibrado con 30 días de GA4 |
| 4.2 | Paridad ficha GYG vs WordPress (incluye, idioma guía, fotos, punto de encuentro) | Mkt + Tú | 10 productos top: checklist 100% |
| 4.3 | No copiar descripciones de Viator/GYG como único contenido de la web | Mkt | Original + dato de guía |
| 4.4 | UTM o `source` en el clic a WhatsApp desde cada dominio | Tú + Mkt | Informe: leads wa por idioma de sitio |
| 4.5 | El SEO alimenta al equipo de ventas que están contratando: más conversaciones en idioma correcto | Tú en el informe al dueño | “BR en ficha PT”, no “sesiones +12%” |

Nunca: “salgamos de GetYourGuide este trimestre”.

---

# Rendimiento de constructor (después de P0, no antes)

Tema Goodlayers + Tourmaster: 23–31 CSS, 35–72 JS.

1. Cobertura de DevTools en home y en ficha. Medir.
2. Diferir JS no crítico. CSS no usado: por etapas, staging, un idioma primero (PT ya cachea: no empieces por PT en hora pico).
3. No “eliminar 20 plugins” en un viernes.

**Métrica.** INP/LCP de campo (CrUX en GSC) a 28 días, plantilla home y plantilla tour. Laboratorio solo para diagnosticar.

---

# Semana a semana (vista calendario)

| Semana | Foco | Entregable al admin |
|---|---|---|
| 1 | Accesos, línea base, no producción | PDF 1 página |
| 2 | Offer/moneda + robots + diagnóstico caché EN | URLs de prueba |
| 3 | Caché EN arriba + hreflang piloto | grep + TTFB |
| 4 | TravelAgency, redirect apex, duplicado ES | Informe 30 días vs línea base |
| 5–6 | Hreflang catálogo + bandera contextual en 10 tours | Auditor recíproco |
| 7–8 | Reseñas por tour (piloto 5 fichas) + fonts/LCP | Rich result en muestra |
| 9–10 | Gaps PT (prioridad lujo / lo que Ops pueda operar) | N fichas nuevas |
| 11–12 | Pilar EN + 3 satélites; GSC internacional; pacto 90 días | Documento de revisión salarial |

El informe semanal: **qué medí, qué subió a producción, qué sigue, qué bloquea Sis/Mkt.** Máximo una página. Sin “sinergias”.

---

# Si me dan 20 minutos extra — los 90 días en voz alta

Memoriza esto. Es el cierre comercial-técnico.

> Semana 1 no toco el diseño. Pido Search Console y Analytics de los cuatro sitios, dejo línea base, y miro con sistemas por qué el inglés manda cache-control no-store mientras el portugués responde en 0,10 segundos.
>
> Después, tres cosas que se ven: la moneda en el precio para que Google pueda pintarlo —en portugués hoy ni siquiera hay Offer—; un piloto de hreflang en las portadas y en diez tours que ya existen en los cuatro idiomas; y la entidad de agencia, que Valencia Travel ya emite y ustedes no.
>
> A noventa días, si sistemas fluye, el mapa hreflang está en el catálogo recíproco, los errores de producto en Search Console están en cero, y el inglés tiene arquitectura de blog —no tráfico aún, eso sería mentirles— y Brasil tiene publicados productos que ya operan y hoy no se pueden comprar en portugués.
>
> GetYourGuide se queda. Lo que cambia es que la web deje de ser más pobre que el marketplace, y que un brasileño no aterrice en español. El SEO aquí no es un reporte de posiciones. Es margen y el idioma correcto.
>
> El éxito lo definirían ustedes; yo lo traduciría a esas métricas para que a los noventa días no discutamos opiniones.

Calla.

---

# Ideas que no son el trimestre 1 (para que no te las compren ni las prometas)

- Nuevo tema / headless / migrar a Next.js.
- Quinto dominio en francés o coreano.
- Campaña de link building masivo.
- “Salir primeros en Machu Picchu tour”.
- App.
- Chatbot que reserve.
- Traducir 105 posts PT → EN.
- Pegar AggregateRating de la empresa en todas las fichas.
- Medir éxito con Lighthouse de un solo run.

Esas ideas, si el dueño las suelta, se aparcan con respeto:

> Eso puede ser año 2. Si lo hacemos ahora, no terminamos el hreflang. Prefiero que a los noventa días tengamos lo medible arriba.

---

# Cómo se usa esto en la sala vs en el puesto

- **Hoy:** máximo el bloque de 20 minutos. Quizá P0.1–P0.4 en una frase cada uno.
- **Día 1:** semana 1 como contrato moral.
- **Día 30 / 90:** esta tabla es el examen del archivo 13 (sueldo y, más tarde, remoto). Si no está por escrito, no existe.

Cuando algo falle (Sis no da acceso, Mkt no traduce PT, Ops no confirma si el lujo se vende a Brasil): el informe lo dice. No cubras. El pacto de 4.500 a 90 días **no se cumple** si te bloquearon: se renegocia la fecha, no se finge el hreflang.
