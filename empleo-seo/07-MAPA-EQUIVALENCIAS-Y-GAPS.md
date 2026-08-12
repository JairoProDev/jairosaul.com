# Mapa de equivalencias hreflang + Análisis de huecos de catálogo

**Fuente:** `tour-sitemap.xml` de los tres dominios, extraídos el 09/08/2026.
**Método:** correspondencia semántica manual producto a producto. No existe forma automática fiable de saber que `vinicunca-montana-de-colores-1-dia`, `rainbow-mountain-full-day` y `montanha-colorida-1d` son el mismo producto. Por eso este documento es el activo más difícil de replicar de todo el paquete.

---

## Resultado del cruce

| Métrica | Valor |
|---|---|
| Productos únicos identificados en la red | **74** |
| Presentes en los **3** idiomas | **50** |
| Presentes en solo 1 o 2 idiomas | **24** |
| Grupos `hreflang` emitibles hoy | **62** |
| **Huecos de catálogo detectados** | **36** |

### Huecos por mercado

| Mercado | Productos que le faltan |
|---|---|
| Portugués (Brasil) | **19** |
| Español | 13 |
| Inglés | 4 |

---

## Hallazgo comercial: el mercado más grande es el peor surtido

Brasil es su mercado principal — la página de Facebook de la empresa es la brasileña, las reseñas de Tripadvisor están mayoritariamente en portugués y el equipo responde en portugués. Y sin embargo **el catálogo en portugués es el que más productos tiene sin publicar: 19**.

Entre lo que un brasileño **no puede comprar hoy** en el sitio en portugués:

| Producto ausente en PT-BR | Sí existe en |
|---|---|
| Waqrapukara | EN, ES |
| Islas Ballestas + Huacachina | EN, ES |
| Valle Sagrado VIP | EN, ES |
| Machu Picchu 2D | EN, ES |
| Amazonía / Tambopata 4D | EN, ES |
| Amazonía Express 3D | EN, ES |
| Maravillas del Perú 13D | EN, ES |
| Cañón del Cóndor · Domo Piuray | EN |
| Los 6 paquetes Grand Deluxe (Belmond, Inkaterra, Casa Andina, Luxury Collection) | EN |

**Esto no es un problema de SEO: es inventario que no está a la venta en el mercado que más compra.** Es el tipo de hallazgo que un analista SEO no encuentra porque no cruza catálogos, y que un dueño de agencia entiende en tres segundos.

### El caso de los 6 paquetes de lujo

Los seis productos **Grand Deluxe** (hoteles Belmond, Inkaterra, Casa Andina, Luxury Collection, y el tren Andean Explorer) existen **únicamente en inglés**. Son con diferencia los productos de mayor ticket del catálogo. Brasil tiene un mercado de viaje de lujo grande y cercano; España y México también. Publicarlos en PT-BR y ES es traducción de seis fichas, no desarrollo de producto nuevo.

---

## Hallazgo técnico extra: canibalización interna en el dominio ES

Detecté **dos URLs distintas para el mismo producto** dentro del mismo dominio:

```
https://www.viajesmachupicchutours.com/tour/bike-maras-moray-salineras/
https://www.viajesmachupicchutours.com/tour/maras-moray-en-bicicleta/
```

Ambas en el sitemap, ambas indexables. Efecto: se reparten señales y compiten entre sí por la misma consulta. Solución: elegir la preferida, `301` desde la otra, actualizar enlaces internos y sitemap.

*Nota de método: revisa el resto del catálogo con este mismo criterio antes de entregar — encontré este par al ordenar los slugs alfabéticamente. Es probable que haya más.*

---

## Cómo se usa el mapa

1. `equivalencias-hreflang.csv` — tabla revisable. Ábrela y **verifica una por una las marcadas como confianza `media`** antes de entregar. Son las que dependen de comparar itinerarios reales, no solo nombres.
2. `generar_mapa_hreflang.py` — la fuente de verdad. Corrige ahí y regenera todo.
3. `hreflang-mapa.php` — array generado, se pega directamente en `hreflang-multidominio.php`.
4. `gaps-de-catalogo.csv` — la lista de 36 huecos, para la conversación comercial.
5. `equivalencias-hreflang.json` — por si quieren automatizar sobre esto.

**Decisión de diseño importante:** el generador **solo emite grupos `hreflang` cuando existen 2 o 3 versiones reales**. Nunca inventa una equivalencia. Un `hreflang` que apunta a una página que no existe o que no es equivalente hace que Google descarte el grupo entero y genera errores en Search Console. Es mejor cubrir 62 grupos correctos que 74 con basura dentro.

---

## Las 12 filas de confianza `media` que debes verificar a mano

Abre las dos o tres fichas y compara itinerario, duración y hoteles. Si no coinciden, **no son equivalentes** y hay que separarlas:

- Qeswachaka (la versión ES incluye "4 lagunas", la EN parece solo el puente)
- Salkantay Sky 5D
- Salkantay Combinada 7D
- Increíble Experiencia Machu Picchu 7D
- Encuentro de los Incas 8D ↔ Machu Picchu com Alpacas 8D
- Machu Picchu Extreme Challenge ↔ Desafío de los Incas 15D *(la duración no cuadra: sospechoso)*
- Orígenes de los Incas 10D ↔ Perú Místico 10D
- Perú Amazonía 9D ↔ Perú Cultura Viva Eco Amazonía

Esta lista, entregada como "esto lo verifiqué, esto necesita que alguien de operaciones lo confirme", es exactamente cómo trabaja un profesional. Entregarlo todo como certeza sería el error.

---

## Argumento de una frase para la reunión

> *"Crucé sus tres catálogos producto por producto: 74 productos, solo 50 están en los tres idiomas. Al mercado brasileño —que es su mercado principal— le faltan 19 productos que sí venden en inglés y español, incluidos los seis paquetes de lujo. Y como no hay hreflang, los 50 que sí coinciden están compitiendo entre ellos en vez de sumar. El mapa para arreglarlo ya lo tengo hecho."*
