# Briefing — reunión de hoy con administrador y dueño

Lee esto en el celular, en el taxi. No lleves la carpeta entera. Lleva: teléfono con `https://jairosaul.com/peru-grand-travel` abierta, una copia impresa de la auditoría si la tienes, y silencio.

**Quiénes:** administrador (el de anoche) + dueño (Clever Ponce, o quien él traiga).
**Dónde:** oficinas internas, no mostrador. Hay 10–12 personas trabajando. Marketing ~4–5. Tecnología ~3–4. El de contabilidad te lo confirmó.
**Duración real:** no la controlas. Prepárate para 15 minutos y para 45.

---

## Lo que anoche ya te dijo el terreno

1. **La auditoría nunca llegó al que decide.** Paloma (atención al cliente) archivó un CV. El admin no encontraba el correo. WhatsApp respondió plantilla y se cortó. Tú no fallaste el canal: el canal interno falló. No lo reclames. Úsalo: *hoy es la primera vez que esto llega a quien corresponde.*
2. **Te pidieron volver.** Eso ya no es un postulante frío. Es una reunión que ellos agendaron. Entras como invitado, no como vendedor.
3. **Hay equipo de tecnología.** Tres o cuatro personas. Si suenas a “vengo a corregir lo que hicieron”, pierdes la sala y te cierran por dentro aunque el dueño sonría. El encuadre es complemento, no relevo.
4. **Hay equipo de marketing.** Cuatro o cinco. Tu trabajo los alimenta (tráfico cualificado → WhatsApp → cierre). Dilo así cuando toque. No digas que el marketing “no está haciendo SEO”.
5. **Fue rápido anoche porque eran más de las 6.** Hoy tienes de verdad. No gastes los primeros minutos en disculparte por el horario de ayer.

**No menciones** que preguntaste a alguien de contabilidad por el tamaño del equipo. Esa intel es tuya. Si sale el tema, habla en genérico: *“vi que hay un equipo real, no una agencia de dos personas”*.

---

## Antes de entrar (2 minutos en la calle)

- Silencio el teléfono. Modo avión, luego wifi de ellos si hace falta mostrar la landing.
- Agua. No café tembloroso.
- Una frase de apertura memorizada. El resto se lee, no se recita.
- Si te hacen esperar: no mires el teléfono de trabajo de otros. Relee el bloque de 5 minutos de este archivo.

**Hoy no se habla de:** remoto, “¿por qué no vieron mi correo?”, edad, RocketReach, sueldo (salvo que *ellos* lo saquen), portugués hablado, IA, Claude, “entregable”, “insights”, “quick wins”.

**Hoy sí se habla de:** tres hallazgos, cuatro dominios, margen frente a OTAs, quién implementa, accesos, qué se ve como éxito a 90 días.

---

## Apertura — 3 minutos

Siéntate. No des la mano demasiado fuerte. Mira a los dos.

> Buenos días, gracias por el tiempo. Anoche pude dejarles el contexto corto: postulé por Computrabajo, les escribí por varios canales y preparé una revisión técnica de los cuatro sitios. Hoy quiero mostrarles tres cosas concretas, en sus páginas, no en un informe. Y después escuchar cómo lo ven ustedes.

Pausa. Si preguntan “¿y el CV?”, una frase:

> El CV está. Lo útil es esto: https://jairosaul.com/peru-grand-travel

Abre la landing. No abras el PDF a pantalla completa. El PDF es backup si no hay señal.

**No culpes a Paloma.** Si el admin dice “no me llegó”:

> Pasa. El canal de atención recibe mucho. Por eso preferí venir.

Y sigues.

---

## Los 5 minutos — tres hallazgos, no veintitrés

Estructura idéntica al guion del video. Si te cortan a los tres minutos, el hallazgo 1 ya valió la reunión.

### 0:00–0:20 · Quién eres, en una frase

> Soy Jairo, desarrollador web en Cusco. Reviso la parte técnica de sitios —rastreo, indexación, datos estructurados, internacionalización— y también implemento. No vengo a pedir el puesto. Vengo a mostrar lo que encontré.

### 0:20–2:00 · Hallazgo 1: hreflang (el que duele)

Señala las banderas BR / ES / IT en el header de perugrandtravel.com.

> Tres banderas. Italia abre otro WordPress: viaggiomachupicchu.it. En total son cuatro instalaciones vivas más un dominio viejo que ya redirige bien, página a página —eso está bien hecho.

> Ninguno de los cuatro declara hreflang. Cero. Sin esa etiqueta, Google no sabe que Machu Picchu Full Day en inglés, español, portugués e italiano es el mismo producto. Los trata como páginas que compiten. Un brasileño puede terminar en la versión en español. Un italiano, también.

