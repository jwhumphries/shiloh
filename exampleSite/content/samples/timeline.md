---
title: "Timeline"
date: 2025-12-11
description: "Display events in chronological order using the timeline shortcode."
tags: ["shortcode", "timeline"]
---

The timeline shortcode displays a horizontal timeline of events. Each event consists of a label (left side) and description (right side), connected by visual markers.

## Basic Usage

Use the `timeline` shortcode with one event per line in `label: description` format:

```
{{</* timeline */>}}
1984: Macintosh PC
1998: iMac
2001: iPod
2007: iPhone
2015: Apple Watch
2024: Vision Pro
{{</* /timeline */>}}
```

{{< timeline >}}
1984: Macintosh PC
1998: iMac
2001: iPod
2007: iPhone
2015: Apple Watch
2024: Vision Pro
{{< /timeline >}}

## Using Text Labels

The label doesn't have to be a year. You can use any text:

```
{{</* timeline */>}}
Phase 1: Research and Discovery
Phase 2: Design and Prototyping
Phase 3: Development and Testing
Phase 4: Launch and Iteration
{{</* /timeline */>}}
```

{{< timeline >}}
Phase 1: Research and Discovery
Phase 2: Design and Prototyping
Phase 3: Development and Testing
Phase 4: Launch and Iteration
{{< /timeline >}}

## Quarterly Roadmap

Another example using quarters:

```
{{</* timeline */>}}
Q1 2024: Initial planning and research
Q2 2024: MVP development
Q3 2024: Beta release and user testing
Q4 2024: Public launch
Q1 2025: Feature expansion
{{</* /timeline */>}}
```

{{< timeline >}}
Q1 2024: Initial planning and research
Q2 2024: MVP development
Q3 2024: Beta release and user testing
Q4 2024: Public launch
Q1 2025: Feature expansion
{{< /timeline >}}

## Descriptions with Colons

Descriptions can contain colons since only the first colon is used as the separator:

```
{{</* timeline */>}}
9:00 AM: Breakfast: Start the day right
12:00 PM: Lunch: Midday refuel
6:00 PM: Dinner: Evening meal
{{</* /timeline */>}}
```

{{< timeline >}}
9:00 AM: Breakfast: Start the day right
12:00 PM: Lunch: Midday refuel
6:00 PM: Dinner: Evening meal
{{< /timeline >}}
