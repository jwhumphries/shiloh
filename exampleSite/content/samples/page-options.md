---
title: "Page Options Demo"
date: 2025-12-07
description: "Demonstrating various front matter options."
tags: ["features", "front matter"]
showDate: true
showAuthorHeader: true
showReadingTime: true
showWordCount: true
showTaxonomies: true
showTableOfContents: false
---

{{< lead >}}
This page demonstrates various front matter options that control article display.
{{< /lead >}}

## Options Enabled on This Page

This page has these options explicitly enabled:

```yaml
showDate: true
showAuthorHeader: true
showReadingTime: true
showWordCount: true
showTaxonomies: true
showTableOfContents: false
```

Notice the word count appears in the article meta, and tags are shown.

## Hiding Elements

To hide any element, set it to `false`:

```yaml
---
showDate: false
showAuthorHeader: false
showReadingTime: false
---
```

## Date Options

### Publish Date

```yaml
date: 2024-01-08
showDate: true
```

### Updated Date

```yaml
date: 2024-01-01
lastmod: 2024-01-08
showDateUpdated: true
```

## Pagination

Control prev/next links:

```yaml
showPagination: true
invertPagination: false
```

## Author Override

Override the site author for a specific page:

```yaml
author:
  name: "Guest Author"
  headline: "Guest Writer"
```
