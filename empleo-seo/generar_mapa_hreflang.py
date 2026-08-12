#!/usr/bin/env python3
"""
generar_mapa_hreflang.py

Fuente de verdad de las equivalencias entre los tres dominios de la red.
A partir de esta tabla genera:
  1. equivalencias-hreflang.csv   -> para revisión humana y para el cliente
  2. hreflang-mapa.php            -> array listo para pegar en el plugin
  3. gaps-de-catalogo.csv         -> productos que faltan por mercado
  4. Resumen por consola

Los slugs se extrajeron de los tour-sitemap.xml de los tres dominios el
09/08/2026. La correspondencia semántica es manual: no hay forma automática
fiable de saber que "vinicunca-montana-de-colores" y "montanha-colorida" son
el mismo producto.

CONFIANZA:
  alta   -> correspondencia inequívoca (mismo producto, mismos días)
  media  -> muy probable, conviene abrir ambas fichas y confirmar itinerario
"""

import csv
import json

DOM = {
    "en": "https://www.perugrandtravel.com",
    "es": "https://www.viajesmachupicchutours.com",
    "pt-BR": "https://www.machupicchupacotes.com",
}
PREFIJO = {"en": "/tour/", "es": "/tour/", "pt-BR": "/pacote/"}

# (nombre_producto, slug_en, slug_es, slug_pt, confianza)
# None = el producto NO existe en ese mercado.
MAPA = [
    # ---------- Home ----------
    ("Home", "", "", "", "alta"),

    # ---------- Full day Cusco ----------
    ("City Tour Cusco", "city-tour-in-cusco", "cusco-city-tour", "city-tour-cusco", "alta"),
    ("Planetario Cusco", "cusco-planetarium", "planetario-cusco", "planetario-cusco", "alta"),
    ("Matrimonio Andino", "andean-wedding-full-day", "matrimonio-andino-full-day", "casamento-andino-full-day", "alta"),
    ("Laguna Humantay", "humantay-lake-full-day", "laguna-humantay-full-day", "laguna-humantay-1d", "alta"),
    ("Vinicunca / Montaña de Colores", "rainbow-mountain-full-day", "vinicunca-montana-de-colores-1-dia", "montanha-colorida-1d", "alta"),
    ("Vinicunca en cuatrimoto", "atv-rainbow-mountain", "montana-de-7-colores-en-cuatrimoto", "montanha-colorida-quadricilo", "alta"),
    ("Palccoyo", "palccoyo-rainbow-mountain-full-day", "palccoyo-cordillera-de-arcoiris-1-dia", "montanha-palccoyo-1d", "alta"),
    ("7 Lagunas de Ausangate", "ausangate-7-lakes-day-trip", "caminata-7-lagunas-ausangate", "7-lagunas-ausangate", "alta"),
    ("Qeswachaka", "qeswachaka-bridge-full-day", "qeswachaka-4-lagunas-full-day", "qeswachaka-1d", "media"),
    ("Maras, Moray y Salineras", "maras-moray-and-the-salineras-full-day", "salineras-maras-moray", "salineras-maras-moray", "alta"),
    ("Maras Moray en cuatrimoto", "maras-moray-and-salineras-atv-tour", "maras-moray-salineras-quatrimoto", "salineras-maras-moray-de-quadriciclo", "alta"),
    ("Maras Moray en bicicleta", "tour-by-bike-maras-moray-and-salineras", "bike-maras-moray-salineras", "moray-e-salineiras-bike-1d", "alta"),
    ("Valle Sur de Cusco", "tour-south-valley-cusco", "tour-valle-sur-cusco", "vale-sul", "alta"),
    ("Waqrapukara", "tour-waqrapukara-cusco", "tour-waqrapukara-cusco", None, "alta"),
    ("Cañón del Cóndor", "condor-canyon-cusco-full-day", None, None, "alta"),
    ("Domo Laguna Piuray", "dome-piuray-lagoon", None, None, "alta"),
    ("Rafting y Tirolesa", "cusco-rafting-and-zipline", None, "cusco-rafting-tirolesa-1d", "alta"),
    ("Machu Picchu Full Day", "machu-picchu-full-day", "machu-picchu-1-dia", "machu-picchu-full-day", "alta"),

    # ---------- Valle Sagrado ----------
    ("Valle Sagrado de los Incas", "sacred-valley-of-the-incas-tour", "tour-valle-sagrado-de-los-incas", "vale-sagrado-dos-incas", "alta"),
    ("Valle Sagrado VIP / Super", "super-sacred-valley-tour", "tour-valle-sagrado-de-los-incas-vip", None, "alta"),
    ("Valle Sagrado + Machu Picchu 2D", "sacred-valley-machu-picchu-2d", "valle-sagrado-y-machu-picchu-2d", "vale-sagrado-e-machu-picchu-2d", "alta"),

    # ---------- Trekking ----------
    ("Camino Inca Clásico 4D", "classic-inca-trail-4d", "camino-inca-clasico-4-dias", "trilha-inca-classica-4d", "alta"),
    ("Camino Inca 7D", "classic-inca-trail-7-days", "camino-inca-7d-traslados", "trilha-inca-classica-7d", "alta"),
    ("Camino Inca Corto 2D", "short-inca-trail-2d", "camino-inca-corto-2-dias", "trilha-inca-curta-2d", "alta"),
    ("Camino Inca Corto + Valle Sagrado 3D", "sacred-valley-short-inca-trail-3d", "camino-inca-corto-valle-sagrado-3-dias", "vale-sagrado-trilha-inca-curta-3d", "alta"),
    ("Inca Jungle 4D", "inca-jungle-trek-4d", "camino-inca-jungle-4-dias", "inca-jungle-bike-4d", "alta"),
    ("Inca Jungle Combinada 7D", "inca-jungle-combined-7d", "camino-inca-jungle-aventura-7-dias", "inca-jungle-combinada-7d", "alta"),
    ("Salkantay Trek 4D", "salkantay-trek-4-days", "salkantay-trek-4d", "trilha-salkantay-4d", "alta"),
    ("Salkantay Sky 5D", "the-classic-salkantay-trek-5d", "camino-salkantay-sky-machu-picchu-5-dias", "trilha-salkantay-sky-5d", "media"),
    ("Salkantay Combinada 7D", None, "camino-inca-salkantay-machu-picchu-7-dias", "trilha-salkantay-combinada-7d", "media"),
    ("Humantay + Salkantay Pass 2D", "trek-humantay-salkantay-2d", None, "trilha-laguna-humantay-salkantay-pass-2-dias", "alta"),
    ("Lares Trek 4D", "lares-trek-4d", "lares-machu-picchu-4-dias", "trilha-lares-4d", "alta"),
    ("Choquequirao 5D", "choquequirao-trek-5d", "choquequirao-5-dias", "trilha-choquequirao-5d", "alta"),

    # ---------- Paquetes Machu Picchu ----------
    ("Machu Picchu Express 3D", "machu-picchu-express-3d", "cusco-machu-picchu-3-dias", "machu-picchu-express-3d", "alta"),
    ("Machu Picchu 2D", "incredible-machu-picchu-2d", "cusco-machu-picchu-2-dias", None, "alta"),
    ("Machu Picchu Moderado 4D", "machu-picchu-moderate-4d", "cusco-machu-picchu-4-dias", "machu-picchu-4d", "alta"),
    ("Machu Picchu Clásico 5D", "classic-machu-picchu-5d", "machu-picchu-clasico-5d", "machu-picchu-classico-5d", "alta"),
    ("Machu Picchu + Humantay 6D", "machu-picchu-humantay-lake-6d", "machu-picchu-laguna-humantay-6-dias", "machu-picchu-laguna-humantay-6d", "alta"),
    ("Machu Picchu Picnic con Llamas 7D", "machu-picchu-experience-picnic-with-llamas-7d", "machu-picchu-picnic-con-llamas-7d", "machu-picchu-piquenique-com-lhamas-7d", "alta"),
    ("Increíble Experiencia Machu Picchu 7D", "incredible-experience-machu-picchu-7d", "cusco-valle-sagrado-machu-picchu-7-dias", "incrivel-experiencia-machu-picchu-7d", "media"),
    ("Desafío Machu Picchu 8D", "machu-picchu-challenge-8d", "desafio-machu-picchu-8d", "desafio-machu-picchu-8d", "alta"),
    ("Machu Picchu Inolvidable 8D", "unforgettable-machu-picchu-8d", "cusco-machu-picchu-inolvidable-8-dias", "machu-picchu-inesquecivel-8d", "alta"),
    ("Encuentro de los Incas 8D", "inca-encounters-8d", "encuentro-de-los-incas-8-dias", "machu-picchu-com-alpacas-8-dias", "media"),
    ("Machu Picchu Extreme Challenge", "machu-picchu-extreme-challenge", "desafio-de-los-incas-15-dias", None, "media"),

    # ---------- Circuitos largos ----------
    ("Cusco Espectacular 7D", "spectacular-cusco-7-days", "cusco-espectacular-7d", "cusco-espetacular-7d", "alta"),
    ("Perú Espectacular 10D", "spectacular-peru-10d", "peru-espectacular-10-dias", "peru-espetacular-10d", "alta"),
    ("Perú Histórico y Gastronómico 10D", "gastronomic-and-historic-peru-10d", "peru-historico-gastronomico-10-dias", "peru-historico-e-gastronomico-10d", "alta"),
    ("Orígenes de los Incas 10D", "origins-of-the-incas-10d", "origenes-de-los-incas-10d", "peru-mistico-10-dias", "media"),
    ("Fascinante Aventura en los Andes 11D", "fascinating-adventure-challenge-in-the-andes-11-days", "fascinante-aventura-y-desafio-en-los-andes-11d", "fascinante-aventura-desafio-nos-andes-11d", "alta"),
    ("Perú Maravilloso 12D", "wonderful-peru-12-days", "peru-maravilloso-12d", "peru-maravilhoso-12d", "alta"),
    ("Maravillas del Perú 13D", "wonder-of-peru-coast-andes-and-rainforest-13d", "explora-las-maravillas-del-peru-13d", None, "alta"),
    ("Orígenes y Misterios de los Andes 16D", "origins-and-mysteries-of-the-andes-16d", "origenes-y-misterios-de-los-andes-16d", "origens-e-misterios-dos-andes-16d", "alta"),
    ("Tesoros Escondidos Huaraz 17D", "hidden-treasures-huaraz-17d", "increibles-tesoros-escondidos-huaraz-17d", "tesouros-escondidos-huaraz-17d", "alta"),

    # ---------- Lima / Costa / Norte ----------
    ("Lima Colonial + Tierra Sagrada 7D", "colonial-lima-and-sacred-land-of-the-incas-7d", "lima-colonial-tierra-sagrada-de-los-incas-7-dias", "lima-colonial-e-terra-sagrada-dos-incas-7d", "alta"),
    ("Lima Colonial + Huacachina 9D", "colonial-lima-huacachina-and-sacred-land-of-the-incas-9-days", "lima-colonial-huacachina-y-tierra-sagrada-de-los-incas-9d", "lima-colonial-huacachina-e-terra-sagrada-dos-incas-9d", "alta"),
    ("Lima Colonial + Matrimonio Andino 8D", None, None, "lima-colonial-terra-sagrada-dos-incas-casamento-andino-8-dias", "alta"),
    ("Islas Ballestas + Huacachina", "ballestas-huacachina-islands-full-day", "islas-ballestas-huacachina-full-day", None, "alta"),
    ("Ruta Moche: Chiclayo y Trujillo 5D", "moche-route-chiclayo-and-trujillo-5d", "tours-a-trujillo-y-chiclayo", "rota-moche-chiclayo-e-trujillo-5d", "alta"),

    # ---------- Amazonía ----------
    ("Amazonía 4D (Tambopata)", "amazon-rainforest-4d", "tour-tambopata-4dias", None, "alta"),
    ("Amazonía Express 3D", "amazon-rainforest-express-3d", "amazonia-express", None, "alta"),
    ("Perú Amazonía 9D", "peru-amazon-rainforest-9d", "peru-cultura-viva-eco-amazonia", None, "media"),
    ("Cusco + Selva Amazónica", None, "explora-cusco-selva-amazonica", None, "alta"),
    ("Camino Inca Corto + Amazonía 8D", "short-inca-trail-with-amazon-rainforest-8d", None, None, "alta"),

    # ---------- Festividades ----------
    ("Inti Raymi", "inti-raymi-full-day", "inti-raymi-fiesta-del-sol-full-day", "inti-raymi-1d", "alta"),
    ("Corpus Christi", "cusco-corpus-christi", "corpus-christi-cusco-4d-3n", "corpus-christi-cusco-4d", "alta"),
    ("Semana Santa", "holy-week-in-cusco", "semana-santa-en-cusco-6d", "semana-santa-cusco-6d", "alta"),
    ("Año Nuevo / Réveillon Machu Picchu", None, None, "reveillon-machu-picchu", "alta"),

    # ---------- Lujo (solo EN) ----------
    ("Grand Deluxe Belmond 5D", "grand-deluxe-cusco-machu-picchu-by-belmond-5-days", None, None, "alta"),
    ("Grand Deluxe Casa Andina 5D", "grand-deluxe-cusco-machu-picchu-by-casa-andina-hotels-5-days", None, None, "alta"),
    ("Grand Deluxe Inkaterra 5D", "grand-deluxe-cusco-machu-picchu-by-inkaterra-hotels-5-days", None, None, "alta"),
    ("Grand Deluxe Luxury Collection 5D", "grand-deluxe-cusco-machu-picchu-by-luxury-collection-hotels-5-days", None, None, "alta"),
    ("Grand Deluxe Belmond Andean Explorer 10D", "peru-grand-deluxe-by-belmond-andean-explorer-10-days", None, None, "alta"),
    ("Grand Deluxe Lima-Cusco-MP 7D", "peru-grand-deluxe-lima-cusco-machu-picchu-7days", None, None, "alta"),
]

