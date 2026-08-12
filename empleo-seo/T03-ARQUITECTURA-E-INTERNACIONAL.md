# T03 — Arquitectura de información e internacionalización

Este es tu bloque de especialización. Es donde vive el hallazgo que te abre la puerta en Peru Grand Travel, y es la subdisciplina con menos profesionales competentes en el mercado hispano.

---

# PARTE 1 — ARQUITECTURA

## 1. Qué es y por qué es un problema de ingeniería

La arquitectura de información es **cómo se organizan y enlazan las URLs**. Determina tres cosas a la vez: qué encuentra el crawler, cómo se distribuye la autoridad interna, y si el usuario llega a lo que busca.

### Profundidad de clic (click depth)
Número mínimo de clics desde la portada. **Es una de las variables más correlacionadas con la indexación** en sitios medianos y grandes: lo que está a 5+ clics tiende a rastrearse poco y a indexarse mal.

No confundir con profundidad de URL: `/a/b/c/d/pagina/` puede estar a un clic si hay un enlace desde la portada. **La estructura de carpetas no determina la profundidad de clic.** Lo que importa son los enlaces.

Objetivo práctico: todo lo comercialmente relevante a **≤3 clics**.

### Distribución de autoridad interna
Cada página tiene una capacidad de transmitir señal que se reparte entre sus enlaces salientes. Consecuencias operativas:

- Un menú con 200 enlaces reparte muy fino.
- Los enlaces del pie de página cuentan, pero Google descuenta el *boilerplate* (lo que se repite en todas las páginas).
- **El enlace contextual desde el cuerpo del texto es el de mayor valor**: es el que un humano decidió poner.
- Enlazar mucho a "Aviso legal" y poco a tus productos es una decisión de arquitectura, aunque no la tomaras conscientemente.

### Silos y clústeres temáticos
Agrupar contenido relacionado y enlazarlo densamente entre sí, con una **página pilar** que centraliza.

```
PILAR: Guía del Camino Inca
  ↕ (enlace bidireccional con cada satélite)
  ├── Permisos del Camino Inca
  ├── Camino Inca vs Salkantay
  ├── Qué llevar
  └── → ficha de tour (conversión)
```

Por qué funciona, en términos de máquina: concentra vocabulario y entidades relacionadas, facilita que el sistema identifique de qué trata el sitio, y crea rutas de rastreo densas hacia el contenido profundo.

### Páginas huérfanas
Sin enlaces internos entrantes. Suelen aparecer en el sitemap pero no en la arquitectura. Se detectan cruzando el rastreo de Screaming Frog con la lista de URLs del sitemap (modo lista + comparación). Casi siempre son contenido antiguo o generado por el CMS que nadie enlazó.

### Estructura de URL
Importa menos de lo que se cree, pero:
- **Legible y estable.** Cambiar URLs tiene coste; hazlo solo con motivo.
- Minúsculas, guiones (no guiones bajos), sin parámetros innecesarios.
- Palabras clave en la URL: efecto pequeño y real, más para el usuario que para el algoritmo.
- Consistencia de barra final: elige una y redirige la otra.

### Navegación facetada — el mayor generador de basura
Filtros combinables generan explosión combinatoria: 5 filtros × 5 valores = miles de URLs de contenido casi idéntico. Estrategia:

1. Definir qué combinaciones tienen **demanda de búsqueda real** ("hoteles baratos en Cusco") → indexables, con contenido propio.
2. El resto → no enlazables por `<a>`, o bloqueadas en robots.txt, o `noindex`.
3. Nunca dejar que se generen infinitas y luego intentar limpiar.

---

# PARTE 2 — SEO INTERNACIONAL

## 2. Las tres decisiones y el orden correcto

**Decisión 1: ¿qué segmentas — idioma, país, o ambos?**
- Idioma: contenido en español para todos los hispanohablantes.
- País: contenido para Perú, distinto del de México, aunque ambos en español (precio, moneda, oferta, envío).
- La mayoría solo necesita **idioma**. Segmentar por país sin necesidad multiplica el trabajo y los errores.

**Decisión 2: ¿qué estructura de URL?**

