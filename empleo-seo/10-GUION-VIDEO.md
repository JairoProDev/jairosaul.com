# Guion y pasos — video de la auditoría Peru Grand Travel

Duración objetivo: **5 minutos** (tope 6). Una toma. Sin música, sin intro, sin logo.
Tono: colega de Cusco que encontró algo en sus sitios, no vendedor.
Idioma: español. Si lees un título en italiano o portugués, léelo; no lo traduzcas todo.

El video va **después** del enlace, o lo muestras en la oficina. No pidas el trabajo. Muestra el trabajo.

---

## Antes de grabar (15 minutos)

### Qué abrir, en este orden, en pestañas del navegador

1. `https://www.perugrandtravel.com/` — zoom 110%, header con las banderas visible
2. `https://www.viaggiomachupicchu.it/`
3. Una ficha EN: `https://www.perugrandtravel.com/tour/machu-picchu-full-day/`
4. Una ficha IT: `https://www.viaggiomachupicchu.it/tour/machu-picchu-1-giorno/`
5. `https://jairosaul.com/peru-grand-travel`
6. Terminal ya abierta, fuente grande, con estos dos comandos pegados y listos (no los corras todavía):

```bash
curl -s -A "Mozilla/5.0" https://www.perugrandtravel.com/ | grep -c hreflang
curl -s -A "Mozilla/5.0" https://www.viaggiomachupicchu.it/ | grep -c hreflang
```

### Cómo grabar

- Loom (más fácil) u OBS. 1080p. Micrófono cerca. Cámara pequeña abajo a la derecha, no a pantalla completa.
- Cierra Slack, WhatsApp Web, notificaciones. Barra de favoritos limpia.
- Vista de escritorio, no móvil. Ellos abrirán el video en el celular; tú grabas escritorio para que se lea el código.
- Si te trabas, sigue. Un “perdón, aquí” humano gana a un video recortado 14 veces.
- No menciones IA, Claude, “entregable”, “paquete”, “insights”.
- No digas “tres sitios”. Son cuatro en vivo más el dominio viejo.

### Cómo abrir el JSON-LD en 5 segundos (ensaya esto)

En la ficha de tour EN: clic derecho → Ver código fuente → `Ctrl+F` → `priceCurrency` (no aparece) → `Ctrl+F` → `"Offer"` → se ve `"price":"150"` sin moneda.
En la ficha IT: lo mismo, `"price":"372"`.

---

## Guion hablado (léelo, no lo memorices palabra por palabra)

Los bloques entre corchetes son lo que haces en pantalla. El resto se dice.

---

### 0:00 – 0:25 · Quién eres

**[Pestaña 1: perugrandtravel.com, header con banderas]**

> Hola, soy Jairo, desarrollador web, vivo en Cusco. Estuve revisando la parte técnica de los sitios de Peru Grand Travel y encontré varias cosas que hoy les están costando visibilidad — y reservas. En cinco minutos te muestro las tres más importantes, en sus páginas, no en un informe.

---

### 0:25 – 1:20 · El gancho: la cuarta bandera

**[Señala las banderas BR, ES, IT en el header. Clic en la italiana.]**

> En el encabezado hay tres banderas. Brasil, España, Italia. Italia no es un enlace decorativo: abre un WordPress aparte, viaggiomachupicchu.it. Cuatro instalaciones. Cuatro idiomas. Un quinto dominio, el viejo en español, ya redirige bien, página a página — eso está bien hecho.

**[Pestaña 2: home italiano. Scroll corto, se ve que es el mismo diseño.]**

> El italiano es el más nuevo y el más corto: 33 tours contra 69 en inglés. Dos artículos de blog. Y está enlazado solo home con home, igual que los otros. Si un italiano está en la ficha del Camino Inca en inglés y toca la bandera, no llega al Camino Inca en italiano: llega a la portada.

Eso ya demuestra que viste algo que un CV no cuenta. Pausa un segundo.

---

### 1:20 – 2:50 · Hallazgo 1: hreflang (el que duele)

**[Terminal. Corre el primer curl. Sale `0`. Corre el segundo. Sale `0`.]**

> Ninguno de los cuatro declara hreflang. Cero en inglés. Cero en italiano. Español y portugués igual. Sin esa etiqueta, Google no sabe que Machu Picchu Full Day en inglés, en español, en portugués y en italiano son el mismo producto. Los trata como cuatro páginas distintas que compiten. Y decide él a quién le muestra cuál. Un brasileño puede terminar en la versión en español. Un italiano, también.

