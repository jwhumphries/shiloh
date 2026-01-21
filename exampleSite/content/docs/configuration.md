---
title: "Configuration"
date: 2025-12-07
weight: 20
description: "All available theme parameters."
---

All parameters go in `params` section of your site configuration. Shiloh uses a modular configuration structure in `config/_default/`.

## Configuration Files

| File | Purpose |
|------|---------|
| `hugo.toml` | Core Hugo settings (outputs, pagination, privacy) |
| `params.toml` | Theme parameters (all options below) |
| `languages.en.toml` | Language and site title settings |
| `menus.en.toml` | Navigation menus |
| `markup.toml` | Markdown rendering and code highlighting |
| `module.toml` | Hugo module configuration |

## Appearance

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `colorScheme` | string | `"shiloh"` | daisyUI theme name |
| `font` | string | `"code"` | Font family: `"code"` (Fira Code) or `"prose"` (Fraunces + Lora) |
| `defaultAppearance` | string | `"light"` | Initial theme: `"light"` or `"dark"` |
| `autoSwitchAppearance` | boolean | `true` | Respect system preference |
| `defaultThemeColor` | string | `"#ffffff"` | Browser chrome color |

### Theme Colors

Shiloh includes two custom daisyUI themes defined in `assets/css/main.css`:

- `shiloh` - Light theme (default)
- `shiloh-dark` - Dark theme

Both themes use OKLCH color space for perceptually uniform colors. The color palette includes primary, secondary, accent, neutral, and semantic colors (info, success, warning, error).

## Features

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enableSearch` | boolean | `true` | Enable Fuse.js search |
| `enableCodeCopy` | boolean | `true` | Show copy button on code blocks |
| `enableImageLazyLoading` | boolean | `true` | Lazy load images |
| `enableImageWebp` | boolean | `true` | Convert images to WebP |

## Swup Page Transitions

Shiloh uses [swup](https://swup.js.org/) for smooth page transitions and link preloading. Configure in `params.swup`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enable` | boolean | `true` | Enable swup page transitions |
| `animation` | string | `"fade"` | Animation type: `"fade"` or `"slide"` |
| `nativeTransitions` | boolean | `true` | Use native View Transitions API (Chrome 111+, Safari 18+) |
| `showProgressBar` | boolean | `true` | Show progress bar for slow connections |
| `preloadOnHover` | boolean | `true` | Preload links on hover |
| `preloadVisibleLinks` | boolean | `true` | Preload visible links in viewport |

```toml
[swup]
  enable = true
  animation = "fade"
  nativeTransitions = true
  showProgressBar = true
  preloadOnHover = true
  preloadVisibleLinks = true
```

## Metadata

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `description` | string | `""` | Site meta description |
| `keywords` | array | `[]` | Site meta keywords |
| `mainSections` | array | `["posts"]` | Sections shown on homepage |
| `robots` | string | `""` | Robots meta tag |
| `fingerprintAlgorithm` | string | `"sha256"` | Asset integrity hash |

## Author

Configure in `params.author`:

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Author name |
| `image` | string | Author avatar path |
| `headline` | string | Short tagline |
| `bio` | string | Longer biography |
| `links` | array | Social links (see below) |

### Social Links

Supported platforms: `email`, `github`, `x-twitter`, `linkedin`, `mastodon`, `bluesky`, `instagram`, `youtube`, `facebook`, `threads`, `discord`, `reddit`, `telegram`, `rss`

```yaml
author:
  links:
    - email: "mailto:you@example.com"
    - github: "https://github.com/username"
    - x-twitter: "https://x.com/username"
    - linkedin: "https://linkedin.com/in/username"
    - mastodon: "https://mastodon.social/@username"
    - bluesky: "https://bsky.app/profile/username"
```

## Header

