# Design Scheme — Haider Limdiwala Portfolio

This document describes the **active** design system used in production. Source of truth: `app/globals.css` (imported in `app/layout.tsx`), `components.json`, and portfolio components under `components/portfolio/`.

> **Note:** `styles/globals.css` is a legacy duplicate with different token values and extended marquee styles. It is **not** imported by the app. Marquee fade/pill styles defined there are not applied unless merged into `app/globals.css`.

---

## 1. Design philosophy

| Principle | Implementation |
|-----------|----------------|
| **Neutral monochrome** | Near-zero chroma OKLCH grays; no brand accent hue in the core palette |
| **High contrast hierarchy** | `primary` ≈ near-black (light) / near-white (dark); body text uses `foreground` with opacity steps |
| **Editorial typography** | Large extrabold section titles, tight tracking on headlines, wide tracking on eyebrow labels |
| **Soft separation** | Section dividers use `border-border/50`, not heavy shadows |
| **Glass chrome** | Fixed header and bottom filter bar: `bg-background/65` + `backdrop-blur` |
| **Motion with restraint** | CSS entrance animations + GSAP (marquee, filter bar) + Lenis smooth scroll |
| **Card-based content** | Services/benefits: bordered `bg-card` tiles with icon hover inversion |

**UI kit:** [shadcn/ui](https://ui.shadcn.com) — **New York** style, **neutral** base, CSS variables, Lucide icons.

---

## 2. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Animation utilities | `tw-animate-css` |
| Fonts | Geist Sans, Geist Mono (`next/font/google`) |
| Theme switching | `next-themes` — `attribute="class"`, `defaultTheme="system"` |
| Smooth scroll | Lenis (`duration: 1.2`, exponential ease-out) |
| Scroll / marquee motion | GSAP + ScrollTrigger |

---

## 3. Color system

All semantic colors use **OKLCH** CSS variables. Use Tailwind utilities mapped in `@theme inline` (e.g. `bg-background`, `text-primary`).

### 3.1 Core tokens (`:root` — light mode)

| Token | OKLCH value | Role |
|-------|-------------|------|
| `--background` | `oklch(0.98 0.001 0)` | Page background (~off-white) |
| `--foreground` | `oklch(0.25 0.01 0)` | Primary text (~charcoal) |
| `--card` | `oklch(1 0 0)` | Card / elevated surfaces (white) |
| `--card-foreground` | `oklch(0.25 0.01 0)` | Text on cards |
| `--popover` | `oklch(1 0 0)` | Popovers, dropdowns |
| `--popover-foreground` | `oklch(0.25 0.01 0)` | Popover text |
| `--primary` | `oklch(0.15 0.01 0)` | CTAs, active filters, badges (~black) |
| `--primary-foreground` | `oklch(0.92 0.001 0)` | Text on primary (~off-white) |
| `--secondary` | `oklch(0.95 0.005 0)` | Secondary surfaces |
| `--secondary-foreground` | `oklch(0.25 0.01 0)` | Secondary text |
| `--muted` | `oklch(0.92 0.001 0)` | Tags, skeletons, subtle fills |
| `--muted-foreground` | `oklch(0.55 0.01 0)` | De-emphasized UI text |
| `--accent` | `oklch(0.15 0.01 0)` | Hover accents (same as primary in light) |
| `--accent-foreground` | `oklch(0.92 0.001 0)` | Text on accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors / destructive actions |
| `--destructive-foreground` | `oklch(0.92 0.001 0)` | Text on destructive |
| `--border` | `oklch(0.9 0.001 0)` | Borders, dividers |
| `--input` | `oklch(0.95 0.001 0)` | Input backgrounds |
| `--ring` | `oklch(0.15 0.01 0)` | Focus rings |

### 3.2 Dark mode (`.dark`)

| Token | OKLCH value | Role |
|-------|-------------|------|
| `--background` | `oklch(0.1 0.005 0)` | Page background |
| `--foreground` | `oklch(0.88 0.002 0)` | Primary text |
| `--card` | `oklch(0.15 0.01 0)` | Cards |
| `--primary` | `oklch(0.88 0.002 0)` | CTAs (inverted: light on dark) |
| `--primary-foreground` | `oklch(0.18 0.005 0)` | Text on primary buttons |
| `--muted` | `oklch(0.25 0.01 0)` | Muted surfaces |
| `--muted-foreground` | `oklch(0.7 0.005 0)` | Muted text |
| `--border` | `oklch(0.25 0.01 0)` | Borders |
| `--input` | `oklch(0.2 0.01 0)` | Inputs |
| `--ring` | `oklch(0.88 0.002 0)` | Focus rings |

### 3.3 Chart colors (data viz / shadcn charts)

Light: purple-violet hue range (`280°`–`250°` hue). Dark: lighter variants of the same hues. Tokens: `--chart-1` … `--chart-5`.

### 3.4 Sidebar tokens

Mirrors main palette for shadcn sidebar primitives (`--sidebar`, `--sidebar-foreground`, etc.). Not heavily used on the marketing page.

### 3.5 Opacity-based text (portfolio pattern)

Use `foreground` with Tailwind opacity instead of separate tokens:

| Utility | Usage |
|---------|--------|
| `text-foreground/60` | Eyebrows, descriptions, loading hints |
| `text-foreground/70` | Footer body, project descriptions |
| `text-foreground/50` | Copyright, tertiary text |
| `text-foreground/70` + `hover:text-foreground` | Nav links |
| `hover:text-primary` | Footer email/phone links |

### 3.6 Category accent colors (`lib/portfolio-data.ts`)

Metadata for filters/gradients — **not** wired into the main neutral UI today:

| Category | Tailwind gradient | Hex `accentColor` examples |
|----------|-------------------|----------------------------|
| Web | `from-blue-600 to-blue-800` | `#2563eb` |
| App | `from-purple-600 to-purple-800` | `#9333ea` |
| UI/UX | `from-pink-600 to-pink-800` | `#ec4899` |
| WordPress | `from-cyan-600 to-cyan-800` | `#06b6d4` |
| Shopify | `from-green-600 to-green-800` | `#16a34a` |
| Wix | `from-orange-600 to-orange-800` | `#ea580c` |

### 3.7 Device mockup palette (`project-mockup.tsx`)

Hardcoded Tailwind grays outside semantic tokens:

- Chrome dots: `bg-red-500`, `bg-yellow-500`, `bg-green-500`
- Frames: `gray-100`–`gray-900`, `border-black`, `shadow-2xl`
- Phone bezel: `border-[14px] border-black`, `rounded-[40px]`

### 3.8 Custom scrollbar

| State | Thumb OKLCH |
|-------|-------------|
| Light default | `oklch(0.7 0.002 0)` |
| Light hover | `oklch(0.6 0.002 0)` |
| Dark default | `oklch(0.35 0.005 0)` |
| Dark hover | `oklch(0.45 0.005 0)` |

- Width: `8px`
- Track: transparent
- Thumb radius: `10px`

---

## 4. Typography

### 4.1 Font families

| Role | Family | CSS variable |
|------|--------|--------------|
| Sans (UI + body) | Geist | `--font-sans` |
| Mono | Geist Mono | `--font-mono` |

**Body defaults** (`app/layout.tsx`): `font-sans antialiased`

### 4.2 Type scale (portfolio)

| Element | Classes | Notes |
|---------|---------|-------|
| Hero H1 | `text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.3] tracking-tighter text-center` | Main headline |
| Hero body | `text-[13px] sm:text-[14px] min-[1440px]:text-[16px] leading-relaxed` | Max width: `max-w-lg md:max-w-xl lg:max-w-2xl` |
| Section H2 (work) | `text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight` | Centered |
| Section H2 (services) | `text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight` | Centered |
| Section eyebrow | `text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60` | “What I do”, “What I've been up to…” |
| Project title | `text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-balance` | |
| Project body | `text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl` | |
| Service card title | `text-lg font-semibold` | |
| Service card body | `text-sm text-foreground/60 leading-relaxed` | |
| Footer H2 | `text-3xl md:text-4xl font-bold text-balance` | |
| Footer contact | `text-lg font-semibold` | |
| Footer label | `text-sm font-semibold uppercase tracking-wider text-foreground/60` | |
| Nav links | `text-sm text-foreground/70` | Hidden below `md` |
| Logo / name | `font-semibold text-lg tracking-tight` | |
| Header CTA | `text-xs md:text-sm font-medium` | |
| Tags | `text-xs md:text-sm` | On `bg-muted` pills |
| Badge “Featured Project” | `text-sm font-semibold` | `bg-primary/10 text-primary` |

### 4.3 shadcn / UI default text

- Buttons, inputs, menus: `text-sm` (`button.tsx`, form controls)
- Tooltips: `text-xs`

---

## 5. Spacing & layout

### 5.1 Content max-widths

| Container | Max width | Used in |
|-----------|-----------|---------|
| **Primary shell** | `max-w-7xl` (80rem / 1280px) | Header, hero, services, footer, filter bar inner |
| **Hero copy block** | `max-w-5xl` | Centered headline stack |
| **Hero description** | `max-w-lg` → `md:max-w-xl` → `lg:max-w-2xl` | Subcopy |
| **Project sections** | `max-w-[1200px]` | Per-project layout |
| **Project image** | `max-w-lg` | Screenshot column |
| **Bottom filter bar** | `max-w-[calc(100vw-2rem)]` | Viewport-safe floating bar |
| **Browser mockup** | `max-w-2xl` | `project-mockup` |
| **Desktop mockup** | `max-w-4xl` | `project-mockup` |

### 5.2 Horizontal padding (page gutters)

Standard pattern across sections:

```
px-4          → 16px (mobile)
md:px-8       → 32px (tablet+)
lg:px-16      → 64px (large desktop)
```

**Exceptions:**

- Project sections: `px-4 md:px-8` only (no `lg:px-16`)
- Bottom filter inner: `px-4 md:px-2`
- Work showcase title: `px-4` on headings only

### 5.3 Vertical section spacing

| Section | Padding / margin |
|---------|------------------|
| Hero | `pt-24 pb-16` / `md:py-24` (clears fixed header) |
| Services | `py-24` |
| Why Me (commented out) | `py-20` |
| Project block | `py-16 md:py-24` per project |
| Work showcase wrapper | `pt-16` |
| Footer | `py-20 md:py-32` |
| Footer divider block | `mt-16 md:mt-24 pt-8 md:pt-12` |
| Services / Why Me header margin | `mb-16` / `mb-14` |

### 5.4 Grid & gaps

| Layout | Pattern |
|--------|---------|
| Services | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` |
| Why Me | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` |
| Footer | `grid-cols-1 md:grid-cols-3 gap-12 md:gap-16` |
| Project row | `flex-col` → `lg:flex-row` / `lg:flex-row-reverse`, `gap-10 lg:gap-16` |
| Header nav | `gap-8` (desktop links), `gap-2 md:gap-3` (actions) |
| Marquee icons | `gap-5` |
| Tag row | `gap-2` |
| Stack spacing | `space-y-4`, `space-y-6` common |

### 5.5 Z-index layers

| Layer | `z-index` | Position |
|-------|-----------|----------|
| Header | `z-50` | `fixed top-0` |
| Bottom filter bar | `z-50` | `fixed bottom-2` |
| Radix overlays (shadcn) | `z-50` | Dialogs, popovers, etc. |

---

## 6. Border radius

Base token: `--radius: 0.375rem` (6px).

Derived in `@theme inline`:

| Token | Formula | ≈ Value |
|-------|---------|---------|
| `--radius-sm` | `calc(var(--radius) - 4px)` | 2px |
| `--radius-md` | `calc(var(--radius) - 2px)` | 4px |
| `--radius-lg` | `var(--radius)` | 6px |
| `--radius-xl` | `calc(var(--radius) + 4px)` | 10px |

### 6.1 Component radius usage

| Component / pattern | Radius |
|---------------------|--------|
| shadcn Button (default) | `rounded-md` |
| shadcn Card | `rounded-xl` |
| Portfolio cards (services, why-me) | `rounded-2xl` |
| Primary CTAs (hero, header) | `rounded-2xl` / `rounded-xl` |
| Icon containers | `rounded-xl` (`w-10`/`w-11`) |
| Pills / tags / filters | `rounded-full` |
| Theme toggle | `rounded-xl` |
| Bottom filter bar shell | `rounded-4xl` |
| Marquee icon chips | `rounded-xl` |
| Loading spinner | `rounded-full` |
| Phone mockup | `rounded-[40px]` |

---

## 7. Shadows & elevation

### 7.1 Portfolio shadows

| Usage | Class |
|-------|-------|
| Primary CTA (hero) | `shadow-lg` |
| Active filter chip | `shadow-lg` |
| Device mockups | `shadow-2xl` |

### 7.2 shadcn shadow scale (UI primitives)

| Class | Typical use |
|-------|-------------|
| `shadow-xs` | Inputs, toggles, outline buttons |
| `shadow-sm` | Cards, tabs, sidebar |
| `shadow-md` | Popovers, selects, hover cards |
| `shadow-lg` | Dialogs, sheets, toasts, menubar |
| `shadow-xl` | Chart tooltips |

No custom `box-shadow` CSS variables — rely on Tailwind defaults.

### 7.3 Glass / blur (elevation without shadow)

```
bg-background/65 backdrop-blur-sm   → header
bg-background/65 backdrop-blur-md → bottom filter bar
```

---

## 8. Borders & dividers

| Pattern | Classes |
|---------|---------|
| Section separator | `border-b border-border/50` |
| Footer top | `border-t border-border` |
| Fixed header bottom | `border-b border-border` |
| Cards | `border border-border` |
| Full-strength border | `border-border` (no opacity) |
| Focus ring (shadcn) | `focus-visible:ring-ring/50 focus-visible:ring-[3px]` |
| Global default | `* { border-border outline-ring/50 }` |

---

## 9. Interactive states & transitions

| Pattern | Values |
|---------|--------|
| Color transition | `transition-colors` or `transition-colors duration-300` |
| Button hover | `hover:bg-primary/90` |
| Card hover | `hover:bg-accent/10` + `dark:hover:bg-white/10` |
| Icon tile hover | `group-hover:bg-primary group-hover:text-primary-foreground` |
| Nav link | `hover:text-foreground` |
| Filter (inactive) | `hover:bg-accent/10 dark:hover:bg-white/20` |
| Filter transition | `transition-all duration-300` |
| Scale (filter-bar variant) | `hover:scale-105` on pills |

**Disabled:** `disabled:opacity-50`, `disabled:pointer-events-none` (buttons).

---

## 10. Buttons & CTAs

### 10.1 Portfolio primary button (hero)

```
inline-flex items-center justify-center
rounded-2xl bg-primary px-8 py-4
text-sm font-semibold text-primary-foreground
shadow-lg transition hover:bg-primary/90
```

### 10.2 Header CTA

```
px-3 py-1.5 md:px-4 md:py-2
rounded-xl text-xs md:text-sm font-medium
bg-primary text-primary-foreground
hover:bg-primary/90 transition-colors whitespace-nowrap
```

### 10.3 shadcn Button variants (reference)

| Variant | Key styles |
|---------|------------|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `outline` | `border bg-background shadow-xs hover:bg-accent` |
| `secondary` | `bg-secondary hover:bg-secondary/80` |
| `ghost` | `hover:bg-accent` |
| `destructive` | `bg-destructive text-white` |

| Size | Height / padding |
|------|------------------|
| `default` | `h-9 px-4 py-2` |
| `sm` | `h-8 px-3` |
| `lg` | `h-10 px-6` |
| `icon` | `size-9` |

---

## 11. Cards & tiles

### 11.1 Service / benefit card

```
p-6 rounded-2xl border border-border bg-card
hover:bg-accent/10 transition-colors duration-300
dark:hover:bg-white/10
```

**Icon well:**

```
w-11 h-11 rounded-xl bg-primary/10 text-primary
group-hover:bg-primary group-hover:text-primary-foreground
transition-colors duration-300
```

(Lucide icons: `size={20}`, `strokeWidth={1.75}` in services.)

### 11.2 shadcn Card

```
bg-card rounded-xl border py-6 shadow-sm gap-6
Header/content padding: px-6
```

### 11.3 Project badge & tags

- Badge: `bg-primary/10 px-4 py-2 rounded-full text-primary`
- Tag: `px-3 py-1 bg-muted text-foreground/70 rounded-full`

---

## 12. Motion & animation

### 12.1 Lenis smooth scroll

- `duration: 1.2`
- Easing: `t => min(1, 1.001 - 2^(-10t))`

### 12.2 CSS keyframes (`app/globals.css`)

| Animation class | Duration | Easing | Effect |
|-----------------|----------|--------|--------|
| `.animate-pulse-gentle` | 2s infinite | ease-in-out | Opacity 1 → 0.6 → 1 |
| `.animate-shimmer` | 2s infinite | — | Horizontal shimmer on skeletons |
| `.animate-fade-in-up` | 0.6s | ease-out | Fade + `translateY(20px)` → 0 |
| `.animate-fade-in` | 0.6s | ease-out | Opacity 0 → 1 |
| `.animate-slide-down` | 0.4s | ease-out | Fade + `translateY(-10px)` → 0 |
| `.animate-scale-in` | 0.4s | ease-out | Fade + scale 0.95 → 1 |
| `.animate-slide-in-left` | 0.7s | ease-out | Fade + `translateX(-30px)` → 0 |
| `.animate-slide-in-right` | 0.7s | ease-out | Fade + `translateX(30px)` → 0 |
| `.animate-scale-up` | 0.6s | ease-out | Fade + scale 0.9 → 1 |
| `.animate-float` | 6s infinite | ease-in-out | `translateY(0)` ↔ `-10px` |

**Stagger:** Project sections use `style={{ animationDelay: \`${index * 0.1}s\` }}` on slide-in blocks.

### 12.3 GSAP

| Feature | Settings |
|---------|----------|
| Hero marquee | `duration: 24`, `ease: "none"`, `repeat: -1`, x-translation by half track width |
| Bottom filter bar | ScrollTrigger `start: "top 60%"`; show/hide `duration: 0.4` / `0.35`, `ease: power2.out/in`, `y: 100` hidden |

### 12.4 HTML scroll

`html { scroll-behavior: smooth; }` (alongside Lenis).

### 12.5 Loading states

- Spinner: `w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin`
- Skeleton: `bg-muted animate-shimmer rounded-lg` (hero placeholders)
- Filter change: 300ms loading gate before re-render

---

## 13. Marquee (hero tech stack)

**Markup:** `.marquee-container` → `.marquee` → `.marquee-track` (GSAP animates `x`).

**Icon chip (Tailwind in component):**

```
p-2 md:p-3 lg:p-4 rounded-xl
bg-accent-foreground dark:bg-accent
text-2xl md:text-2xl lg:text-3xl
```

**Extended styles** (only in unused `styles/globals.css`):

- Fade masks: 4rem wide gradients on left/right
- `.marquee`: pill shape `border-radius: 9999px`, subtle border/shadow
- Track padding: `0.75rem 1rem`, gap `1rem`

Consider porting those rules to `app/globals.css` if the pill track design is desired.

---

## 14. Icons

| Source | Usage |
|--------|--------|
| **Lucide React** | Services, filter bar (partial), shadcn UI |
| **react-icons** | Hero marquee (Fa*, Io*, Ri*, Si*, Bi*, Hi*) |

**Sizes:** Filter icons ~18px; service icons 20px; marquee icons scale with `text-2xl`/`text-3xl`.

---

## 15. Responsive breakpoints

Tailwind defaults (v4). Notable custom breakpoint:

- `min-[1440px]:text-[16px]` — hero description on very large screens
- `max-[991px]:[&>br]:hidden` — hide manual line breaks in hero copy below ~991px

| Prefix | Min width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

**Layout shifts:**

- Nav links: hidden `< md`, shown `md:flex`
- Project layout: stacked → side-by-side at `lg`
- Text alignment: centered on mobile, `lg:text-left` for projects

---

## 16. Accessibility & focus

- Semantic landmarks: `<main>`, `<section>`, `<footer id="contact">`, `<nav>`
- Filter buttons: `aria-label` per category
- shadcn focus: `focus-visible:ring-[3px]` with `ring-ring/50`
- Theme: `suppressHydrationWarning` on `<html>` / `<body>` for next-themes
- `text-balance` on key headings for nicer wrapping

---

## 17. File map

| File | Purpose |
|------|---------|
| `app/globals.css` | **Active** tokens, animations, scrollbar, base layer |
| `app/layout.tsx` | Fonts, theme provider, global body classes |
| `components.json` | shadcn config (new-york, neutral, css path) |
| `components/theme-provider.tsx` | Dark/light/system |
| `components/portfolio/*` | Marketing layout patterns |
| `components/ui/*` | shadcn primitives |
| `lib/portfolio-data.ts` | Category colors & per-project `accentColor` |
| `styles/globals.css` | Legacy alternate tokens + marquee CSS (unused) |

---

## 18. Quick reference — copy-paste patterns

**Page container:**

```html
<div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
```

**Section eyebrow + title:**

```html
<p class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">Label</p>
<h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">Title</h2>
```

**Primary CTA:**

```html
<a class="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90">Label</a>
```

**Glass header:**

```html
<header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/65 backdrop-blur-sm">
```

---

*Generated from codebase analysis. Update this file when changing `app/globals.css` or portfolio layout conventions.*
