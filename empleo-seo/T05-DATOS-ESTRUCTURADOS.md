# T05 — Datos estructurados y web semántica

---

## 1. El problema que resuelven

Una máquina que lee `US$ 150` en una página web no sabe si es el precio del tour, el de un extra, el de la competencia o un número en una reseña. El HTML describe **presentación**, no **significado**.

Los datos estructurados son una capa paralela que dice explícitamente: *"esto es un Producto; su precio es 150; la moneda es USD; está disponible."*

**Contexto histórico necesario:** esto es la versión práctica y superviviente de la **Web Semántica** que Tim Berners-Lee propuso en 2001. Aquella visión (RDF, OWL, ontologías formales) resultó demasiado pesada para la web abierta. Lo que sobrevivió fue una versión pragmática: **schema.org**, lanzado en 2011 como consorcio entre Google, Bing, Yahoo y Yandex. Un vocabulario compartido, simple, extensible.

En 2012 Google lanzó el **Knowledge Graph** con el lema *"de cadenas a cosas"* (*from strings to things*). Ese es el eje conceptual: pasar de tratar texto como caracteres a tratarlo como **entidades** con propiedades y relaciones.

---

## 2. Vocabulario vs sintaxis (distinción que casi nadie hace)

- **Vocabulario**: qué palabras existen y qué significan → **schema.org**.
- **Sintaxis**: cómo las escribes → **JSON-LD**, **Microdatos**, **RDFa**.

| Sintaxis | Forma | Estado |
|---|---|---|
| **JSON-LD** | Bloque `<script type="application/ld+json">` separado del HTML | **Recomendado por Google.** Es el estándar de facto |
| Microdatos | Atributos `itemscope`/`itemprop` dentro del HTML | Legado. Frágil: cambiar el diseño rompe el marcado |
| RDFa | Atributos basados en RDF | Raro fuera de entornos académicos |

**Por qué ganó JSON-LD:** está desacoplado del marcado visual. Puedes cambiar todo el diseño sin tocar los datos, y puedes inyectarlo desde plantillas o etiquetas. Es una decisión de arquitectura de software, no de SEO.

---

## 3. Anatomía de JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ejemplo.com/tour/#product",
  "name": "Tour Valle Sagrado",
  "offers": { "@id": "https://ejemplo.com/tour/#offer" }
}
```

- **`@context`**: define el vocabulario. Siempre `https://schema.org`.
- **`@type`**: el tipo de entidad. Puede ser un array: `["Product", "TouristTrip"]`.
- **`@id`**: identificador único de la entidad. **Es lo que permite construir un grafo** en vez de bloques sueltos: si dos bloques referencian el mismo `@id`, están hablando de la misma cosa.
- **`@graph`**: array de entidades relacionadas en un solo bloque. Es lo que hace Yoast.

**Buena práctica avanzada:** define la organización una vez con `@id` y **referénciala** desde cada producto en vez de repetirla. Menos peso, sin ambigüedad, y un grafo real en lugar de copias.

---

## 4. Jerarquía de tipos

schema.org es un árbol de herencia. `Thing` es la raíz:

```
Thing
 ├── Organization
 │    └── LocalBusiness
 │         └── TravelAgency        ← el correcto para una agencia
 ├── Place
 │    └── TouristAttraction
 ├── Product
 ├── CreativeWork
 │    ├── Article
 │    ├── WebPage
 │    └── FAQPage
 ├── Event
 ├── Intangible
 │    ├── Offer
 │    ├── AggregateRating
 │    └── ItemList
 └── Trip
      └── TouristTrip
```

**Usar el tipo más específico posible.** `TravelAgency` hereda todo lo de `LocalBusiness` y `Organization`, y además comunica qué es el negocio. Emitir `Organization` genérico cuando existe `TravelAgency` es dejar información sobre la mesa.

---

## 5. Tipos que producen resultados enriquecidos (y los que no)

**Distinción crítica:** puedes marcar casi cualquier cosa con schema.org, pero **solo un subconjunto genera resultados enriquecidos en Google**. El resto sirve para comprensión de entidades, que es cada vez más importante (ver T07) pero no produce un efecto visible mañana.

Los que Google documenta como elegibles (lista viva; consúltala antes de prometer nada):
Artículo · Migas de pan · Producto (fragmento y comerciante) · Preguntas frecuentes* · Cómo hacer* · Evento · Receta · Vídeo · Empleo · Negocio local · Libro · Curso · Conjunto de datos · Software · Suscripción y contenido de pago · Perfil · Debate en foro

*\* En agosto de 2023 Google **restringió** FAQ a sitios de salud y gobierno, y **retiró** HowTo. Es la lección más importante de este bloque: **los resultados enriquecidos son una concesión de Google, no un derecho.* Implementar schema para conseguir un resultado enriquecido concreto es una apuesta; implementarlo para que el contenido sea comprensible es una inversión.

---

## 6. `Product` + `Offer` — el caso del sector

### Campos obligatorios (los que rompen)

Para el fragmento de producto:
- `name`
- `image`
- **`offers`** con:
  - `price`
  - **`priceCurrency`** ← el que más se omite; sin él **no hay elegibilidad**
  - `availability`

Recomendados: `description`, `sku`, `brand`, `aggregateRating`, `review`, `priceValidUntil`, `shippingDetails`, `hasMerchantReturnPolicy`.

