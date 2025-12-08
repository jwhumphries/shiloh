---
title: "Code Blocks"
date: 2025-12-07
description: "Syntax highlighting examples for various languages."
tags: ["code", "syntax highlighting"]
---

## Inline Code

Use backticks for `inline code` within paragraphs.

## Fenced Code Blocks

### JavaScript

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => console.log(greet(user)));
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### Go

```go
package main

import "fmt"

func main() {
    messages := make(chan string)

    go func() {
        messages <- "Hello from goroutine"
    }()

    msg := <-messages
    fmt.Println(msg)
}
```

### Python

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Article:
    title: str
    tags: List[str]
    published: bool = False

def get_published(articles: List[Article]) -> List[Article]:
    return [a for a in articles if a.published]
```

### Rust

```rust
use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Red"), 50);

    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}
```

### YAML

```yaml
baseURL: https://example.org/
title: My Site
theme: shiloh

params:
  enableSearch: true
  author:
    name: John Doe
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

### CSS

```css
.article-prose {
  @apply prose prose-lg max-w-none;

  h2 {
    @apply text-2xl font-bold mt-8 mb-4;
  }

  a {
    @apply text-primary hover:underline;
  }
}
```

### Shell

```bash
#!/bin/bash
hugo server --buildDrafts --disableFastRender
```

### SQL

```sql
SELECT
    u.name,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.active = true
GROUP BY u.id
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC;
```

### JSON

```json
{
  "name": "shiloh",
  "version": "1.0.0",
  "dependencies": {
    "tailwindcss": "^4.0.0",
    "daisyui": "^5.0.0"
  }
}
```

## Plain Code Block

```
Plain text without syntax highlighting.
Useful for output or logs.
```
