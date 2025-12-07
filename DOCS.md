# Shiloh Theme Parameters

## Appearance & Color Scheme

### `colorScheme`
- **Default:** `"shiloh"`
- **Accepted:** `"shiloh"`, `"shiloh-dark"`
- Color scheme name used for the theme.

### `defaultAppearance`
- **Default:** `"light"`
- **Accepted:** `"light"`, `"dark"`
- Default appearance mode when user visits site for first time.

### `autoSwitchAppearance`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Automatically switch appearance based on system preference.

### `defaultThemeColor`
- **Default:** `"#ffffff"`
- **Accepted:** Any valid hex color
- Theme color used for browser chrome and mobile address bar.

## Feature Flags

### `enableSearch`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Enable site-wide search functionality powered by Fuse.js.

### `enableCodeCopy`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Enable copy button on code blocks for easy copying.

### `enableImageLazyLoading`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Lazy load images to improve initial page load performance.

### `enableImageWebp`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Enable WebP image format for better compression.

### `enableQuicklink`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Enable Quicklink for faster navigation via link prefetching.

## Site Metadata

### `description`
- **Default:** `""`
- **Accepted:** Any string
- Site description used in meta tags and SEO.

### `keywords`
- **Default:** `[]`
- **Accepted:** Array of strings
- Site keywords used in meta tags for SEO.

### `mainSections`
- **Default:** `["posts"]`
- **Accepted:** Array of content section names
- Main content sections to display on homepage recent posts.

### `fingerprintAlgorithm`
- **Default:** `"sha256"`
- **Accepted:** `"sha256"`, `"sha384"`, `"sha512"`, `"md5"`
- Hashing algorithm for asset integrity and cache busting.

## Author Configuration

### `author.name`
- **Default:** `""`
- **Accepted:** Any string
- Author's full name displayed throughout the site.

### `author.image`
- **Default:** `""`
- **Accepted:** Path to image file
- Author profile image path (relative to assets/ or static/).

### `author.headline`
- **Default:** `""`
- **Accepted:** Any string
- Short headline or tagline for the author.

### `author.bio`
- **Default:** `""`
- **Accepted:** Any string
- Author biography or description.

### `author.links`
- **Default:** `[]`
- **Accepted:** Array of link objects
- Social media and contact links for the author.

## Header Configuration

### `header.logo`
- **Default:** Not set
- **Accepted:** Path to image file
- Logo image path for light mode (relative to assets/ or static/).

### `header.logoDark`
- **Default:** Not set
- **Accepted:** Path to image file
- Logo image path for dark mode (relative to assets/ or static/).

## Footer Configuration

### `footer.showCopyright`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display copyright notice in the footer.

### `footer.showAppearanceSwitcher`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display light/dark mode toggle switch in footer.

### `footer.showScrollToTop`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display scroll to top button when scrolling down.

## Homepage Configuration

### `homepage.showRecent`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Show recent articles section on homepage.

### `homepage.recentLimit`
- **Default:** `5`
- **Accepted:** Any positive integer
- Number of recent articles to display on homepage.

## Article Configuration

### `article.showDate`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display publication date on articles.

### `article.showDateUpdated`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Display last updated date on articles.

### `article.showAuthor`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display author information on articles.

### `article.showDraftLabel`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Show draft badge on draft posts.

### `article.editAppendPath`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Append article path to edit URL for quick editing.

### `article.showHeadingAnchors`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Show anchor links on headings for easy section linking.

### `article.showPagination`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Show previous/next article navigation.

### `article.invertPagination`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Reverse the order of pagination (next/prev).

### `article.showReadingTime`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display estimated reading time for articles.

### `article.showTableOfContents`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Display table of contents sidebar on articles.

### `article.showTaxonomies`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Display tags and categories on articles.

### `article.showWordCount`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Display word count on articles.

### `article.showComments`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Display comments section on articles.

## List Configuration

### `list.showBreadcrumbs`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Show breadcrumb navigation on list pages.

### `list.showSummary`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Show article summary/excerpt in list views.

### `list.showTableOfContents`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Show table of contents on list pages.

### `list.showTaxonomies`
- **Default:** `false`
- **Accepted:** `true`, `false`
- Show tags/categories in list views.

### `list.groupByYear`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Group articles by publication year in list views.

### `list.paginationWidth`
- **Default:** `1`
- **Accepted:** Any positive integer
- Number of pagination page links to show on each side.

## Sitemap Configuration

### `sitemap.excludedKinds`
- **Default:** `["taxonomy", "term"]`
- **Accepted:** Array of Hugo page kinds
- Page kinds to exclude from sitemap generation.

## Taxonomy Configuration

### `taxonomy.showTermCount`
- **Default:** `true`
- **Accepted:** `true`, `false`
- Show the number of articles for each term on taxonomy pages.

## Search Engine Verification

### `verification.google`
- **Default:** Not set
- **Accepted:** Google verification code
- Google Search Console verification meta tag.

### `verification.bing`
- **Default:** Not set
- **Accepted:** Bing verification code
- Bing Webmaster Tools verification meta tag.

### `verification.pinterest`
- **Default:** Not set
- **Accepted:** Pinterest verification code
- Pinterest site verification meta tag.

### `verification.yandex`
- **Default:** Not set
- **Accepted:** Yandex verification code
- Yandex Webmaster verification meta tag.
