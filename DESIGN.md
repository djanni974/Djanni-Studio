# DESIGN.md — Djanni Studio

> Design system for AI agents. Drop this file into your context to generate UI that matches the Djanni Studio brand.

---

## 1. Visual Theme & Atmosphere

**Philosophy**: Craft-first digital design. Djanni Studio builds websites for local artisans and tradespeople — the design reflects that ethos: warm, bold, honest, performant.

**Mood**: High-contrast dark canvas (default theme) with vivid orange accents. Grain texture overlay adds tactile depth — like paper, not plastic. Typography is sharp and confident. Whitespace is generous. Every element earns its place.

**Personality**:
- Warm, not corporate
- Bold, not flashy
- Structured, not rigid
- Fast, not minimal

**Signature elements**:
- Noise texture overlay on every page (SVG fractal, subtle grain)
- Aurora gradient backgrounds (orange-based, 60s animation loop)
- Orange dot after section titles
- Browser mockup frames around project screenshots
- Fade-up entrance animations on scroll

---

## 2. Color Palette & Roles

### Brand colors

| Token            | Hex       | Role                              |
|------------------|-----------|-----------------------------------|
| `orange`         | `#e8500a` | Primary — CTAs, links, accents    |
| `orange-light`   | `#f07040` | Hover states, gradients           |
| `black`          | `#0c0c0b` | Dark backgrounds, dark text       |
| `white`          | `#f5f2ec` | Light backgrounds, light text     |
| `cream`          | `#ede9e0` | Alternate light background        |

### Neutral grays

| Context    | Light theme | Dark theme |
|------------|-------------|------------|
| Gray       | `#55524a`   | `#7f7a71`  |
| Gray light | `#4a4540`   | `#b8b4ac`  |

### Surface system (3-level depth)

| Token       | Light     | Dark      | Usage              |
|-------------|-----------|-----------|--------------------|
| `surface-a` | `#faf8f5` | `#0c0c0b` | Page background    |
| `surface-b` | `#f5f2ec` | `#0f0f0e` | Cards              |
| `surface-c` | `#ede9e0` | `#111110` | Elevated elements  |

### Semantic roles

| Role                 | Light           | Dark            |
|----------------------|-----------------|-----------------|
| `background`         | `#faf8f5`       | `#0c0c0b`       |
| `foreground`         | `#1a1a18`       | `#f5f2ec`        |
| `card`               | `#ffffff`       | `#0f0f0e`        |
| `card-foreground`    | `#1a1a18`       | `#f5f2ec`        |
| `primary`            | `#e8500a`       | `#e8500a`        |
| `primary-foreground` | `#ffffff`       | `#f5f2ec`        |
| `secondary`          | `#f0ede8`       | `#1a1a18`        |
| `muted`              | `#f0ede8`       | `#1a1a18`        |
| `muted-foreground`   | `#55524a`       | `#b8b4ac`        |
| `accent`             | `#f07040`       | `#f07040`        |
| `destructive`        | `#dc2626`       | `#dc2626`        |
| `border`             | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.12)` |
| `ring`               | `#e8500a`       | `#e8500a`        |

### Theme behavior

- **Default theme**: dark
- **Switching mechanism**: CSS custom properties on `:root` and `.dark` class via `next-themes`
- **Never use** Tailwind `dark:` utilities inline — always use CSS variables

---

## 3. Typography

### Font families

| Token          | Family    | Usage                | Weights     |
|----------------|-----------|----------------------|-------------|
| `font-heading` | **Syne**  | Headings, logo, hero | 700, 800    |
| `font-sans`    | **DM Sans** | Body, UI, labels   | 300, 400, 500 |

Both loaded from Google Fonts with `display: swap`.

### Type scale

| Element        | Font     | Size                           | Weight | Notes                            |
|----------------|----------|--------------------------------|--------|----------------------------------|
| Hero headline  | Syne     | `clamp(44px, 7vw, 96px)`      | 800    | Largest text on the site         |
| Page heading   | Syne     | `clamp(32px, 4vw, 52px)`      | 800    | Section titles                   |
| Section title  | Syne     | `text-3xl` / `md:text-4xl`    | 700    | Via `SectionHeader` component    |
| Card title     | Syne     | `text-xl` / `text-2xl`        | 700    | Card headings                    |
| Body           | DM Sans  | `text-base` (16px)             | 400    | Default paragraph text           |
| Body light     | DM Sans  | `text-base`                    | 300    | Subtitles, descriptions          |
| Small          | DM Sans  | `text-sm` (14px)               | 400    | Secondary info                   |
| Label          | DM Sans  | `text-xs` (12px)               | 500    | Uppercase, `letter-spacing: 0.15em` |
| Logo           | Syne     | `20px`                         | 800    | `letter-spacing: -0.02em`        |

