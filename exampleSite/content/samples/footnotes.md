---
title: "Footnotes"
date: 2024-01-15
description: "Demonstrating the inline footnote shortcode with dropdown functionality."
tags: ["shortcodes", "footnotes", "ui"]
---

This page demonstrates the `footnote` shortcode, which creates inline info icons that reveal additional content when clicked.

## Basic Usage

Here's a sentence with a footnote at the end.{{< footnote >}}This is the footnote content that appears in the dropdown.{{< /footnote >}} The text continues normally after the footnote icon.

You can also place footnotes in the middle{{< footnote >}}Like this one right here!{{< /footnote >}} of a sentence without breaking the flow.

## With Custom Titles

The footnote shortcode accepts an optional `title` parameter:

This fact might surprise you{{< footnote title="Did you know?" >}}The first computer bug was an actual bug - a moth found in a Harvard Mark II computer in 1947.{{< /footnote >}} and change how you think about debugging.

## Multiple Footnotes

A paragraph can have multiple footnotes{{< footnote title="First note" >}}This is the first piece of additional information.{{< /footnote >}} scattered throughout the text{{< footnote title="Second note" >}}And here's another bit of context that might be helpful.{{< /footnote >}} to provide context without cluttering the main content.

## Footnotes with Markdown Content

The footnote content supports markdown formatting:

Learn more about this topic{{< footnote title="Resources" >}}
- **Bold text** works
- *Italic text* too
- Even [links](https://example.com) are supported
{{< /footnote >}} in the resources section.

## Use Cases

Footnotes are perfect for:

1. **Definitions** - Explain technical terms{{< footnote >}}A technical term is specialized vocabulary used in a particular field or profession.{{< /footnote >}} without interrupting the flow.
2. **Citations** - Reference sources{{< footnote title="Source" >}}Smith, J. (2024). *The Art of Writing*. Publisher Name.{{< /footnote >}} inline.
3. **Asides** - Add commentary{{< footnote >}}This is my personal opinion and may not reflect the views of others.{{< /footnote >}} that some readers might want to skip.
4. **Clarifications** - Provide additional context{{< footnote title="Note" >}}This applies only to version 2.0 and later.{{< /footnote >}} for edge cases.

## Accessibility

The footnote uses proper ARIA attributes and keyboard navigation:

- Click the icon to open the dropdown
- Click elsewhere to close it
- The `tabindex` attributes ensure keyboard accessibility
- Screen readers will announce the tooltip title
