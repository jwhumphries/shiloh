# AGENTS.md

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
- Mounts project directory to `/shiloh`
- Runs `bun install`, initializes CSS (`bun run init`)
- Starts Tailwind watcher in background (`bun run dev`)
- Launches Hugo server on http://localhost:1313 with `exampleSite` as content source
- Auto-cleans `node_modules` and `bun.lock` on exit

### Building for Release
```bash
task release
```
Compiles CSS for distribution:
- Runs Tailwind build with minification inside Docker
- Copies compiled CSS from builder stage to `assets/css/compiled/`

### Building Documentation Site
```bash
task docs
```
Builds the exampleSite as static HTML:
- Copies pre-compiled CSS from builder stage
- Runs Hugo build with `--minify --buildDrafts`
- Outputs to `public/` directory

### Cleaning
```bash
task clean-docker
```
Removes all Docker images (dev, releaser, docs) created by the build system.

### Local Development (without Docker)
```bash
bun run init      # One-time CSS compilation
bun run dev       # Watch mode for development
bun run build     # Minified production build
```

## Architecture

### Build System
Docker multi-stage builds with three targets:
- **`develop`** - Full dev environment (Hugo + Bun + Tailwind + Go)
- **`releaser`** - CSS compilation only
- **`docs`** - Static site builder

All stages inherit from a `frontend` base with Bun and Tailwind CLI. Entrypoint scripts are in `scripts/docker/`.

### CSS Build Pipeline
- **Source**: `assets/css/main.css` - Tailwind v4's `@import "tailwindcss"` syntax
- **Content source**: `@source "../../layouts"` scans all layout files for classes
- **Output**: `assets/css/compiled/main.css`
- **Plugins** (via `@plugin` directives): daisyui, flyonui, @iconify/tailwind4 (tabler icons)
- **Themes**: `shiloh` (light, default) and `shiloh-dark` defined inline using OKLCH colors

### Hugo Layout Structure
- **Base**: `layouts/_default/baseof.html`
- **Pages**: `index.html`, `_default/single.html`, `_default/list.html`, `_default/taxonomy.html`, `_default/term.html`, `about/single.html`, `404.html`
- **Render hooks** (`layouts/_markup/`): render-image, render-heading, render-blockquote, render-link, render-table
- **Key partials**: head, header, footer, article-card, toc, search-modal, scripts

### Configuration
Hugo config split across `config/_default/`:
- `hugo.toml` - Core settings
- `params.toml` - Theme parameters (overridable via front matter)
- `menus.en.toml` - Navigation
- `markup.toml` - Markdown rendering

### Custom CSS Utilities
Defined in `assets/css/main.css`:
- `article-prose` - Typography system for article content
- `page-container` - Responsive container with breakpoint-based padding
- Chroma syntax highlighting using daisyUI color variables

## Important Notes

### Version Requirements
- **Hugo**: 0.151.0+
- **Bun**: Latest version
- **Docker**: Required for standard development
- **go-task**: Required for Taskfile commands

### CSS Compilation Requirement
CSS **must** be pre-compiled before Hugo can render pages. Hugo templates reference `assets/css/compiled/main.css`. Run `bun run init` or `task dev` to generate it.

### ExampleSite Structure
The `exampleSite/` directory serves as:
1. Content source for `task dev`
2. Documentation site built via `task docs`
3. Has its own `config/` directory that can override theme defaults

### Theme Switching
Uses `theme-change` library with `data-theme` attribute on `<html>`. Switches between `shiloh` and `shiloh-dark` themes. Toggle controlled by `site.Params.footer.showAppearanceSwitcher`.
