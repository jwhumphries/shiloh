---
title: "Draft Post Example"
date: 2025-12-07
description: "This post is marked as a draft."
tags: ["draft", "features"]
draft: true
---

{{< lead >}}
This post demonstrates the draft feature. Draft posts are hidden in production but visible during development.
{{< /lead >}}

## Draft Behavior

When `draft: true` is set in front matter:

- Post is **hidden** in production builds (`hugo`)
- Post is **visible** when running `hugo server` with `--buildDrafts`
- A "Draft" label appears on the article

## Draft Label

The draft label is controlled by:

```yaml
params:
  article:
    showDraftLabel: true
```

## Use Cases

### Work in Progress

Mark unfinished articles as drafts while you continue writing.

### Scheduled Content

Prepare content in advance. Remove the draft flag when ready to publish.

### Review Process

Use drafts for content that needs review before publication.

## Building with Drafts

Include drafts in your build:

```bash
hugo --buildDrafts
hugo server --buildDrafts
```

Or set in config:

```yaml
buildDrafts: true
```
