# Mapa de equivalencias hreflang + Análisis de huecos de catálogo

**Fuente:** `tour-sitemap.xml` de EN/ES/PT (09/08/2026) y de `viaggiomachupicchu.it` (13/08/2026).
**Método:** correspondencia semántica manual producto a producto. No existe forma automática fiable de saber que `vinicunca-montana-de-colores-1-dia`, `rainbow-mountain-full-day`, `montanha-colorida-1d` y `montagna-arcobaleno` son el mismo producto.

---

## Resultado del cruce

| Métrica | Valor |
|---|---|
| Productos únicos identificados en la red | **74** |
| Presentes en los **4** idiomas | **31** |
| Presentes en solo 1, 2 o 3 idiomas | **43** |
| Grupos `hreflang` emitibles hoy | **63** |
| **Huecos de catálogo detectados** | **76** |

### Huecos por mercado

| Mercado | Productos que le faltan |
|---|---|
| Italiano | **40** |
| Portugués (Brasil) | **19** |
| Español | 13 |
| Inglés | 4 |

Los 33 tours del sitemap italiano están mapeados. No quedó ninguno suelto.

---

## Hallazgo comercial: Italia es el catálogo más corto de la red en vivo

Brasil sigue siendo el mercado principal en reseñas y Facebook, y aun así le faltan 19 productos. Italia, el cuarto dominio (bandera en el header desde enero de 2026), está peor: **40 productos que sí se venden en otro idioma no existen en italiano**. Entre lo que un italiano no puede comprar hoy en su sitio:

| Producto ausente en IT | Sí existe en |
|---|---|
| Valle Sagrado de los Incas | EN, ES, PT |
| City Tour Cusco | EN, ES, PT |
| Salkantay Trek 4D | EN, ES, PT |
| Inca Jungle 4D | EN, ES, PT |
| Lares / Choquequirao | EN, ES, PT |
| Amazonía / Tambopata | EN, ES |
| Los 6 paquetes Grand Deluxe | EN |

Brasil, a su vez, sigue sin Waqrapukara, Ballestas, Valle Sagrado VIP, Machu Picchu 2D, Amazonía y los Grand Deluxe.

**Esto no es solo SEO: es inventario que no está a la venta en el idioma del cliente.**

### El caso de los 6 paquetes de lujo

Los seis productos **Grand Deluxe** (hoteles Belmond, Inkaterra, Casa Andina, Luxury Collection, y el tren Andean Explorer) existen **únicamente en inglés**. Son con diferencia los productos de mayor ticket del catálogo. Publicarlos en PT, ES e IT es traducción de fichas, no desarrollo de producto nuevo.

---

## Hallazgo técnico extra: canibalización interna en el dominio ES

Detecté **dos URLs distintas para el mismo producto** dentro del mismo dominio:

```
https://www.viajesmachupicchutours.com/tour/bike-maras-moray-salineras/
https://www.viajesmachupicchutours.com/tour/maras-moray-en-bicicleta/
```

Ambas en el sitemap, ambas indexables. Efecto: se reparten señales y compiten entre sí por la misma consulta. Solución: elegir la preferida, `301` desde la otra, actualizar enlaces internos y sitemap.

---

## Cómo se usa el mapa

1. `equivalencias-hreflang.csv` — tabla con columnas EN, ES, PT e IT.
2. `generar_mapa_hreflang.py` — la fuente de verdad. Se corrige ahí y se regenera todo.
3. `hreflang-mapa.php` — array generado, se pega en `hreflang-multidominio.php`.
4. `gaps-de-catalogo.csv` — los 76 huecos, para la conversación comercial.
5. `equivalencias-hreflang.json` — por si quieren automatizar sobre esto.

**Decisión de diseño:** el generador **solo emite grupos `hreflang` cuando existen 2 o más versiones reales**. Nunca inventa una equivalencia. Un `hreflang` que apunta a una página que no existe hace que Google descarte el grupo entero. Es mejor cubrir 63 grupos correctos que 74 con basura dentro.

---

## Las filas de confianza `media` que conviene verificar a mano

Abrir las fichas y comparar itinerario, duración y hoteles. Si no coinciden, no son equivalentes:

- Qeswachaka (la versión ES incluye "4 lagunas", la EN parece solo el puente)
- Salkantay Sky 5D
- Salkantay Combinada 7D
- Increíble Experiencia Machu Picchu 7D
- Encuentro de los Incas 8D ↔ Machu Picchu com Alpacas 8D ↔ Incontro degli Incas
- Machu Picchu Extreme Challenge ↔ Desafío de los Incas 15D ↔ Sfida degli Inca 15 giorni
- Orígenes de los Incas 10D ↔ Perú Místico 10D ↔ Origini degli Incas
- Perú Amazonía 9D ↔ Perú Cultura Viva Eco Amazonía

---

## Argumento de una frase para la reunión

> Crucé los cuatro catálogos producto por producto: 74 productos, solo 31 están en los cuatro idiomas. Al mercado italiano le faltan 40; al brasileño, 19 — incluidos los seis paquetes de lujo. Y como no hay hreflang, los que sí coinciden están compitiendo entre ellos en vez de sumar. El mapa para arreglarlo ya está hecho.
