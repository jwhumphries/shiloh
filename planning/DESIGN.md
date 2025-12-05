# Modern Static Website Design Recommendations

This document outlines design improvements to bring the Shiloh theme up to speed with modern static website best practices, focusing on performance, accessibility, SEO, and user experience.

---

## 🎯 Design Philosophy

### Core Principles
1. **Content First** - The reading experience is paramount
2. **Performance** - Fast load times, minimal JS, efficient CSS
3. **Accessibility** - WCAG 2.1 AA compliance minimum
4. **Progressive Enhancement** - Core features work without JS
5. **Responsive** - Mobile-first, fluid typography, container queries
6. **Semantic** - Proper HTML5, structured data, meaningful markup

---

## 📐 Layout & Visual Hierarchy

### Current State
- ✅ Single-column content (good for readability)
- ✅ Max-width constraint (max-w-4xl, ~896px)
- ⚠️ Fixed breakpoints (md:, lg:)
- ❌ No container queries
- ❌ Table of Contents not integrated into layout

### Recommended Improvements

#### 1. **Two-Column Article Layout** (Desktop)
```
┌─────────────────────────────────────────────┐
│              Header/Nav                     │
├────────────────────┬────────────────────────┤
│                    │                        │
│   Article Content  │  Sticky ToC Sidebar   │
│   (max-w-prose)    │  (w-64)               │
│                    │                        │
│                    │  - Active section      │
│                    │  - Smooth scroll       │
│                    │  - Progress indicator  │
│                    │                        │
└────────────────────┴────────────────────────┘
```

**Implementation:**
```html
<!-- single.html -->
<div class="grid lg:grid-cols-[1fr_16rem] xl:grid-cols-[1fr_20rem] gap-12">
  <article class="prose prose-lg max-w-prose">
    {{ .Content }}
  </article>
  {{ if and (.Params.showTableOfContents | default .Site.Params.article.showTableOfContents) (gt .WordCount 400) }}
    {{ partial "toc.html" . }}
  {{ end }}
</div>
```

**Benefits:**
- Better use of widescreen space
- ToC always visible during reading
- Content remains in optimal line-length zone (~65-75 characters)

---

#### 2. **Fluid Typography** (Responsive Text)

**Current:** Fixed text sizes with breakpoint jumps
**Problem:** Abrupt size changes, not optimized for all screen sizes

**Solution:** CSS `clamp()` for fluid scaling

```css
/* assets/css/main.css */
@theme {
  /* Base font size scales from 16px (mobile) to 20px (desktop) */
  --font-size-base: clamp(1rem, 0.875rem + 0.5vw, 1.25rem);

  /* Headings scale proportionally */
  --font-size-h1: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  --font-size-h2: clamp(1.75rem, 1.25rem + 1.5vw, 2.75rem);
  --font-size-h3: clamp(1.5rem, 1.125rem + 1vw, 2.25rem);
  --font-size-h4: clamp(1.25rem, 1rem + 0.75vw, 1.875rem);

  /* Line height adjusts with font size */
  --line-height-tight: 1.25;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.75;
}

body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

**Benefits:**
- Smooth scaling across all devices
- Better readability on tablets (often neglected)
- Reduced need for breakpoint-specific styles

---

#### 3. **Container Queries for Cards**

**Current:** Grid with fixed breakpoints (`md:grid-cols-2`)
**Problem:** Cards resize based on viewport, not container width

**Solution:** Use Tailwind v4 container queries

```css
@theme {
  --container-type: inline-size;
}

