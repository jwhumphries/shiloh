# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shiloh is a Hugo theme for static site generation built with modern CSS tooling. It integrates Tailwind CSS v4 (Oxide engine), daisyUI v5, and FlyonUI v2 to provide a production-ready theme with responsive design, dark mode support, and OKLCH color space.

## Commands

### Development
```bash
task dev
```
Builds and runs the development environment in Docker. Mounts the current directory to `/workdir`, runs `bun install`, starts the Tailwind CSS watcher, and launches Hugo server on port 1313.

### Building CSS
```bash
bun run dev       # Watch mode for development
bun run build     # Minified production build
```

### Cleaning
```bash
task clean        # Remove all Docker images
```

## Architecture

### CSS Build Pipeline
- **Source**: `assets/css/main.css` - uses Tailwind v4's native `@import "tailwindcss"` syntax
- **Output**: `assets/css/main.bundle.css` - processed by Tailwind CLI
- **Plugins**: Configured inline via `@plugin` directives (daisyui, flyonui, @iconify/tailwind4)
- **Themes**: Two custom daisyUI themes defined in main.css using OKLCH colors:
  - `shiloh` (light, default)
  - `shiloh-dark` (dark)

### Hugo Layout Structure
- **Base template**: `layouts/baseof.html` - provides the HTML scaffold with theme switching, scroll-to-top button, and accessibility features
- **Page types**:
  - `layouts/index.html` - Homepage with optional recent posts grid
  - `layouts/single.html` - Article pages with TOC sidebar on larger screens
  - `layouts/list.html` - Archive/list pages with optional year grouping
  - `layouts/taxonomy.html` & `layouts/term.html` - Category/tag pages
- **Partials**:
  - `partials/head.html` - Meta tags, SEO, Open Graph, and CSS loading
  - `partials/header/basic.html` - Responsive navbar with mobile dropdown
  - `partials/footer.html` - Footer with theme switcher and copyright
  - `partials/article-link.html` - Card component for article listings
  - `partials/article-meta.html` - Date, reading time, author metadata
  - `partials/toc.html` - Table of contents component

### Configuration
Hugo configuration is split across `config/_default/`:
- `hugo.toml` - Core Hugo settings (outputs, pagination, privacy)
- `params.toml` - Theme parameters (color scheme, features, layout options)
- `languages.en.toml` - Language settings
- `menus.en.toml` - Navigation menus
- `markup.toml` - Markdown rendering options

All theme parameters in `params.toml` can be overridden at page level via front matter.

### Custom CSS Utilities
The theme defines two custom Tailwind utilities in `main.css`:
- `article-prose` - Typography system for article content (headings, links, lists, code blocks, tables)
- `toc-active` - Styling for active TOC links

### Docker Development Environment
The Dockerfile uses multi-stage builds to create a development container with:
- Bun runtime (base)
- Go toolchain (for Hugo extensions)
- Hugo binary (latest from official image)
- Tailwind CSS CLI (from custom jwhumphries/tailwindcss image)

The `scripts/docker/develop.sh` entrypoint script:
1. Runs `bun install` to install node dependencies
2. Starts `bun run dev` in background (Tailwind watcher)
3. Launches Hugo server with theme-dev environment pointing to `exampleSite`

### Theme Switching
Theme switching uses the `theme-change` library (loaded from CDN in baseof.html):
- Initial theme set via localStorage or system preference
- Applied via `data-theme` attribute on `<html>`
- Toggle controlled by checkbox in footer with `data-toggle-theme` attribute

### Known Issues
The existing layouts may have problems and may not be working correctly. The theme is still in early development.

## Development Notes

- Hugo version required: 0.151.0+
- Bun is used instead of npm/yarn for faster dependency installation
- The theme expects to be named "shiloh" when used (see develop.sh: `--theme shiloh`)
- CSS must be pre-built before Hugo can render (Hugo will error if main.bundle.css is missing)
- The theme is designed to work with an exampleSite but none currently exists in the repository