> Crucé los catálogos. 74 productos. Solo 31 existen en los cuatro idiomas. Al italiano le faltan unos 40 que sí venden en otro lado. A Brasil le faltan 19, incluidos paquetes de lujo que solo están en inglés. Eso no es un error de Google: es inventario que el cliente no puede comprar en su idioma. El mapa URL con URL ya está hecho.

Si el dueño pregunta “¿y las banderas no sirven?”:

> El selector enlaza portada con portada. No le dice a Google que la ficha del Camino Inca en inglés es la misma que la italiana. Son dos problemas distintos: navegación para el usuario, y anotación para el buscador.

Si el de tecnología está en la sala:

> WPML no aplica aquí: cada idioma es un WordPress aparte. Por eso el prototipo es un snippet idéntico en las cuatro instalaciones, con un mapa compartido. No sustituye lo que ya tienen. Completa la arquitectura que ya eligieron.

### 2:00–3:20 · Hallazgo 2: el precio que Google no pinta

> En la ficha, el código le dice a Google “el precio es 150”. No dice si son dólares, soles o reales. Google exige la moneda para pintar el precio en el resultado. Sin eso, Search Console marca error y la ficha no sale con precio. En italiano el número es 372. Mismo hueco. En portugués, que es el mercado principal, ni siquiera emiten el objeto Offer. Cuatro sitios, tres formas distintas de hablar de un precio. Se corrige en la plantilla.

### 3:20–4:20 · Hallazgo 3: reseñas que ya tienen y no cobran

> Tienen cientos de reseñas reales en Google y Tripadvisor. Se ven en el sitio. En el código no hay ni una estrella declarada para el buscador. Las estrellas en el resultado suben el clic sin subir de posición. El trabajo de conseguirlas ya lo hicieron. Falta declararlas **tour por tour**. Copiar la nota de la empresa en cada ficha es el atajo que Google penaliza. Hay que hacerlo bien o no hacerlo.

### 4:20–5:00 · Cierre del bloque técnico

> No dejé solo el diagnóstico. Hay un plugin que emite el hreflang recíproco en las cuatro instalaciones, y un auditor para volver a medir. El PDF, las tablas y el código están en la misma URL. Si algo de esto les sirve, úsenlo.

Cállate. El silencio es parte de la demostración. El que habla primero después de esto, dirige.

---

## Cómo no amenazar al equipo de tecnología

Hay 3–4 personas. Probablemente uno de ellos armó o mantiene Goodlayers / Tourmaster. Puede estar en la reunión o enterarse a la hora del almuerzo.

**Frases que cierran la puerta**
- “El sitio está mal hecho.”
- “Quien configuró Yoast no sabía.”
- “Esto lo arreglo yo solo.”
- “Hay que cambiar de tema.”

**Frases que abren la puerta**
- “El stack es el correcto para este negocio. Lo que falta es la capa de internacionalización entre instalaciones.”
- “La migración del dominio viejo está bien hecha: 301 página a página. Eso es raro y es de alguien que cuidó el trabajo.”
- “Yo no vengo a reemplazar el desarrollo. Vengo a que el SEO técnico y la implementación hablen el mismo idioma, con el equipo que ya está.”
- “Cualquier cambio de plantilla lo haría con ustedes, por etapas. Con constructor, optimizar a ciegas rompe el diseño.”

Si te preguntan “¿entonces qué harías con el equipo de sistemas?”:

> Ellos sostienen WordPress, reservas, hosting. Yo traigo el mapa entre idiomas, los datos estructurados y la medición en Search Console. La semana 1 no toco diseño. Pido accesos de lectura, dejo línea base, y los cambios van por el mismo flujo que ya usan.

---

## Preguntas — de par, no de postulante

No las dispares todas. Elige según quién hable y cuánto tiempo quede. Cada una tiene: la frase, por qué la haces, y qué te da la respuesta.

### Bloque A — Negocio (dueño)

**1. Mix de canales**

> Hoy, a ojo, ¿qué parte de las reservas les entra por la web directa, qué parte por WhatsApp, y qué parte por GetYourGuide u otras plataformas?

Por qué: convierte tu trabajo en margen. Si GYG es 30% del volumen, cada reserva que se mude a directo es 20–30% de comisión que no sale.
Si dicen “casi todo WhatsApp”: el SEO no es vanidad; es llenar ese WhatsApp con gente que ya buscó en Google en su idioma.
Si no saben el porcentaje: *“eso es exactamente lo primero que mediría: sin línea base no hay forma de demostrar mejora.”* Eso te pone a pedir accesos, no a pedir el puesto.

**2. Mercado de los próximos 12 meses**

