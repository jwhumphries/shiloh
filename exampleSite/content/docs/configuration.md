---
title: "Configuration"
date: 2025-12-07
weight: 20
description: "Detailed guide to all available theme parameters and configuration options."
---

Shiloh uses a modular configuration structure. While you can put everything in `hugo.toml`, it is recommended to use the `config/_default/params.toml` file for theme-specific settings to keep things organized.

## Configuration Files

| File | Purpose |
|------|---------|
| `hugo.toml` | Core Hugo settings (outputs, pagination, privacy, build options) |
| `params.toml` | Theme-specific parameters (appearance, features, author, etc.) |
| `languages.en.toml` | Language-specific settings and site title |
| `menus.en.toml` | Navigation menu definitions |
| `markup.toml` | Markdown rendering and syntax highlighting options |
| `module.toml` | Hugo module configuration (if applicable) |

## Appearance

Control the look and feel of your site in `params.toml`.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `colorScheme` | string | `"shiloh"` | The daisyUI theme name to use. |
| `defaultAppearance` | string | `"light"` | Initial appearance mode: `"light"` or `"dark"`. |
| `autoSwitchAppearance` | boolean | `true` | Automatically switch mode based on system preference. |
| `defaultThemeColor` | string | `"#ffffff"` | The color used for the browser chrome/address bar. |
| `font` | string | `"code"` | Font family style. Options: `"code"` (Fira Code) or `"prose"` (Fraunces + Lora). |

### Theme Colors

Shiloh comes with two built-in daisyUI themes defined in the CSS:

- **shiloh**: A light theme with carefully selected colors.
- **shiloh-dark**: A dark theme utilizing the OKLCH color space for perceptually uniform contrast.

## Features

Toggle specific functionality on or off.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enableSearch` | boolean | `true` | Enables the built-in Fuse.js search engine. |
| `enableCodeCopy` | boolean | `true` | Shows a copy button on all code blocks. |
| `enableImageLazyLoading` | boolean | `true` | Enables native lazy loading for images to improve performance. |
| `enableQuicklink` | boolean | `true` | Prefetches links in the viewport for faster subsequent navigation. |

## Site Metadata

These settings control SEO and meta tags.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `description` | string | `""` | The default site description used in meta tags. |
| `keywords` | array | `[]` | A list of default keywords for the site. |
| `mainSections` | array | `["posts"]` | Content types to display in the "Recent" section on the homepage. |
| `robots` | string | `""` | Custom value for the `robots` meta tag. |
| `fingerprintAlgorithm` | string | `"sha256"` | Algorithm used for SRI (Subresource Integrity) hashing. |

## Author Configuration

Define the default author for the site. This can be overridden per page.

```toml
[author]
  name = "Shiloh"
  image = "/images/author.jpg"
  headline = "Theme Developer"
  bio = "A short bio displayed at the end of articles."
  links = [
    { github = "https://github.com/username" },
    { x-twitter = "https://x.com/username" }
  ]
```

### Social Links

The `links` array supports the following platforms. The icon is automatically selected based on the key.

*   `bluesky`
*   `discord`
*   `email`
*   `facebook`
*   `github`
*   `instagram`
*   `linkedin`
*   `line`
*   `mastodon`
*   `pinterest`
*   `reddit`
*   `rss`
*   `telegram`
*   `threads`
*   `weibo`
*   `whatsapp`
*   `x-twitter`
*   `xing`
*   `youtube`

## Header

Configure the top navigation bar.

| Parameter | Type | Description |
|-----------|------|-------------|
| `showTitle` | boolean | Display the site title text. |
| `logo` | string | Path to a logo image. If set, this replaces the title text. |

## Footer

Customize the site footer.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showCopyright` | boolean | `true` | Display the copyright year and site title. |
| `showAttribution` | boolean | `true` | Display "Powered by Hugo & Shiloh". |
| `showAppearanceSwitcher` | boolean | `true` | Show the light/dark mode toggle. |
| `showScrollToTop` | boolean | `true` | Show the "Scroll to Top" button. |

## Homepage

Settings specific to the homepage.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showRecent` | boolean | `true` | Show a list of recent articles. |
| `recentLimit` | integer | `5` | The number of recent articles to display. |

## Article

Control the display of single article pages. These defaults can be overridden in front matter.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dateFormat` | string | `"January 2, 2006"` | Date format string (Go layout). |
| `showDate` | boolean | `true` | Display the publication date. |
| `showDateUpdated` | boolean | `false` | Display the "Last Updated" date. |
| `showAuthorHeader` | boolean | `true` | Show the author's name and image in the header. |
| `showAuthorFooter` | boolean | `true` | Show the author's bio box at the end of the article. |
| `showDraftLabel` | boolean | `true` | Show a "Draft" badge on non-production builds. |
| `editAppendPath` | boolean | `true` | Append the file path to the "Edit this page" link. |
| `showHeadingAnchors` | boolean | `true` | Show link anchors (`#`) on headings on hover. |
| `showPagination` | boolean | `true` | Show "Previous" and "Next" article links. |
| `invertPagination` | boolean | `false` | Reverse the order of previous/next links. |
| `showReadingTime` | boolean | `true` | Display the estimated reading time. |
| `showTableOfContents` | boolean | `true` | Show the Table of Contents sidebar. |
| `showTaxonomies` | boolean | `false` | Show tags and categories at the bottom of the article. |
| `showWordCount` | boolean | `false` | Display the word count. |

### Sharing Links

Enable social sharing buttons at the bottom of articles by listing the platforms:

```toml
[article]
  sharingLinks = [
    "x-twitter",
    "linkedin",
    "email",
    "facebook",
    "reddit",
    "whatsapp",
    "telegram"
  ]
```

## List Pages

Configuration for archive and list pages.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showBreadcrumbs` | boolean | `false` | Display breadcrumb navigation. |
| `showSummary` | boolean | `false` | Show the article summary/description in the card. |
| `showTableOfContents` | boolean | `false` | Show a Table of Contents on list pages (if applicable). |
| `showTaxonomies` | boolean | `false` | Show tags/categories on the article cards. |
| `groupByYear` | boolean | `true` | Group articles by year in the archive list. |
| `paginationWidth` | integer | `1` | Number of pagination links to show around the current page. |

## Taxonomy

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `showTermCount` | boolean | `true` | Show the number of articles associated with each term. |

## Sitemap

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `excludedKinds` | array | `["taxonomy", "term"]` | Page types to exclude from `sitemap.xml`. |

## Search Engine Verification

Add your verification codes here to output the respective meta tags.

```toml
[verification]
  google = "your-google-code"
  bing = "your-bing-code"
  pinterest = "your-pinterest-code"
  yandex = "your-yandex-code"
```

## Menus

Define your navigation menus in `menus.en.toml`.

```toml
[[main]]
  name = "Docs"
  pageRef = "/docs"
  weight = 10

[[main]]
  identifier = "search"
  weight = 100
```

*   **`main`**: The top navigation bar.
*   **`footer`**: Links in the footer (e.g., Privacy Policy).
*   **`search` identifier**: Special identifier to render the search trigger button.
