#!/bin/sh
set -e

cd /"${THEME_NAME}"

echo "🔄 Syncing Hugo module dependencies..."
hugo mod npm pack

echo "📦 Installing npm dependencies..."
npm install
export PATH="/${THEME_NAME}/node_modules/.bin:${PATH}"

echo "🏗️ Building documentation site..."
hugo \
    --minify \
    --buildDrafts \
    --theme "${THEME_NAME}" \
    --themesDir ../.. \
    -s ./exampleSite

echo "✅ Site built to exampleSite/public/"
