#!/usr/bin/env python3
"""
auditor_seo.py — Auditor SEO técnico para redes multidominio.

Diseñado para redes donde cada idioma vive en un dominio distinto
(Peru Grand Travel: EN, ES y PT en tres instalaciones WordPress).

Qué hace:
  1. Descubre URLs desde sitemap_index.xml de cada dominio.
  2. Descarga cada URL midiendo TTFB y peso.
  3. Extrae title, meta description, canonical, meta robots, H1, hreflang.
  4. Valida JSON-LD: presencia de Product/Offer y campos obligatorios
     (priceCurrency es el que más se olvida y bloquea rich results).
  5. Valida reciprocidad de hreflang entre todos los dominios de la red.
  6. Emite reporte en consola + CSV + JSON.

Uso:
    python3 auditor_seo.py --dominios ejemplo.com ejemplo.es --max 100
    python3 auditor_seo.py --dominios ejemplo.com --solo-hreflang

Dependencias: requests
    pip install requests

Autor: Jairo
"""

import argparse
import csv
import json
import re
import sys
import time
from collections import defaultdict
from urllib.parse import urlparse

import requests

# UA de navegador: muchos WAF devuelven 406 a user-agents de herramientas.
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}
TIMEOUT = 30

RE_TITLE = re.compile(r"<title[^>]*>(.*?)</title>", re.I | re.S)
RE_DESC = re.compile(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', re.I | re.S)
RE_CANON = re.compile(r'<link[^>]+rel=["\']canonical["\'][^>]*>', re.I)
RE_ROBOTS = re.compile(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'](.*?)["\']', re.I)
RE_H1 = re.compile(r"<h1[^>]*>", re.I)
RE_HREF_ATTR = re.compile(r'href=["\'](.*?)["\']', re.I)
RE_HREFLANG_TAG = re.compile(r"<link[^>]+hreflang=[^>]*>", re.I)
RE_HREFLANG_VAL = re.compile(r'hreflang=["\'](.*?)["\']', re.I)
RE_JSONLD = re.compile(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.I | re.S)
RE_IMG = re.compile(r"<img\s[^>]*>", re.I)


def log(msg):
    print(msg, flush=True)


def fetch(url):
    """Descarga una URL devolviendo (html, ttfb, bytes, status, url_final)."""
    try:
        t0 = time.time()
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT, allow_redirects=True)
        ttfb = round(time.time() - t0, 3)
        return r.text, ttfb, len(r.content), r.status_code, r.url
    except requests.RequestException as e:
        return None, None, 0, f"ERROR: {type(e).__name__}", url


def urls_desde_sitemaps(dominio, limite):
    """Recorre sitemap_index.xml y devuelve las URLs encontradas."""
    base = f"https://www.{dominio}"
    encontradas, indices = [], [f"{base}/sitemap_index.xml", f"{base}/sitemap.xml"]
    vistos = set()

    for idx in indices:
        xml, *_ = fetch(idx)
        if not xml:
            continue
        locs = re.findall(r"<loc>\s*(.*?)\s*</loc>", xml, re.I)
        if not locs:
            continue
        # Si son sub-sitemaps, entrar en cada uno.
        if any(l.endswith(".xml") for l in locs):
            for sub in locs:
                if sub in vistos:
                    continue
                vistos.add(sub)
                sub_xml, *_ = fetch(sub)
                if sub_xml:
                    encontradas += re.findall(r"<loc>\s*(.*?)\s*</loc>", sub_xml, re.I)
        else:
            encontradas += locs
        if encontradas:
            break

    encontradas = [u for u in dict.fromkeys(encontradas) if not u.endswith(".xml")]
    return encontradas[:limite]


def extraer_jsonld(html):
    bloques = []
    for raw in RE_JSONLD.findall(html):
        try:
            bloques.append(json.loads(raw.strip()))
        except json.JSONDecodeError:
            bloques.append({"__parse_error__": True})
    return bloques


def buscar_tipos(obj, acc=None):
    """Recolecta recursivamente todos los @type de un grafo JSON-LD."""
    acc = acc if acc is not None else []
    if isinstance(obj, dict):
        t = obj.get("@type")
        if isinstance(t, str):
            acc.append(t)
        elif isinstance(t, list):
            acc += [x for x in t if isinstance(x, str)]
        for v in obj.values():
            buscar_tipos(v, acc)
    elif isinstance(obj, list):
        for v in obj:
            buscar_tipos(v, acc)
    return acc


