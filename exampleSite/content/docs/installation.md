---
title: "Installation"
date: 2025-12-07
weight: 10
description: "How to install the Shiloh theme."
---

## Requirements

- Hugo 0.151.0 or later (extended edition)
- Go 1.21+ (for Hugo modules)
- Docker (recommended for development)
- [go-task](https://taskfile.dev/) (for running Taskfile commands)
- Bun (for local CSS development without Docker)

## Using Hugo Modules

Add the theme as a module in your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/username/shiloh
```

Then run:

```bash
hugo mod get -u
```

## Using Git Submodule

Clone the theme into your `themes` directory:

```bash
git submodule add https://github.com/username/shiloh.git themes/shiloh
```

Add to your `hugo.yaml`:

```yaml
theme: shiloh
```

## Manual Installation

Download the theme and extract it to `themes/shiloh`.

## Development Workflow

Shiloh uses Docker for a consistent development environment with hot reloading.

### Start Development Server

```bash
task dev
```

This command:

1. Builds the Docker development image with Hugo, Bun, and Tailwind CLI
2. Installs dependencies via `bun install`
3. Generates the search index
4. Compiles CSS initially
5. Starts Tailwind in watch mode (background)
6. Launches Hugo server at http://localhost:1313

Changes to layouts, content, or CSS trigger automatic rebuilds.

### Build for Release

```bash
task release
```

Compiles minified CSS for distribution. The compiled CSS is copied to `assets/css/compiled/`.

### Build Documentation Site

```bash
task docs
```

Builds the exampleSite as a static HTML site in the `public/` directory.

### Clean Up

```bash
task clean-docker
```

Removes all Docker images created by the build system.

## Local Development (Without Docker)

If you prefer not to use Docker, run the build scripts directly:

```bash
bun install
bun run index    # Generate search index
bun run init     # One-time CSS compilation
bun run dev      # Watch mode for development
```

Then run Hugo separately:

```bash
hugo server --buildDrafts --disableFastRender
```

## CSS Compilation

Shiloh requires pre-compiled CSS. The theme includes compiled CSS in `assets/css/compiled/`, so no build step is needed for basic usage.

To customize styles:

1. Edit `assets/css/main.css`
2. Run `bun run build` or `task release`
3. Commit the compiled output

The CSS source uses Tailwind v4's native `@import "tailwindcss"` syntax with inline plugin configuration for daisyUI and FlyonUI.
