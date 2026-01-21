---
title: "Dark Mode"
date: 2025-12-07
weight: 50
description: "Theme switching and appearance customization."
---

Shiloh includes a complete dark mode implementation with system preference detection and manual toggle.

## How It Works

The theme uses the [theme-change](https://github.com/saadeghi/theme-change) library to handle theme switching. The current theme is stored in localStorage and persisted across page loads.

### Theme Detection Order

1. Check localStorage for saved preference
2. If no preference saved, check system preference (`prefers-color-scheme`)
3. Fall back to `defaultAppearance` from site configuration

## Configuration

### Site-Wide Settings

In `params.toml`:

```toml
defaultAppearance = "light"      # Initial theme: "light" or "dark"
autoSwitchAppearance = true      # Respect system preference
```

### Toggle Visibility

The theme toggle button appears in the header (navbar). Control its visibility:

```toml
[header]
  showAppearanceSwitcher = true  # Show/hide the toggle button
```

## Built-in Themes

Shiloh includes four daisyUI themes in `assets/css/main.css`:

| Theme | Type | Description |
|-------|------|-------------|
| `shiloh` | Light | Default light theme with warm, earthy tones |
| `shiloh-dark` | Dark | Dark companion to shiloh theme |
| `brodie` | Light | Alternative light theme with purple/violet accents |
| `brodie-dark` | Dark | Dark companion to brodie theme |

### Theme Definition Syntax

Themes are defined using daisyUI v5's `@plugin` syntax:

```css
@plugin "daisyui/theme" {
  name: "shiloh";
  default: true;
  prefersdark: false;
  color-scheme: "light";
  --color-primary: oklch(52% 0.09 142);
  --color-secondary: oklch(62% 0.11 55);
  --color-accent: oklch(78% 0.12 85);
  --color-base-100: oklch(99.1% 0.005 109.000);
  --color-base-content: oklch(25% 0.02 90);
  /* ... more colors */
}
```

### Dark Theme Example

```css
@plugin "daisyui/theme" {
  name: "shiloh-dark";
  default: false;
  prefersdark: false;
  color-scheme: "dark";
  --color-primary: oklch(65% 0.12 142);
  --color-secondary: oklch(70% 0.13 55);
  --color-accent: oklch(80% 0.13 85);
  --color-base-100: oklch(19% 0.01 240);
  --color-base-content: oklch(90% 0.01 109);
  /* ... more colors */
}
```

## OKLCH Colors

Shiloh uses OKLCH color space for perceptually uniform colors. This means:

- Colors look consistent across different hues
- Lightness values are visually accurate
- Easier to create harmonious color schemes

## Syntax Highlighting

Code blocks automatically adapt to the current theme. The syntax highlighting colors are defined to work with daisyUI color variables:

- Keywords use the primary color
- Strings use the success color
- Numbers use the warning color
- Comments are muted

## Creating Custom Themes

To create your own theme:

1. Create `assets/css/custom.css` in your project (see [Customization]({{< ref "customization" >}}))
2. Add a new theme definition using the `@plugin "daisyui/theme"` syntax
3. Update `colorScheme` in your site configuration

```css
/* assets/css/custom.css */
@plugin "daisyui/theme" {
  name: "my-theme";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-primary: oklch(50% 0.2 260);
  --color-secondary: oklch(60% 0.15 300);
  --color-accent: oklch(70% 0.18 80);
  --color-base-100: oklch(98% 0.01 260);
  --color-base-200: oklch(94% 0.02 260);
  --color-base-300: oklch(90% 0.03 260);
  --color-base-content: oklch(20% 0.02 260);
  --color-neutral: oklch(30% 0.02 260);
  --color-neutral-content: oklch(95% 0.01 260);
  --color-info: oklch(65% 0.1 240);
  --color-success: oklch(65% 0.12 160);
  --color-warning: oklch(70% 0.15 70);
  --color-error: oklch(55% 0.15 25);
}
```

Then in your `params.toml`:

```toml
colorScheme = "my-theme"
```

## JavaScript API

The theme-change library exposes a simple API:

```javascript
// Get current theme
document.documentElement.getAttribute('data-theme')

// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'shiloh-dark')
```

## Browser Support

Theme switching works in all modern browsers. The `prefers-color-scheme` media query is supported in:

- Chrome 76+
- Firefox 67+
- Safari 12.1+
- Edge 79+

Older browsers default to the light theme.
