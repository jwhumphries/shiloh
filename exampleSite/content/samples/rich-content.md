---
title: "Rich Content Demonstration"
date: 2025-05-15
lastmod: 2025-05-20
description: "Exploring the visual capabilities of the Shiloh theme, including typography, media, and shortcodes."
tags: ["demo", "rich content", "features"]
categories: ["samples"]
author:
  name: "Creative Team"
  image: "https://picsum.photos/id/1025/200/200"
  headline: "Visual Storytellers"
  bio: "We bring content to life with code and design."
  links:
    - github: "https://github.com"
    - x-twitter: "https://x.com"
showDate: true
showDateUpdated: true
showAuthorHeader: true
showAuthorFooter: true
showReadingTime: true
showWordCount: true
showTableOfContents: true
showTaxonomies: true
featureImage: "https://picsum.photos/id/16/1200/600"
featureImageAlt: "A scenic view of a river and mountains"
---

{{< lead >}}
Content is not just text. It's about presentation, structure, and visual appeal. Shiloh provides a suite of tools to make your content stand out.
{{< /lead >}}

## Typography & Prose

Shiloh utilizes the `article-prose` class, optimizing line length, font size, and spacing for a comfortable reading experience.

### Blockquotes

> "Design is not just what it looks like and feels like. Design is how it works."
> {author="Steve Jobs"}

Standard blockquotes are enhanced with optional author attribution.

### Lists

Lists are styled for clarity.

*   **Unordered lists** use clear bullets.
*   **Nested items** are indented properly.
    *   Like this one.
*   **Spacing** is consistent.

1.  **Ordered lists** help with steps.
2.  They auto-increment.
3.  Great for tutorials.

## Media Integration

### Images & Captions

Images are responsive and lazy-loaded. Use the `figure` shortcode for enhanced presentation.

{{< figure src="https://picsum.photos/id/10/800/400" title="Nature" alt="A forest path" caption="The path less traveled." >}}

### Video Embeds

Seamlessly embed content from YouTube or Vimeo.

{{< youtube id="dQw4w9WgXcQ" title="A Classic Video" >}}

## Syntax Highlighting

Code blocks are automatically highlighted and include a copy button.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Shiloh!")
}
```

## Advanced Shortcodes

Shiloh includes custom shortcodes for specific visual needs.

### Timeline

Great for roadmaps or changelogs.

{{< timeline >}}
2023: Project Inception
2024: Alpha Release
2025: Public Launch
{{< /timeline >}}

### Rotating Text

Add dynamic movement to your headings.

### We are {{< text-rotate color="text-primary" >}}
Designers
Developers
Creators
{{< /text-rotate >}}

## Conclusion

By combining these elements, you can create rich, engaging narratives that keep your readers interested.
