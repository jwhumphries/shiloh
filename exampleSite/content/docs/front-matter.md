---
title: "Front Matter"
date: 2025-12-07
weight: 30
description: "Page-level configuration options."
author:
  name: "Guest Author"
  headline: "Guest Writer"
---

All theme parameters can be overridden per-page using front matter. This allows fine-grained control over how each page is displayed.

## Basic Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Page title (used in browser tab and headings) |
| `date` | date | Publish date |
| `lastmod` | date | Last modified date |
| `draft` | boolean | Mark as draft (hidden in production) |
| `description` | string | Page description (meta tag and social cards) |
| `summary` | string | Custom summary for article cards |
| `tags` | array | Page tags |
| `categories` | array | Page categories |
| `keywords` | array | SEO keywords |
| `weight` | integer | Sort order for list pages |

## Layout Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `layout` | string | Override layout template |
| `type` | string | Content type (determines lookup path) |

### Available Layouts

- `single` - Default article layout with optional TOC sidebar
- `list` - Archive/list page with article cards
- `about` - About page layout

## Display Overrides

Override any `params.article` setting per-page:

```yaml
---
title: "My Article"
showTableOfContents: false
showReadingTime: false
showDate: false
showAuthorHeader: false
showAuthorFooter: false
showWordCount: true
showTaxonomies: true
showPagination: false
showHeadingAnchors: false
showDraftLabel: true
showDateUpdated: true
---
```

## Featured Images

Add featured images that appear on article cards:

```yaml
---
title: "My Article"
featureImage: "image.jpg"
featureImageAlt: "Description of image"
---
```

Place the image in the same directory as your content file (page bundle) or reference a path in `static/`.

## Table of Contents

The TOC appears automatically for articles over 400 words when `showTableOfContents: true` (the default). The TOC displays as a sticky sidebar on larger screens and is hidden on mobile.

To disable for a specific page:

```yaml
---
showTableOfContents: false
---
```

## Draft Posts

Draft posts are hidden in production but visible during development:

```yaml
---
draft: true
---
```

Build with drafts using:

```bash
hugo --buildDrafts
hugo server --buildDrafts
```

When displayed, draft posts show a "Draft" badge (controlled by `showDraftLabel`).

## Author Override

Override the site-wide author for a specific page:

```yaml
---
author:
  name: "Guest Author"
  headline: "Guest Writer"
  image: "guest-avatar.jpg"
---
```

## SEO Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `description` | string | Meta description |
| `keywords` | array | Meta keywords |
| `robots` | string | Robots meta directive |

```yaml
---
description: "A detailed guide to configuring Shiloh"
keywords: ["hugo", "theme", "configuration"]
robots: "noindex, nofollow"
---
```

## Open Graph Overrides

| Parameter | Type | Description |
|-----------|------|-------------|
| `images` | array | Open Graph images (up to 6) |

```yaml
---
images:
  - "og-image.jpg"
  - "og-image-2.jpg"
---
```

## Section Index Pages

For `_index.md` files, additional options control section listing behavior:

```yaml
---
title: "Blog Posts"
description: "All articles and tutorials"
cascade:
  showReadingTime: true
  showDate: true
---
```

The `cascade` option applies settings to all pages in the section.

## Complete Example

```yaml
---
title: "Getting Started with Shiloh"
date: 2024-01-15
lastmod: 2024-01-20
draft: false
description: "Learn how to set up and customize the Shiloh Hugo theme"
summary: "A beginner's guide to the Shiloh theme"
tags: ["tutorial", "hugo", "themes"]
categories: ["Documentation"]
keywords: ["hugo theme", "shiloh", "getting started"]
featureImage: "cover.jpg"
featureImageAlt: "Shiloh theme screenshot"
showTableOfContents: true
showReadingTime: true
showWordCount: true
showTaxonomies: true
showAuthorHeader: true
showAuthorFooter: true
showDate: true
showDateUpdated: true
---
```