### Typography rules

- Headings always use `font-heading` (Syne), never DM Sans
- Body text uses `font-sans` (DM Sans), never Syne
- No font sizes below 12px
- Line height: 1.5 for body, 1.2 for headings
- Letter-spacing: tight (`-0.02em`) for headings, normal for body

---

## 4. Component Stylings

### Button

4 variants, 4 sizes. Built with CVA (class-variance-authority).

**Variants:**

| Variant   | Default state                              | Hover state                        |
|-----------|--------------------------------------------|------------------------------------|
| `default` | `bg-primary text-primary-foreground`       | `bg-djanni-orange-light`           |
| `outline` | `border-border bg-transparent`             | `bg-secondary border-djanni-gray`  |
| `ghost`   | `bg-transparent`                           | `bg-secondary text-foreground`     |
| `link`    | `text-primary underline-offset-4`          | `underline`                        |

**Sizes:**

| Size      | Height | Padding   | Font     |
|-----------|--------|-----------|----------|
| `sm`      | `h-9`  | `px-4`    | `text-xs`|
| `default` | `h-11` | `px-6 py-2` | `text-sm` |
| `lg`      | `h-12` | `px-8`    | `text-base` |
| `icon`    | `h-10 w-10` | —    | —        |

**Common styles**: `rounded-lg`, `font-medium`, `transition-all`. Focus: `ring-2 ring-ring ring-offset-2`. Disabled: `opacity-50 pointer-events-none`.

### Badge

Pill-shaped. 3 variants.

| Variant     | Style                                                  |
|-------------|--------------------------------------------------------|
| `default`   | `bg-primary/10 text-primary border-primary/20`         |
| `secondary` | `bg-secondary text-secondary-foreground border-border` |
| `outline`   | `border-border text-muted-foreground`                  |

Base: `rounded-full px-3 py-1 text-xs font-medium`.

### Cards

All cards share: `rounded-xl border border-border bg-card`, hover lift (`-translate-y-1`), `transition-all duration-300`.

**Pricing card:**
- Featured variant: orange background, white text, pulsing glow
- Shine sweep on hover (skewed gradient overlay)
- Staggered entrance animations per section (badge → price → features → CTA)
- Feature list with spring-animated checkmarks

**Project card:**
- Browser mockup frame around screenshots
- Accent glow (top-right, `opacity-20 blur-[60px]`, uses project color)
- Info bar: name, type, location, year
- Hover: border color shift, accent line reveal

**Testimonial card:**
- Quote icon + 5-star rating header
- Linear gradient background (`card → surface-b`)
- Author section with circular gradient avatar + initials

**Process step card:**
- Large background number (3% opacity, absolute positioned)
- Icon in orange-tinted rounded square
- "Wide" variant: horizontal flex on desktop

### SectionHeader

Reusable section title component.
- Auto-appends an **orange dot** (`.`) after the title text
- Props: `align` (`left` | `center`), `as` (`h1` | `h2`)
- Subtitle in `text-muted-foreground`

### Separator

Simple divider: `border-none bg-border`. Horizontal: `h-px w-full`. Vertical: `h-full w-px`.

### Accordion

Custom implementation (no Radix).
- Grid transition for smooth expand/collapse
- Chevron rotation on open
- Semantic: `aria-expanded`, `aria-controls`

### Form inputs

- Border: `border-border`
- Focus ring: `ring-2 ring-orange` (primary)
- Background: transparent or `surface-b`
- Rounded: `rounded-lg`

---

## 5. Layout Principles

### Spacing scale

Based on 4px increments, using Tailwind spacing utilities:

