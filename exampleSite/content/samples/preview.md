---
title: "UI Preview"
date: 2025-12-11
description: "Display HTML with a live preview and source code using the preview shortcode."
tags: ["shortcode", "preview", "code"]
---

The preview shortcode displays HTML in a tabbed interface with a live preview and the source code. It's useful for documentation and component showcases.

## Basic Usage

Use the `preview` shortcode with raw HTML inside:

```
{{</* preview */>}}
<button class="btn btn-primary">Click me</button>
{{</* /preview */>}}
```

{{< preview >}}
<button class="btn btn-primary">Click me</button>
{{< /preview >}}

## Button Group

```
{{</* preview */>}}
<div class="flex gap-2">
  <button class="btn">Default</button>
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>
{{</* /preview */>}}
```

{{< preview >}}
<div class="flex gap-2">
  <button class="btn">Default</button>
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>
{{< /preview >}}

## Card Component

```
{{</* preview */>}}
<div class="card bg-base-200 w-80">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>This is a sample card with some content inside.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
{{</* /preview */>}}
```

{{< preview >}}
<div class="card bg-base-200 w-80">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>This is a sample card with some content inside.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
{{< /preview >}}

## Alert Examples

{{< preview >}}
<div class="flex flex-col gap-2">
  <div role="alert" class="alert alert-info">
    <span>Info: This is an informational message.</span>
  </div>
  <div role="alert" class="alert alert-success">
    <span>Success: Operation completed!</span>
  </div>
  <div role="alert" class="alert alert-warning">
    <span>Warning: Please review your input.</span>
  </div>
  <div role="alert" class="alert alert-error">
    <span>Error: Something went wrong.</span>
  </div>
</div>
{{< /preview >}}

## Badge Variants

{{< preview >}}
<div class="flex flex-wrap gap-2">
  <span class="badge">Default</span>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-secondary">Secondary</span>
  <span class="badge badge-accent">Accent</span>
  <span class="badge badge-ghost">Ghost</span>
  <span class="badge badge-outline">Outline</span>
</div>
{{< /preview >}}