# Duplicados internos detectados (canibalización dentro de un mismo dominio)
DUPLICADOS = [
    ("es", "/tour/bike-maras-moray-salineras/", "/tour/maras-moray-en-bicicleta/",
     "Dos URLs distintas para el mismo producto en el mismo dominio: "
     "canibalización interna. Consolidar con 301 a la preferida."),
]


def url(idioma, slug):
    if slug is None:
        return None
    if slug == "":
        return DOM[idioma] + "/"
    return DOM[idioma] + PREFIJO[idioma] + slug + "/"


def main():
    filas, gaps, grupos_php = [], [], []
    n_triadas = n_parciales = 0

    for nombre, s_en, s_es, s_pt, conf in MAPA:
        u = {"en": url("en", s_en), "es": url("es", s_es), "pt-BR": url("pt-BR", s_pt)}
        presentes = [k for k, v in u.items() if v]

        filas.append({
            "producto": nombre,
            "url_en": u["en"] or "— NO EXISTE —",
            "url_es": u["es"] or "— NO EXISTE —",
            "url_pt_BR": u["pt-BR"] or "— NO EXISTE —",
            "idiomas": len(presentes),
            "confianza": conf,
        })

        if len(presentes) == 3:
            n_triadas += 1
        else:
            n_parciales += 1
            for falta in [k for k in u if not u[k]]:
                gaps.append({
                    "producto": nombre,
                    "mercado_faltante": falta,
                    "existe_en": ", ".join(presentes),
                    "url_referencia": u[presentes[0]],
                })

        # Solo se emite hreflang entre las versiones que existen realmente.
        if len(presentes) >= 2:
            grupos_php.append({k: v for k, v in u.items() if v})

    with open("equivalencias-hreflang.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=["producto", "url_en", "url_es", "url_pt_BR", "idiomas", "confianza"])
        w.writeheader()
        w.writerows(filas)

    with open("gaps-de-catalogo.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=["producto", "mercado_faltante", "existe_en", "url_referencia"])
        w.writeheader()
        w.writerows(gaps)

    # Array PHP listo para pegar en hreflang-multidominio.php
    lineas = ["<?php", "// Generado por generar_mapa_hreflang.py — no editar a mano.",
              "// Pegar como valor de $HREFLANG_MAPA en hreflang-multidominio.php", "",
              "$HREFLANG_MAPA = array("]
    for g in grupos_php:
        lineas.append("\tarray(")
        for k, v in g.items():
            lineas.append(f"\t\t'{k}' => '{v}',")
        lineas.append("\t),")
    lineas += [");", ""]
    with open("hreflang-mapa.php", "w", encoding="utf-8") as f:
        f.write("\n".join(lineas))

    with open("equivalencias-hreflang.json", "w", encoding="utf-8") as f:
        json.dump({"grupos": grupos_php, "gaps": gaps}, f, ensure_ascii=False, indent=2)

    print(f"Productos mapeados        : {len(MAPA)}")
    print(f"  presentes en 3 idiomas  : {n_triadas}")
    print(f"  presentes en 1 o 2      : {n_parciales}")
    print(f"Grupos hreflang emitibles : {len(grupos_php)}")
    print(f"Huecos de catálogo        : {len(gaps)}")
    print()
    for m in ("en", "es", "pt-BR"):
        print(f"  faltan en {m:<6}: {sum(1 for g in gaps if g['mercado_faltante'] == m)} productos")
    print()
    print("Duplicados internos detectados:")
    for d in DUPLICADOS:
        print(f"  [{d[0]}] {d[1]}  <->  {d[2]}")
    print("\nGenerados: equivalencias-hreflang.csv · gaps-de-catalogo.csv · "
          "hreflang-mapa.php · equivalencias-hreflang.json")


if __name__ == "__main__":
    main()
