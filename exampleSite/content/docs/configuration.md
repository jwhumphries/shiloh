---
title: "Configuration"
date: 2025-12-07
weight: 20
description: "Detailed guide to theme configuration parameters."
---

Shiloh is highly configurable through the `params.toml` file (or `hugo.toml` `[params]` section). Below is a comprehensive reference of all available options.

## Appearance & Color Scheme

Control the visual style of your site.

```toml
[params]
  # Color scheme name (currently supports "shiloh")
  colorScheme = "shiloh"

  # Default appearance: "light" or "dark"
  defaultAppearance = "light"

  # Auto-switch appearance based on system preference
  autoSwitchAppearance = true

  # Default theme color for browser chrome (mobile address bar)
  defaultThemeColor = "#ffffff"

  # Font family: "code" (Fira Code) or "prose" (Fraunces + Lora)
  font = "code"
```

## Feature Flags

Toggle major features on or off.

```toml
[params]
  # Enable site search (powered by Fuse.js)
  enableSearch = true

  # Enable code copy button
  enableCodeCopy = true

  # Enable lazy loading for images
  enableImageLazyLoading = true

  # Enable Quicklink for faster navigation pre-fetching
  enableQuicklink = true
```

## Site Metadata

Global metadata settings for SEO and social sharing.

```toml
[params]
  # Site description (used in meta tags)
  description = "A modern Hugo theme"

  # Site keywords (used in meta tags)
  keywords = ["hugo", "blog"]

  # Main content sections (for homepage recent posts and search index)
  mainSections = ["posts"]

  # Fingerprint algorithm for asset integrity
  fingerprintAlgorithm = "sha256"
```

## Author Configuration

Configure the default author profile. This appears in the article header and footer.

```toml
[params.author]
  name = "Your Name"
  image = "/images/author.jpg"
  headline = "Software Engineer"
  bio = "A short bio about yourself."

  # Social links
  links = [
    { email = "mailto:your@email.com" },
    { x-twitter = "https://twitter.com/username" },
    { github = "https://github.com/username" },
    { linkedin = "https://linkedin.com/in/username" },
  ]
```

## Header Configuration

Settings for the top navigation bar.

```toml
[params.header]
  # Show title button (home link)
  showTitle = true

  # Logo image path
  # - Standard images: path relative to static/ (e.g., "/img/logo.png")
  # - Inline SVG: path relative to assets/ (e.g., "images/logo.svg")
  logo = "img/logo.svg"
```

## Footer Configuration

Settings for the site footer.

```toml
[params.footer]
  # Show copyright notice
  showCopyright = true

  # Show attribution (Powered by Hugo & Shiloh)
  showAttribution = true

  # Show appearance switcher (light/dark toggle)
  showAppearanceSwitcher = true

  # Show scroll to top button
  showScrollToTop = true
```

## Homepage Configuration

Settings specific to the homepage.

```toml
[params.homepage]
  # Show recent articles on homepage
  showRecent = true

  # Number of recent articles to show
  recentLimit = 5
```

## Article Configuration

Defaults for article pages. Most of these can be overridden in front matter.

```toml
[params.article]
  # Date format (Go layout string)
  dateFormat = "January 2, 2006"

  # Show publication date
  showDate = true

  # Show last updated date
  showDateUpdated = false

  # Show author information in article header
  showAuthorHeader = true

  # Show author bio section at end of article
  showAuthorFooter = true

  # Show draft label on draft posts
  showDraftLabel = true

  # Append article path to edit URL (for "Edit this page" links)
  editAppendPath = true

  # Show heading anchors (links next to headers)
  showHeadingAnchors = true

  # Show article pagination (prev/next links)
  showPagination = true

  # Invert pagination order
  invertPagination = false

  # Show reading time
  showReadingTime = true

  # Show table of contents
  showTableOfContents = true

  # Show taxonomies (tags, categories, etc.)
  showTaxonomies = false

  # Which taxonomies to display (defaults to ["tags", "categories"])
  displayTaxonomies = ["tags", "categories"]

  # Show word count
  showWordCount = false

  # Sharing links to display
  # Available: facebook, x-twitter, mastodon, pinterest, reddit, linkedin,
  # email, threads, telegram, line, weibo, xing, bluesky
  sharingLinks = ["x-twitter", "linkedin", "email"]
```

## List Configuration

Settings for list pages (archives, section pages).

```toml
[params.list]
  # Show breadcrumb navigation
  showBreadcrumbs = false

  # Show article summary
  showSummary = false

  # Show table of contents on list pages
  showTableOfContents = false

  # Show taxonomies on list pages
  showTaxonomies = false

  # Group articles by year
  groupByYear = true

  # Pagination width (number of page links to show)
  paginationWidth = 1
```

## Taxonomy Configuration

```toml
[params.taxonomy]
  # Show term count on taxonomy pages (e.g. "Tags (5)")
  showTermCount = true
```

## Sitemap Configuration

```toml
[params.sitemap]
  # Exclude these kinds from sitemap
  excludedKinds = ["taxonomy", "term"]
```

## Search Engine Verification

Add your verification codes here.

```toml
[params.verification]
  google = ""
  bing = ""
  pinterest = ""
  yandex = ""
```
