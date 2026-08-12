# `robots.txt` corregidos — los tres dominios

Corrección de 10 minutos, entregable inmediato. Los errores actuales están fallando **en silencio**: bloqueos que creen tener y no tienen.

---

## Errores actuales

| Dominio | Línea actual | Problema |
|---|---|---|
| EN | `Disallow: https://www.perugrandtravel.com/tptscode/shortcode-google-reviews/` | Ruta absoluta. **El estándar exige ruta relativa: esta línea no bloquea nada.** Lo mismo con las otras dos de `tptscode`. |
| ES | `Disallow: //wp-includes/` | Doble barra: no coincide con `/wp-includes/`. No bloquea nada. |
| EN, ES | `Disallow: */page/*` | Bloquea toda la paginación de archivos y corta rutas de rastreo hacia contenido profundo. |
| EN, ES | *(ausente)* | **No declaran `Sitemap:`.** Solo el dominio PT lo hace. |
| EN | `Disallow: /*?s=` sin `Allow` para admin-ajax | El dominio ES sí permite `admin-ajax.php`; el EN no. Inconsistencia entre sitios del mismo grupo. |

---

## `perugrandtravel.com/robots.txt`

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-login
Disallow: /wp-includes/
Disallow: /tptscode/
Disallow: /*/feed/
Disallow: /*/trackback/
Disallow: /*/attachment/
Disallow: /author/
Disallow: /comments/
Disallow: /xmlrpc.php
Disallow: /*?s=
Disallow: /*?replytocom
Disallow: /?attachment_id

Sitemap: https://www.perugrandtravel.com/sitemap_index.xml
```

**Cambios:** `tptscode` ahora sí se bloquea (ruta relativa); se añade `Allow` de `admin-ajax.php` para que Google pueda renderizar; se elimina el bloqueo de paginación; se declara el sitemap.

---

## `viajesmachupicchutours.com/robots.txt`

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-login
Disallow: /wp-includes/
Disallow: /*/feed/
Disallow: /*/trackback/
Disallow: /*/attachment/
Disallow: /author/
Disallow: /comments/
Disallow: /xmlrpc.php
Disallow: /*?s=
Disallow: /*?replytocom
Disallow: /?attachment_id
Disallow: /tag/*/feed/

Sitemap: https://www.viajesmachupicchutours.com/sitemap_index.xml
```

**Cambios:** se corrige `//wp-includes/` → `/wp-includes/`; se elimina el bloqueo de paginación; se declara el sitemap.

---

## `machupicchupacotes.com/robots.txt`

Este es el que está bien. Solo conviene alinearlo con los otros dos para que la red sea coherente:

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-login
Disallow: /wp-includes/
Disallow: /*/feed/
Disallow: /*/trackback/
Disallow: /author/
Disallow: /xmlrpc.php
Disallow: /*?s=
Disallow: /?attachment_id

Sitemap: https://www.machupicchupacotes.com/sitemap_index.xml
```

---

## El principio que hay detrás (para la entrevista)

**`robots.txt` controla el rastreo, no la indexación.** Bloquear una URL ahí no la saca del índice — si tiene enlaces externos, Google puede seguir mostrándola sin poder leer su contenido, que es el peor de los dos mundos. Para desindexar hay que **permitir el rastreo** y usar `noindex` en meta robots o en la cabecera `X-Robots-Tag`.

Corolario práctico: bloquear la paginación en `robots.txt` no evita que se indexe — solo impide que Google recorra los enlaces que hay dentro. Si el objetivo era limpiar el índice, la herramienta era la equivocada.

---

## Verificación

```bash
curl -s -A "Mozilla/5.0" https://www.perugrandtravel.com/robots.txt
```

Y en Search Console: informe de `robots.txt` + probar URLs concretas con la Inspección de URL para confirmar que las que deben rastrearse se rastrean.
