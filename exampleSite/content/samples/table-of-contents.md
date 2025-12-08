---
title: "Table of Contents"
date: 2025-12-07
description: "A longer article demonstrating the table of contents feature."
tags: ["features", "navigation"]
showTableOfContents: true
---

{{< lead >}}
This article demonstrates the automatic table of contents feature. The TOC appears in the sidebar on larger screens when an article exceeds 400 words.
{{< /lead >}}

## How the TOC Works

The table of contents is automatically generated from your heading structure. It uses h2 and h3 headings by default (configurable in `config/_default/markup.toml`).

The TOC sidebar is sticky and scrolls with the page. Active sections are highlighted as you scroll.

## Enabling and Disabling

### Site-wide Setting

In your site configuration:

```yaml
params:
  article:
    showTableOfContents: true
```

### Per-page Override

In front matter:

```yaml
---
showTableOfContents: false
---
```

## Heading Anchors

Each heading gets an anchor link. Hover over any heading to see the # symbol. Click it to copy the link to that section.

Control anchors with:

```yaml
params:
  article:
    showHeadingAnchors: true
```

## Best Practices

### Use Clear Headings

Write descriptive headings that make sense in the TOC. Avoid generic titles like "Overview" or "Details" when more specific alternatives exist.

### Maintain Hierarchy

Follow proper heading hierarchy. Don't skip levels (h2 directly to h4). This ensures logical document structure.

### Keep It Scannable

Readers use the TOC to quickly find information. Front-load important keywords in your headings.

## Supported Heading Levels

### H3 Headings

H3 headings appear in the TOC by default.

#### H4 Headings

H4 headings do not appear in the default TOC configuration. Modify `markup.toml` to include them:

```toml
[tableOfContents]
  startLevel = 2
  endLevel = 4
```

## Styling

The TOC uses daisyUI's menu component with custom styling:

- Active items highlighted with primary color
- Smooth transitions on hover
- Proper indentation for h3 items
- Scroll container for long TOCs

## Mobile Behavior

On smaller screens (below the `lg` breakpoint), the TOC sidebar is hidden. The content takes full width for better readability.

## Scroll Spy

As you scroll through the article, the corresponding TOC item is highlighted. This helps readers track their position in long documents.

The scroll spy implementation uses the Intersection Observer API for efficient scroll tracking.

## Additional Notes

This section adds more content to demonstrate the TOC with a longer article. The 400-word threshold ensures the TOC only appears when it provides value.

For very short articles, the TOC would be redundant. The automatic threshold handles this gracefully.

## Configuration Reference

The table of contents behavior can be customized through several configuration options in your site configuration file.

### Markup Settings

In `config/_default/markup.toml`, you can control which heading levels appear in the TOC:

```toml
[tableOfContents]
  startLevel = 2
  endLevel = 3
  ordered = false
```

The `startLevel` determines the minimum heading level to include. Setting it to 2 means h1 headings are excluded, which is typical since h1 is usually reserved for the page title.

The `endLevel` determines the maximum heading level. Setting it to 3 includes h2 and h3 headings but excludes h4 and below.

### Theme Parameters

The theme provides additional control through `params.article.showTableOfContents`. When set to true globally, all articles will show a TOC if they exceed the word threshold.

Individual pages can override this setting using front matter, allowing you to disable the TOC on specific pages even if they have enough content to trigger it.

## Performance Considerations

The table of contents is generated at build time by Hugo, so there is no runtime performance impact. The scroll spy JavaScript uses the Intersection Observer API, which is highly optimized and does not cause layout thrashing.

The sticky positioning uses CSS `position: sticky`, which is hardware-accelerated in modern browsers and performs well even during rapid scrolling.
