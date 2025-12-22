---
title: "Page Options Demo"
date: 2025-12-07
description: "See how front matter parameters change the look of a page."
tags: ["features", "front matter"]
showDate: true
showAuthorHeader: true
showReadingTime: true
showWordCount: true
showTaxonomies: true
showTableOfContents: false
author:
  name: "Guest Author"
  headline: "Guest Writer"
  bio: "This bio is unique to this specific page."
---

{{< lead >}}
This page serves as a live demonstration of various front matter options. You can verify the behavior by checking the front matter source of this file.
{{< /lead >}}

## Active Settings

This page uses the following configuration overrides:

```yaml
---
showDate: true
showAuthorHeader: true
showReadingTime: true
showWordCount: true
showTaxonomies: true
showTableOfContents: false
---
```

**Observations:**
1.  **No Table of Contents**: Even though there are headings, the sidebar TOC is missing because `showTableOfContents` is `false`.
2.  **Word Count**: You can see the word count near the top (e.g., "150 words").
3.  **Taxonomies**: Tags are displayed at the bottom of the content.

## Conceptual Examples

While we can't toggle settings dynamically on a static page, here is how other settings behave:

### Hiding Dates

If you are writing a timeless "About" page or documentation that shouldn't feel dated, disable the date display:

```yaml
showDate: false
showDateUpdated: false
```

### Clean Layout

For a minimal look, perhaps for a landing page or a visual gallery, you might disable most metadata:

```yaml
showReadingTime: false
showWordCount: false
showAuthorHeader: false
showAuthorFooter: false
showPagination: false
```

### Guest Authors

The author block below is overridden for this page. Instead of the site-wide default author, it displays "Guest Author".

```yaml
author:
  name: "Guest Author"
  headline: "Guest Writer"
  bio: "This bio is unique to this specific page."
```

## Pagination Control

This page has `showPagination: true` (default), so you should see links to the previous and next articles at the bottom. To create a standalone page (orphan), set it to `false`.
