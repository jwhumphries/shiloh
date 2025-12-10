---
title: "Images"
date: 2025-12-07
description: "Image formatting and placement examples."
tags: ["images", "media"]
---

## Basic Image

Standard markdown image syntax:

```markdown
![Alt text](image.jpg)
```

![Desert landscape](desert.png)

## Image with Title

```markdown
![Alt text](image.jpg "Image title")
```

![Forest scene](forest.png "A lush forest")

The title appears on hover.

## Linked Images

Wrap images in links:

```markdown
[![Alt text](image.jpg)](https://example.com)
```

## Figure Shortcode

For images with captions, use Hugo's figure shortcode:

```
{{</* figure src="/images/photo.jpg" alt="Description" caption="Caption text" */>}}
```

## Image Processing

Shiloh automatically:

- Converts images to WebP format (if `enableImageWebp: true`)
- Lazy loads images (if `enableImageLazyLoading: true`)
- Adds responsive sizing

## Featured Images

Add a featured image to any page via front matter:

```yaml
---
title: "My Article"
featureImage: "feature.jpg"
featureImageAlt: "Description of image"
---
```

Featured images appear on article cards in list views.
