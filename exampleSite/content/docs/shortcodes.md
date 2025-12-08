---
title: "Shortcodes"
date: 2025-12-07
weight: 40
description: "Available shortcodes in Shiloh."
---

## Lead

Creates a larger, muted paragraph for introductory text.

```
{{</* lead */>}}
This is lead text that introduces the article.
{{</* /lead */>}}
```

{{< lead >}}
This is lead text that introduces the article.
{{< /lead >}}

## Hugo Built-in Shortcodes

Shiloh supports all Hugo built-in shortcodes:

### Figure

```
{{</* figure src="/images/photo.jpg" alt="Photo" caption="A caption" */>}}
```

### Highlight

```
{{</* highlight go */>}}
func main() {
    fmt.Println("Hello")
}
{{</* /highlight */>}}
```

### YouTube

```
{{</* youtube dQw4w9WgXcQ */>}}
```

### Vimeo

```
{{</* vimeo 146022717 */>}}
```

### Tweet

```
{{</* tweet user="GoHugoIO" id="877500564405444608" */>}}
```

### Gist

```
{{</* gist spf13 7896402 */>}}
```

See [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/) for the complete list.
