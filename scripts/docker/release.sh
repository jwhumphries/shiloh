#!/bin/sh
set -e

cd /"${THEME_NAME}"

echo "🔄 Syncing Hugo module dependencies to package.json..."
hugo mod npm pack

echo "✅ package.json updated with Hugo module dependencies"
