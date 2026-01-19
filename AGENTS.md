# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shiloh is a Hugo theme based on Congo v2, built with Tailwind CSS v4 (Oxide engine) and daisyUI v5. The theme provides responsive design, dark mode support, search functionality, and uses OKLCH color space for modern color handling.

## Commands

All commands use the Taskfile (requires [go-task](https://taskfile.dev/)). The build system uses Docker with Hugo's built-in Tailwind CSS integration (Hugo Pipes).

### Development
```bash
task dev
```
Starts the development environment in Docker:
- Builds the `dev` target image with Hugo, npm, and Tailwind CLI
- Mounts project directory to `/shiloh`
- Runs `hugo mod npm pack` then `npm install` (order matters for swup packages)
- Launches Hugo server on http://localhost:1313 with `exampleSite` as content source
- Hugo Pipes compiles Tailwind CSS and bundles JS on-the-fly with live reload
- Auto-cleans `node_modules` on exit

### Sync Dependencies
```bash
task release
```
Syncs Hugo module dependencies to package.json:
- Runs `hugo mod npm pack` to update package.json with all required npm dependencies

### Building Documentation Site
```bash
task docs
```
Builds the exampleSite as static HTML:
- Runs `hugo mod npm pack` then `npm install` (order matters for swup packages)
- Runs Hugo build with `--minify --buildDrafts`
- Outputs to `exampleSite/public/` directory
- Auto-cleans `node_modules` on exit

### Cleaning
```bash
task clean
```
Removes all Docker images and generated files (node_modules, public, resources).

### Local Development (without Docker)
```bash
npm install           # Install dependencies
hugo server           # Start dev server (Hugo Pipes handles CSS)
hugo                  # Build site
hugo mod npm pack     # Sync Hugo module deps to package.json
```

## Architecture

### Build System
Docker multi-stage builds with three targets:
- **`dev`** - Development server with live reload
- **`release`** - Syncs Hugo module dependencies
- **`docs`** - Static site builder

All stages use the Hugo image with Tailwind CLI binary. Entrypoint scripts are in `scripts/docker/`.

### CSS Build Pipeline (Hugo Pipes)
- **Source**: `assets/css/main.css` - Tailwind v4's `@import "tailwindcss"` syntax
- **Processing**: Hugo's `css.TailwindCSS` pipe compiles CSS during build
- **Class Detection**: `@source "hugo_stats.json"` - Hugo's buildStats tracks used classes
- **Output**: Fingerprinted CSS in `public/css/`
- **Plugins** (via `@plugin` directives): daisyui, @iconify/tailwind4 (tabler icons)
- **Themes**: `shiloh`, `shiloh-dark`, `brodie`, `brodie-dark` defined inline using OKLCH colors

### Self-Hosted Fonts (Fontsource)
Fonts are self-hosted via Hugo module mounts:
- `node_modules/@fontsource-variable/fira-code/files` → `static/fonts/fira-code`
- `node_modules/@fontsource-variable/lora/files` → `static/fonts/lora`
- `node_modules/@fontsource-variable/fraunces/files` → `static/fonts/fraunces`

Font modes controlled by `site.Params.font`:
- `code` (default): Fira Code Variable
- `prose`: Lora Variable (body) + Fraunces Variable (headings)

### Hugo Layout Structure
- **Base**: `layouts/_default/baseof.html`
- **Pages**: `index.html`, `_default/single.html`, `_default/list.html`, `_default/taxonomy.html`, `_default/term.html`, `about/single.html`, `404.html`
- **Render hooks** (`layouts/_markup/`): render-image, render-heading, render-blockquote, render-link, render-table
- **Key partials**: head, header, footer, article-card, toc, search-modal, scripts, css

### Configuration
Hugo config split across `config/_default/`:
- `hugo.toml` - Core settings
- `params.toml` - Theme parameters (overridable via front matter)
- `menus.en.toml` - Navigation
- `markup.toml` - Markdown rendering
- `build.toml` - Build stats for Tailwind class detection
- `module.toml` - Hugo mounts for assets and fonts

### JavaScript Build Pipeline (Hugo js.Build)
JavaScript is bundled using Hugo's `js.Build` with ESBuild:
- **Entry point**: `assets/js/main.js`
- **Modules**: `assets/js/modules/` (code-copy, scrollspy, scroll-to-top)
- **Processing**: Hugo's `js.Build` bundles and minifies
- **Output**: Fingerprinted JS in `public/js/`

The `js.html` partial handles:
- Development: Bundled JS with inline source maps
- Production: Minified and fingerprinted JS with integrity hash

### Swup Page Transitions
The theme uses [swup](https://swup.js.org/) for smooth page transitions:
- **Container**: `#swup` div with `transition-fade` class in `baseof.html`
- **Plugins**: head, preload (replaces quicklink), scroll, a11y, progress
- **CSS**: Transition animations in `main.css` (supports native View Transitions API)
- **Config**: `site.Params.swup` in `params.toml`

Script reinitialization after navigation is handled in `main.js`:
- Code copy buttons
- Custom scrollspy (Intersection Observer based)
- Iconify icons (`Iconify.scan()`)

### Custom CSS Utilities
Defined in `assets/css/main.css`:
- `article-prose` - Typography system for article content
- `page-container` - Responsive container with breakpoint-based padding
- `font-prose` - Serif font mode (Lora + Fraunces)
- `bg-card` / `bg-card-hover` - Theme-aware card backgrounds
- Chroma syntax highlighting using daisyUI color variables
- Swup transition classes (`transition-fade`, `transition-slide`)

## Important Notes

### Version Requirements
- **Hugo**: 0.152.0+ (required for css.TailwindCSS)
- **npm**: Included in Hugo Docker image
- **Docker**: Required for standard development
- **go-task**: Required for Taskfile commands

### Hugo Pipes CSS
CSS is compiled by Hugo Pipes during build - no pre-compilation step needed. The `css.html` partial handles:
- Development: Direct CSS link for fast rebuilds
- Production: Minified and fingerprinted CSS with integrity hash

### ExampleSite Structure
The `exampleSite/` directory serves as:
1. Content source for `task dev`
2. Documentation site built via `task docs`
3. Has its own `config/` directory that can override theme defaults

### Theme Switching
Uses `theme-change` library with `data-theme` attribute on `<html>`. Switches between `shiloh` and `shiloh-dark` themes. Toggle controlled by `site.Params.footer.showAppearanceSwitcher`.
