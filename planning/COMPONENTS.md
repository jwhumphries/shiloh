# Custom Components Analysis

This document identifies areas where DaisyUI components are insufficient and proposes custom component solutions for the Shiloh theme.

## Overview

DaisyUI v5 provides excellent foundational components (navbar, footer, cards, buttons, badges), but several blog-specific features require custom implementations. This analysis categorizes components by their implementation status and complexity.

---

## ✅ Well-Served by DaisyUI

These components work well with DaisyUI and require minimal customization:

### Navigation & Structure
- **Navbar** (`header/basic.html`) - DaisyUI navbar component works well
- **Footer** (`footer.html`) - DaisyUI footer component is appropriate
- **Cards** (`article-link.html`) - DaisyUI card component is perfect for article previews
- **Badges** - Draft labels, taxonomy tags work well with DaisyUI badges
- **Buttons** - Pagination, scroll-to-top, navigation all use DaisyUI buttons effectively
- **Dividers** - Section separators use DaisyUI divider component

### Current Implementation Status
- ✅ Basic navigation working
- ✅ Article cards displaying correctly
- ✅ Pagination with join component
- ✅ Theme switcher using swap component

---

## ⚠️ Needs Enhancement (DaisyUI + Custom)

These use DaisyUI but need custom logic or styling enhancements:

### 1. **Theme Switcher** (Priority: HIGH)
**Current:** Basic DaisyUI swap component in footer
**Issues:**
- No state persistence (resets on page load)
- Doesn't respect `autoSwitchAppearance` param
- Only toggles between light/dark, not "auto" mode
- No system preference detection

**Recommended Solution:**
```html
<!-- Custom component: partials/theme-switcher.html -->
```
- Add localStorage persistence
- Implement three-state toggle: light/auto/dark
- Respect system preferences via `prefers-color-scheme`
- Add smooth transition between themes
- Use DaisyUI swap for visual toggle, custom JS for logic

**Files to create:**
- `layouts/partials/theme-switcher.html`
- `assets/js/theme.js` (vanilla JS, no dependencies)

---

### 2. **Prose/Typography** (Priority: HIGH)
**Current:** Custom `@utility prose-headings` in CSS
**Issues:**
- Hardcoded prose styles instead of using Tailwind Typography
- Inconsistent with DaisyUI's typography utilities
- Limited control over reading experience
- No dark mode prose variants

**Recommended Solution:**
- **Remove** custom `prose-headings` utility
- **Add** `@tailwindcss/typography` plugin (Tailwind v4 compatible)
- Configure custom prose theme in `main.css`:
  ```css
  @theme {
    --typography-body: theme(fontFamily.sans);
    --typography-headings: theme(fontFamily.sans);
    --typography-lead: 1.6;
    --typography-p-margin: 1.25em;
  }
  ```
- Use DaisyUI color variables for prose colors
- Implement proper dark mode prose styles

**Files to modify:**
- `assets/css/main.css` - Remove custom utility, add typography config
- Request addition of `@tailwindcss/typography` to package.json

---

### 3. **Code Blocks** (Priority: MEDIUM)
**Current:** No code block styling or copy functionality
**Issues:**
- `enableCodeCopy` param exists but not implemented
- No syntax highlighting theme coordination with DaisyUI
- No filename/language labels
- Missing copy button

**Recommended Solution:**
Create custom code block component using DaisyUI as base:
```html
<!-- layouts/_markup/render-codeblock.html -->
```
- Use DaisyUI mockup-code as foundation
- Add custom copy button (DaisyUI btn-ghost btn-sm)
- Integrate with Hugo's built-in Chroma syntax highlighting
- Add filename display in header
- Toast notification on copy (DaisyUI alert or custom)

**Files to create:**
- `layouts/_markup/render-codeblock.html` (Hugo 0.93+)
- `assets/js/code-copy.js`
- CSS overrides for Chroma + DaisyUI coordination

---

## 🚫 Not Suitable for DaisyUI (Custom Required)

These features are too specialized and need custom implementations:

### 4. **Table of Contents** (Priority: HIGH)
**Current:** Not implemented (param exists: `article.showTableOfContents`)
**Why Custom:**
- Needs sticky positioning during scroll
- Requires active section highlighting (Intersection Observer)
- Desktop sidebar vs mobile drawer behavior
- Not a standard DaisyUI use case

