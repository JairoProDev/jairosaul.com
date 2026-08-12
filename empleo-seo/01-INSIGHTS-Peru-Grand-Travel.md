# INSIGHTS — Peru Grand Travel (dossier de inteligencia)
*Investigación realizada el 09/08/2026. Todo lo aquí listado es verificable públicamente.*

---

## 1. Identidad corporativa

| Dato | Valor |
|---|---|
| Razón social | **PERU GRAND TRAVEL GROUP S.A.C.** |
| RUC | **20603059302** |
| Inicio de actividades | Abril 2018 (~8 años) |
| Sede | Distrito de Cusco, Cusco |
| Fundador / cabeza visible | **Clever Ponce** |
| Actividad CIIU registrada | Agencias de viajes y guías turísticos + Otros tipos transporte reg. vía terrestre + Actividades inmobiliarias |
| RNP | Empadronada en el Registro Nacional de Proveedores (puede contratar con el Estado) |
| Camino Inca | Aparece en la lista oficial de **operadores autorizados del Camino Inca 2025-2026** (posición 168) |
| Estimación externa de tamaño | RocketReach reporta ~6 empleados / ~$5M revenue (dato de agregador, tómalo como referencia gruesa, no como verdad) |
| OTAs | Proveedor verificado en **GetYourGuide** (`peru-grand-travel-group-sac-s333635`) |

**Lectura estratégica:** No es una agencia de mochilero. Es una S.A.C. formal, con habilitación de Camino Inca (barrera de entrada real y cara), presencia en OTAs y ~8 años de operación. Tienen dinero y están institucionalizándose.

---

## 2. El activo digital: NO es un sitio, es una RED de dominios

Esto es lo que casi ningún otro postulante va a descubrir. Operan **una red multidominio segmentada por idioma/mercado**:

| Dominio | Idioma / mercado | Rol |
|---|---|---|
| `perugrandtravel.com` | Inglés — mercado USA/Europa | Marca madre, ticket más alto |
| `viajesmachupicchutours.com` | Español — LATAM/España | Mercado hispano |
| `machupicchupacotes.com` | Portugués — **Brasil** | Su mercado más caliente |
| `paquetesdeviajesperu.com` | Español (legacy) | **Ya migrado** — 301 hacia el dominio ES |

**Inventario de URLs medido en sus sitemaps (09/08/2026):**

| Dominio | Posts (blog) | Pages | Tours | Categorías | Total aprox. |
|---|---|---|---|---|---|
| perugrandtravel.com (EN) | **0** | 62 | 69 | 6 | **137** |
| viajesmachupicchutours.com (ES) | 101 | 37 | 61 | 7 | **206** |
| machupicchupacotes.com (PT) | 105 | 59 | 54 | 7 | **225** |

> **Insight de oro #1:** el sitio en inglés — el mercado de mayor ticket promedio del mundo para Machu Picchu — tiene **cero contenido de blog**. Los sitios ES y PT tienen 100+ artículos cada uno. Hay un agujero de captación TOFU completo en el mercado más rentable.

---

## 3. Stack técnico detectado

- **WordPress** + tema `traveltour` (Goodlayers) + `traveltour-child`
- Plugins visibles: `tourmaster` (motor de tours/reservas), `goodlayers-core`, `quadmenu`, `contact-form-7` + `country-phone-field-cf7`, `click-to-chat-for-whatsapp`, `pixelyoursite` (tracking Meta/GA)
- SEO plugin: **Yoast** (confirmado por el bloque de robots.txt en el dominio PT y el schema graph)
- Fuentes: Google Fonts cargando **Poppins completo (100–900 + itálicas) + DM Sans** con subset `devanagari` incluido
- Hosting: respuesta HTTP/2, con WAF que devuelve **406 Not Acceptable** a User-Agents no-navegador

> **Insight de oro #2:** ese 406 significa que **Screaming Frog con UA por defecto es bloqueado**. Cualquier "experto SEO" que intente auditarlos con configuración default va a reportar "sitio caído". Tú ya sabes que hay que mandar UA de navegador + header `Accept`. Ese detalle solo lo sabe alguien que realmente rastreó el sitio.

---

## 4. Modelo comercial y canales

- **Venta por WhatsApp** (plugin click-to-chat instalado). Agentes mencionados en reseñas: **Clever**, **Ubaldina**.
- **Guías estrella nombrados repetidamente en reseñas:** Walter Díaz, Will, Silvia. Operan grupos separados por idioma en el mismo bus (guía EN + guía ES).
- **Facebook: `/perugrandtravel.br`** → la página principal es la brasileña. Confirma que Brasil es el mercado #1.
- Redes en schema `sameAs`: Facebook, Instagram (`@perugrandtravel`), TikTok, YouTube.
- Reseñas fuertes en **Tripadvisor** y **Google**, con respuestas escritas en portugués por el equipo (community management activo).
- Presencia en GetYourGuide → dependen parcialmente de OTAs que se llevan 20-30% de comisión.

> **Insight de oro #3:** cada reserva que ganan por SEO orgánico en vez de GetYourGuide les ahorra la comisión completa de la OTA. Ese es el argumento de ROI que debes usar en la entrevista: *"el SEO técnico aquí no es tráfico, es margen recuperado de las OTAs"*.

