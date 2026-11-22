#!/usr/bin/env bash
# Assemble dist/ for the sisyphusdev.com Worker (SDEV-D-04).
# Each domain keeps its own web files; this script mounts them at their paths.
# Run from the repo root: bash scripts/build-site.sh
set -euo pipefail

cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist

# Home page and app directory -> /
cp -R Workstreams/Sisyphusdev_Site/site/public/. dist/

# Apps: "<source folder>:<path on the site>"
apps=(
  "Workstreams/POSIWID_Analysis/app:posiwid"
)

for entry in "${apps[@]}"; do
  src="${entry%%:*}"
  dest="dist/${entry##*:}"
  if [ ! -f "$src/index.html" ]; then
    echo "build-site: missing $src/index.html" >&2
    exit 1
  fi
  mkdir -p "$dest"
  cp -R "$src/." "$dest/"
done

echo "build-site: $(find dist -type f | wc -l | tr -d ' ') files in dist/"