| Token  | Value  | Usage                        |
|--------|--------|------------------------------|
| `1`    | 4px    | Tight inline spacing         |
| `2`    | 8px    | Icon gaps, tight padding     |
| `2.5`  | 10px   | Common card gap              |
| `4`    | 16px   | Standard gap                 |
| `5`    | 20px   | Card grid gaps               |
| `6`    | 24px   | Section content gaps         |
| `7`    | 28px   | Card padding (mobile)        |
| `8`    | 32px   | Card padding (standard)      |
| `10`   | 40px   | Card padding (desktop)       |
| `12`   | 48px   | Section horizontal padding   |
| `24`   | 96px   | Section vertical padding     |

### Container widths

| Context          | Max-width  |
|------------------|------------|
| Form container   | `720px`    |
| Text content     | `700px`    |
| Full-width       | None (edge-to-edge) |

### Grid patterns

| Columns | Breakpoint | Usage                    |
|---------|------------|--------------------------|
| 1 col   | Mobile     | Default stack            |
| 2 cols  | `md:`      | Feature grids, projects  |
| 3 cols  | `md:`      | Pricing cards, stats     |

### Section structure

```
<section class="py-24 md:px-12">
  <SectionHeader />        ← title + subtitle + orange dot
  <div class="gap-5">      ← content grid
    {children}
  </div>
</section>
```

Sections alternate between `surface-a` and `surface-b` backgrounds for visual rhythm.

---

## 6. Depth & Elevation

### Border system

- Light: `rgba(0, 0, 0, 0.1)` — 10% black
- Dark: `rgba(255, 255, 255, 0.12)` — 12% white
- Cards always have `border border-border`

### Shadow scale

| Level     | Value                           | Usage             |
|-----------|---------------------------------|-------------------|
| Subtle    | `0 4px 20px rgba(0,0,0,0.08)`  | CTA buttons       |
| Medium    | `0 8px 30px rgba(0,0,0,0.12)`  | Card hover        |
| Glow      | `0 0 60px rgba(232,80,10,0.04)`| Inset card glow   |

### Border radius scale

| Token       | Value   | Pixels |
|-------------|---------|--------|
| `radius-sm` | `calc(0.75rem - 4px)` | 8px  |
| `radius-md` | `calc(0.75rem - 2px)` | 10px |
| `radius-lg` | `0.75rem`             | 12px |
| `radius-xl` | `calc(0.75rem + 4px)` | 16px |

Default: `rounded-lg` (12px) for cards. `rounded-xl` (16px) for sections and large containers.

### Noise texture

Global grain overlay applied via `body::before`:
- SVG fractal noise (`baseFrequency: 0.9`, `numOctaves: 4`)
- `opacity: 0.4`, `position: fixed`, `z-index: 9999`
- `pointer-events: none` — purely decorative

### Glow effects

Orange-based radial glows used as decorative backdrops:
- Hero: top-right 700px glow, bottom-left 500px glow
- Cards: accent color glow (20% opacity, 60px blur)
- Featured elements: pulsing orange glow with `animate-pulse`

---

## 7. Motion & Animation

### Easing

| Name       | Value                            | Usage                |
|------------|----------------------------------|----------------------|
| Standard   | `cubic-bezier(0.22, 1, 0.36, 1)`| All entrance/exit    |
| Spring     | `stiffness: 500, damping: 25`   | Checkmarks, toggles  |
| Linear     | `linear`                         | Aurora loop only     |

### Entrance animations

| Animation     | Duration | Props                      | Trigger          |
|---------------|----------|----------------------------|-------------------|
| Fade up       | 0.6s     | `opacity: 0→1, y: 30→0`   | Viewport enter    |
| Scale + blur  | 0.6s     | `scale: 0.8→1, blur: 4→0` | Viewport enter    |
| Hero fade     | 0.6s     | `opacity: 0→1, y: 20→0`   | Page load         |
| Hero orbits   | 1.4s     | `opacity: 0→1, scale: 0.85→1` | Page load (0.3s delay) |

### Stagger

- Container: `staggerChildren: 0.06` to `0.12` depending on density
- Viewport trigger: `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Always `once: true` — animations play only on first appearance

### Hover effects

| Effect       | Properties                              |
|--------------|------------------------------------------|
| Lift         | `translateY(-1px)` or `translateY(-4px)` |
| Shine sweep  | Skewed gradient (`skew-x-[-20deg]`) slides left→right |
| Scale image  | `scale(1.02)` on contained images       |
| Border shift | Border color transitions to accent       |
| Underline    | `scaleX: 0→1`, origin left              |

### Background animations

| Animation | Duration | Description                                    |
|-----------|----------|------------------------------------------------|
| Aurora    | 60s      | Repeating gradient sweep, `mix-blend-mode: difference` |
| Lamp      | 0.8s     | Conic gradient width: `8rem→20rem`, 0.3s delay |

### Transition defaults

- Standard: `duration-300 ease-out`
- Fast (hover states): `duration-200`
- Slow (reveals): `duration-700`

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms;
  animation-iteration-count: 1;
  transition-duration: 0.01ms;
  scroll-behavior: auto;
}
```

