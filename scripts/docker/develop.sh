#!/bin/sh
set -e

TARGET_DIR="${THEME_NAME:-/}"
cd /"${TARGET_DIR}"
bun install
bun run init
bun run dev &
hugo server --bind 0.0.0.0 --buildDrafts --theme ${THEME_NAME} --themesDir ../.. -s ./exampleSite --disableFastRender
