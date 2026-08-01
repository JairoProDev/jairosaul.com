#!/usr/bin/env bash
# Sync Villa Chaco static site → Buscadis (adis.lat) for deploy at buscadis.com/villachaco
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$(cd "$ROOT/../adis.lat/public/villachaco" && pwd)"

echo "→ Syncing Villa Chaco to $DEST"

mkdir -p "$DEST/images"

cp "$ROOT/index.html" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$DEST/"
cp "$ROOT/images/"*.jpg "$ROOT/images/"*.svg "$DEST/images/"
rm -f "$DEST/images/referencia-identidad-marca.jpg"

echo "✓ $(find "$DEST" -type f | wc -l) files ready in adis.lat/public/villachaco/"
echo "  Deploy: push adis.lat to production (Vercel)"