Always check `useReducedMotion()` from `motion/react` and swap to static variants when true.

---

## 8. Do's and Don'ts

### Colors & Theming

| Do | Don't |
|----|-------|
| Use CSS custom properties (`var(--primary)`) | Use Tailwind `dark:` utilities inline |
| Use semantic tokens (`bg-card`, `text-foreground`) | Hardcode hex values in components |
| Use the 3-level surface system for depth | Use `bg-white` / `bg-black` directly |

### Typography

| Do | Don't |
|----|-------|
| Use `font-heading` (Syne) for all headings | Mix heading/body fonts randomly |
| Use `font-sans` (DM Sans) for body text | Use font sizes below 12px |
| Use `clamp()` for responsive hero text | Use fixed px sizes for large headings |

### Components

| Do | Don't |
|----|-------|
| Import shared components from `@repo/ui` | Duplicate Button/Badge/Separator locally |
| Use `SectionHeader` for section titles | Build custom section title patterns |
| Use `AnimatedSection` for scroll reveals | Write custom IntersectionObserver logic |
| Use `BrowserMockup` for project screenshots | Show raw screenshots without framing |

### Layout

| Do | Don't |
|----|-------|
| Follow the section padding pattern (`py-24 md:px-12`) | Invent new section spacing |
| Use `gap-5` for card grids | Use margins between grid children |
| Keep content max-width at 700-720px | Let text lines exceed ~75 characters |

### Code

| Do | Don't |
|----|-------|
| Use `Link` from `@/i18n/navigation` | Use `next/link` directly |
| Put all static data in `constants.ts` | Hardcode data in components |
| Format with Biome (tabs, double quotes) | Use Prettier or ESLint |
| Use `pnpm` exclusively | Use npm or yarn |
| Add i18n keys in all 3 files (`fr`, `en`, `br`) | Add keys in only one locale |

---

## 9. Agent Prompt Guide

### Quick token reference

```
Primary:      #e8500a (orange)
Accent:       #f07040 (orange-light)
Background:   #0c0c0b (dark) / #faf8f5 (light)
Foreground:   #f5f2ec (dark) / #1a1a18 (light)
Card:         #0f0f0e (dark) / #ffffff (light)
Border:       rgba(255,255,255,0.12) (dark) / rgba(0,0,0,0.1) (light)
Radius:       12px (default)
Font heading: Syne 700-800
Font body:    DM Sans 300-500
Easing:       cubic-bezier(0.22, 1, 0.36, 1)
```

### Component template

When building a new component for Djanni Studio, follow this pattern:

```tsx
"use client"

import { motion } from "motion/react"
import { cn } from "@repo/ui/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function MyComponent({ className }: { className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "rounded-xl border border-border bg-card p-8",
        className,
      )}
    >
      <h3 className="font-heading text-xl font-bold">Title</h3>
      <p className="text-muted-foreground">Description</p>
    </motion.div>
  )
}
```

### Conformity checklist

Before shipping UI for Djanni Studio, verify:

- [ ] Dark theme is default, light theme works via CSS variables (no `dark:`)
- [ ] Headings use Syne (`font-heading`), body uses DM Sans (`font-sans`)
- [ ] Primary color is `#e8500a`, not a random orange
- [ ] Cards have `border border-border rounded-xl bg-card`
- [ ] Animations use `cubic-bezier(0.22, 1, 0.36, 1)` easing
- [ ] Scroll animations trigger once with `-80px` viewport margin
- [ ] `prefers-reduced-motion` is respected
- [ ] Noise texture overlay is present (global, not per-component)
- [ ] Section titles use `SectionHeader` with auto orange dot
- [ ] All text is internationalized via `next-intl` (fr, en, br)
- [ ] Static data comes from `constants.ts`
- [ ] Links use `@/i18n/navigation`, not `next/link`