def buscar_offers(obj, acc=None):
    acc = acc if acc is not None else []
    if isinstance(obj, dict):
        t = obj.get("@type")
        if t == "Offer" or (isinstance(t, list) and "Offer" in t):
            acc.append(obj)
        for v in obj.values():
            buscar_offers(v, acc)
    elif isinstance(obj, list):
        for v in obj:
            buscar_offers(v, acc)
    return acc


def analizar(url):
    html, ttfb, peso, status, final = fetch(url)
    r = {
        "url": url, "url_final": final, "status": status, "ttfb_s": ttfb,
        "peso_kb": round(peso / 1024, 1) if peso else 0,
        "title": "", "long_title": 0, "meta_description": "", "long_desc": 0,
        "canonical": "", "canonical_autoref": None, "meta_robots": "",
        "h1_count": 0, "hreflang": [], "hreflang_count": 0,
        "tipos_schema": [], "tiene_product": False, "tiene_offer": False,
        "offer_sin_priceCurrency": False, "tiene_aggregateRating": False,
        "imgs": 0, "imgs_sin_alt": 0, "problemas": [],
    }
    if not html:
        r["problemas"].append("NO_DESCARGABLE")
        return r

    m = RE_TITLE.search(html)
    if m:
        r["title"] = re.sub(r"\s+", " ", m.group(1)).strip()
        r["long_title"] = len(r["title"])
    m = RE_DESC.search(html)
    if m:
        r["meta_description"] = re.sub(r"\s+", " ", m.group(1)).strip()
        r["long_desc"] = len(r["meta_description"])
    m = RE_CANON.search(html)
    if m:
        h = RE_HREF_ATTR.search(m.group(0))
        if h:
            r["canonical"] = h.group(1)
            r["canonical_autoref"] = (r["canonical"].rstrip("/") == final.rstrip("/"))
    m = RE_ROBOTS.search(html)
    if m:
        r["meta_robots"] = m.group(1).strip()

    r["h1_count"] = len(RE_H1.findall(html))

    for tag in RE_HREFLANG_TAG.findall(html):
        lang = RE_HREFLANG_VAL.search(tag)
        href = RE_HREF_ATTR.search(tag)
        if lang and href:
            r["hreflang"].append({"lang": lang.group(1), "href": href.group(1)})
    r["hreflang_count"] = len(r["hreflang"])

    for bloque in extraer_jsonld(html):
        r["tipos_schema"] += buscar_tipos(bloque)
        for offer in buscar_offers(bloque):
            r["tiene_offer"] = True
            if "priceCurrency" not in offer and "price" in offer:
                r["offer_sin_priceCurrency"] = True
    r["tipos_schema"] = sorted(set(r["tipos_schema"]))
    r["tiene_product"] = "Product" in r["tipos_schema"]
    r["tiene_aggregateRating"] = "AggregateRating" in r["tipos_schema"] or "aggregateRating" in html

    imgs = RE_IMG.findall(html)
    r["imgs"] = len(imgs)
    r["imgs_sin_alt"] = sum(1 for i in imgs if "alt=" not in i.lower())

    # Reglas de diagnóstico
    p = r["problemas"]
    if not r["title"]:
        p.append("TITLE_AUSENTE")
    elif r["long_title"] > 65:
        p.append("TITLE_LARGO")
    if not r["meta_description"]:
        p.append("META_DESC_AUSENTE")
    if not r["canonical"]:
        p.append("CANONICAL_AUSENTE")
    elif r["canonical_autoref"] is False:
        p.append("CANONICAL_CRUZADO")
    if r["h1_count"] == 0:
        p.append("SIN_H1")
    elif r["h1_count"] > 1:
        p.append("MULTIPLES_H1")
    if r["hreflang_count"] == 0:
        p.append("SIN_HREFLANG")
    if r["tiene_product"] and not r["tiene_offer"]:
        p.append("PRODUCT_SIN_OFFER")
    if r["offer_sin_priceCurrency"]:
        p.append("OFFER_SIN_PRICECURRENCY")
    if r["tiene_product"] and not r["tiene_aggregateRating"]:
        p.append("PRODUCT_SIN_AGGREGATERATING")
    if r["ttfb_s"] and r["ttfb_s"] > 0.8:
        p.append("TTFB_ALTO")
    if r["peso_kb"] > 200:
        p.append("HTML_PESADO")
    if r["imgs_sin_alt"] > 0:
        p.append(f"IMGS_SIN_ALT({r['imgs_sin_alt']})")
    return r


