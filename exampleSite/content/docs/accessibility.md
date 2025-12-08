---
title: "Accessibility"
date: 2025-12-07
weight: 70
description: "Accessibility features and best practices."
---

Shiloh is designed with accessibility as a core principle. The theme follows WCAG guidelines and implements semantic HTML, ARIA attributes, and keyboard navigation.

## Semantic HTML

### Document Structure

The theme uses proper HTML5 semantic elements:

```html
<header>    <!-- Site header/navbar -->
<main>      <!-- Primary content -->
<article>   <!-- Article content -->
<nav>       <!-- Navigation sections -->
<aside>     <!-- Sidebar content (TOC) -->
<footer>    <!-- Site footer -->
```

### Heading Hierarchy

Pages maintain proper heading hierarchy:

- `<h1>`: Page title (one per page)
- `<h2>`: Main sections
- `<h3>`: Subsections
- And so on...

The table of contents reflects this hierarchy with proper nesting.

## ARIA Attributes

### Navigation

```html
<nav aria-label="Main navigation">
<nav aria-label="Breadcrumb" role="navigation">
<nav aria-label="Pagination">
```

### Interactive Elements

```html
<button aria-label="Open search">
<button aria-label="Toggle theme">
<button aria-label="Open menu">
<button aria-label="Scroll to top">
```

### Modal Dialogs

```html
<dialog aria-modal="true" aria-labelledby="search-title">
  <h2 id="search-title">Search</h2>
  <input aria-describedby="search-hint">
</dialog>
```

### Current State

```html
<a aria-current="page">Current Page</a>
```

## Keyboard Navigation

### Skip Link

A skip-to-content link appears at the top of every page:

```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

This link becomes visible when focused, allowing keyboard users to bypass navigation.

### Focus Management

- All interactive elements are focusable
- Focus indicators are visible (outline styles)
- Modal dialogs trap focus appropriately
- Focus returns to trigger element when dialogs close

### Tab Order

The theme maintains logical tab order:

1. Skip link
2. Header navigation
3. Main content
4. Sidebar (if present)
5. Footer

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move forward through focusable elements |
| `Shift + Tab` | Move backward through focusable elements |
| `Enter` / `Space` | Activate buttons and links |
| `Escape` | Close modals |

## Screen Reader Support

### Alternative Text

Images require alt text:

```markdown
![Description of image](image.jpg)
```

Decorative images use empty alt:

```html
<img src="decoration.svg" alt="" aria-hidden="true">
```

### SVG Icons

Icons include proper accessibility:

```html
<svg aria-hidden="true" role="img">
  <!-- Icon content -->
</svg>
```

Icons with meaning include labels:

```html
<svg aria-label="GitHub" role="img">
  <!-- Icon content -->
</svg>
```

### Hidden Content

Screen-reader-only text where needed:

```html
<span class="sr-only">Additional context for screen readers</span>
```

## Color and Contrast

### Contrast Ratios

The theme's color palette maintains WCAG AA contrast ratios:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Color Independence

Information is never conveyed by color alone:

- Links have underlines or other visual indicators
- Form errors include text messages
- Status indicators include icons or text

### Focus Indicators

All focusable elements have visible focus states:

```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

## Motion and Animation

### Reduced Motion

The theme respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animations

Animations are subtle and purposeful:

- Fade-in for page content
- Smooth transitions for interactive states
- No auto-playing animations

## Form Accessibility

### Labels

All form inputs have associated labels:

```html
<label for="search-input">Search</label>
<input id="search-input" type="search">
```

### Error Messages

Form errors are announced and associated:

```html
<input aria-describedby="error-message" aria-invalid="true">
<span id="error-message" role="alert">Error description</span>
```

## Testing Accessibility

### Automated Testing

Run automated accessibility tests with:

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- Lighthouse accessibility audit

### Manual Testing

Test with:

- Keyboard-only navigation
- Screen readers (VoiceOver, NVDA, JAWS)
- Browser zoom (200%)
- High contrast mode

## Best Practices for Content

### Writing Accessible Content

1. Use descriptive link text (not "click here")
2. Provide alt text for all meaningful images
3. Use proper heading hierarchy
4. Keep paragraphs and sentences concise
5. Define abbreviations on first use

### Tables

Use proper table markup:

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

The theme wraps tables in scrollable containers with proper ARIA roles.

### Code Blocks

Code blocks include language identification:

```html
<pre><code class="language-javascript">
```

This helps screen readers announce the code language.
