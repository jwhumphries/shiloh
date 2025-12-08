---
title: "Configuration"
date: 2025-12-07
weight: 20
description: "All available theme parameters."
---

All parameters go in `params` section of your site configuration.

## Appearance

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `colorScheme` | string | `"shiloh"` | daisyUI theme name |
| `defaultAppearance` | string | `"light"` | Initial theme: `"light"` or `"dark"` |
| `autoSwitchAppearance` | boolean | `true` | Respect system preference |
| `defaultThemeColor` | string | `"#ffffff"` | Browser chrome color |

## Features

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enableSearch` | boolean | `true` | Enable Fuse.js search |
| `enableCodeCopy` | boolean | `true` | Show copy button on code blocks |
| `enableImageLazyLoading` | boolean | `true` | Lazy load images |
| `enableImageWebp` | boolean | `true` | Convert images to WebP |
| `enableQuicklink` | boolean | `true` | Prefetch links on hover |

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `logo` | string | Logo image path |
| `logoDark` | string | Dark mode logo path |

## Footer

Configure in `params.footer`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showCopyright` | boolean | `true` | Show copyright notice |
| `showAppearanceSwitcher` | boolean | `true` | Show theme toggle |
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
| `showAuthor` | boolean | `true` | Show author info |
| `showDraftLabel` | boolean | `true` | Show draft indicator |
| `showHeadingAnchors` | boolean | `true` | Show # links on headings |
| `showPagination` | boolean | `true` | Show prev/next links |
| `invertPagination` | boolean | `false` | Reverse pagination order |
| `showReadingTime` | boolean | `true` | Show reading time |
| `showTableOfContents` | boolean | `true` | Show TOC sidebar |
| `showTaxonomies` | boolean | `false` | Show tags/categories |
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
