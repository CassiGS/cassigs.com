---
layout: ../../layouts/MarkdownPostLayout.astro
title: "My First Blog Post"
pubDate: 2022-07-01
description: "This is the first post of my new Astro blog."
author: "Astro Learner"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blogging", "learning in public"]
---

## Introduction

Every design system starts the same way: *someone gets tired of copy-pasting components.* What begins as a shared Figma library quietly becomes infrastructure — the kind of thing that, once removed, reveals exactly how load-bearing it was.

This post documents the approach I used when building [Meridian](https://example.com), a design system for a fintech company serving 200+ engineers and designers across four product teams. It is not a post about tools. It is a post about **decisions, tradeoffs, and the things I wish I had known earlier.**

---

## Why Most Design Systems Fail

Before getting into process, it's worth being honest about the odds. Most design systems fail — not at launch, but quietly, over the following 12 months. They fail for predictable reasons:

1. They are built by designers, for designers, without meaningful engineering input
2. They optimise for completeness over usability
3. They have no owner once the initial build is done
4. They solve the team's *current* problems rather than their *recurring* ones

The goal of a good system is not to have a component for everything. It is to make the right thing the easy thing.

---

## Principles We Started With

Before writing a single line of code or placing a single frame, the team aligned on three principles. These weren't aspirational — they were evaluative. Every decision we made had to be defensible against them.

### Principle 1: Composable Over Comprehensive

A small set of primitives that combine well is more valuable than a large set of components that don't. We deliberately kept our component count low and invested heavily in tokens and spacing systems instead.

### Principle 2: Documentation Is the Product

A component without documentation does not exist. We treated the docs site as a first-class deliverable — not an afterthought — and allocated roughly 40% of our build time to it.

### Principle 3: Boring Is Good

> The goal of infrastructure is to be invisible. If engineers are talking about the design system, something has probably gone wrong.

Exciting, clever solutions have a maintenance cost. We chose boring, legible, predictable patterns wherever possible.

---

## The Token Architecture

Our token structure followed a three-tier model: **global → semantic → component**.

| Tier | Example | Value |
|------|---------|-------|
| Global | `--color-blue-600` | `#1B2FC2` |
| Semantic | `--color-action-primary` | `var(--color-blue-600)` |
| Component | `--button-bg` | `var(--color-action-primary)` |

This separation meant we could retheme entire surfaces by changing semantic tokens without touching components, and change a global value without guessing what it would affect downstream.

### Spacing

We used a base-8 spacing scale with three named aliases:

- `--space-xs`: `4px`
- `--space-s`: `8px`
- `--space-m`: `16px`
- `--space-l`: `24px`
- `--space-xl`: `32px`
- `--space-2xl`: `48px`
- `--space-3xl`: `64px`

---

## What the Audit Revealed

Before building anything new, we audited what existed. Here is what we found across four products after six weeks of work:

![Audit results showing component fragmentation across four product teams](https://placehold.co/600x400/EEE/31343C)

*Fig 1. Component inventory across four products before consolidation. Each colour represents a unique instance of what should have been a shared component.*

The number that changed the conversation: **214 unique button variants** across four products. Not 214 buttons — 214 *variations* of a thing that should have had six.

---

## Building the Component API

The hardest part of building components isn't the CSS. It's deciding what the API should look like — what props a component should accept, and crucially, **what it should refuse to accept.**

Here's the progression our `Button` component went through:

### Version 1 — Too Permissive

```tsx
<Button
  backgroundColor="#1B2FC2"
  textColor="white"
  borderRadius="4px"
  paddingX="16px"
  paddingY="8px"
>
  Submit
</Button>
```

This is a styling API, not a component API. It gives consumers total control, which sounds good until you have 214 button variants.

### Version 2 — Too Restrictive

```tsx
<Button>Submit</Button>
// No variants. No sizes. No icon support.
```

Pendulum swings too far. Teams immediately started wrapping it with custom styles, defeating the purpose entirely.

### Version 3 — The Right Surface Area

```tsx
<Button
  variant="primary" | "secondary" | "ghost" | "destructive"
  size="sm" | "md" | "lg"
  iconLeft={<Icon />}
  iconRight={<Icon />}
  loading={boolean}
  disabled={boolean}
>
  Submit
</Button>
```

The API exposes *intent*, not *implementation*. `variant="destructive"` communicates meaning. `backgroundColor="red"` just sets a colour.

---

## Governance Model

A design system without governance is a design system with an expiry date. We settled on a **contribution model** with three tiers:

### Tier 1 — Direct Contribution
Core team members can merge to main after peer review. Covers: bug fixes, documentation updates, minor token adjustments.

### Tier 2 — Proposal Required
Any change to a component's public API, or addition of a new component, requires a written proposal reviewed by at least one designer and one engineer from a consuming team.

### Tier 3 — RFC Process
Breaking changes, deprecations, or new subsystems (e.g. adding a data visualisation layer) go through a formal Request for Comment with a two-week open comment period.

---

## Lessons Learned

After 18 months in production, here is what I would tell myself at the start:

1. **Ship something incomplete earlier.** A real component used in production teaches you more than a perfect component used nowhere.
2. **Measure adoption, not completeness.** The metric that matters is what percentage of production UI is using system components — not how many components exist.
3. **Make deprecation a first-class concept.** We didn't build a deprecation process until we needed one. That was too late.
4. **The hardest conversations are organisational, not technical.** Getting four teams to agree on a single button took longer than building it.

---

## Further Reading

If this resonated, these are the resources I found most useful during the process:

- [Tokens, Variables, and Styles](https://example.com) — Nathan Curtis, EightShapes
- [The Cascade](https://example.com) — Lea Verou on CSS architecture
- [Design System Governance](https://example.com) — Inayaili de León
- [Atomic Design](https://example.com) — Brad Frost *(still the best introduction to the underlying mental model)*

---

## A Note on Tools

~~We originally planned to use Storybook as our primary documentation platform.~~ After three months we migrated to a custom docs site. Storybook is excellent for component development; it is a poor reading experience for designers and non-technical stakeholders who make up the majority of a system's audience.

The tool that matters least is the one most teams argue about longest.

---

### Quick Reference Checklist

Before shipping any new component, we ran through this list:

- [ ] Token usage documented
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Responsive behaviour documented
- [ ] Dark mode variant exists
- [ ] Deprecation path defined for anything it replaces
- [x] Peer reviewed by one designer
- [x] Peer reviewed by one engineer

---

*Have questions about the process or want to talk through a specific challenge? [Get in touch.](mailto:alex@alexmorgan.co)*