> Si tuvieran que elegir un mercado para crecer de verdad este año —Brasil, Italia, Estados Unidos, España— ¿cuál duele más dejar sobre la mesa?

Por qué: Italia es el sitio más nuevo y más corto. Brasil es el principal y el peor surtido. EN no tiene blog. Su respuesta te dice qué hallazgo empujas primero el día 1.
Frase lista si dicen Brasil: *“Es el mercado con Facebook propio y reseñas respondidas en portugués, y es al que le faltan 19 productos, incluidos los de lujo.”*
Si dicen USA/Europa: *“Es el de mayor ticket y el único sin un artículo de blog. Están vendiendo solo a quien ya decidió.”*
Si dicen Italia: *“Treinta y tres tours contra sesenta y nueve en inglés. El hreflang y el inventario faltante son la misma conversación.”*

**3. Flota y asientos vacíos** (solo si el tono es de negocio, no de RRHH)

> Vi que operan, no solo revenden —incluso transporte propio. En temporada baja, ¿el dolor es más de demanda o de llenar lo que ya sale?

Por qué: coste fijo. Más reservas directas no es “más clics”; es menos asiento vacío. No recites el CIIU. Si no engancha, no insistas.

### Bloque B — Sistema (admin + quien lleve tech)

**4. Quién decide y quién sube**

> Cuando hay que cambiar algo en los sitios —una plantilla, una etiqueta, un plugin— ¿lo decide marketing, lo ejecuta sistemas interno, o hay agencia fuera?

Por qué: determina si el puesto es frustrante. Si hay agencia externa que tarda tres semanas, tu valor es traducir SEO a tickets precisos. Si hay interno, tu valor es sentarte con ellos.
Respuesta que quieres oír: interno, o interno + tú. Respuesta difícil: agencia que no deja tocar PHP. Entonces ofreces el mapa y el snippet, y pides estar en la revisión.

**5. Search Console y Analytics**

> ¿Tienen Search Console y Analytics en los cuatro dominios, con histórico? Incluyo el italiano.

Por qué: sin GSC no hay indexación real, ni países, ni canibalización. Sin GA4 no hay reservas. Pedir esto te posiciona como alguien que mide, no que opina.
Si no tienen el de IT o el de EN: *“eso entra en la semana 1. Propiedad, verificación, línea base. Antes de tocar nada.”*

**6. Blog en inglés**

> El sitio en inglés no tiene artículos. ¿Fue decisión —no quieren contenido— o no ha habido manos?

Por qué: si fue decisión, no prometas un blog. Si fue falta de manos, el plan editorial de 12 semanas es tu carta, con la honestidad de que no hay tráfico de contenido nuevo antes del mes 4.
No digas “deberían tener un blog”. Pregunta.

**7. Relación con marketing**

> Con un equipo de contenido y comunidad ya armado, ¿el rol de SEO técnico sería alimentarles temas y URLs, o más bien la capa técnica —etiquetas, velocidad, indexación— y ellos siguen con redes?

Por qué: no te comas el trabajo de 4–5 personas. Tú no eres community manager. Tú les das el mapa de intenciones (qué buscará un brasileño seis meses antes) y te aseguras de que Google pueda rastrear lo que ellos publiquen.

### Bloque C — El puesto

**8. ¿Implementar o informar?**

> Quiero entender el alcance: ¿el analista SEO técnico aquí implementa en WordPress, o entrega informes para que otro suba los cambios?

Por qué: esta pregunta sola justifica el sueldo. Un analista que reporta es el aviso de 3.500. Un perfil que implementa en cuatro instalaciones es otro puesto. No nombres cifra. Deja que el alcance quede dicho por ellos.
Si dicen “solo informes”: *“entonces el prototipo que ya escribí se lo dejo al equipo de sistemas y yo me quedo en medición y priorización. El alcance cambia.”* Eso es madurez, no capricho.

**9. ¿Cuatro dominios o uno?**

> El aviso habla de SEO técnico. ¿El alcance son los cuatro sitios —inglés, español, portugués, italiano— o principalmente perugrandtravel.com?

Por qué: cuatro veces el trabajo. Si dicen “los cuatro”, el reencuadre salarial está hecho sin pedir más plata.
Si dicen “el inglés”: *“el problema más caro está entre los cuatro. Hreflang no se puede hacer en uno solo: o es recíproco en la red, o no existe.”*

**10. Éxito a 90 días y a 6 meses**

> Si en noventa días esto salió bien, ¿qué habrían visto ustedes? ¿Y a los seis meses?

Por qué: ellos definen el examen. Tú después lo conviertes en criterio escrito (hreflang validado, Offer con moneda, GSC de EN/IT vivos, cero errores de producto). Eso es la palanca del sueldo del archivo 13.
Si contestan vago (“más tráfico”, “salir primeros”):