**Recommended Solution:**
Custom sticky sidebar component with progressive enhancement:

```html
<!-- layouts/partials/toc.html -->
<aside class="toc-sidebar hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
  <nav class="menu bg-base-200 rounded-box">
    <li class="menu-title">Table of Contents</li>
    {{ .Page.TableOfContents }}
  </nav>
</aside>
```

**Features:**
- Desktop: Sticky sidebar (right side of content)
- Mobile: Collapsible section above content or drawer
- Active section highlighting via Intersection Observer
- Smooth scroll to sections
- Show/hide based on heading count threshold

**Files to create:**
- `layouts/partials/toc.html`
- `assets/js/toc.js` (Intersection Observer logic)
- Update `single.html` layout to use two-column grid for content + ToC

**Complexity:** Medium-High (requires JS for scroll spy)

---

### 5. **Search Interface** (Priority: HIGH)
**Current:** Not implemented (param exists: `enableSearch`)
**Why Custom:**
- Modal overlay with search input (use DaisyUI modal as base)
- Real-time search results from Fuse.js
- Keyboard shortcuts (Cmd/Ctrl+K)
- Search result highlighting
- Complex interaction patterns

**Recommended Solution:**
Custom search modal using DaisyUI modal component:

```html
<!-- layouts/partials/search.html -->
<dialog id="search-modal" class="modal">
  <div class="modal-box max-w-3xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <input type="search" placeholder="Search..." class="input input-bordered w-full" id="search-input" />
    <div id="search-results" class="mt-4 max-h-96 overflow-y-auto">
      <!-- Results rendered via JS -->
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

**Features:**
- DaisyUI modal for overlay
- Fuse.js for fuzzy search (lightweight)
- Hugo JSON output format for search index
- Keyboard navigation (arrows, enter, escape)
- Search on title, summary, content
- Highlight matching terms

**Files to create:**
- `layouts/partials/search.html`
- `layouts/_default/index.json` (search index)
- `assets/js/search.js` (Fuse.js integration)
- Update `baseof.html` to include search modal
- Update `header/basic.html` to trigger search

**Dependencies:** Fuse.js (add to package.json)

**Complexity:** High (search indexing, keyboard shortcuts, fuzzy matching)

---

### 6. **Breadcrumbs** (Priority: LOW)
**Current:** Not implemented (param exists: `list.showBreadcrumbs`)
**Why Custom:**
- DaisyUI has breadcrumbs component but needs Hugo logic for path generation
- Section hierarchy traversal
- Schema.org structured data integration

**Recommended Solution:**
Use DaisyUI breadcrumbs component with custom Hugo logic:

```html
<!-- layouts/partials/breadcrumbs.html -->
<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="{{ "/" | relURL }}">Home</a></li>
    {{ range .Ancestors.Reverse }}
      <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
    <li>{{ .Title }}</li>
  </ul>
</div>
```

**Features:**
- Use DaisyUI breadcrumbs styling
- Hugo `.Ancestors` for path traversal
- Add BreadcrumbList structured data
- Show on article and list pages

**Files to create:**
- `layouts/partials/breadcrumbs.html`
- `layouts/partials/seo/breadcrumb-schema.html` (JSON-LD)

**Complexity:** Low-Medium

---

### 7. **Social Sharing** (Priority: LOW)
**Current:** Not implemented (param exists: `article.sharingLinks`)
**Why Custom:**
- Needs specific share URLs for each platform
- Icon integration (heroicons or custom SVG)
- Share count APIs (optional)
- Not a standard DaisyUI pattern

**Recommended Solution:**
Custom component using DaisyUI buttons:

```html
<!-- layouts/partials/sharing-links.html -->
<div class="flex gap-2">
  {{ range .Site.Params.article.sharingLinks }}
    <a href="{{ shareURL . }}" class="btn btn-circle btn-ghost btn-sm">
      {{ partial (printf "icons/%s.html" .) }}
    </a>
  {{ end }}
