---
title: "Sentence Rotate"
date: 2025-12-11
description: "Display a sentence with rotating words at the end using the sentence-rotate shortcode."
tags: ["shortcode", "animation"]
---

The sentence-rotate shortcode displays a sentence with rotating words appended to the end. Each word can have its own color styling.

## Basic Usage

Use the `sentence-rotate` shortcode with a `sentence` parameter and a list of words with optional color classes:

```
{{</* sentence-rotate sentence="Providing AI Agents for" */>}}
Designers | bg-teal-400 text-teal-800
Developers | bg-red-400 text-red-800
Managers | bg-blue-400 text-blue-800
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="Providing AI Agents for" >}}
Designers | bg-teal-400 text-teal-800
Developers | bg-red-400 text-red-800
Managers | bg-blue-400 text-blue-800
{{< /sentence-rotate >}}

## Custom Size

Use the `size` parameter to change the text size:

```
{{</* sentence-rotate sentence="We build tools for" size="text-3xl" */>}}
Creators | bg-purple-400 text-purple-800
Builders | bg-orange-400 text-orange-800
Dreamers | bg-pink-400 text-pink-800
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="We build tools for" size="text-3xl" >}}
Creators | bg-purple-400 text-purple-800
Builders | bg-orange-400 text-orange-800
Dreamers | bg-pink-400 text-pink-800
{{< /sentence-rotate >}}

## Using Theme Colors

You can use daisyUI theme colors for consistent styling:

```
{{</* sentence-rotate sentence="This platform is" size="text-2xl" */>}}
Fast | bg-primary text-primary-content
Reliable | bg-secondary text-secondary-content
Scalable | bg-accent text-accent-content
{{</* /sentence-rotate */>}}
```

{{< sentence-rotate sentence="This platform is" size="text-2xl" >}}
Fast | bg-primary text-primary-content
Reliable | bg-secondary text-secondary-content
Scalable | bg-accent text-accent-content
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
