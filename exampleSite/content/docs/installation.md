---
title: "Installation"
date: 2025-12-07
weight: 10
description: "How to install the Shiloh theme."
---

## Requirements

- Hugo 0.151.0 or later (extended edition)
- Go 1.21+ (for Hugo modules)

## Using Hugo Modules

Add the theme as a module in your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/jwhumphries/shiloh
```

Then run:

```bash
hugo mod get -u
```

## Using Git Submodule

Clone the theme into your `themes` directory:

```bash
git submodule add https://github.com/jwhumphires/shiloh.git themes/shiloh
```

Add to your `hugo.yaml`:

```yaml
theme: shiloh
```

## Manual Installation

Download the theme and extract it to `themes/shiloh`.