</div>
```

**Features:**
- DaisyUI ghost buttons for minimal design
- SVG icons for each platform
- Share URLs with proper encoding
- Configurable via params
- Supported platforms: X, LinkedIn, Reddit, Email, Mastodon, Bluesky

**Files to create:**
- `layouts/partials/sharing-links.html`
- `layouts/partials/icons/` (SVG icons for each platform)

**Complexity:** Low

---

### 8. **Author Bio Component** (Priority: LOW)
**Current:** Only author name shown in meta
**Why Custom:**
- Avatar image display
- Bio text
- Social links with icons
- Not suitable for DaisyUI card (too simple)

**Recommended Solution:**
Custom author component for article footer:

```html
<!-- layouts/partials/author-bio.html -->
<div class="mt-12 flex gap-4 items-start bg-base-200 p-6 rounded-box">
  {{ with .Site.Params.author.image }}
    <img src="{{ . | relURL }}" alt="{{ $.Site.Params.author.name }}" class="w-16 h-16 rounded-full" />
  {{ end }}
  <div class="flex-1">
    <h3 class="font-bold text-lg">{{ .Site.Params.author.name }}</h3>
    {{ with .Site.Params.author.headline }}
      <p class="text-sm text-base-content/70">{{ . }}</p>
    {{ end }}
    {{ with .Site.Params.author.bio }}
      <p class="mt-2 text-sm">{{ . }}</p>
    {{ end }}
    {{ with .Site.Params.author.links }}
      <div class="flex gap-2 mt-3">
        {{ range . }}
          <a href="{{ . }}" class="btn btn-ghost btn-sm btn-circle">
            <!-- Icon -->
          </a>
        {{ end }}
      </div>
    {{ end }}
  </div>
</div>
```

**Files to create:**
- `layouts/partials/author-bio.html`
- Update `single.html` to include at end

**Complexity:** Low

---

## 📊 Implementation Priority Matrix

| Component | Priority | Complexity | DaisyUI Usage | Impact |
|-----------|----------|------------|---------------|---------|
| **Table of Contents** | HIGH | Medium-High | None | High - Essential for long articles |
| **Search Interface** | HIGH | High | Modal base | High - Key navigation feature |
| **Theme Switcher** | HIGH | Low | Swap component | Medium - UX improvement |
| **Prose/Typography** | HIGH | Low | None | High - Reading experience |
| **Code Blocks** | MEDIUM | Medium | Mockup-code | Medium - Developer content |
| **Breadcrumbs** | LOW | Low-Medium | Breadcrumbs | Low - Nice to have |
| **Social Sharing** | LOW | Low | Buttons | Low - Optional feature |
| **Author Bio** | LOW | Low | Custom | Low - Profile building |

---

## 🎨 Design Consistency Guidelines

### When to Use DaisyUI
- Standard UI patterns (buttons, cards, modals, forms)
- Navigation components (navbar, menu, breadcrumbs)
- Feedback elements (alerts, badges, loading)
- Layout helpers (dividers, joins, containers)

### When to Build Custom
- Content-specific features (ToC, search results)
- Complex interactions (scroll spy, keyboard shortcuts)
- Blog-specific patterns (author bios, sharing)
- Performance-critical features (lazy loading, code highlighting)

### Integration Pattern
All custom components should:
1. Use DaisyUI color variables (`var(--color-primary)`, etc.)
2. Follow DaisyUI spacing scale (rem units)
3. Respect DaisyUI theme switching
4. Use DaisyUI utility classes where applicable
5. Maintain semantic HTML structure
6. Include ARIA labels for accessibility

---

## 📦 Additional Dependencies Needed

For full feature implementation, request these additions to `package.json`:

```json
{
  "dependencies": {
    "fuse.js": "^7.0.0",              // Search functionality
    "@tailwindcss/typography": "^0.5.15"  // Prose styling (v4 compatible)
  }
}
```

Note: All JavaScript should be vanilla ES6+ (no jQuery, no React), keeping bundle size minimal.

---

## Next Steps

1. **Implement High Priority Custom Components**
   - Table of Contents with scroll spy
   - Search interface with Fuse.js
   - Enhanced theme switcher with persistence
   - Typography overhaul with proper plugin

2. **Enhance Existing DaisyUI Components**
   - Add state management to theme switcher
   - Improve code block styling with copy button

3. **Add Medium/Low Priority Components** (as needed)
   - Breadcrumbs for navigation
   - Social sharing for content promotion
   - Author bio for personal branding

4. **Test Across Browsers**
   - Ensure DaisyUI theme switching works
   - Verify custom JS works without frameworks
   - Check accessibility (ARIA, keyboard nav)
