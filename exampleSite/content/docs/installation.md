---
title: "Installation"
date: 2025-12-07
weight: 10
description: "How to install the Shiloh theme."
---

## Requirements

- Hugo 0.152.0 or later (extended edition)
- Go 1.21+ (for Hugo modules)
- npm (Node Package Manager) in your build environment
- tailwindcss v4 installed (can be included via `package.hugo.json`)

## Using Hugo Modules

Add the theme as a module in your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/jwhumphries/shiloh
```

Then run:

```bash
hugo mod get -u
```

## Using Git Submodule

Clone the theme into your `themes` directory:

```bash
git submodule add https://github.com/jwhumphries/shiloh.git themes/shiloh
```

Add to your `hugo.yaml`:

```yaml
theme: shiloh
```

## Manual Installation

Download the theme and extract it to `themes/shiloh`.

## Configuration

The theme relies on Hugo pipes to build and compile CSS and JS. You must update your site configuration with the following required settings.

### Build Environment

Ensure `npm` and `tailwindcss` (v4) are available in your build environment. You can include a `package.hugo.json` file in the root of your Hugo project that includes `tailwindcss`.

### Build Configuration

Add the following to your configuration (e.g., `hugo.toml` or `config/_default/build.toml`) to enable build stats and cache busting:

```toml
[buildStats]
  enable = true

[[cachebusters]]
  source = 'assets/notwatching/hugo_stats\.json'
  target = 'css'

[[cachebusters]]
  source = '(postcss|tailwind)\.config\.js'
  target = 'css'
```

### Module Mounts

Add the following mounts to your configuration (e.g., `hugo.toml` or `config/_default/module.toml`) to handle build stats and fonts:

```toml
[[mounts]]
  disableWatch = true
  source = 'hugo_stats.json'
  target = 'assets/notwatching/hugo_stats.json'

# Fontsource font mounts
[[mounts]]
  source = 'node_modules/@fontsource-variable/fira-code/files'
  target = 'static/fonts/fira-code'

[[mounts]]
  source = 'node_modules/@fontsource-variable/lora/files'
  target = 'static/fonts/lora'

[[mounts]]
  source = 'node_modules/@fontsource-variable/fraunces/files'
  target = 'static/fonts/fraunces'
```

Note: Adjust the `source` paths for the fonts depending on where your `node_modules` are located relative to your site root.
