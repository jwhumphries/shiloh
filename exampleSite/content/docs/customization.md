---
title: "Customization"
date: 2025-12-07
weight: 40
description: "Custom CSS, head content, and advanced customization."
---

Shiloh provides several extension points for customizing the theme without modifying core files. This ensures smooth upgrades while giving you full control.

## Custom CSS

Add custom styles by creating `assets/css/custom.css` in your project. This file is processed by Tailwind CSS, so you have access to all Tailwind features.

### Basic Usage

Create the file in your project:

```
mysite/
└── assets/
    └── css/
        └── custom.css
```

Add your custom styles:

```css
/* assets/css/custom.css */

/* Custom component */
.my-button {
  @apply btn btn-primary rounded-full;
}

/* Override theme styles */
.article-prose h2 {
  @apply text-secondary;
}

/* Custom utility */
@utility text-gradient {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Tailwind Features

Since `custom.css` is processed by Tailwind, you can use:

- **`@apply`** - Compose utility classes
- **`@utility`** - Define custom utilities
- **`@theme`** - Access theme variables
- **CSS variables** - Use daisyUI color variables like `var(--color-primary)`

### Example: Custom Code Block Style

```css
/* Customized code blocks */
.chroma {
  @apply border border-base-300;
  background-color: var(--color-base-100);
}

/* Custom line highlighting */
.chroma .hl {
  background-color: oklch(from var(--color-primary) l c h / 0.15);
}
```

### Example: Custom Link Styles

```css
/* Animated underline on all article links */
.article-prose a {
  @apply relative no-underline;
}

.article-prose a::after {
  content: '';
  @apply absolute bottom-0 left-0 h-px w-full bg-primary;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.article-prose a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Extend Head

For adding arbitrary content to the `<head>` element (analytics, external stylesheets, meta tags, etc.), create a partial in your project:

```
mysite/
└── layouts/
    └── partials/
        └── extend-head.html
```

This partial is included at the end of `<head>`, after all theme styles and scripts.

### Example: Google Analytics

```html
<!-- layouts/partials/extend-head.html -->
{{ if hugo.IsProduction }}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
{{ end }}
```

### Example: External Fonts

```html
<!-- layouts/partials/extend-head.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Example: Additional Meta Tags

```html
<!-- layouts/partials/extend-head.html -->
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="manifest" href="/manifest.json">
```

## Override Templates

Hugo's file lookup order means you can override any theme template by creating a file with the same path in your project.

### Common Overrides

| Theme File | Override Location |
|------------|-------------------|
| `layouts/_default/single.html` | Article template |
| `layouts/_default/list.html` | List/archive template |
| `layouts/partials/header.html` | Site header |
| `layouts/partials/footer.html` | Site footer |
| `layouts/partials/article-card.html` | Article card component |

### Example: Custom Footer

Create `layouts/partials/footer.html` in your project:

```html
<footer class="footer footer-center p-10 bg-base-200 text-base-content">
  <div>
    <p>Custom footer content here</p>
    <p>Copyright © {{ now.Year }} {{ site.Title }}</p>
  </div>
</footer>
```

## Custom Shortcodes

Add custom shortcodes in `layouts/shortcodes/`:

```
mysite/
└── layouts/
    └── shortcodes/
        └── alert.html
```

### Example: Alert Shortcode

```html
<!-- layouts/shortcodes/alert.html -->
{{ $type := .Get "type" | default "info" }}
<div class="alert alert-{{ $type }} my-4">
  <span class="iconify" data-icon="tabler:{{ $type }}"></span>
  <span>{{ .Inner | markdownify }}</span>
</div>
```

Usage:

```markdown
{{</* alert type="warning" */>}}
This is a warning message!
{{</* /alert */>}}
```

## Project Structure

A fully customized project might look like:

```
mysite/
├── assets/
│   └── css/
│       └── custom.css          # Custom Tailwind styles
├── config/
│   └── _default/
│       └── params.toml         # Theme configuration
├── content/
│   └── ...                     # Your content
├── layouts/
│   ├── partials/
│   │   └── extend-head.html    # Custom head content
│   └── shortcodes/
│       └── alert.html          # Custom shortcodes
└── static/
    └── ...                     # Static assets
```
