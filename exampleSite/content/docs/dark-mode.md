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
[footer]
  showAppearanceSwitcher = true  # Show/hide the toggle button
```

## Custom Themes

Shiloh defines two daisyUI themes in `assets/css/main.css`:

### Light Theme (`shiloh`)

```css
@plugin "daisyui" {
  themes:
    shiloh --default --light {
      primary: oklch(0.6 0.118 184.704);
      secondary: oklch(0.398 0.07 227.392);
      accent: oklch(0.769 0.188 70.08);
      /* ... more colors */
    }
}
```

### Dark Theme (`shiloh-dark`)

```css
@plugin "daisyui" {
  themes:
    shiloh-dark --dark {
      primary: oklch(0.7 0.118 184.704);
      secondary: oklch(0.6 0.1 227.392);
      accent: oklch(0.8 0.15 70.08);
      /* ... more colors */
    }
}
```

## OKLCH Colors

Shiloh uses OKLCH color space for perceptually uniform colors. This means:

- Colors look consistent across different hues
- Lightness values are visually accurate
- Easier to create harmonious color schemes

### Color Palette

Each theme includes:

| Color | Usage |
|-------|-------|
| `primary` | Links, active states, primary buttons |
| `secondary` | Supporting UI elements |
| `accent` | Highlights, decorations |
| `neutral` | Text on colored backgrounds |
| `base-100/200/300` | Background layers |
| `info` | Informational elements |
| `success` | Success states |
| `warning` | Warning states |
| `error` | Error states |

## Syntax Highlighting

Code blocks automatically adapt to the current theme. The syntax highlighting colors are defined to work with daisyUI color variables:

- Keywords use the primary color
- Strings use the success color
- Numbers use the warning color
- Comments are muted

## Creating Custom Themes

To create your own theme:

1. Copy the theme definition in `assets/css/main.css`
2. Rename it (e.g., `my-theme`)
3. Adjust the OKLCH color values
4. Update `colorScheme` in your site configuration

```css
@plugin "daisyui" {
  themes:
    my-theme --default --light {
      primary: oklch(0.5 0.2 260);
      /* customize all colors */
    }
}
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
