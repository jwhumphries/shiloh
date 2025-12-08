---
title: "Search"
date: 2025-12-07
weight: 60
description: "Client-side full-text search with Fuse.js."
---

Shiloh includes built-in full-text search powered by [Fuse.js](https://www.fusejs.io/), a lightweight fuzzy search library.

## Enabling Search

Search is enabled by default. To disable:

```toml
[params]
  enableSearch = false
```

## Adding Search to Navigation

Add the search button to your navbar by including a menu item with the `search` identifier:

```toml
[[main]]
  identifier = "search"
  weight = 99
```

This places a search icon button in the header navigation.

## How It Works

### Search Index Generation

During the build process, a search index is generated at `static/lunr-index.json`. This index contains all content from your site including:

- Page titles
- Page content
- Tags
- Categories

Generate the index manually with:

```bash
bun run index
```

### Search Execution

When a user opens the search modal and types a query:

1. The search index is loaded (lazy-loaded on first search)
2. Fuse.js performs fuzzy matching against the index
3. Results are ranked and displayed in the modal

## Search Configuration

The search uses Fuse.js with the following configuration:

```javascript
{
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'content', weight: 0.5 },
    { name: 'tags', weight: 1.5 },
    { name: 'categories', weight: 1.0 }
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2
}
```

### Weight Explanation

- **Title (2.0)**: Highest priority - matches in titles rank highest
- **Tags (1.5)**: High priority - topic tags are important
- **Categories (1.0)**: Normal priority
- **Content (0.5)**: Lower priority - body text matches rank lower

### Threshold

The threshold of `0.3` controls fuzzy matching sensitivity:

- `0.0`: Exact match only
- `0.3`: Some tolerance for typos (default)
- `1.0`: Match anything

## Search Modal

The search modal provides:

- Full-width search input with auto-focus
- Real-time results as you type
- Minimum 3 characters required to search
- Result cards showing title, preview, and tags
- Click or keyboard navigation to results

### Keyboard Shortcuts

- Press the search button or use the navbar icon to open
- `Escape` closes the modal
- Click outside the modal to close

## Customizing Results

Search results display:

1. **Title**: The page title (linked)
2. **Preview**: A snippet of content around the match
3. **Tags**: Any tags associated with the page

The preview extracts context around matched terms, showing approximately 150 characters of surrounding text.

## Performance

### Lazy Loading

The Fuse.js library and search index are only loaded when the search modal is opened. This keeps the initial page load fast.

### Index Size

The search index contains the full text content of all pages. For large sites, consider:

- Using summaries instead of full content
- Excluding certain sections from indexing
- Increasing the minMatchCharLength

## Styling

The search modal uses daisyUI's modal component with custom styling:

- Full-screen overlay with backdrop blur
- Centered modal card
- Responsive sizing (max-width on larger screens)
- Theme-aware colors

## Troubleshooting

### Search not working

1. Ensure `enableSearch = true` in params
2. Check that `lunr-index.json` exists in `static/`
3. Run `bun run index` to regenerate the index
4. Check browser console for JavaScript errors

### Empty results

- Minimum query length is 3 characters
- Check that your content pages have the expected fields
- Verify the search index contains your content

### Slow search

For very large sites (1000+ pages), search may feel slow. Consider:

- Reducing content indexed (use summaries)
- Increasing the threshold for faster matching
- Pre-loading the index on page load (trade-off: slower initial load)
