#!/bin/sh

TARGET_DIR="${THEME_NAME:-/}"
cd /"${TARGET_DIR}"
cp /release/assets/css/compiled/* ./assets/css/compiled/
hugo --minify --buildDrafts --theme ${THEME_NAME} --themesDir ../.. -s ./exampleSite
