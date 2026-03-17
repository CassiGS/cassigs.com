---
layout: ../../layouts/ProjectPostLayout.astro
title: Scrolling Logo Marquee
description: Building a performant, accessible infinite scroll marquee for a client's partner logos section — no JavaScript required.
date: March 2026
tags: ["CSS", "Accessibility", "Animation", "No JS"]
featured: true
---

## Overview

The client needed a way to display a row of partner logos that scrolled continuously — the kind of thing you see on every agency site. The challenge was doing it without a JavaScript dependency, keeping it smooth on low-powered devices, and making sure it didn't cause problems for users who prefer reduced motion.

This post walks through the approach from first sketch to production.

---

## The Problem

Previous implementations on the site used a JS-driven carousel library that added **~40kb** to the bundle and broke whenever the logos were updated by the CMS. It also had no `prefers-reduced-motion` support.

> "It just needs to loop. The logos shouldn't jump. That's it."
>
> — Client, in the kickoff call

Simple requirement. Worth doing properly.

---

## Approach

The core idea is duplicating the logo set in markup so there's always content visible while the first set scrolls out of frame, then using a CSS `@keyframes` animation to drive the translation.

### HTML structure

```html
<div class="marquee" aria-hidden="true">
  <ul class="marquee__track">
    <li class="marquee__item"><!-- logo --></li>
    <!-- …more logos… -->
  </ul>
  <!-- duplicate set for seamless loop -->
  <ul class="marquee__track" aria-hidden="true">
    <li class="marquee__item"><!-- logo --></li>
  </ul>
</div>
```

The outer `.marquee` is `overflow: hidden`. Both tracks sit side-by-side via flexbox. The animation translates the whole group leftward by exactly the width of one track.

### The animation

```css
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee__group {
  display: flex;
  animation: marquee 24s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group {
    animation-play-state: paused;
  }
}
```

Translating by `-50%` works because the duplicated set means the full scrollable width is exactly double what's visible — so `-50%` lands right back at the start position.

### Why `translateX` and not `left` or `margin`

`transform` is composited on the GPU and doesn't trigger layout or paint. `left` and `margin` both do. On a page with 20 logos, the difference is negligible — but it's the right habit and costs nothing.

---

## Accessibility considerations

| Concern                  | Solution                                                                    |
| ------------------------ | --------------------------------------------------------------------------- |
| Duplicate content in DOM | `aria-hidden="true"` on second track                                        |
| Whole marquee decorative | `aria-hidden="true"` on outer wrapper; separate visually-hidden list for AT |
| Motion sensitivity       | `animation-play-state: paused` under `prefers-reduced-motion`               |
| Focus management         | No interactive elements inside the marquee                                  |

---

## Reduced motion fallback

Rather than stopping abruptly, pausing the animation means the logos are still visible in their last position — which is fine since the content is purely decorative. An alternative is to switch to a static grid at that breakpoint:

```css
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow: visible;
  }
  .marquee__group + .marquee__group {
    display: none;
  }
  .marquee__group {
    animation: none;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
```

This approach is cleaner for content that _should_ be readable, like a list of partners rather than pure decoration.

---

## What I'd do differently

- **Container queries** instead of viewport breakpoints for the gap between logos — the component was dropped into varying-width sidebars post-launch and the spacing broke.
- **CSS custom properties** for animation duration and gap, exposed via the component API, so the CMS editor can tune speed without touching source files.
- Skip the markup duplication entirely and use the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to clone nodes in JS — cleaner HTML, same performance, easier to reason about.

---

## Result

The marquee shipped with **zero JavaScript**, passed WCAG 2.1 AA, and the client's team can update logos through the CMS without touching any code. Lighthouse performance score on the page went from 71 → 94 after removing the old carousel library.

~~The original plan was to use a library.~~ Sometimes the right tool is just CSS.
