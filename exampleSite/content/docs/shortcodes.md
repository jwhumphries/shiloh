---
title: "Shortcodes"
date: 2025-12-07
weight: 80
description: "Documentation for built-in and theme-specific shortcodes."
---

Shortcodes are special snippets inside your content files that Hugo renders into HTML. They allow you to create rich content that Markdown alone cannot support.

## Theme Shortcodes

Shiloh includes several custom shortcodes to enhance your content.

### Lead

The `lead` shortcode is used for the first paragraph of an article to make it stand out.

```html
{{</* lead */>}}
This is a lead paragraph. It has a larger font size and lighter color.
{{</* /lead */>}}
```

{{< lead >}}
This is a lead paragraph. It has a larger font size and lighter color.
{{< /lead >}}

### Timeline

Create a vertical timeline of events. Useful for roadmaps, history, or changelogs.

**Usage:**
Provide a list of lines in the format `Label: Description`.

```html
{{</* timeline */>}}
2020: Foundation
2021: First Release
2023: Global Expansion
{{</* /timeline */>}}
```

**Output:**

{{< timeline >}}
2020: Foundation
2021: First Release
2023: Global Expansion
{{< /timeline >}}

### Text Rotate

An animated component that cycles through a list of words. Great for hero sections or emphasizing multiple qualities.

**Parameters:**
*   `size`: Tailwind text size class (default: `text-xl`).
*   `color`: Tailwind text color class.

```html
We are {{</* text-rotate color="text-primary" */>}}
Fast
Reliable
Secure
{{</* /text-rotate */>}}
```

**Output:**

We are {{< text-rotate color="text-primary" >}}
Fast
Reliable
Secure
{{< /text-rotate >}}

### Sentence Rotate

Similar to `text-rotate`, but formats a sentence with a dynamic ending, allowing for different background/text colors for each item.

**Parameters:**
*   `sentence`: The static prefix text.
*   `size`: Text size class.

**Format:**
`Word | classes`

```html
{{</* sentence-rotate sentence="Build for" */>}}
Mobile | bg-primary text-primary-content
Desktop | bg-secondary text-secondary-content
Web | bg-accent text-accent-content
{{</* /sentence-rotate */>}}
```

**Output:**

{{< sentence-rotate sentence="Build for" >}}
Mobile | bg-primary text-primary-content
Desktop | bg-secondary text-secondary-content
Web | bg-accent text-accent-content
{{< /sentence-rotate >}}

## Hugo Built-in Shortcodes

Shiloh fully supports Hugo's internal shortcodes.

### Figure

Extends standard markdown images with captions, titles, and classes.

```html
{{</* figure src="/image.jpg" title="Image Title" caption="Image Caption" */>}}
```

### YouTube

Embed a YouTube video.

```html
{{</* youtube dQw4w9WgXcQ */>}}
```

### Gist

Embed a GitHub Gist.

```html
{{</* gist username gist_id */>}}
```

### Tweet

Embed a tweet (requires X/Twitter API access configuration).

```html
{{</* tweet user="username" id="tweet_id" */>}}
```

### Highlight

Highlight code snippets.

```html
{{</* highlight go */>}}
func main() {
    fmt.Println("Hello")
}
{{</* /highlight */>}}
```