| Estructura | Ejemplo | Ventajas | Desventajas |
|---|---|---|---|
| **ccTLD** | `ejemplo.pe` | Señal geográfica más fuerte; confianza local | Caro; autoridad se construye desde cero en cada uno; gestión múltiple |
| **Subdominio** | `es.ejemplo.com` | Separación limpia; permite servidores distintos | Autoridad parcialmente separada |
| **Subcarpeta** | `ejemplo.com/es/` | **Toda la autoridad en un dominio**; más fácil de gestionar | Sin señal geográfica propia; hosting único |
| **Dominios distintos por idioma** | `ejemplo.com` + `otronombre.com` | Marca adaptada por mercado; palabras clave en el dominio | **La peor para autoridad**: cada dominio empieza de cero. Y hace el hreflang obligatorio |
| Parámetro | `?lang=es` | — | **No usar.** Google desaconseja |

**Consenso profesional actual: subcarpeta**, salvo motivo de negocio fuerte. Es la que concentra autoridad.

*Peru Grand Travel usa la cuarta opción (tres dominios distintos). Es una decisión defendible por marca —dominios con palabras clave en cada idioma— pero exige hreflang impecable, y hoy no tienen ninguno. De ahí que el hallazgo sea crítico y no cosmético.*

**Decisión 3: ¿cómo declaras las equivalencias?** → hreflang.

---

## 3. `hreflang` a fondo

### Qué es exactamente
Anotación que declara: *"esta URL y estas otras son la misma página para audiencias de distinto idioma o región."* Introducida por Google en 2011.

**Qué NO hace** (fuente de la mitad de las decepciones):
- **No es un factor de ranking.** No mejora posiciones.
- **No fuerza qué versión se muestra.** Es una señal fuerte, no una orden.
- **No resuelve contenido duplicado entre idiomas distintos** — eso ya no es duplicado.
- **Sí ayuda** cuando dos versiones comparten idioma (es-ES / es-MX): ahí sí evita que Google las trate como duplicados y elija una sola.

**Qué sí hace:** consolida las versiones como un grupo, sirve a cada mercado su versión, y evita que compitan entre sí.

### Sintaxis

```html
<link rel="alternate" hreflang="es" href="https://ejemplo.com/es/pagina/" />
<link rel="alternate" hreflang="pt-BR" href="https://ejemplo.com/pt/pagina/" />
<link rel="alternate" hreflang="en" href="https://ejemplo.com/en/page/" />
<link rel="alternate" hreflang="x-default" href="https://ejemplo.com/en/page/" />
```

**Los códigos:**
- Idioma: **ISO 639-1** (dos letras): `es`, `en`, `pt`, `de`
- Región opcional: **ISO 3166-1 alpha-2** (dos letras): `ES`, `MX`, `BR`, `US`
- Formato: `idioma` o `idioma-REGIÓN`. **Nunca solo región.** `hreflang="BR"` es inválido; se dice `pt-BR`.
- Errores clásicos: `en-UK` (no existe; es **`en-GB`**), `zh-CN` vs `zh-Hans` (el segundo es el sistema de escritura), `es-LA` (no existe América Latina como código de país).
- **`x-default`**: la versión para quien no encaja en ninguna. Típicamente un selector de idioma o la versión internacional en inglés.

### Las tres reglas que hacen que funcione o falle

1. **Reciprocidad.** Si A declara a B, B debe declarar a A. **Si falta el retorno, Google ignora la anotación entera.** Es, con diferencia, el error más frecuente.
2. **Autorreferencia.** Cada página debe incluirse a sí misma en su propio bloque.
3. **URLs canónicas, absolutas y finales.** Apuntar a una URL que redirige, que es `noindex` o cuya canónica es otra rompe el grupo.

**Interacción con canonical:** `hreflang` y `rel=canonical` deben ser coherentes. La canónica de cada página apunta **a sí misma**; el hreflang apunta a las hermanas. Poner canonical cruzada entre idiomas **elimina el sitio secundario del índice**. Es el error catastrófico de este bloque.

### Las tres formas de implementarlo

| Método | Cuándo usarlo | Coste |
|---|---|---|
| **HTML `<head>`** | Por defecto. Lo más común y depurable | Añade peso si hay muchos idiomas (n idiomas = n etiquetas en n páginas = n² anotaciones) |
| **Cabecera HTTP `Link:`** | Archivos no HTML (PDF), o cuando no controlas el head | Menos visible, más difícil de auditar |
| **Sitemap XML** | Sitios grandes o multidominio donde tocar el head es caro. **Escala mejor** | Requiere generación automática fiable |

Ejemplo en sitemap:

```xml
<url>
  <loc>https://ejemplo.com/es/pagina/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://ejemplo.com/en/page/"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://ejemplo.com/es/pagina/"/>
</url>
```

