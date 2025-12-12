---
title: "Rich Content Demonstration"
date: 2025-05-15
lastmod: 2025-05-20
description: "A comprehensive demonstration of Shiloh's rich content features including social sharing, author bio, taxonomies, and more."
tags: ["demo", "rich content", "features"]
categories: ["samples"]
author:
  name: "Jane Doe"
  image: "https://i.pravatar.cc/150?u=jane"
  headline: "Tech Enthusiast"
  bio: "Jane loves exploring new technologies and writing about them."
  links:
    - x-twitter: "https://twitter.com/janedoe"
    - linkedin: "https://linkedin.com/in/janedoe"
sharingLinks: ["x-twitter", "linkedin", "email", "reddit"]
showDate: true
showDateUpdated: true
showAuthorHeader: true
showAuthorFooter: true
showReadingTime: true
showWordCount: true
showTableOfContents: true
showTaxonomies: true
---

This article demonstrates the rich content capabilities of the Shiloh theme. Below you'll find examples of various features in action.

## Typography

Shiloh uses the `article-prose` class to ensure optimal readability.

### Headings

Headings are automatically anchored. You can click the # symbol next to them to get a direct link.

### Lists

*   Unordered lists look like this.
*   They have nice bullets.
    *   And nested items.

1.  Ordered lists are also supported.
2.  With numbers.

## Social Features

### Sharing Links

At the bottom of this article (before the author bio), you'll see sharing buttons. These are configured via the `sharingLinks` parameter in the front matter or site config.

Supported platforms include:
*   Facebook
*   X (Twitter)
*   LinkedIn
*   Email
*   Reddit
*   Pinterest
*   Mastodon
*   Telegram

### Author Bio

The author bio section at the bottom displays the author's information, including their avatar, name, headline, bio, and social links. This can be configured globally or overridden per page.

## Metadata

This article displays:
*   **Publication Date**: {{< param date >}}
*   **Last Updated**: {{< param lastmod >}}
*   **Reading Time**: Calculated automatically.
*   **Word Count**: Calculated automatically.
*   **Taxonomies**: Tags and Categories listed at the bottom.

## Code Blocks

```javascript
function hello() {
  console.log("Hello, world!");
}
```

## Images

![Sample Image](https://picsum.photos/id/1018/800/400 "A beautiful landscape")

Images are lazy-loaded by default.

## Conclusion

This theme is designed to be flexible and feature-rich, providing a great experience for both writers and readers.
