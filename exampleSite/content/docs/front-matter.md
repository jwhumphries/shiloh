---
title: "Front Matter"
date: 2025-12-07
weight: 30
description: "Page-level configuration and overrides."
---

Front matter allows you to configure settings for individual pages. Shiloh supports standard Hugo front matter parameters as well as theme-specific overrides.

## Standard Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | The title of the content. |
| `date` | string | Publication date (ISO 8601 format). |
| `description` | string | Description used in meta tags and social cards. |
| `summary` | string | A custom summary displayed on list pages. |
| `tags` | array | A list of tags associated with the content. |
| `categories` | array | A list of categories associated with the content. |
| `keywords` | array | Keywords for SEO. |
| `weight` | integer | Used for sorting content in list pages. |
| `layout` | string | Specify a custom layout template (e.g., `single`, `list`, `about`). |
| `draft` | boolean | If true, the content will not be rendered unless built with `-D`. |

## Theme Display Overrides

You can toggle almost any feature defined in `params.article` for a specific page.

```yaml
---
title: "Customized Article"
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
invertPagination: true
---
```

### Available Overrides

*   **`showDate`**: Show/hide publication date.
*   **`showDateUpdated`**: Show/hide last updated date.
*   **`showAuthorHeader`**: Show/hide author info at the top.
*   **`showAuthorFooter`**: Show/hide author bio at the bottom.
*   **`showDraftLabel`**: Show/hide "Draft" label.
*   **`showHeadingAnchors`**: Show/hide links next to headings.
*   **`showPagination`**: Show/hide next/prev links.
*   **`invertPagination`**: Reverse direction of next/prev links.
*   **`showReadingTime`**: Show/hide estimated reading time.
*   **`showTableOfContents`**: Show/hide table of contents.
*   **`showTaxonomies`**: Show/hide tags and categories.
*   **`showWordCount`**: Show/hide word count.

## Featured Images

Add a featured image to appear at the top of the article and in social media cards.

```yaml
---
featureImage: "images/cover.jpg"
featureImageAlt: "A beautiful landscape showing the mountains"
---
```

*   **`featureImage`**: Path to the image. Can be a local path relative to the page bundle, a path in `static/`, or an external URL.
*   **`featureImageAlt`**: Alt text for accessibility.

## Section Configuration (Cascade)

To apply settings to an entire section (e.g., all posts in `/blog/`), use the `cascade` parameter in the section's `_index.md` file.

```yaml
---
title: "Blog"
cascade:
  showReadingTime: true
  showAuthorFooter: false
  showDateUpdated: true
---
```

This ensures that every page within that section inherits these settings.

## Author Override

You can credit a different author for a specific post without changing the global site config.

```yaml
---
author:
  name: "Jane Doe"
  image: "/images/jane.jpg"
  headline: "Guest Contributor"
  bio: "Jane is a software engineer who loves open source."
  links:
    - x-twitter: "https://x.com/janedoe"
    - github: "https://github.com/janedoe"
---
```

## SEO & Open Graph

Override specific SEO metadata for a page.

```yaml
---
description: "A comprehensive guide to Shiloh theme configuration."
keywords: ["hugo", "shiloh", "theme", "guide"]
robots: "noindex, nofollow"
images:
  - "images/og-custom.jpg"
---
```

*   **`images`**: An array of image paths to use for Open Graph (Facebook, LinkedIn, etc.) and Twitter Cards.
