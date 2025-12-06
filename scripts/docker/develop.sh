#!/bin/sh

cd "${1}"
bun install
bun run index
bun run dev &
hugo server --bind 0.0.0.0 --buildDrafts --theme shiloh --themesDir ../.. -s ./exampleSite --disableFastRender