> Más tráfico sin idioma correcto puede ser un brasileño en la ficha en español. Yo mediría clics y reservas por país e idioma, y errores de Search Console en cero. Posiciones las usa la competencia para vender humo.

**11. Accesos semana 1**

> Para no opinar a ciegas: Search Console y Analytics de los cuatro, WordPress de las cuatro instalaciones en un perfil que no rompa producción, y quién es el contacto en sistemas para un cambio de plantilla.

Por qué: un candidato pide el trabajo. Un profesional pide el entorno para medir. Si hoy no hay oferta, igual queda la lista: *esto es lo primero que pediría al entrar.*

---

## Si el tiempo es corto (15 minutos)

Orden fijo:

1. Apertura (1 min)
2. Hreflang + mapa de catálogo (4 min)
3. Una pregunta: mix de canales **o** ¿implementar o informar?
4. Cierre: landing + “¿cuál sería el siguiente paso de su lado?”

No entres a reseñas ni a caché. No preguntes por flota. No abras negociación.

## Si hay 45 minutos

Después de los 5 minutos técnicos, tú preguntas más de lo que hablas. Bloque A completo, luego 4, 5, 8, 9, 10. El 11 al final.

Si hay feeling, **una carta que guardabas:**

> Crucé los catálogos. Brasil es el mercado donde responden reseñas en portugués, y es al que le faltan diecinueve productos que ya operan en otro idioma —incluidos los paquetes de lujo, que solo existen en inglés. Eso no se arregla con una etiqueta. Se publica.

Dilo una vez. No lo machaques.

---

## Si te hacen la entrevista técnica

Tienes las 20 respuestas en `05-GUIONES-contacto-entrevista-negociacion.md`. Las tres que más importan hoy:

- **Hreflang en tres/cuatro WordPress aparte:** no WPML; mapa compartido en `wp_head`.
- **Sacar una URL del índice:** `noindex` y dejar rastrear. robots.txt no desindexa.
- **WAF 406:** user-agent de navegador + `Accept`. Quien audite con Screaming Frog default va a decir que el sitio no responde.

Si no sabes algo: *“eso lo verifico en Search Console con acceso; no lo invento.”* Gana más que una respuesta brillante y falsa.

**Portugués:** *“Lectura técnica, en aprendizaje activo. La auditoría del sitio en portugués la hice yo. Conversacional todavía no.”* Exacto. Sigue.

**Edad / tres años:** no lo saques. Si sale, trabajo demostrado, no biografía.

---

## Sueldo y remoto

- **Remoto: cero.** Ni chiste. Están armando oficina. Te pidieron volver en persona. El plan está en el archivo 13 para después.
- **Sueldo:** si no lo sacan, no lo saques. Si lo sacan, usa el archivo 13: no nombres número primero; reencuadra alcance; árbol 4.500 → 4.000 + bono → 3.500 solo con papel.

Si dicen “el sueldo es 3.500, ¿ok?” y el ambiente es de cierre de trato, no improvises. Una frase:

> El rango del aviso me parece coherente para el título. Antes de cerrar el número quiero tener claro si el rol incluye implementar y si cubre los cuatro dominios. Con eso, cualquier cifra se conversa.

Y callas. Si insisten en cerrar hoy, ves el árbol del 13.

---

## Cierre — no pidas el trabajo

> Les dejo la URL y la copia. Si quieren, el siguiente paso de mi lado es un plan de treinta días: accesos, línea base, hreflang y moneda en plantilla. ¿Cuándo les sirve retomar esto?

No digas “espero su respuesta”. No digas “me encantaría trabajar aquí”. No llenes el silencio.

Si te dicen “te llamamos”: *“Perfecto. Gracias.”* Y te vas. No agregues un párrafo.

Si te dicen “¿cuándo puedes empezar?”: *“Esta semana, con los accesos de lectura.”* No hables de sueldo en la misma frase. El “sí” al inicio es más caro si lo mezclas con condiciones; las condiciones van en una segunda conversación, o en el archivo 13 si *ellos* las abren ahora.

---

## Checklist de bolsillo

- [ ] Landing abierta en el teléfono
- [ ] No culpar a Paloma
- [ ] Elogiar la migración página a página
- [ ] Tres hallazgos, no veintitrés
- [ ] Complemento al equipo de sistemas, no relevo
- [ ] Preguntar mix de canales + implementar vs informar + cuatro dominios
- [ ] No remoto
- [ ] No sueldo si no lo sacan
- [ ] Callarte después del bloque técnico
- [ ] Salir sin pedir el puesto
