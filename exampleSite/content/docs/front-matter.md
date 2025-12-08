---
title: "Front Matter"
date: 2025-12-07
weight: 30
description: "Page-level configuration options."
---

All theme parameters can be overridden per-page using front matter.

## Basic

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Page title |
| `date` | date | Publish date |
| `lastmod` | date | Last modified date |
| `draft` | boolean | Mark as draft |
| `description` | string | Page description |
| `summary` | string | Custom summary for cards |
| `tags` | array | Page tags |
| `categories` | array | Page categories |

## Layout

| Parameter | Type | Description |
|-----------|------|-------------|
| `layout` | string | Override layout template |
| `type` | string | Content type |

## Article Overrides

Override any `params.article` setting per-page:

```yaml
---
title: "My Article"
showTableOfContents: false
showReadingTime: false
showDate: false
---
```

## Featured Image

```yaml
---
title: "My Article"
featureImage: "image.jpg"
featureImageAlt: "Description of image"
---
```

## Table of Contents

The TOC appears automatically for articles over 400 words. To disable:

```yaml
---
showTableOfContents: false
---
```

## Draft Posts

Draft posts are hidden in production but shown when running `hugo server`:

```yaml
---
draft: true
---
```

## Custom Layouts

Use `layout` to specify a custom template:

```yaml
---
layout: "about"
---
```

Available layouts:
- `single` - Default article layout
- `list` - Archive/list page
- `about` - About page with optional profile image