**[Pestaña 5: jairosaul.com/peru-grand-travel. Scroll a la tabla de equivalencias. Señala una fila de 4 idiomas, por ejemplo Machu Picchu Full Day. Señala una fila con guion en IT, por ejemplo Valle Sagrado.]**

> Crucé los cuatro catálogos a mano. 74 productos. Solo 31 existen en los cuatro idiomas. Al italiano le faltan 40 que sí venden en otro lado: Valle Sagrado, Salkantay, Amazonía, los paquetes de lujo. A Brasil le faltan 19. Eso no es un error de Google: es inventario que el cliente no puede comprar en su idioma. El mapa ya está hecho, URL con URL, para emitir el hreflang sin inventar equivalencias.

---

### 2:50 – 3:50 · Hallazgo 2: el precio que Google no puede mostrar

**[Pestaña 3: ficha EN. Código fuente. Busca Offer. Señala price 150, no hay priceCurrency.]**

> Segunda. En la ficha, el código le dice a Google “el precio es 150”. No dice si son dólares, soles o reales. Google exige la moneda para pintar el precio en el resultado. Sin eso, Search Console marca error y la ficha no sale con precio.

**[Pestaña 4: ficha IT. Offer, price 372, mismo hueco.]**

> En italiano el número es 372. Mismo problema. En portugués ni siquiera emiten el objeto Offer. Cuatro sitios, tres formas distintas de hablar de un precio. Se corrige en la plantilla, no es un proyecto de meses.

---

### 3:50 – 4:35 · Hallazgo 3: reseñas que ya tienen y no cobran

**[Vuelve a perugrandtravel.com, scroll hasta el bloque de reseñas / Trustindex si está visible. Si no, quédate en la landing y nombra el hallazgo 3.]**

> Tercera, más corta. Tienen cientos de reseñas reales en Google y Tripadvisor. Se ven en el sitio. En el código no hay ni una estrella declarada para el buscador. Las estrellas en el resultado suben el clic sin subir de posición. El trabajo de conseguir las reseñas ya lo hicieron. Falta declararlas, tour por tour, no copiar la nota de la empresa en cada ficha.

---

### 4:35 – 5:25 · Que no solo encontraste el problema

**[Landing: sección de código. Abre el PHP unos segundos. No leas el archivo.]**

> No dejé solo el diagnóstico. Hay un plugin de WordPress que emite el bloque hreflang recíproco en las cuatro instalaciones — WPML no sirve aquí, porque cada idioma es un WordPress aparte. Y un auditor en Python para volver a medir. El PDF, las tablas y el código están en jairosaul.com/peru-grand-travel. Si algo de esto les sirve, úsenlo.

---

### 5:25 – 5:50 · Cierre

**[Cámara un poco más grande, o quédate en la landing en el bloque Conversemos.]**

> Vivo en Cusco. Si quieren, lo vemos en persona, sin compromiso. Soy Jairo. Gracias.

Corta. No pidas la vacante. No digas “espero su respuesta”.

---

## Si te pasas de tiempo, corta en este orden

1. Recorta el hallazgo 3 (reseñas) a dos frases, sin buscar el widget.
2. No abras el PHP; nómbralo desde la landing.
3. No visites el home italiano: con el clic de la bandera basta.

No recortes el curl ni la tabla. Eso es lo que no puede fingir un postulante.

---

## Después de grabar

1. Súbelo a Loom (unlisted) o a YouTube (no listado). No lo pongas público indexable: es su negocio.
2. Copia el enlace. En Loom: Share → Copy link. Para embeber: `https://www.loom.com/embed/ID`.
3. Pásame el enlace y lo dejo en la landing, arriba, para que en la oficina lo abran del mismo link que ya tienen.
4. Mensaje de seguimiento, solo si ya les escribiste esta mañana y aún no fuiste:

> Les dejé también un video corto recorriendo los cuatro sitios, por si es más rápido que el PDF: [enlace del video o la misma landing cuando ya esté embebido].

---

## Lo que NO hacer

- No leas el PDF en voz alta.
- No compares con “lo que haría ChatGPT”.
- No critiques a quien armó los sitios.
- No prometas posiciones ni “en 30 días están primeros”.
- No grabes el WhatsApp de la startup ni pestañas personales.
- No digas “escaneable”, “entregable”, “insights”, “quick wins”.