---

## 5. Están en modo expansión agresiva (esto es tu ventana)

En Computrabajo tienen **múltiples vacantes abiertas simultáneamente** en los últimos días, con bandas salariales muy distintas:

- S/ 1.120 – 1.130 + comisiones (ventas)
- S/ 2.000
- S/ 2.500
- S/ 3.000 (dos avisos distintos)
- **S/ 3.500 → tu puesto (el tope de banda que publican)**

**Traducción:** están armando un equipo completo de golpe, con urgencia, y el rol de SEO técnico es **el mejor pagado que publican**. Eso significa que lo consideran estratégico y que la persona que lo ocupe va a tener visibilidad directa con el fundador. También significa que RRHH está saturada revisando cientos de CVs — razón #1 por la que Computrabajo no te va a responder.

---

## 6. Misión, visión y valores (útil para calcar su lenguaje)

Su web declara textualmente:
- **Visión:** ser la agencia peruana referente, transformar vidas, preservar comunidades locales, turismo sostenible, **"consolidar el posicionamiento de Perú Grand Travel en los mercados clave"**.
- **Valores:** Honestidad, Gratitud, Lealtad, Solidaridad, **Compromiso con los resultados** ("dedicación, disciplina e innovación... crecimiento sostenible").

> **Cómo usarlo:** la frase *"consolidar el posicionamiento en los mercados clave"* es literalmente el objetivo de negocio de tu puesto. Cítala en tu mensaje de contacto. Y "compromiso con los resultados" te da permiso explícito para hablar de métricas y no de tareas.

---

## 7. Por qué piden inglés y portugués (y por qué eso ya no te descalifica)

No lo piden para conversar. Lo piden porque **tienen que auditar y optimizar contenido en tres idiomas**. Un analista SEO técnico que no puede leer un título en portugués no puede revisar 225 URLs del sitio brasileño.

Lo que necesitas realmente:
- **Inglés:** obligatorio de verdad (documentación de Google, Ahrefs, Search Console, y el sitio EN). Si ya lo lees, estás bien.
- **Portugués lector:** es alcanzable en días, no en años, viniendo del español. No necesitas hablarlo fluido para hacer SEO técnico — necesitas **leerlo y detectar errores**. Tu ventaja: puedes demostrarlo entregando una auditoría del sitio PT con hallazgos reales en portugués.

**Marco honesto:** vas a decirles que tu portugués es de lectura técnica, no conversacional, y que estás en proceso activo. No mientas. Compensa mostrando el trabajo hecho sobre el sitio PT.

---

## 8. Los filtros duros vs. blandos del aviso

| Requisito | Tipo | Cómo se rompe |
|---|---|---|
| 3 años exp. en SEO técnico | **Blando** | Portafolio con auditoría real de SU sitio > 3 años de "gestioné el GSC". La experiencia se demuestra, no se declara. |
| Educación mínima: Técnico | **Blando** | Solo filtra el ATS de Computrabajo. En contacto directo nadie lo pregunta si ya viste el hallazgo #1 de su sitio. |
| Inglés + Portugués | **Semi-duro** | Inglés real + portugués lector demostrado con entregable. |
| Edad 25-50 | **Duro solo en el filtro automático** | Es un campo del formulario de Computrabajo, no una política escrita. Es exactamente por eso que **no puedes entrar por Computrabajo**. En contacto directo con el fundador, el criterio es "¿resuelve mi problema?". |
| Presencial en Cusco | **Duro** | Tú estás en Cusco. Ventaja tuya sobre cualquier postulante remoto. |

**Conclusión operativa: el canal Computrabajo está muerto para ti. Tu única vía viable es el contacto directo lateral, entrando por valor entregado antes de pedir nada.** Ver documento 05.

---

## 9. Contactos y superficies de entrada (verificados)

- Formulario de contacto en los tres dominios (Contact Form 7)
- **WhatsApp** — botón click-to-chat en todos los sitios (es su canal comercial real, respuestas rápidas)
- Instagram `@perugrandtravel` (DM)
- Facebook `/perugrandtravel.br`
- LinkedIn: buscar **Clever Ponce** + "Peru Grand Travel"
- Presencial: sede en el distrito de Cusco (tú vives ahí — la visita física es una carta que casi nadie juega)

---

## 10. Riesgos y cosas que NO debes hacer

1. **No los ataques.** Un correo que diga "tu sitio está roto" ofende. El marco correcto es *"encontré 3 oportunidades que valen X reservas al mes"*.
2. **No publiques la auditoría** en tu blog, LinkedIn ni portafolio público antes de que ellos la vean. Un análisis de vulnerabilidades de su negocio expuesto públicamente te quema.
3. **No prometas posiciones.** Promete diagnóstico, implementación y medición. Nadie serio garantiza un #1.
4. **No hables mal de quien hizo el sitio.** Puede ser un familiar del dueño, o el propio fundador.
5. **No inventes experiencia.** Es Cusco: el sector turismo es un pueblo chico y todos se conocen. Una mentira te cierra el mercado entero.
