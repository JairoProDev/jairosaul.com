# Benchmark técnico — agencias de turismo de Cusco

**Medición directa por HTTP, portadas, 09/08/2026.** Datos de laboratorio, no de campo.

| Sitio | TTFB | Peso portada | `hreflang` | Schema emitido |
|---|---|---|---|---|
| **Valencia Travel Cusco** | 0,86 s | 179 KB | ❌ 0 | ✅ `TravelAgency`, `TouristTrip`, `AggregateRating`, `PostalAddress`, `ContactPoint`, `Organization`, `BreadcrumbList` |
| **TreXperience Peru** | 0,73 s | 255 KB | ✅ `en` + `es` | ⚠️ mínimo |
| **Alpaca Expeditions** | 1,35 s | **516 KB** | ❌ 0 | ⚠️ `Organization`, `ContactPoint` |
| Inca Trail Machu | 0,87 s | 60 KB | ❌ 0 | ⚠️ mínimo |
| **Peru Grand Travel (EN)** | **1,04 s** | 215 KB | ❌ 0 | ⚠️ `Organization`, `WebPage`, `BreadcrumbList` |
| **Peru Grand Travel (PT)** | 0,10 s | **313 KB** | ❌ 0 | ⚠️ ídem |

---

## Lecturas

**1. Valencia Travel es el techo del sector en datos estructurados.** Emiten `TravelAgency` (con dirección postal y punto de contacto), `TouristTrip` y `AggregateRating` en portada. Peru Grand Travel emite un `Organization` genérico sin dirección ni valoración. Es la diferencia entre aparecer en Google como una empresa con entidad definida y estrellas, o como una web más.

**2. TreXperience ya declara `hreflang`** entre sus versiones en inglés y español. Peru Grand Travel, con **tres** dominios de idioma en lugar de dos, no declara ninguno. El competidor con la arquitectura más simple es el que sí resolvió el problema.

**3. Peru Grand Travel gana en velocidad de servidor en PT y pierde en EN.** 0,10 s en portugués contra 1,04 s en inglés, mismo stack. Confirma que el problema del dominio EN es de configuración (caché desactivada), no de infraestructura. **Es la corrección de mayor retorno por hora de todo el diagnóstico.**

**4. Nadie en el sector local está haciendo esto bien.** Ninguno de los cinco competidores medidos tiene la combinación completa (hreflang + schema de turismo + rendimiento). El sector entero está desatendido técnicamente. Para Peru Grand Travel eso es una ventaja disponible a corto plazo; para ti, un mercado de servicios sin ocupar en Cusco.

---

## Cómo usar esto en la conversación

No como ataque, sino como referencia externa:

> *"Valencia Travel ya emite `TravelAgency` con dirección y valoración, y `TouristTrip` en sus fichas. TreXperience ya declara hreflang entre sus dos idiomas. No es que ustedes estén mal en abstracto: es que en el mercado local ya hay quien está resolviendo esto, y ustedes tienen tres dominios en vez de dos, o sea más que ganar."*

Comparar con competidores concretos y nombrados convierte una recomendación técnica en una decisión de negocio con urgencia. Es la diferencia entre "deberían mejorar el schema" y "su competidor directo ya lo hizo".

---

## Ampliación pendiente (semana 1 del puesto)

Este benchmark cubre solo portadas. La versión completa exige rastrear el catálogo entero de cada competidor y comparar: número de URLs indexables, profundidad de clic, cobertura de contenido por clúster temático, y perfil de enlaces. Es un entregable de una semana y **la base para decidir dónde se puede ganar posiciones realmente**.

*Reproducible con `auditor_seo.py --dominios <competidor> --max 100`.*
