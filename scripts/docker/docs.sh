#!/bin/sh
set -e

TARGET_DIR="${THEME_NAME:-/}"
cd /"${TARGET_DIR}"
cp -f /release/assets/css/compiled/* ./assets/css/compiled/
hugo --minify --buildDrafts --theme ${THEME_NAME} --themesDir ../.. -s ./exampleSite