Configure in `params.header`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showTitle` | boolean | `true` | Show site title in header |
| `logo` | string | `""` | Logo image path (relative to `static/` or `assets/` for inline SVG) |
| `showAppearanceSwitcher` | boolean | `true` | Show theme toggle in header |

The header includes:

- Site logo or title
- Main navigation menu
- Search button (if `enableSearch: true`)
- Theme toggle button
- Mobile hamburger menu (screens < 1024px)

For inline SVG logos that support theme colors, place the SVG in `assets/` and reference it. The SVG will be styled with `text-base-content` for automatic theme support.

## Footer

Configure in `params.footer`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showCopyright` | boolean | `true` | Show copyright notice |
| `showAttribution` | boolean | `true` | Show "Powered by Hugo & Shiloh" |
| `showScrollToTop` | boolean | `true` | Show scroll-to-top button |

## Homepage

Configure in `params.homepage`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showRecent` | boolean | `true` | Show recent articles |
| `recentLimit` | integer | `5` | Number of recent articles |

## Article

Configure in `params.article`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showDate` | boolean | `true` | Show publish date |
| `showDateUpdated` | boolean | `false` | Show last updated date |
| `showAuthorHeader` | boolean | `true` | Show author info in header |
| `showAuthorFooter` | boolean | `true` | Show author bio at end of article |
| `showDraftLabel` | boolean | `true` | Show draft indicator |
| `showHeadingAnchors` | boolean | `true` | Show # links on headings |
| `showPagination` | boolean | `true` | Show prev/next links |
| `invertPagination` | boolean | `false` | Reverse pagination order |
| `showReadingTime` | boolean | `true` | Show reading time |
| `showTableOfContents` | boolean | `true` | Show TOC sidebar |
| `showTaxonomies` | boolean | `false` | Show tags/categories |
| `displayTaxonomies` | array | `["tags", "categories"]` | Which taxonomies to display |
| `showWordCount` | boolean | `false` | Show word count |
| `showComments` | boolean | `false` | Show comments section |
| `sharingLinks` | array | `[]` | Social sharing buttons |

### Sharing Links

Available options: `facebook`, `x-twitter`, `mastodon`, `pinterest`, `reddit`, `linkedin`, `email`, `threads`, `telegram`, `line`, `weibo`, `xing`, `bluesky`

```yaml
article:
  sharingLinks:
    - x-twitter
    - linkedin
    - email
```

## List

Configure in `params.list`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showBreadcrumbs` | boolean | `false` | Show breadcrumb navigation |
| `showSummary` | boolean | `false` | Show article summaries |
| `showTableOfContents` | boolean | `false` | Show TOC on list pages |
| `showTaxonomies` | boolean | `false` | Show tags on cards |
| `groupByYear` | boolean | `true` | Group articles by year |
| `paginationWidth` | integer | `1` | Page links to show |

## Taxonomy

Configure in `params.taxonomy`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showTermCount` | boolean | `true` | Show post count per term |

## Sitemap

Configure in `params.sitemap`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `excludedKinds` | array | `["taxonomy", "term"]` | Page kinds to exclude |

## Verification

Configure in `params.verification` for search engine verification:

```yaml
verification:
  google: "verification-code"
  bing: "verification-code"
  pinterest: "verification-code"
  yandex: "verification-code"
```

## Menus

Configure navigation in `menus.en.toml`:

```toml
[[main]]
  name = "Posts"
  pageRef = "posts"
  weight = 10

[[main]]
  name = "About"
  pageRef = "about"
  weight = 20

[[main]]
  identifier = "search"
  weight = 99

[[footer]]
  name = "Privacy"
  url = "/privacy"
  weight = 10
```

The `search` identifier adds a search button to the navbar (requires `enableSearch: true`).

## Markup Settings

Configure in `markup.toml`:

```toml
[highlight]
  noClasses = false
  lineNos = false
  lineNumbersInTable = true

[goldmark.renderer]
  unsafe = true

[tableOfContents]
  startLevel = 2
  endLevel = 3
  ordered = false
```

The `unsafe = true` setting allows raw HTML in markdown content.
