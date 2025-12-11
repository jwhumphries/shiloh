---
title: "Sentence Rotate"
date: 2025-12-11
description: "Display a sentence with rotating words at the end using the sentence-rotate shortcode."
tags: ["shortcode", "animation"]
---

The sentence-rotate shortcode displays a sentence with rotating words appended to the end. Each word can have its own color styling.

## Basic Usage

Use the `sentence-rotate` shortcode with a `sentence` parameter and a list of words with optional color classes. Use daisyUI theme colors for consistent styling:

```
{{</* sentence-rotate sentence="Providing AI Agents for" */>}}
Designers | bg-primary text-primary-content
Developers | bg-secondary text-secondary-content
Managers | bg-accent text-accent-content
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="Providing AI Agents for" >}}
Designers | bg-primary text-primary-content
Developers | bg-secondary text-secondary-content
Managers | bg-accent text-accent-content
{{< /sentence-rotate >}}

## Custom Size

Use the `size` parameter to change the text size:

```
{{</* sentence-rotate sentence="We build tools for" size="text-3xl" */>}}
Creators | bg-success text-success-content
Builders | bg-warning text-warning-content
Dreamers | bg-error text-error-content
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="We build tools for" size="text-3xl" >}}
Creators | bg-success text-success-content
Builders | bg-warning text-warning-content
Dreamers | bg-error text-error-content
{{< /sentence-rotate >}}

## Status Colors

Use status colors for different contexts:

```
{{</* sentence-rotate sentence="This platform is" size="text-2xl" */>}}
Fast | bg-success text-success-content
Reliable | bg-info text-info-content
Scalable | bg-warning text-warning-content
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="This platform is" size="text-2xl" >}}
Fast | bg-success text-success-content
Reliable | bg-info text-info-content
Scalable | bg-warning text-warning-content
{{< /sentence-rotate >}}

## Without Colors

Words without color classes will display with default styling:

```
{{</* sentence-rotate sentence="Welcome to the" size="text-4xl" */>}}
Future
Present
Revolution
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="Welcome to the" size="text-4xl" >}}
Future
Present
Revolution
{{< /sentence-rotate >}}

## Hero Example

A large hero-style sentence:

{{< sentence-rotate sentence="Start building" size="text-5xl font-bold" >}}
Today | bg-success text-success-content
Now | bg-warning text-warning-content
Here | bg-info text-info-content
{{< /sentence-rotate >}}
