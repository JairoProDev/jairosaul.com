# Portafolio: qué construir y cómo empaquetarlo

**Principio rector:** no construyes portafolio para "demostrar que sabes". Construyes **la prueba de que ya empezaste a trabajar para ellos sin que te contraten**. Nadie despide a alguien que ya está resolviendo su problema.

---

## Los 6 activos, por orden de valor

### 1. La auditoría de SU red de dominios 🥇
**El único entregable indispensable.** Documento 02, verificado por ti y ampliado con tu propio crawl.
- Formato: PDF con portada, índice, tabla de severidades, capturas de pantalla, comandos de verificación.
- Longitud objetivo: 12-18 páginas. Ni una línea de relleno.
- Incluye siempre la sección *"qué no pude evaluar sin accesos"* — la honestidad sobre los límites del diagnóstico es lo que distingue a un profesional de un vendedor.
- **No lo publiques en abierto.** Enlace privado (Drive/Notion sin indexar) o adjunto directo.

### 2. El Loom de 5 minutos 🥈
El activo con mayor tasa de conversión, y el que casi nadie graba.
- Estructura: 30 s de quién eres → 3 min recorriendo los 3 hallazgos principales **en pantalla, sobre su sitio en vivo** → 60 s de plan de 30 días → 30 s de cierre.
- Muestra la consola: `curl ... | grep hreflang → 0`. Ver el cero en vivo es más persuasivo que cualquier gráfico.
- Sin música, sin intro animada, sin traje. Cámara pequeña en esquina. Tono de colega que encontró algo, no de vendedor.
- **Por qué funciona:** demuestra simultáneamente conocimiento técnico, capacidad de comunicación y nivel de inglés/portugués si lees fragmentos de su sitio en pantalla.

### 3. El mapa de equivalencias hreflang 🥉
Hoja de cálculo con las ~50-60 correspondencias de tours entre sus tres dominios (`URL EN | URL ES | URL PT-BR | tipo | notas`).
- Es trabajo manual, aburrido y valioso. **Nadie más lo va a traer.**
- Es el insumo exacto que se necesita para implementar la solución del hallazgo crítico #1.
- Regálalo. Sí, regálalo. Es lo que convierte "candidato interesante" en "necesitamos a esta persona ya".

### 4. `auditor_seo.py` — el auditor automático
Ya lo tienes funcionando (archivo adjunto). Súbelo a GitHub con:
- README con capturas de la salida real
- Ejemplo de uso y de reporte generado
- Licencia MIT
- Un `requirements.txt`

**Qué comunica:** que puedes monitorear la salud técnica de forma continua y automática, no una vez al trimestre. Eso es lo que un desarrollador aporta y un analista SEO estándar no.

### 5. `hreflang-multidominio.php` — el prototipo de solución
También adjunto y listo. Comunica: *"no solo detecto el problema, traigo el código que lo arregla en tu stack concreto (WordPress + tema Goodlayers), probado."*

### 6. Librería de plantillas JSON-LD para turismo
Un repo o Gist con plantillas válidas y comentadas de: `TravelAgency`, `Product` + `Offer` completo, `AggregateRating`, `Review`, `FAQPage`, `TouristTrip`, `BreadcrumbList`. Todas validadas contra la Prueba de Resultados Enriquecidos.
- Reutilizable en tus otros proyectos y en cualquier cliente futuro.
- Bajo esfuerzo, alta percepción de valor.

---

## Estudios de caso propios (para la web de tu portafolio)

Además de lo anterior, necesitas 2-3 casos donde **tú** seas el sujeto, con métricas de antes/después:

1. **"De 42 a 96 en rendimiento móvil"** — toma uno de tus propios sitios, mídelo, arréglalo, vuelve a medirlo. Documenta cada cambio y su efecto aislado.
2. **"hreflang entre 2 dominios: implementación y validación"** — tu laboratorio, con capturas del informe de Segmentación internacional de GSC antes y después.
3. **"Auditoría comparativa de 5 agencias de Cusco"** — matriz de salud técnica del sector. Te posiciona como alguien que entiende el mercado local, no solo la teoría. Y es contenido publicable que puede atraer a otras agencias (plan B: si Peru Grand Travel no responde, ese documento es tu carta de presentación para las otras cuatro).

---

## El paquete de entrega

Una sola página (Notion, o HTML propio — eres desarrollador, monta la tuya) con:

```
┌─────────────────────────────────────────────────┐
│  Auditoría SEO Técnica — Peru Grand Travel      │
│  Preparada por Jairo · Cusco · [fecha]          │
├─────────────────────────────────────────────────┤
│  ▶ Video de 5 min (Loom)                        │
│  📄 Auditoría completa (PDF, 16 pág.)           │
│  📊 Mapa de equivalencias hreflang (hoja)       │
│  💻 Prototipo de implementación (GitHub)        │
│  🔧 Auditor automático (GitHub)                 │
│  📅 Plan de 30 días                             │
├─────────────────────────────────────────────────┤
│  Contacto directo: [WhatsApp] [correo]          │
└─────────────────────────────────────────────────┘
```

Un enlace. Todo dentro. Sin pedir registro, sin pedir nada a cambio.

---

## Errores de portafolio que te descalifican

| Error | Por qué mata |
|---|---|
| Publicar la auditoría de ellos en abierto | Expones vulnerabilidades de su negocio sin permiso. Es motivo de rechazo inmediato. |
| Métricas inventadas o redondeadas hacia arriba | En SEO todo es verificable. Una cifra inflada y se acabó. |
| Diseño recargado sobre contenido flojo | El puesto es técnico. Un PDF sobrio con hallazgos duros gana a uno bonito y vacío. |
| Adjuntar 8 archivos por correo | Un enlace. Siempre un enlace. |
| No fechar la auditoría | Sin fecha, no se puede verificar y parece plantilla genérica. |
