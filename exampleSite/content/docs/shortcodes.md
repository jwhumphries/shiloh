---
title: "Shortcodes"
date: 2025-12-07
weight: 80
description: "Available shortcodes in Shiloh."
---

Shortcodes extend markdown with reusable components. Shiloh includes custom shortcodes and supports all Hugo built-ins.

## Lead

Creates a larger, muted paragraph for introductory text. Useful for article summaries or key points.

```
{{</* lead */>}}
This is lead text that introduces the article.
{{</* /lead */>}}
```

{{< lead >}}
This is lead text that introduces the article.
{{< /lead >}}

The lead shortcode applies:

- Larger font size
- Lighter text color
- Increased line height

## Hugo Built-in Shortcodes

Shiloh supports all Hugo built-in shortcodes with theme-aware styling.

### Figure

Enhanced image display with captions:

```
{{</* figure src="/images/photo.jpg" alt="Photo" caption="A descriptive caption" */>}}
```

Parameters:

| Parameter | Description |
|-----------|-------------|
| `src` | Image path (required) |
| `alt` | Alt text for accessibility |
| `caption` | Caption text below image |
| `title` | Image title (hover text) |
| `class` | Additional CSS classes |
| `link` | URL to link the image |

### Highlight

Code blocks with syntax highlighting:

```
{{</* highlight go "linenos=table,hl_lines=2" */>}}
func main() {
    fmt.Println("Hello")
}
{{</* /highlight */>}}
```

Options (second parameter):

| Option | Description |
|--------|-------------|
| `linenos` | Show line numbers (`true`, `false`, `table`, `inline`) |
| `hl_lines` | Highlight specific lines (e.g., `"1-3 5"`) |
| `linenostart` | Starting line number |

For simple code blocks, fenced markdown is usually preferred:

````markdown
```go
func main() {
    fmt.Println("Hello")
}
```
````

### YouTube

Embed YouTube videos:

```
{{</* youtube dQw4w9WgXcQ */>}}
```

Or with full URL:

```
{{</* youtube id="dQw4w9WgXcQ" title="Video Title" */>}}
```

### Vimeo

Embed Vimeo videos:

```
{{</* vimeo 146022717 */>}}
```

### Tweet

Embed tweets (requires Twitter API):

```
{{</* tweet user="GoHugoIO" id="877500564405444608" */>}}
```

### Gist

Embed GitHub Gists:

```
{{</* gist spf13 7896402 */>}}
```

Or a specific file from a gist:

```
{{</* gist spf13 7896402 "img.html" */>}}
```

### Param

Output a site parameter:

```
{{</* param description */>}}
```

### Ref and Relref

Create links to other pages:

```
[Link text]({{</* ref "docs/configuration" */>}})
[Relative link]({{</* relref "configuration" */>}})
```

## Render Hooks

Shiloh customizes how markdown elements render through hooks in `layouts/_markup/`:

### Images

Images automatically get:

- Lazy loading (if enabled)
- Rounded corners
- Center alignment
- Responsive sizing

### Headings

Headings include anchor links for deep linking. Hover over any heading to see the `#` symbol.

### Links

External links are styled with an underline animation effect.

### Blockquotes

Blockquotes support author attribution using markdown attributes:

```markdown
> Your quote text here.
{author="Author Name"}
```

### Tables

Tables are wrapped in scrollable containers for responsive display.

## Creating Custom Shortcodes

Add custom shortcodes in `layouts/shortcodes/`. For example, create `layouts/shortcodes/alert.html`:

```html
<div class="alert alert-{{ .Get "type" | default "info" }}">
  {{ .Inner | markdownify }}
</div>
```

Use it:

```
{{</* alert type="warning" */>}}
This is a warning message.
{{</* /alert */>}}
```

See [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/) for the complete documentation.
