# Swup Integration Plan

This document outlines the plan to integrate [swup](https://swup.js.org/) into the Shiloh Hugo theme to enable smooth page transitions with CSS animations.

## Table of Contents

1. [Overview](#overview)
2. [Goals](#goals)
3. [Package Installation](#package-installation)
4. [HTML Structure Changes](#html-structure-changes)
5. [CSS Transition Animations](#css-transition-animations)
6. [JavaScript Bundling with Hugo js.Build](#javascript-bundling-with-hugo-jsbuild)
7. [JavaScript Implementation](#javascript-implementation)
8. [Plugin Configuration](#plugin-configuration)
9. [Script Reinitialization](#script-reinitialization)
10. [Replacing Existing Features](#replacing-existing-features)
11. [Configuration Options](#configuration-options)
12. [Testing Checklist](#testing-checklist)
13. [Rollback Plan](#rollback-plan)

---

## Overview

Swup is a versatile JavaScript library that transforms server-rendered websites into smooth, app-like experiences by:

- Intercepting link clicks and fetching pages via AJAX
- Animating content transitions with CSS
- Managing browser history
- Providing smart preloading and caching
- Maintaining accessibility standards

### Current State

The theme currently uses:
- **Quicklink** for link prefetching (`scripts.html:33-40`)
- **Custom scroll-to-top button** with vanilla JS (`scroll-to-top.html`)
- **FlyonUI scrollspy** for table of contents highlighting (`toc.html:14`)
- **Inline scripts** that run once on page load (search, code-copy)

### Why Swup?

1. **Better UX**: Smooth page transitions make navigation feel instant
2. **Consolidation**: Replace multiple libraries (quicklink, custom scroll JS) with one solution
3. **Modern approach**: CSS-based animations with View Transitions API support
4. **Plugin ecosystem**: Extensible with official plugins for scroll, preload, head management

---

## Goals

1. **Primary**: Enable smooth fade transitions between pages
2. **Secondary**: Replace quicklink with swup's preload plugin
3. **Secondary**: Replace custom scroll-to-top with swup's scroll plugin
4. **Tertiary**: Evaluate replacing FlyonUI scrollspy with a swup-compatible solution
5. **Maintain**: All existing functionality (search, code-copy, theme switching)

---

## Package Installation

### Add to package.json

```json
{
  "dependencies": {
    "swup": "^4.0.0",
    "@swup/head-plugin": "^2.0.0",
    "@swup/preload-plugin": "^3.0.0",
    "@swup/scroll-plugin": "^3.0.0",
    "@swup/a11y-plugin": "^4.0.0",
    "@swup/progress-plugin": "^3.0.0"
  }
}
```

### Plugin Purposes

| Plugin | Purpose | Replaces |
|--------|---------|----------|
| `@swup/head-plugin` | Updates `<head>` content (title, meta, styles) on navigation | - |
| `@swup/preload-plugin` | Preloads links on hover/visibility | Quicklink |
| `@swup/scroll-plugin` | Handles scroll position, scroll-to-top, animated scrolling | Custom scroll-to-top |
| `@swup/a11y-plugin` | Announces page changes to screen readers, manages focus | - |
| `@swup/progress-plugin` | Shows loading progress bar for slow connections | - |

---

## HTML Structure Changes

### 1. Update `baseof.html`

Add the swup container ID and transition class to the main content area:

```html
<!-- Current -->
<main id="main-content" class="flex-1 w-full">
  {{- block "main" . }}{{- end }}
</main>

<!-- Updated -->
<main id="swup" class="flex-1 w-full transition-fade">
  {{- block "main" . }}{{- end }}
</main>
```

**Note**: The `id="main-content"` is used for skip-link accessibility. We need to either:
- Keep both IDs: `id="swup"` for swup, add `id="main-content"` to an inner wrapper
- Or update the skip link to target `#swup`

**Recommended approach** - wrap content inside main:

```html
<main id="main-content" class="flex-1 w-full">
  <div id="swup" class="transition-fade">
    {{- block "main" . }}{{- end }}
  </div>
</main>
```

### 2. Mark Persistent Elements

Elements that should NOT be replaced during navigation need `data-swup-persist`:

```html
<!-- Header should persist (already outside main) - no change needed -->
<header class="bg-base-100 border-b border-base-300">...</header>

<!-- Footer should persist (already outside main) - no change needed -->
<footer>...</footer>

<!-- Search modal should persist -->
<dialog id="search-modal" data-swup-persist>...</dialog>

<!-- Scroll-to-top button should persist (if keeping) -->
<button id="scroll-to-top" data-swup-persist>...</button>
```

### 3. Links That Should Skip Swup

Add `data-no-swup` to links that should use normal navigation:

```html
<!-- External links (swup ignores these by default) -->
<a href="https://external.com">External</a>

<!-- Downloads -->
<a href="/files/document.pdf" data-no-swup>Download PDF</a>

<!-- Anchor links on same page (swup handles these, but can be excluded) -->
<a href="#section" data-no-swup>Jump to section</a>
```

---

## CSS Transition Animations

### 1. Create `assets/css/swup.css` (or add to `main.css`)

```css
/* ============================================================================
   SWUP PAGE TRANSITIONS
   ============================================================================ */

/* Base transition setup */
html.is-changing .transition-fade {
  transition: opacity 0.3s ease-out;
}

/* Leave animation (current page fading out) */
html.is-animating .transition-fade {
  opacity: 0;
}

/* Enter animation is handled by removing is-animating class */

/* Optional: Slide transition variant */
html.is-changing .transition-slide {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

html.is-animating.is-leaving .transition-slide {
  opacity: 0;
  transform: translateY(-10px);
}

html.is-animating.is-rendering .transition-slide {
  opacity: 0;
  transform: translateY(10px);
}

/* Progress bar styling (if using progress plugin) */
.swup-progress-bar {
  height: 3px;
  background-color: var(--color-primary);
}

/* Prevent flash of unstyled content during transition */
html.is-changing {
  /* Disable pointer events during transition */
  pointer-events: none;
}
```

### 2. Native View Transitions (Progressive Enhancement)

For browsers supporting the View Transitions API:

```css
/* Native view transitions (Chrome 111+, Safari 18+) */
html.is-changing .transition-fade {
  view-transition-name: main-content;
}

::view-transition-old(main-content),
::view-transition-new(main-content) {
  animation-duration: 0.3s;
}

/* Fallback for unsupported browsers */
@supports not (view-transition-name: main-content) {
  html.is-changing .transition-fade {
    transition: opacity 0.3s ease-out;
  }

  html.is-animating .transition-fade {
    opacity: 0;
  }
}
```

---

## JavaScript Bundling with Hugo js.Build

Hugo's `js.Build` function uses ESBuild to bundle, minify, and tree-shake JavaScript. This is the **recommended approach** for swup integration because:

### Why js.Build?

| Aspect | CDN Approach | js.Build Approach |
|--------|--------------|-------------------|
| HTTP Requests | 6+ (swup + each plugin) | 1 bundled file |
| File Size | ~45KB total (no tree-shaking) | ~25-30KB (tree-shaken + minified) |
| Caching | CDN cache (shared) | Fingerprinted (site-specific) |
| Build Complexity | None | Requires node_modules |
| Consistency | Different from CSS pipeline | Matches Hugo Pipes CSS approach |

### Prerequisites

The js.Build approach requires:
1. Hugo extended version (already required for Tailwind CSS)
2. `node_modules` available at build time (already set up for fonts/Tailwind)
3. Packages installed via npm

### Hugo js.Build Partial

Create `layouts/partials/js.html`:

```html
{{- $opts := dict
  "targetPath" "js/main.js"
  "minify" (not hugo.IsDevelopment)
  "sourceMap" (cond hugo.IsDevelopment "inline" "")
  "target" "es2020"
  "format" "iife"
  "defines" (dict "process.env.NODE_ENV" (cond hugo.IsDevelopment "\"development\"" "\"production\""))
-}}

{{- with resources.Get "js/main.js" }}
  {{- with . | js.Build $opts }}
    {{- if hugo.IsDevelopment }}
      <script src="{{ .RelPermalink }}" defer></script>
    {{- else }}
      {{- with . | fingerprint }}
        <script src="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous" defer></script>
      {{- end }}
    {{- end }}
  {{- end }}
{{- end }}
```

### Benefits

1. **Single Request**: All JS bundled into one minified file
2. **Tree-Shaking**: Unused code is automatically removed
3. **Fingerprinting**: Cache-busted URLs like CSS (`main.abc123.js`)
4. **Source Maps**: Available in development for debugging
5. **Modern JS**: Target ES2020+ for smaller output
6. **Consistent Pipeline**: Mirrors the `css.TailwindCSS` approach

### Module Configuration

Update `config/_default/module.toml` to mount swup packages:

```toml
# Mount node_modules for js.Build
[[mounts]]
  source = 'node_modules'
  target = 'assets/node_modules'
```

**Note**: This mount is optional if using Hugo 0.111.0+ as it automatically resolves `node_modules` for js.Build.

---

## JavaScript Implementation

### 1. Create `assets/js/main.js` (Entry Point)

```javascript
import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';

// Initialize swup with plugins
const swup = new Swup({
  // Main content container
  containers: ['#swup'],

  // Animation selector - elements with these classes will be animated
  animationSelector: '[class*="transition-"]',

  // Cache pages for faster back/forward navigation
  cache: true,

  // Animate browser back/forward navigation
  animateHistoryBrowsing: true,

  // Use native View Transitions API if available
  native: true,

  // Links to ignore (external, anchors, etc.)
  ignoreVisit: (url, { el } = {}) => {
    // Ignore links with data-no-swup attribute
    if (el?.closest('[data-no-swup]')) return true;

    // Ignore links to different origins
    if (url.origin !== window.location.origin) return true;

    // Ignore links to files (PDFs, images, etc.)
    const fileExtensions = /\.(pdf|zip|png|jpg|jpeg|gif|svg|webp)$/i;
    if (fileExtensions.test(url.pathname)) return true;

    return false;
  },

  plugins: [
    // Update <head> content on navigation
    new SwupHeadPlugin({
      persistAssets: true,  // Don't reload CSS/JS that's already loaded
      persistTags: 'style[data-persist], link[data-persist]'
    }),

    // Preload pages on hover
    new SwupPreloadPlugin({
      preloadHoveredLinks: true,
      preloadVisibleLinks: {
        threshold: 0.2,
        delay: 500
      }
    }),

    // Handle scroll behavior
    new SwupScrollPlugin({
      doScrollingRightAway: false,
      animateScroll: {
        betweenPages: true,
        samePageWithHash: true,
        samePage: true
      },
      scrollFriction: 0.3,
      scrollAcceleration: 0.04,

      // Offset for fixed header (adjust based on actual header height)
      offset: () => {
        const header = document.querySelector('header');
        return header ? header.offsetHeight + 16 : 80;
      },

      // Scroll to top button integration
      shouldResetScrollPosition: (visit) => {
        // Don't reset scroll for anchor links on same page
        return !visit.to.hash;
      }
    }),

    // Accessibility announcements
    new SwupA11yPlugin({
      announcements: {
        visit: 'Navigated to: {title}',
        url: 'New page loaded'
      },
      autofocus: true  // Focus main content after navigation
    }),

    // Progress bar for slow connections
    new SwupProgressPlugin({
      delay: 300,  // Show after 300ms
      transition: 300,
      finishAnimation: true
    })
  ]
});

// Make swup available globally for other scripts that need it
window.swup = swup;

// Export for ES module usage
export default swup;
```

### 2. Update `scripts.html` to Use js.Build

Replace the current CDN scripts with the bundled approach:

```html
{{- /* Theme JS - bundled with js.Build */ -}}
{{- partial "js.html" . -}}

{{- /* Third-party scripts that can't be bundled */ -}}
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/flyonui@2/flyonui.js"></script>

{{- /* Note: Remove quicklink - replaced by swup preload plugin */ -}}
{{- /* Note: theme-change can potentially be bundled too */ -}}
```

### 3. Alternative: CDN Approach (Fallback)

If you prefer not to use js.Build, you can load swup from CDN. This is simpler but results in more HTTP requests:

```html
{{- if site.Params.enableSwup | default true }}
<script type="module">
  import Swup from 'https://unpkg.com/swup@4?module';
  import SwupHeadPlugin from 'https://unpkg.com/@swup/head-plugin@2?module';
  import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';
  import SwupScrollPlugin from 'https://unpkg.com/@swup/scroll-plugin@3?module';
  import SwupA11yPlugin from 'https://unpkg.com/@swup/a11y-plugin@4?module';
  import SwupProgressPlugin from 'https://unpkg.com/@swup/progress-plugin@3?module';

  const swup = new Swup({
    containers: ['#swup'],
    animationSelector: '[class*="transition-"]',
    cache: true,
    animateHistoryBrowsing: true,
    native: true,
    plugins: [
      new SwupHeadPlugin({ persistAssets: true }),
      new SwupPreloadPlugin({ preloadHoveredLinks: true }),
      new SwupScrollPlugin({
        animateScroll: { betweenPages: true, samePageWithHash: true },
        offset: () => document.querySelector('header')?.offsetHeight + 16 || 80
      }),
      new SwupA11yPlugin(),
      new SwupProgressPlugin({ delay: 300 })
    ]
  });

  // Make swup available globally for other scripts
  window.swup = swup;
</script>
{{- end }}
```

---

## Plugin Configuration

### Head Plugin Options

```javascript
new SwupHeadPlugin({
  // Keep assets that are already loaded
  persistAssets: true,

  // Persist specific tags across navigations
  persistTags: [
    'style[data-persist]',
    'link[rel="stylesheet"][data-persist]',
    'script[data-persist]'
  ],

  // Wait for stylesheets to load before showing new page
  awaitAssets: true
})
```

### Scroll Plugin Options

```javascript
new SwupScrollPlugin({
  // Scroll behavior
  doScrollingRightAway: false,      // Wait for animation to complete
  animateScroll: {
    betweenPages: true,             // Animate scroll when navigating
    samePageWithHash: true,         // Animate scroll for anchor links
    samePage: true                  // Animate scroll for same-page hash changes
  },

  // Scroll physics
  scrollFriction: 0.3,
  scrollAcceleration: 0.04,

  // Offset for fixed headers
  offset: () => {
    const header = document.querySelector('header');
    return header ? header.offsetHeight + 16 : 80;
  },

  // Custom scroll target (useful for skipping to content)
  getAnchorElement: (hash) => {
    // Try standard ID first
    let element = document.querySelector(hash);
    if (element) return element;

    // Fallback to name attribute
    element = document.querySelector(`[name="${hash.slice(1)}"]`);
    return element;
  }
})
```

### Preload Plugin Options

```javascript
new SwupPreloadPlugin({
  // Preload on hover
  preloadHoveredLinks: true,

  // Preload visible links (like quicklink)
  preloadVisibleLinks: {
    threshold: 0.2,      // 20% visible to trigger
    delay: 500,          // Wait 500ms before preloading
    containers: ['#swup'] // Only preload links in content area
  },

  // Preload specific pages on initial load
  preloadInitialPages: ['/about/', '/posts/']
})
```

---

## Script Reinitialization

Scripts that manipulate the DOM need to be reinitialized after swup replaces content.

### 1. Create Initialization Functions

Refactor existing scripts to be callable functions:

**`assets/js/code-copy.js`** (refactored):

```javascript
function initCodeCopy() {
  // Remove existing copy buttons first (prevents duplicates)
  document.querySelectorAll('.code-copy-btn').forEach(btn => btn.remove());

  const codeBlocks = document.querySelectorAll('.highlight pre');

  codeBlocks.forEach(function(codeBlock) {
    // Skip if already has wrapper
    if (codeBlock.parentNode.classList.contains('code-block-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper relative group';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn btn daisy-btn-ghost btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity';
    copyButton.setAttribute('aria-label', 'Copy code');
    copyButton.innerHTML = '<!-- SVG icon -->';

    wrapper.appendChild(copyButton);

    copyButton.addEventListener('click', function() {
      const code = codeBlock.querySelector('code');
      const text = code ? code.textContent : codeBlock.textContent;

      navigator.clipboard.writeText(text).then(function() {
        copyButton.innerHTML = '<!-- Check icon -->';
        setTimeout(function() {
          copyButton.innerHTML = '<!-- Copy icon -->';
        }, 2000);
      });
    });
  });
}

// Initialize on load
if (document.readyState === 'complete') {
  initCodeCopy();
} else {
  document.addEventListener('DOMContentLoaded', initCodeCopy);
}

// Re-initialize after swup navigation
if (window.swup) {
  window.swup.hooks.on('page:view', initCodeCopy);
}

// Export for external use
window.initCodeCopy = initCodeCopy;
```

**`assets/js/search.js`** (mostly unchanged):

The search functionality uses a modal that persists across navigations (`data-swup-persist`), so it doesn't need reinitialization. The search index is loaded lazily and cached.

### 2. Third-Party Script Handling

**FlyonUI Components**:

FlyonUI needs to reinitialize its JavaScript components after swup navigation:

```javascript
// In swup initialization
swup.hooks.on('page:view', () => {
  // Reinitialize FlyonUI components
  if (typeof HSStaticMethods !== 'undefined') {
    HSStaticMethods.autoInit();
  }
});
```

**Theme Change**:

The theme-change library operates on the `<html>` element which persists, so no reinitialization needed.

**Iconify**:

Iconify icons should work automatically as they observe DOM changes. If not:

```javascript
swup.hooks.on('page:view', () => {
  // Force Iconify to scan for new icons
  if (typeof Iconify !== 'undefined') {
    Iconify.scan();
  }
});
```

### 3. Scrollspy Handling

The current scrollspy uses FlyonUI's `data-scrollspy` attribute. After swup navigation:

```javascript
swup.hooks.on('page:view', () => {
  // Reinitialize scrollspy for TOC
  const tocScrollspy = document.querySelector('[data-scrollspy]');
  if (tocScrollspy && typeof HSScrollspy !== 'undefined') {
    new HSScrollspy(tocScrollspy);
  }
});
```

**Alternative**: Consider using `@swup/scroll-plugin`'s built-in scroll tracking or a dedicated scrollspy library that integrates better with swup.

---

## Replacing Existing Features

### 1. Remove Quicklink

**Before** (`scripts.html`):
```html
{{- if site.Params.enableQuicklink | default true }}
  <script src="https://unpkg.com/quicklink@2.3.0/dist/quicklink.umd.js"></script>
  <script>
    window.addEventListener('load', () => {
      quicklink.listen();
    });
  </script>
{{- end }}
```

**After**: Remove entirely. Swup's preload plugin handles this.

### 2. Replace Scroll-to-Top Button

**Option A**: Use swup scroll plugin's built-in scroll-to-top

The scroll plugin can animate scroll to top. Create a simpler button:

```html
<button
  id="scroll-to-top"
  class="btn btn-circle btn-primary fixed bottom-6 right-6 opacity-0 transition-opacity duration-300 shadow-lg z-40"
  aria-label="Scroll to top"
  data-swup-persist
>
  <!-- SVG icon -->
</button>

<script>
  // Show/hide based on scroll position
  function updateScrollButton() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;

    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.remove('opacity-100');
      btn.classList.add('opacity-0');
    }
  }

  // Scroll to top using swup's animated scroll
  document.getElementById('scroll-to-top')?.addEventListener('click', () => {
    if (window.swup) {
      // Use swup's scroll plugin for smooth animation
      const scrollPlugin = window.swup.findPlugin('SwupScrollPlugin');
      if (scrollPlugin) {
        scrollPlugin.scrollTo(0);
        return;
      }
    }
    // Fallback
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateScrollButton, { passive: true });
  updateScrollButton();
</script>
```

**Option B**: Keep existing implementation with `data-swup-persist`

The current implementation works fine. Just add `data-swup-persist` to prevent it from being replaced.

### 3. Scrollspy Considerations

**Keep FlyonUI scrollspy**: It works well, just needs reinitialization after swup navigation.

**Alternative - Pure CSS approach**: Use CSS scroll-driven animations (experimental):

```css
@supports (animation-timeline: scroll()) {
  .toc-link {
    animation: highlight linear;
    animation-timeline: view();
  }
}
```

**Alternative - Intersection Observer**: Create a custom scrollspy that's swup-aware:

```javascript
function initScrollspy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('#article-content h2, #article-content h3');

  if (!tocLinks.length || !headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -80% 0px'
  });

  headings.forEach(heading => observer.observe(heading));

  // Cleanup on swup navigation
  if (window.swup) {
    window.swup.hooks.before('content:replace', () => {
      observer.disconnect();
    });
  }
}
```

---

## Configuration Options

Add swup configuration to `params.toml`:

```toml
[swup]
  # Enable/disable swup entirely
  enable = true

  # Animation type: "fade", "slide", or "none"
  animation = "fade"

  # Animation duration in milliseconds
  animationDuration = 300

  # Enable native View Transitions API
  nativeTransitions = true

  # Show progress bar for slow connections
  showProgressBar = true

  # Preload links on hover
  preloadOnHover = true

  # Preload visible links
  preloadVisibleLinks = true
```

---

## Testing Checklist

### Functionality Tests

- [ ] **Basic navigation**: Click links, verify page content updates
- [ ] **Animation**: Verify fade/slide animation plays during navigation
- [ ] **Browser history**: Back/forward buttons work correctly
- [ ] **Direct URL**: Loading a page directly (not via navigation) works
- [ ] **Anchor links**: Hash links scroll smoothly to target
- [ ] **External links**: Open in same/new tab as expected
- [ ] **Search**: Modal opens, search works, results navigate correctly
- [ ] **Theme switching**: Theme persists across navigation
- [ ] **Code copy**: Copy buttons work on all pages
- [ ] **TOC scrollspy**: Highlights correct heading while scrolling
- [ ] **Scroll-to-top**: Button appears/disappears, scrolls smoothly
- [ ] **Mobile menu**: Works correctly after navigation
- [ ] **Pagination**: Pagination links work correctly

### Accessibility Tests

- [ ] **Focus management**: Focus moves to main content after navigation
- [ ] **Screen reader**: Page changes are announced
- [ ] **Skip link**: "Skip to content" link works
- [ ] **Keyboard navigation**: All interactive elements accessible

### Performance Tests

- [ ] **Page load time**: Compare before/after swup
- [ ] **Cache effectiveness**: Subsequent visits to same page are instant
- [ ] **Preloading**: Hover preload works, visible preload works
- [ ] **Progress bar**: Shows for slow connections

### Edge Cases

- [ ] **404 pages**: Handle gracefully
- [ ] **Slow connections**: Progress bar shows, navigation completes
- [ ] **JavaScript disabled**: Site still works (graceful degradation)
- [ ] **Multiple rapid clicks**: Doesn't break navigation
- [ ] **Form submissions**: Forms work correctly (may need `data-no-swup`)

---

## Rollback Plan

If issues arise, swup can be disabled without breaking the site:

1. **Quick disable**: Set `site.Params.swup.enable = false`
2. **Remove scripts**: Delete swup-related JS
3. **Remove CSS**: Delete transition classes from CSS
4. **Restore quicklink**: Re-add quicklink if desired
5. **HTML cleanup**: Remove `id="swup"` and `transition-fade` class

The site will continue to work as a traditional server-rendered site.

---

## Implementation Order

1. **Phase 1 - Basic Setup**
   - Add swup packages to `package.json`
   - Create `layouts/partials/js.html` for js.Build
   - Create `assets/js/main.js` entry point with basic swup init
   - Create swup CSS transitions in `main.css`
   - Update `baseof.html` with swup container (`id="swup"`, `transition-fade` class)
   - Update `scripts.html` to use `js.html` partial
   - Verify basic page transitions work

2. **Phase 2 - Plugin Integration**
   - Add head plugin for proper `<head>` updates
   - Add preload plugin and remove quicklink from `scripts.html`
   - Add scroll plugin
   - Add a11y plugin
   - Add progress plugin
   - Test all plugins work together

3. **Phase 3 - Script Reinitialization**
   - Refactor `code-copy.js` as an importable module
   - Import and call from `main.js` on `page:view` hook
   - Add FlyonUI reinitialization hook
   - Add Iconify scan hook
   - Handle scrollspy reinitialization
   - Bundle `search.js` into `main.js` (optional)

4. **Phase 4 - Polish**
   - Add swup configuration options to `params.toml`
   - Optimize animation timing and easing
   - Test all functionality (see checklist)
   - Update `scroll-to-top.html` to use swup scroll plugin
   - Update CLAUDE.md documentation

5. **Phase 5 - Optional Enhancements**
   - Bundle theme-change into main.js
   - Custom scrollspy using Intersection Observer
   - Native View Transitions API progressive enhancement
   - Per-page animation customization via front matter
   - Consider bundling Fuse.js for search