.article-grid {
  container-type: inline-size;
  display: grid;
  gap: 1.5rem;

  @container (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Benefits:**
- Cards adapt to their container, not viewport
- More flexible sidebar layouts
- Better component reusability

---

## 🎨 Visual Design & Aesthetics

### Color System Enhancements

#### 1. **Expanded OKLCH Color Palette**

**Current:** Good OKLCH foundation in `main.css`
**Enhancement:** Add semantic color scales

```css
@theme {
  /* Extend primary scale for more nuanced UI */
  --color-primary-50: oklch(97% 0.02 142);
  --color-primary-100: oklch(93% 0.04 142);
  --color-primary-500: oklch(52% 0.09 142);  /* existing */
  --color-primary-600: oklch(45% 0.10 142);
  --color-primary-700: oklch(38% 0.11 142);
  --color-primary-900: oklch(22% 0.08 142);

  /* Prose-specific colors */
  --color-prose-headings: var(--color-base-content);
  --color-prose-body: oklch(35% 0.02 90);
  --color-prose-links: var(--color-primary-600);
  --color-prose-links-hover: var(--color-primary-700);
  --color-prose-code-bg: var(--color-base-200);
  --color-prose-quote-border: var(--color-primary-500);
}
```

---

#### 2. **Dark Mode Refinement**

**Current:** Only light theme defined
**Missing:** Proper dark mode variant

**Solution:** Add dark mode theme using DaisyUI v5 syntax

```css
@plugin "daisyui/theme" {
  name: "shiloh-dark";
  default: false;
  prefersdark: true;
  color-scheme: "dark";
  --color-base-100: oklch(15% 0.01 240);
  --color-base-200: oklch(20% 0.015 240);
  --color-base-300: oklch(25% 0.02 240);
  --color-base-content: oklch(90% 0.01 109);
  --color-primary: oklch(65% 0.12 142);        /* Lighter in dark mode */
  --color-primary-content: oklch(15% 0.01 142);
  /* ... other colors adjusted for dark */
}
```

**Implementation in theme switcher:**
```js
// assets/js/theme.js
const themes = {
  light: 'shiloh',
  dark: 'shiloh-dark',
  auto: () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'shiloh-dark' : 'shiloh'
};
```

---

### Typography Improvements

#### 1. **Reading Experience Optimization**

**Current:** Generic prose styling
**Enhancement:** Optimized for long-form reading

```css
@utility article-prose {
  /* Optimal line length (45-75 characters) */
  max-width: 65ch;

  /* Improved paragraph spacing */
  & p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    line-height: 1.75;
  }

  /* First paragraph larger (lede) */
  & > p:first-of-type {
    font-size: 1.125em;
    line-height: 1.65;
    color: var(--color-base-content);
  }

  /* Drop cap (optional, toggle via param) */
  & > p:first-of-type::first-letter {
    font-size: 3.25em;
    font-weight: 700;
    line-height: 1;
    float: left;
    margin-right: 0.1em;
    margin-top: 0.05em;
  }

  /* Better list styling */
  & ul, & ol {
    padding-left: 1.5em;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }

  & li {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    line-height: 1.65;
  }

  /* Blockquote styling */
  & blockquote {
    border-left: 4px solid var(--color-prose-quote-border);
    padding-left: 1.5em;
    font-style: italic;
    color: var(--color-base-content-70);
    margin: 2em 0;
  }

  /* Inline code */
  & code {
    background: var(--color-prose-code-bg);
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-weight: 600;
  }

  /* Code blocks - don't style (handled by Chroma) */
  & pre code {
    background: none;
    padding: 0;
    font-weight: 400;
  }
}
```

---

#### 2. **Heading Anchor Links** (Enhancement)

**Current:** Basic anchor with `#` on hover
**Enhancement:** Better visual treatment

```html
<!-- layouts/_markup/render-heading.html -->
<h{{ .Level }} id="{{ .Anchor | safeURL }}" class="group relative">
  {{ .Text | safeHTML }}
  {{ if .Page.Params.showHeadingAnchors | default (.Page.Site.Params.article.showHeadingAnchors | default true) }}
    <a
      href="#{{ .Anchor | safeURL }}"
      class="anchor-link absolute -left-6 px-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary no-underline"
      aria-label="Link to this section: {{ .Text }}"
    >
      <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    </a>
  {{ end }}
</h{{ .Level }}>
```

---

## 🖼️ Images & Media

### Current Issues
- ❌ No image optimization
- ❌ No responsive images (srcset)
- ❌ No WebP support (param exists but not used)
- ❌ No figure/figcaption support
- ⚠️ Basic lazy loading only

### Recommended Solutions

#### 1. **Hugo Image Processing**

```html
<!-- layouts/_markup/render-image.html -->
{{ $src := .Page.Resources.GetMatch .Destination }}
{{ if $src }}
  {{ $small := $src.Resize "640x webp q85" }}
  {{ $medium := $src.Resize "1024x webp q85" }}
  {{ $large := $src.Resize "1920x webp q85" }}
  {{ $fallback := $src.Resize "1024x jpg q85" }}

  <figure class="my-8">
    <picture>
      <source
        type="image/webp"
        srcset="{{ $small.RelPermalink }} 640w, {{ $medium.RelPermalink }} 1024w, {{ $large.RelPermalink }} 1920w"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
      />
      <img
        src="{{ $fallback.RelPermalink }}"
        alt="{{ .Text }}"
        {{ with .Title }}title="{{ . }}"{{ end }}
        loading="lazy"
        decoding="async"
        class="mx-auto rounded-lg shadow-lg"
        width="{{ $fallback.Width }}"
        height="{{ $fallback.Height }}"
      />
    </picture>
    {{ with .Title }}
      <figcaption class="text-center text-sm text-base-content/70 mt-2">
        {{ . }}
      </figcaption>
    {{ end }}
  </figure>
{{ else }}
  <!-- Fallback for external images -->
  <img
    src="{{ .Destination | safeURL }}"
    alt="{{ .Text }}"
    {{ with .Title }}title="{{ . }}"{{ end }}
    loading="lazy"
    decoding="async"
    class="mx-auto rounded-lg"
  />
{{ end }}
```

**Benefits:**
- Automatic WebP conversion
- Responsive images (bandwidth savings)
- Proper dimensions (prevents layout shift)
- Fallback for external images

---

#### 2. **Hero Images for Articles**

**New Feature:** Support for article hero images

```html
<!-- In single.html, before title -->
{{ with .Params.hero }}
  {{ $hero := $.Page.Resources.GetMatch . }}
  {{ if $hero }}
    {{ $heroLarge := $hero.Fill "1200x600 webp q90" }}
    {{ $heroMedium := $hero.Fill "800x400 webp q90" }}
    <div class="hero-image mb-8 -mx-4 sm:-mx-14 md:-mx-24 lg:-mx-32">
      <picture>
        <source
          media="(min-width: 768px)"
          srcset="{{ $heroLarge.RelPermalink }}"
        />
        <img
          src="{{ $heroMedium.RelPermalink }}"
          alt="{{ $.Title }}"
          class="w-full h-auto object-cover rounded-lg"
          width="{{ $heroMedium.Width }}"
          height="{{ $heroMedium.Height }}"
        />
      </picture>
    </div>
  {{ end }}
{{ end }}
```

---

## ⚡ Performance Optimizations

### 1. **Critical CSS Inlining**

**Current:** Single CSS bundle loaded via `<link>`
**Enhancement:** Inline critical CSS, defer non-critical

```html
<!-- layouts/partials/head.html -->
{{ $css := resources.Get "css/main.bundle.css" }}
{{ $criticalCSS := resources.Get "css/critical.css" }}

{{ if hugo.IsProduction }}
  {{ $criticalCSS = $criticalCSS | minify }}
  <style>{{ $criticalCSS.Content | safeCSS }}</style>

  <link
    rel="preload"
    href="{{ $css.RelPermalink }}"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="{{ $css.RelPermalink }}"></noscript>
{{ else }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" />
{{ end }}
```

---

### 2. **JavaScript Loading Strategy**

**Current:** Inline scripts in baseof.html
**Enhancement:** Modular, deferred loading

```html
<!-- layouts/partials/scripts.html -->
{{ if hugo.IsProduction }}
  {{ $theme := resources.Get "js/theme.js" | js.Build | minify | fingerprint }}
  <script src="{{ $theme.RelPermalink }}" defer></script>

  {{ if .Site.Params.enableSearch }}
    {{ $search := resources.Get "js/search.js" | js.Build | minify | fingerprint }}
    <script src="{{ $search.RelPermalink }}" defer></script>
  {{ end }}

  {{ if .Params.showTableOfContents | default .Site.Params.article.showTableOfContents }}
    {{ $toc := resources.Get "js/toc.js" | js.Build | minify | fingerprint }}
    <script src="{{ $toc.RelPermalink }}" defer></script>
  {{ end }}
{{ else }}
  <script src="{{ (resources.Get "js/theme.js").RelPermalink }}" defer></script>
  {{ if .Site.Params.enableSearch }}
    <script src="{{ (resources.Get "js/search.js").RelPermalink }}" defer></script>
  {{ end }}
  {{ if .Params.showTableOfContents | default .Site.Params.article.showTableOfContents }}
    <script src="{{ (resources.Get "js/toc.js").RelPermalink }}" defer></script>
  {{ end }}
{{ end }}
```

**Benefits:**
- Only load JS that's needed
- Fingerprinting for cache busting
- Minification in production
- Deferred execution (non-blocking)

---

### 3. **Preconnect/Prefetch**

```html
<!-- layouts/partials/head.html -->
{{/* Preconnect to external domains */}}
{{ if .Site.Params.enableSearch }}
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
{{ end }}

{{/* Prefetch next/prev articles */}}
{{ if .IsPage }}
  {{ with .NextInSection }}
    <link rel="prefetch" href="{{ .RelPermalink }}">
  {{ end }}
  {{ with .PrevInSection }}
    <link rel="prefetch" href="{{ .RelPermalink }}">
  {{ end }}
{{ end }}
```

---

## ♿ Accessibility Improvements

### 1. **Skip Links** (Already Implemented ✅)
```html
<!-- baseof.html - KEEP THIS -->
<a href="#main-content" class="sr-only focus:not-sr-only ...">
  Skip to main content
</a>
```

### 2. **ARIA Landmarks Enhancement**

```html
<!-- baseof.html -->
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only...">Skip to main content</a>

  <header role="banner">
    {{- partial "header/basic.html" . -}}
  </header>

  <main id="main-content" role="main" aria-label="Main content">
    {{- block "main" . }}{{- end }}
  </main>

  <footer role="contentinfo">
    {{- partial "footer.html" . -}}
  </footer>
</body>
```

### 3. **Focus Visible Indicators**

```css
@theme {
  --focus-ring-color: var(--color-primary-500);
  --focus-ring-offset: 2px;
  --focus-ring-width: 2px;
}

/* Global focus styles */
*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-radius: 0.25rem;
}

/* Remove default browser outline */
*:focus {
  outline: none;
}
```

### 4. **Reduced Motion Preference**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🔍 SEO Enhancements

### 1. **Structured Data (JSON-LD)**

```html
<!-- layouts/partials/seo/structured-data.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{ if .IsPage }}BlogPosting{{ else }}WebSite{{ end }}",
  {{ if .IsPage }}
  "headline": "{{ .Title }}",
  "description": "{{ with .Description }}{{ . }}{{ else }}{{ .Summary | plainify | truncate 160 }}{{ end }}",
  "datePublished": "{{ .PublishDate.Format "2006-01-02T15:04:05Z07:00" }}",
  "dateModified": "{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}",
  "author": {
    "@type": "Person",
    "name": "{{ .Site.Params.author.name }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ .Site.Title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ .Site.Params.header.logo | absURL }}"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ .Permalink }}"
  }
  {{ else }}
  "name": "{{ .Site.Title }}",
  "url": "{{ .Site.BaseURL }}"
  {{ end }}
}
</script>
```

Add to `head.html`:
```html
{{ partial "seo/structured-data.html" . }}
```

---

### 2. **Enhanced Open Graph**

**Current:** Basic OG tags
**Enhancement:** Rich social previews

```html
<!-- layouts/partials/seo/opengraph.html -->
<meta property="og:url" content="{{ .Permalink }}" />
<meta property="og:site_name" content="{{ .Site.Title }}" />
<meta property="og:title" content="{{ .Title }}" />
<meta property="og:locale" content="{{ .Lang }}" />

{{ if .IsPage }}
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="{{ .PublishDate.Format "2006-01-02T15:04:05Z07:00" }}" />
  <meta property="article:modified_time" content="{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}" />
  {{ with .Params.author }}
    <meta property="article:author" content="{{ . }}" />
  {{ end }}
  {{ range .Params.topics }}
    <meta property="article:tag" content="{{ . }}" />
  {{ end }}
{{ else }}
  <meta property="og:type" content="website" />
{{ end }}

{{ with .Description }}
  <meta property="og:description" content="{{ . }}" />
{{ else }}
  {{ with .Summary }}
    <meta property="og:description" content="{{ . | plainify | truncate 200 }}" />
  {{ end }}
{{ end }}

{{ with .Params.feature }}
  {{ $image := $.Page.Resources.GetMatch . }}
  {{ if $image }}
    {{ $ogImage := $image.Fill "1200x630 webp q90" }}
    <meta property="og:image" content="{{ $ogImage.Permalink }}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/webp" />
  {{ end }}
{{ end }}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{ .Title }}" />
{{ with .Description }}
  <meta name="twitter:description" content="{{ . }}" />
{{ end }}
{{ with .Params.feature }}
  {{ $image := $.Page.Resources.GetMatch . }}
  {{ if $image }}
    {{ $twitterImage := $image.Fill "1200x600 webp q90" }}
    <meta name="twitter:image" content="{{ $twitterImage.Permalink }}" />
  {{ end }}
{{ end }}
```

---

### 3. **RSS Feed Enhancement**

**Current:** Default Hugo RSS
**Enhancement:** Full content RSS with styles

```xml
<!-- layouts/_default/rss.xml -->
{{ printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{{ .Site.Title }}</title>
    <link>{{ .Permalink }}</link>
    <description>{{ .Site.Params.description }}</description>
    <language>{{ .Site.LanguageCode }}</language>
    <lastBuildDate>{{ now.Format "Mon, 02 Jan 2006 15:04:05 -0700" }}</lastBuildDate>
    <atom:link href="{{ .Permalink }}" rel="self" type="application/rss+xml"/>
    {{ range first 20 .Pages }}
      <item>
        <title>{{ .Title }}</title>
        <link>{{ .Permalink }}</link>
        <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" }}</pubDate>
        <guid>{{ .Permalink }}</guid>
        <description>{{ .Summary | html }}</description>
        <content:encoded>{{ printf "<![CDATA[%s]]>" .Content | safeHTML }}</content:encoded>
        {{ range.Params.topics }}
          <category>{{ . }}</category>
        {{ end }}
      </item>
    {{ end }}
  </channel>
</rss>
```

---

## 🎭 Micro-interactions & Polish

### 1. **Page Transitions**

```css
/* Fade in on page load */
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main {
  animation: page-enter 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  main {
    animation: none;
  }
}
```

### 2. **Hover States for Cards**

```css
/* Enhanced article-link hover */
.article-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px oklch(25% 0.02 90 / 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .article-card:hover {
    transform: none;
  }
}
```

### 3. **Reading Progress Indicator**

```html
<!-- Add to baseof.html for article pages -->
{{ if .IsPage }}
  <div id="reading-progress" class="fixed top-0 left-0 h-1 bg-primary z-50 transition-all" style="width: 0%"></div>
{{ end }}
```

```js
// assets/js/reading-progress.js
if (document.getElementById('reading-progress')) {
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    document.getElementById('reading-progress').style.width = `${progress}%`;
  }, { passive: true });
}
```

---

## 📱 Mobile Optimizations

### 1. **Touch Target Sizes**

Ensure all interactive elements meet minimum 44x44px touch target:

```css
/* Minimum touch target size */
.btn, a, button, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
  /* Exception for inline text links */
  &:not(.btn):not(button)[href] {
    min-height: auto;
    min-width: auto;
  }
}
```

### 2. **Mobile Menu Improvements**

Current dropdown works but could be enhanced:

```html
<!-- Consider adding slide-out drawer for mobile nav -->
<div class="drawer lg:hidden">
  <input id="mobile-menu" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <label for="mobile-menu" class="btn btn-ghost drawer-button">
      <!-- Menu icon -->
    </label>
  </div>
  <div class="drawer-side">
    <label for="mobile-menu" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <!-- Menu items -->
    </ul>
  </div>
</div>
```

---

## 📊 Analytics & Monitoring

### Recommended Additions

1. **Web Vitals Monitoring** (Optional param)
```html
<!-- If .Site.Params.enableWebVitals -->
<script type="module">
  import {onCLS, onFID, onLCP} from 'https://unpkg.com/web-vitals?module';
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
</script>
```

2. **Privacy-Friendly Analytics** (Plausible, Fathom, or umami)
```html
<!-- params.toml: analytics.plausible = "yourdomain.com" -->
{{ with .Site.Params.analytics.plausible }}
  <script defer data-domain="{{ . }}" src="https://plausible.io/js/script.js"></script>
{{ end }}
```

---

## 🎯 Implementation Roadmap

### Phase 1: Foundation (Week 1)
- ✅ Typography system overhaul (fluid type, prose styles)
- ✅ Dark mode implementation
- ✅ Image processing with WebP
- ✅ SEO structured data

### Phase 2: Features (Week 2)
- ✅ Table of Contents with scroll spy
- ✅ Search interface
- ✅ Enhanced theme switcher
- ✅ Code block with copy button

### Phase 3: Polish (Week 3)
- ✅ Micro-interactions (hover, transitions)
- ✅ Reading progress indicator
- ✅ Performance optimizations (critical CSS, JS splitting)
- ✅ Accessibility audit & fixes

### Phase 4: Optional Enhancements
- Breadcrumbs
- Social sharing
- Author bio
- Hero images
- Comments system integration

---

## 📝 Design Checklist

Before considering design "complete":

- [ ] Typography scales smoothly on all devices
- [ ] Dark mode works perfectly (no flash, proper colors)
- [ ] All interactive elements have :focus-visible states
- [ ] Images are responsive with WebP support
- [ ] Page load time < 2 seconds (Lighthouse)
- [ ] Accessibility score > 95 (Lighthouse)
- [ ] SEO score > 95 (Lighthouse)
- [ ] Works without JavaScript (progressive enhancement)
- [ ] Tested on: Chrome, Firefox, Safari, Mobile Safari
- [ ] Passes WAVE accessibility checker
- [ ] Valid HTML5 (W3C validator)
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] All images have meaningful alt text
- [ ] Sufficient color contrast (WCAG AA minimum)
- [ ] RSS feed validated
- [ ] Open Graph preview looks good on: Twitter, LinkedIn, Slack

---

## 🔗 Additional Resources

- [Hugo Docs: Image Processing](https://gohugo.io/content-management/image-processing/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/v4-beta)
- [DaisyUI v5 Themes](https://daisyui.com/docs/themes/)
- [OKLCH Color Picker](https://oklch.com/)
- [Web.dev: Performance](https://web.dev/performance/)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