*Caso PGT: sus fichas emiten `price`, `priceValidUntil` y `availability`, pero no `priceCurrency`. Search Console reportará "Falta el campo priceCurrency" y ninguna de las +120 fichas es elegible. Y "150" sin moneda es semánticamente ambiguo en un negocio que vende a tres mercados.*

### `AggregateRating` y `Review` — el terreno minado

Requisitos que Google exige y por los que emite acciones manuales:
1. La valoración debe corresponder a **la entidad de esa página**, no a la empresa entera.
2. Debe estar **visible en la página** para el usuario.
3. Debe proceder de **usuarios reales**, no de la propia empresa.
4. **Prohibido el marcado autoservido de valoración de la propia entidad** para `LocalBusiness` y `Organization` en la mayoría de casos.

Marcar la valoración global de la agencia en cada ficha de tour es exactamente lo que Google considera spam de datos estructurados. Es la diferencia entre implementar bien y ganarse una acción manual.

---

## 7. Tipos de turismo

- **`TouristTrip`**: el viaje como experiencia, con `itinerary` (un `ItemList` de `TouristAttraction`), `touristType`, `provider`.
- **`TouristAttraction`**: los lugares. Permite vincular con entidades del Knowledge Graph.
- **`Trip`** con `subTrip` para itinerarios de varios días.
- **`Event`** para salidas con fecha fija (Inti Raymi, Corpus Christi).
- **`TravelAgency`** para la entidad de negocio.

**Combinación recomendada en una ficha de tour:** `Product` (para el fragmento comercial) + `TouristTrip` (para la comprensión de la experiencia) + `BreadcrumbList`, todos unidos por `@id`.

---

## 8. Entidades, `sameAs` y desambiguación

Marcar tipos es el nivel 1. El nivel 2 es **conectar tus entidades con entidades conocidas**:

```json
"sameAs": [
  "https://www.wikidata.org/wiki/Q676203",
  "https://es.wikipedia.org/wiki/Machu_Picchu"
]
```

Esto le dice al sistema: *cuando digo "Machu Picchu", me refiero a esta entidad concreta*. Es desambiguación explícita, y es cada vez más relevante porque los sistemas generativos operan sobre entidades y relaciones, no sobre cadenas.

Para la organización: `sameAs` hacia sus perfiles sociales, ficha de Google Business, perfiles en OTAs, Tripadvisor. Consolida la identidad de la marca como entidad única.

---

## 9. Validación y depuración

| Herramienta | Para qué |
|---|---|
| **Prueba de resultados enriquecidos** de Google | Qué resultados enriquecidos habilita — la que decide |
| **Validador de schema.org** | Corrección del vocabulario, sin filtro de Google |
| **Informes de mejoras en GSC** | Errores agregados en producción, con evolución temporal |
| Extensiones de navegador | Inspección rápida |

**Errores frecuentes:** JSON mal formado (una coma sobra y el bloque entero se descarta silenciosamente); marcar contenido no visible; múltiples `Product` en una página de categoría; precios desactualizados frente a lo mostrado; fechas en formato no ISO 8601.

---

## 10. Datos estructurados en la era de la IA (puente a T07)

Aquí hay que ser preciso y no vender humo:

- **No hay evidencia sólida de que schema.org sea un factor directo de citación en sistemas generativos.** Google ha declarado que los datos estructurados no son un requisito para AI Overviews.
- **Sí hay un argumento indirecto y fuerte:** los sistemas de recuperación se benefician de contenido inequívoco. Precio, disponibilidad, ubicación, duración y valoración expresados en un formato legible por máquina eliminan la interpretación. Un modelo que debe extraer un precio de HTML ambiguo puede equivocarse; de un `Offer` con `priceCurrency`, no.
- **Los agentes de compra y reserva** que empiezan a operar sobre la web necesitan datos estructurados para actuar. Esa es la apuesta a medio plazo, y es **B2A** (*business to agent*) más que SEO.

**Formulación honesta para una entrevista:** *"Los datos estructurados no garantizan aparecer en respuestas de IA, pero eliminan ambigüedad en los datos comerciales, habilitan resultados enriquecidos hoy y son la superficie que los agentes van a leer mañana. El coste es bajo y el riesgo de no tenerlos crece."*

---

## 11. Laboratorio

1. Marca un producto con `Product` + `Offer` **sin** `priceCurrency`. Valida y observa el error exacto.
2. Añádelo. Vuelve a validar.
3. Construye un grafo con `@id`: `Organization` + `Product` + `Offer` referenciados entre sí, sin repetir la organización.
4. Marca un `TouristTrip` con un `itinerary` de tres paradas.
5. Marca deliberadamente una valoración que no está visible en la página y razona por qué eso es un riesgo de acción manual.
6. Revisa el informe de Fragmentos de producto en GSC de un sitio real y clasifica los errores.

## 12. Autoevaluación

- Vocabulario vs sintaxis: define ambos y da ejemplos.
- ¿Por qué ganó JSON-LD frente a Microdatos?
- ¿Para qué sirve `@id` y qué permite hacer?
- Campos obligatorios de `Offer`.
- ¿Qué pasó con FAQPage y HowTo en 2023 y qué lección deja?
- ¿Cuándo marcar `AggregateRating` es riesgo de acción manual?
- ¿Qué dirías a un cliente que pregunta si el schema le hará salir en ChatGPT?
