#!/usr/bin/env bash
set -e
# Export PNGs from SVGs (requires ImageMagick or rsvg-convert/inkscape)
SRC_DIR="src/assets"
OUT_DIR="src/assets/exports"
mkdir -p "$OUT_DIR/icons"

# helper to convert with available tool
convert_svg() {
  local in="$1"; local out="$2"; local w="$3"; local h="$4"
  if command -v rsvg-convert >/dev/null 2>&1; then
    rsvg-convert -w "$w" -h "$h" "$in" -o "$out"
  elif command -v inkscape >/dev/null 2>&1; then
    inkscape "$in" --export-filename="$out" --export-width="$w" --export-height="$h"
  elif command -v convert >/dev/null 2>&1; then
    convert -background none -resize ${w}x${h} "$in" "$out"
  else
    echo "No SVG converter found (rsvg-convert / inkscape / convert). Skipping: $in -> $out"
    return 1
  fi
}

# icons to export
convert_svg "$SRC_DIR/icon_1024.svg" "$OUT_DIR/icons/icon_1024.png" 1024 1024 || true
convert_svg "$SRC_DIR/icon_512.svg" "$OUT_DIR/icons/icon_512.png" 512 512 || true
convert_svg "$SRC_DIR/icon_192.svg" "$OUT_DIR/icons/icon_192.png" 192 192 || true
convert_svg "$SRC_DIR/icon_96.svg" "$OUT_DIR/icons/icon_96.png" 96 96 || true

# export EN screenshots
mkdir -p "$OUT_DIR/screenshots/en"
for i in 1 2 3 4 5; do
  convert_svg "$SRC_DIR/screenshots/en/shot${i}.svg" "$OUT_DIR/screenshots/en/shot${i}.png" 1242 2688 || true
done

# export ES
mkdir -p "$OUT_DIR/screenshots/es"
for i in 1 2 3 4 5; do
  convert_svg "$SRC_DIR/screenshots/es/shot${i}.svg" "$OUT_DIR/screenshots/es/shot${i}.png" 1242 2688 || true
done

# export FR
mkdir -p "$OUT_DIR/screenshots/fr"
for i in 1 2 3 4 5; do
  convert_svg "$SRC_DIR/screenshots/fr/shot${i}.svg" "$OUT_DIR/screenshots/fr/shot${i}.png" 1242 2688 || true
done

echo "Export complete (if converter available). See $OUT_DIR"
