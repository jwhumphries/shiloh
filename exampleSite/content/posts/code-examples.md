---
title: "Code Examples and Syntax Highlighting"
date: 2025-01-22T09:00:00-05:00
draft: false
tags: ["code", "programming", "syntax-highlighting"]
categories: ["Development"]
---

This post showcases code syntax highlighting in various programming languages.

## JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

const user = "World";
greet(user);
```

## Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## Go

```go
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    for _, num := range numbers {
        fmt.Printf("Number: %d\n", num)
    }
}
```

## HTML & CSS

```html
<div class="container">
  <h1 class="title">Hello World</h1>
  <p class="description">This is a paragraph.</p>
</div>
```

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  color: #333;
}
```

All code blocks are beautifully highlighted with the theme's syntax highlighting!
