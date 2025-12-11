---
title: "Rotating Text"
date: 2025-12-11
description: "Display rotating text animation using the text-rotate shortcode."
tags: ["shortcode", "animation"]
---

The text-rotate shortcode displays text that rotates through a list of words with an infinite loop animation. It's great for hero sections, taglines, or adding visual interest to your content.

## Basic Usage

Use the `text-rotate` shortcode with one word per line:

```
{{</* text-rotate */>}}
ONE
TWO
THREE
{{</* /text-rotate */>}}
```

{{< text-rotate >}}
ONE
TWO
THREE
{{< /text-rotate >}}

## Custom Size

The default size is `text-xl`. Use the `size` parameter to change it:

```
{{</* text-rotate size="text-5xl" */>}}
DESIGN
DEVELOP
DEPLOY
{{</* /text-rotate */>}}
```

{{< text-rotate size="text-5xl" >}}
DESIGN
DEVELOP
DEPLOY
{{< /text-rotate >}}

## Large Hero Style

For a dramatic hero section effect:

```
{{</* text-rotate size="text-7xl" */>}}
BUILD
SHIP
SCALE
REPEAT
{{</* /text-rotate */>}}
```

{{< text-rotate size="text-7xl" >}}
BUILD
SHIP
SCALE
REPEAT
{{< /text-rotate >}}

## Up to 6 Items

The animation supports up to 6 rotating items:

```
{{</* text-rotate size="text-3xl" */>}}
DESIGN
DEVELOP
DEPLOY
SCALE
MAINTAIN
REPEAT
{{</* /text-rotate */>}}
```

{{< text-rotate size="text-3xl" >}}
DESIGN
DEVELOP
DEPLOY
SCALE
MAINTAIN
REPEAT
{{< /text-rotate >}}

## Custom Color

Use the `color` parameter to apply a text color class:

```
{{</* text-rotate size="text-4xl" color="text-primary" */>}}
PRIMARY
COLORED
TEXT
{{</* /text-rotate */>}}
```

{{< text-rotate size="text-4xl" color="text-primary" >}}
PRIMARY
COLORED
TEXT
{{< /text-rotate >}}

## Color Variants

Different color options:

{{< text-rotate size="text-3xl" color="text-secondary" >}}
SECONDARY
COLOR
{{< /text-rotate >}}

{{< text-rotate size="text-3xl" color="text-accent" >}}
ACCENT
COLOR
{{< /text-rotate >}}

{{< text-rotate size="text-3xl" color="text-success" >}}
SUCCESS
COLOR
{{< /text-rotate >}}

{{< text-rotate size="text-3xl" color="text-error" >}}
ERROR
COLOR
{{< /text-rotate >}}

