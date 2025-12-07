# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shiloh is a Hugo theme based on Congo v2, built with Tailwind CSS v4 (Oxide engine), daisyUI v5, and FlyonUI v2. The theme provides responsive design, dark mode support, search functionality, and uses OKLCH color space for modern color handling.

## Commands

All commands use the Taskfile (requires [go-task](https://taskfile.dev/)). The build system uses Docker with multi-stage builds for different workflows.

### Development
```bash
task dev
```
Starts the development environment in Docker:
- Builds the `develop` target image with Hugo, Bun, and Tailwind CLI
- Mounts project directory to `/${THEME_NAME}` (default: `/shiloh`)
- Runs `bun install`, generates search index (`bun run index`), initializes CSS (`bun run init`)
- Starts Tailwind watcher in background (`bun run dev`)
- Launches Hugo server on http://localhost:1313 with `exampleSite` as content source
- Auto-cleans `node_modules`, `bun.lock`, and `static/lunr-index.json` on exit

### Building for Release
```bash
task release
```
Compiles CSS for distribution:
- Builds the `releaser` target image
- Runs Tailwind build with minification
- Copies compiled CSS from builder stage to `assets/css/compiled/`
- Does NOT build Hugo site (CSS compilation only)

### Building Documentation Site
```bash
task docs
```
Builds the exampleSite as static HTML:
- Builds the `docs` target image
- Copies pre-compiled CSS from builder stage
- Runs Hugo build with `--minify` flag
- Outputs to `public/` directory

### Cleaning
```bash
task clean-docker
```
Removes all Docker images (dev, releaser, docs) created by the build system.

### CSS Build Scripts (for local development without Docker)
```bash
bun run init      # One-time CSS compilation
bun run dev       # Watch mode for development
bun run build     # Minified production build
bun run index     # Generate Lunr search index
```

## Architecture

### Build System Overview
The project uses **Docker multi-stage builds** with three distinct targets in the Dockerfile:

1. **`develop`** - Full development environment (Hugo + Bun + Tailwind + Go runtime)
2. **`releaser`** - CSS compilation only (copies compiled assets back to host)
3. **`docs`** - Static site builder (uses pre-compiled CSS from builder stage)

All stages inherit from a common `frontend` base that includes Bun and Tailwind CLI.

### CSS Build Pipeline
- **Source**: `assets/css/main.css` - uses Tailwind v4's native `@import "tailwindcss"` syntax
- **Content source**: `@source "../../layouts"` directive scans all layout files for classes
- **Output**: `assets/css/compiled/main.css` - processed by Tailwind CLI
- **Plugins**: Configured inline via `@plugin` directives:
  - `daisyui` - Component library (themes: shiloh, shiloh-dark)
  - `flyonui` - Additional UI components
  - `@iconify/tailwind4` - Icon system (using tabler icons)
- **Themes**: Two custom daisyUI themes defined inline in main.css using OKLCH colors:
  - `shiloh` (light, default)
  - `shiloh-dark` (dark)
- **Search index**: Generated via `hugo-lunr` package, outputs to `static/lunr-index.json`

### Hugo Layout Structure
- **Base template**: `layouts/_default/baseof.html` - HTML scaffold with theme switching and accessibility
- **Page types**:
  - `layouts/index.html` - Homepage
  - `layouts/_default/single.html` - Article pages with TOC sidebar
  - `layouts/_default/list.html` - Archive/list pages with optional year grouping
  - `layouts/_default/taxonomy.html` & `term.html` - Category/tag pages
  - `layouts/about/single.html` - Custom single page layout for "about" section
  - `layouts/404.html` - Error page
- **Markdown rendering**: Custom render hooks in `layouts/_markup/`:
  - `render-image.html` - Image processing with WebP support and lazy loading
  - `render-heading.html` - Auto-generated heading anchors
- **Key partials**:
  - `partials/head.html` - Meta tags, SEO, Open Graph, CSS/JS loading
  - `partials/header.html` - Sticky navbar with search, theme switcher, and mobile menu
  - `partials/footer.html` - Footer with social links and copyright
  - `partials/article-card.html` - Card component for article listings
  - `partials/toc.html` - Table of contents with scroll spy
  - `partials/search-modal.html` - Search overlay powered by Lunr.js
  - `partials/theme-init.html` - Theme initialization script
  - `partials/scripts.html` - JavaScript loading (theme-change, Quicklink, search)

### Configuration System
Hugo configuration is split across `config/_default/`:
- `hugo.toml` - Core Hugo settings (outputs, pagination, privacy)
- `params.toml` - Theme parameters (color scheme, features, layout options)
- `languages.en.toml` - Language settings
- `menus.en.toml` - Navigation menus
- `markup.toml` - Markdown rendering options (Goldmark, code highlighting)
- `module.toml` - Hugo module configuration

**Important**: All theme parameters in `params.toml` can be overridden at page level via front matter. The theme inherits configuration patterns from Congo v2.

### Custom CSS Utilities
The theme defines custom Tailwind utilities in `main.css`:
- `article-prose` - Typography system for article content (headings, links, lists, code blocks, tables)
- `toc-active` - Styling for active TOC links
- Keyframe animations: `fade-in`, `slide-up` for smooth transitions

### Docker Entrypoint Scripts
Each build target uses a dedicated shell script in `scripts/docker/`:

**`develop.sh`** (development workflow):
1. Navigates to `/${THEME_NAME}` (mounted directory)
2. Runs `bun install` to install dependencies
3. Runs `bun run index` to generate search index
4. Runs `bun run init` to compile CSS initially
5. Starts `bun run dev` in background (Tailwind watcher)
6. Launches Hugo server with `--buildDrafts --disableFastRender`, serving `exampleSite` with theme located at `../../`

**`release.sh`** (CSS compilation):
1. Copies compiled CSS from `/release/assets/css/compiled/` to mounted directory
2. Copies static assets from `/release/static/` to mounted directory

**`docs.sh`** (documentation build):
1. Copies compiled CSS and static assets (same as release.sh)
2. Runs `hugo --minify --buildDrafts` to build exampleSite into `public/`

### Theme Switching
Theme switching uses the `theme-change` library (loaded from CDN):
- Initial theme determined by localStorage or system preference
- Applied via `data-theme` attribute on `<html>` element
- Toggle button located in **header** (navbar-end) as a swap rotate button with sun/moon icons
- Controlled by `data-toggle-theme` attribute on checkbox input
- Visibility controlled by `site.Params.footer.showAppearanceSwitcher` parameter (despite being in header)
- Switches between `shiloh` (light) and `shiloh-dark` (dark) themes
- Theme preference persisted in localStorage

## Important Notes

### Version Requirements
- **Hugo**: 0.151.0+ (uses latest features for image processing and configuration)
- **Bun**: Latest version (used instead of npm/yarn for faster dependency installation)
- **Docker**: Required for standard development workflow
- **go-task**: Required to run Taskfile commands

### Theme Directory Structure
The theme expects to be named `shiloh` when used:
- Development: Hugo runs with `--theme shiloh --themesDir ../..` from exampleSite
- This means the theme directory should be at `../shiloh` relative to the site using it

### CSS Compilation Requirement
CSS **must** be pre-compiled before Hugo can render pages:
- Hugo templates reference `assets/css/compiled/main.css`
- If this file is missing, Hugo will error
- Run `bun run init` or `task dev` to generate it
- For production, use `task release` to compile minified CSS

### ExampleSite Structure
The `exampleSite/` directory serves dual purposes:
1. **Development**: Content source for `task dev` (Hugo server runs from here)
2. **Documentation**: Will be built as documentation site via `task docs`
3. The exampleSite has its own `config/` directory that can override theme defaults

### Known Issues
- Theme is based on Congo v2 but still in early development
- Some layouts may have bugs or not work correctly
- Testing and refinement needed before v1.0 release

### Working with the Build System
- All Docker stages mount the project directory to `/${THEME_NAME}`
- The `builder` stage compiles CSS independently and subsequent stages copy from it
- Local files (`node_modules`, `bun.lock`, search index) are auto-cleaned after `task dev` exits
- Use `task clean-docker` to remove all build artifacts if Docker images become stale