**No mezcles métodos.** Elige uno.

### El problema del multidominio con instalaciones separadas
Cuando cada idioma es una instalación distinta (caso PGT), no hay plugin que resuelva: WPML y Polylang operan **dentro** de una instalación. Hace falta un **mapa de equivalencias compartido** e inyectarlo en las tres. Ese mapa es trabajo manual y es exactamente lo que hace valioso el entregable que construimos.

### Errores catalogados

| Error | Efecto |
|---|---|
| Falta de retorno | Grupo ignorado |
| Código inválido (`en-UK`, `pt-PT-BR`) | Anotación descartada |
| URL con redirección | Grupo roto |
| Apuntar a página `noindex` | Grupo roto |
| Falta autorreferencia | Debilita el grupo |
| Canonical cruzada + hreflang | Contradicción: gana la canónica y desaparece la otra versión |
| URLs relativas | No válidas |
| Mezclar métodos | Comportamiento impredecible |
| Redirección automática por IP | **Muy grave**: Googlebot rastrea desde EE. UU.; si rediriges por IP nunca verá las otras versiones |

**Sobre la redirección automática:** nunca redirijas forzosamente por IP o por `Accept-Language`. **Sugiere** (banner, selector) y deja elegir. Google lo dice explícitamente y además es mejor UX.

### Cómo se verifica
1. `curl -s URL | grep hreflang` en ambas direcciones.
2. Script propio de reciprocidad (tienes uno en `auditor_seo.py`).
3. GSC → **Segmentación internacional** → pestaña hreflang: errores de "no hay etiqueta de retorno" y códigos desconocidos.
4. Screaming Frog: informe de hreflang con validación de reciprocidad.
5. Observación final: Rendimiento en GSC segmentado por país; ¿está entrando el tráfico correcto en la versión correcta?

---

## 4. Traducción vs localización vs transcreación

- **Traducción**: mismo contenido, otro idioma.
- **Localización**: adapta moneda, formato de fecha, unidades, referencias culturales, métodos de pago.
- **Transcreación**: reescribe para que funcione en el mercado destino, aunque se aleje del original.

**La intención de búsqueda cambia por mercado**, y esto es SEO puro, no lingüística: un brasileño busca precio, visado y clima; un estadounidense busca altitud, permisos y seguridad. Traducir literalmente produce contenido gramaticalmente correcto que **no responde a la consulta local**. Por eso la investigación de palabras clave debe hacerse **en cada mercado por separado**, nunca traduciendo la lista.

**Traducción automática**: Google ya no la penaliza por ser automática — penaliza el contenido de baja calidad, sea cual sea su origen. Una traducción automática revisada por un hablante nativo es aceptable. Sin revisar, en un mercado competitivo, no.

---

## 5. Otras señales geográficas

- **Segmentación por país en GSC**: disponible solo para dominios genéricos, y en desuso. Para ccTLD es automática.
- **Alojamiento y CDN**: efecto mínimo hoy en ranking, real en velocidad.
- **Moneda, dirección, teléfono local, idioma del contenido**: señales fuertes de relevancia local.
- **Enlaces desde el país destino**: la señal geográfica más fuerte que existe y la más difícil de conseguir.
- **Perfil de negocio de Google** para presencia física local.

---

## 6. Laboratorio

1. Monta dos subcarpetas de idioma en un sitio propio, implementa hreflang correcto, verifica en GSC.
2. Rompe la reciprocidad deliberadamente y observa el error aparecer en Segmentación internacional (tarda días: es un ejercicio de paciencia y realismo).
3. Implementa hreflang por sitemap en vez de por head y compara.
4. Ejecuta `auditor_seo.py` sobre una red multidominio real y lee el informe de reciprocidad.
5. Construye un mapa de equivalencias de 20 URLs entre dos idiomas. Cronométralo: aprenderás por qué nadie lo hace y por qué vale.

## 7. Autoevaluación

- ¿Por qué hreflang no mejora posiciones y aun así es crítico?
- ¿Qué pasa exactamente si falta la etiqueta de retorno?
- ¿`en-UK` o `en-GB`? ¿Por qué?
- ¿Cuándo elegirías subcarpeta y cuándo ccTLD?
- ¿Por qué es catastrófico redirigir por IP?
- ¿Cómo implementas hreflang entre tres instalaciones WordPress independientes?
- ¿Qué es `x-default` y qué pones ahí?
