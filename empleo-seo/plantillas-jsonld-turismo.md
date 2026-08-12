# Plantillas JSON-LD para turismo — listas para implementar

Todas validables en la Prueba de Resultados Enriquecidos de Google y en el validador de Schema.org.
Sustituye los valores entre `{{ }}`. **Regla innegociable: no marques nada que no esté visible en la página.**

---

## 1. `TravelAgency` — para la portada de cada dominio

Reemplaza el `Organization` genérico actual. `TravelAgency` es subtipo de `LocalBusiness`, lo que habilita señales de negocio local que `Organization` no aporta.

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "{{URL_DOMINIO}}/#organization",
  "name": "Peru Grand Travel",
  "url": "{{URL_DOMINIO}}/",
  "logo": "{{URL_LOGO}}",
  "image": "{{URL_IMAGEN}}",
  "description": "{{DESCRIPCION_EN_EL_IDIOMA_DEL_DOMINIO}}",
  "telephone": "{{+51...}}",
  "email": "{{correo}}",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{calle y número}}",
    "addressLocality": "Cusco",
    "addressRegion": "Cusco",
    "postalCode": "{{08000}}",
    "addressCountry": "PE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{-13.5...}}",
    "longitude": "{{-71.9...}}"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  }],
  "sameAs": [
    "https://www.facebook.com/perugrandtravel.br",
    "https://www.instagram.com/perugrandtravel/",
    "https://www.tiktok.com/@perugrandtravel",
    "https://www.youtube.com/perugrandtravel"
  ],
  "areaServed": { "@type": "Country", "name": "Peru" },
  "knowsLanguage": ["es", "en", "pt"]
}
```

---

## 2. `Product` + `Offer` completo — fichas de tour

**Esta es la corrección del hallazgo crítico #2.** El campo que falta hoy es `priceCurrency`.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "{{URL_TOUR}}#product",
  "name": "{{Nombre del tour}}",
  "description": "{{Descripción real, 1-2 frases}}",
  "image": ["{{imagen_1200x800}}", "{{imagen_alternativa}}"],
  "brand": { "@type": "Brand", "name": "Peru Grand Travel" },
  "sku": "{{codigo-interno}}",
  "offers": {
    "@type": "Offer",
    "url": "{{URL_TOUR}}",
    "price": "150",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "{{fecha_real_de_vigencia}}",
    "seller": { "@id": "{{URL_DOMINIO}}/#organization" }
  }
}
```

Tres correcciones respecto a lo que emiten hoy:
- `priceCurrency` presente (**obligatorio** — sin esto no hay resultado enriquecido)
- `availability` con `https://` (hoy usan `http://`, que sigue funcionando pero está desactualizado)
- `priceValidUntil` con fecha real, no fija en `2027-01-01` para todo el catálogo

---

## 3. `AggregateRating` + `Review` — el activo desaprovechado

Solo si las valoraciones son **de ese tour concreto** y **están visibles en esa página**. Poner la valoración global de la empresa en cada ficha es riesgo de acción manual.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "{{URL_TOUR}}#product",
  "name": "{{Nombre del tour}}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "127",
    "reviewCount": "84"
  },
  "review": [{
    "@type": "Review",
    "author": { "@type": "Person", "name": "{{Nombre real del reseñador}}" },
    "datePublished": "{{2026-05-14}}",
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "{{Texto real de la reseña}}"
  }]
}
```

---

## 4. `TouristTrip` — el tipo que Valencia Travel ya usa y ellos no

Complementa a `Product`: describe el viaje como itinerario, no solo como artículo a la venta.

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "@id": "{{URL_TOUR}}#trip",
  "name": "{{Nombre del tour}}",
  "description": "{{Descripción}}",
  "touristType": ["Adventure", "Cultural", "Family"],
  "provider": { "@id": "{{URL_DOMINIO}}/#organization" },
  "itinerary": {
    "@type": "ItemList",
    "numberOfItems": 3,
    "itemListElement": [
      { "@type": "ListItem", "position": 1,
        "item": { "@type": "TouristAttraction", "name": "Pisac",
                  "address": { "@type": "PostalAddress", "addressRegion": "Cusco", "addressCountry": "PE" } } },
      { "@type": "ListItem", "position": 2,
        "item": { "@type": "TouristAttraction", "name": "Ollantaytambo" } },
      { "@type": "ListItem", "position": 3,
        "item": { "@type": "TouristAttraction", "name": "Machu Picchu" } }
    ]
  },
  "offers": { "@id": "{{URL_TOUR}}#offer" }
}
```

---

## 5. `FAQPage` — el resultado enriquecido más barato de conseguir

Las fichas de tour ya suelen tener sección de preguntas frecuentes. Marcarlas cuesta minutos.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question",
      "name": "{{¿Cuántos días necesito para Machu Picchu?}}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{Respuesta que YA está visible en la página}}" } },
    { "@type": "Question",
      "name": "{{¿Incluye las entradas?}}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{Respuesta visible}}" } }
  ]
}
```

---

## 6. `BreadcrumbList`

Ya la emiten (vía Yoast). **Verifica solo una cosa:** que las posiciones y URLs sean correctas y que coincidan con las migas visibles en la página.

---

## Checklist de validación antes de dar nada por hecho

- [ ] Prueba de Resultados Enriquecidos de Google → sin errores ni advertencias
- [ ] Validador de Schema.org → sin errores de sintaxis
- [ ] Todo lo marcado está **visible** para el usuario en esa misma página
- [ ] Precios y disponibilidad coinciden con lo que muestra la web
- [ ] `@id` consistentes para poder referenciar entre bloques sin duplicar entidades
- [ ] Un solo `Product` por página (no marcar el catálogo completo en una ficha)
- [ ] Informe de Fragmentos de producto en Search Console a los 7 días → elementos válidos ≈ nº de fichas

---

## Nota sobre implementación en su stack

Emiten schema vía Yoast. Hay dos rutas:

1. **Extender el grafo de Yoast** con los filtros del plugin (`wpseo_schema_graph_pieces`). Limpio, mantenible, sobrevive actualizaciones.
2. **Emitir un bloque JSON-LD propio** en la plantilla de `tourmaster`, con `@id` distintos para no duplicar entidades.

La opción 1 es la correcta a medio plazo. La opción 2 es la que permite corregir el `priceCurrency` esta misma semana. **Se puede hacer la 2 ahora y migrar a la 1 después** — y decirlo así en la entrevista demuestra criterio de priorización, que es lo que se evalúa de verdad en un puesto técnico.