def validar_reciprocidad(resultados):
    """Comprueba que si A declara a B, B declare a A. Devuelve lista de fallos."""
    mapa = {r["url_final"].rstrip("/"): r for r in resultados if r.get("url_final")}
    fallos = []
    for r in resultados:
        origen = (r.get("url_final") or "").rstrip("/")
        for alt in r["hreflang"]:
            destino = alt["href"].rstrip("/")
            if alt["lang"].lower() == "x-default":
                continue
            if destino == origen:
                continue
            if destino not in mapa:
                fallos.append({"origen": origen, "destino": destino,
                               "motivo": "DESTINO_NO_RASTREADO_O_INEXISTENTE"})
                continue
            vuelta = [a["href"].rstrip("/") for a in mapa[destino]["hreflang"]]
            if origen not in vuelta:
                fallos.append({"origen": origen, "destino": destino,
                               "motivo": "SIN_ENLACE_DE_RETORNO"})
    return fallos


def main():
    ap = argparse.ArgumentParser(description="Auditor SEO técnico multidominio")
    ap.add_argument("--dominios", nargs="+", required=True, help="Dominios sin protocolo, ej: ejemplo.com")
    ap.add_argument("--max", type=int, default=50, help="Máx. URLs por dominio")
    ap.add_argument("--pausa", type=float, default=0.5, help="Segundos entre peticiones (sé educado)")
    ap.add_argument("--salida", default="auditoria", help="Prefijo de los archivos de salida")
    args = ap.parse_args()

    todos = []
    for d in args.dominios:
        log(f"\n=== Descubriendo URLs en {d} ===")
        urls = urls_desde_sitemaps(d, args.max)
        log(f"  {len(urls)} URLs encontradas")
        for i, u in enumerate(urls, 1):
            log(f"  [{i}/{len(urls)}] {u}")
            todos.append(analizar(u))
            time.sleep(args.pausa)

    if not todos:
        log("No se obtuvieron URLs. ¿Sitemap accesible?")
        sys.exit(1)

    # Reporte agregado
    log("\n" + "=" * 70)
    log("RESUMEN DE PROBLEMAS")
    log("=" * 70)
    conteo = defaultdict(int)
    for r in todos:
        for p in r["problemas"]:
            conteo[re.sub(r"\(\d+\)", "", p)] += 1
    for k, v in sorted(conteo.items(), key=lambda x: -x[1]):
        log(f"  {v:>4}  {k}")

    log("\n" + "=" * 70)
    log("RECIPROCIDAD HREFLANG")
    log("=" * 70)
    fallos = validar_reciprocidad(todos)
    if not fallos:
        sin = sum(1 for r in todos if r["hreflang_count"] == 0)
        if sin == len(todos):
            log("  Ninguna URL declara hreflang. En una red multidominio por idioma,")
            log("  esto es un hallazgo crítico, no una ausencia de errores.")
        else:
            log("  Sin fallos de reciprocidad detectados.")
    else:
        for f in fallos[:40]:
            log(f"  {f['motivo']}: {f['origen']} -> {f['destino']}")
        log(f"  Total de fallos: {len(fallos)}")

    # Exportación
    csv_path = f"{args.salida}.csv"
    campos = ["url", "status", "ttfb_s", "peso_kb", "title", "long_title", "long_desc",
              "canonical", "canonical_autoref", "meta_robots", "h1_count", "hreflang_count",
              "tiene_product", "tiene_offer", "offer_sin_priceCurrency",
              "tiene_aggregateRating", "imgs", "imgs_sin_alt", "problemas"]
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=campos, extrasaction="ignore")
        w.writeheader()
        for r in todos:
            fila = dict(r)
            fila["problemas"] = "|".join(r["problemas"])
            w.writerow(fila)

    with open(f"{args.salida}.json", "w", encoding="utf-8") as f:
        json.dump({"urls": todos, "fallos_hreflang": fallos}, f, ensure_ascii=False, indent=2)

    log(f"\nGuardado: {csv_path} y {args.salida}.json")
    log(f"URLs analizadas: {len(todos)}")


if __name__ == "__main__":
    main()
