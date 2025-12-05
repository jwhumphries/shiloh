#!/bin/sh

cd "${1}"
bun install
bun run dev &
hugo server --bind 0.0.0.0 --buildDrafts -e theme-dev --theme shiloh --themesDir ../.. -s ./exampleSite --disableFastRender
