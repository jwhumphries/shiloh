#!/bin/sh
set -e

cd /"${THEME_NAME}"

echo "📦 Installing npm dependencies..."
npm install

echo "🔄 Syncing Hugo module dependencies..."
hugo mod npm pack

echo "🚀 Starting Hugo development server..."
hugo server \
    --bind 0.0.0.0 \
    --buildDrafts \
    --theme "${THEME_NAME}" \
    --themesDir ../.. \
    -s ./exampleSite \
    --disableFastRender
