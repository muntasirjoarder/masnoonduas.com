# MasnoonDuas — Design System 2026

Premium Islamic lifestyle brand. The visual language should feel like a curated editorial publication — calm, trustworthy, and beautiful enough that a printed dua card would look at home on any wall.

---

## Color Tokens

```css
:root {
  /* Canvas */
  --bg:            #FAF7F2;   /* Soft cream — default page background */
  --surface:       #FFFFFF;   /* Pure white — cards, modals */
  --cream-section: #F2ECE2;   /* Slightly warmer cream — alternate section backgrounds */
  --cream-card:    #F7F2EA;   /* Card background variant */
  --dark-surface:  #162720;   /* Near-black — dark sections (How It Works, footer) */

  /* Foreground */
  --fg:            #1A2E25;   /* Primary text — very dark emerald-black */
  --fg-light:      #2C4A3A;   /* Secondary headings, nav links */
  --muted:         #6B7D74;   /* Body text, descriptions */
  --muted-light:   #96A89F;   /* Metadata, sources, secondary labels */

  /* Borders */
  --border:        #E4DDD0;   /* Default border */
  --border-light:  #EDE7DC;   /* Subtle dividers */

  /* Brand — Emerald */
  --emerald:       #2D5A47;   /* Primary brand color */
  --emerald-deep:  #1E3D2F;   /* Hover/pressed state */
  --emerald-mid:   #3A7059;   /* Mid-tone for gradients if ever needed */
  --emerald-subtle:#EBF3EE;   /* Hover backgrounds, active states */

  /* Brand — Gold (use sparingly — max 2–3 uses per page) */
  --gold:          #C9A84C;   /* Champagne gold accent */
  --gold-light:    #DEC06A;   /* Hover state for gold */
  --gold-subtle:   #FAF4E4;   /* Gold tinted backgrounds (badges, kicker chips) */
}
```

### Color usage rules

- **Gold is scarce.** Use it for: (1) the logo mark, (2) the primary Download/Print CTA button, (3) one editorial flourish per page (e.g. a kicker line or ornament). Never use gold for body text, borders on every card, or more than 3 elements per screen.
- **Emerald is the workhorse.** Nav active state, primary button, section headers, filter chips, card tags.
- **Cream, not white.** The page background is `#FAF7F2` not pure white. Cards sit at `#FFFFFF` to create gentle separation. Section alternates use `#F2ECE2`.
- **Dark sections** (`#162720`) appear for high-contrast moments: "How It Works" and the footer. Never use a dark background for content-heavy sections.
- **No purple, pink, orange-brown, or warm beige gradients.** The palette is explicitly emerald → cream → gold.

---

## Typography

```css
--font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-arabic:  'Amiri', 'Traditional Arabic', 'Arabic Typesetting', serif;
```

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### Type scale

| Role | Family | Size | Weight | Notes |
|---|---|---|---|---|
| Page headline | Playfair Display | `clamp(38px, 3.8vw, 56px)` | 600 | `letter-spacing: -0.022em` |
| Section title | Playfair Display | `clamp(26px, 2.4vw, 36px)` | 600 | `letter-spacing: -0.015em` |
| Card title | Playfair Display | 20px | 600 | — |
| Subheading | Inter | 17–18px | 500 | `color: var(--fg-light)` |
| Body | Inter | 16px | 400 | `line-height: 1.6` |
| Small body | Inter | 14–15px | 400 | `color: var(--muted)` |
| Metadata / source | Inter | 11–12px | 400–500 | `color: var(--muted-light)`, uppercase + `letter-spacing: 0.08em` |
| Kicker / eyebrow | Inter | 11px | 600 | Uppercase, `letter-spacing: 0.14em`, `color: var(--gold)` |
| Nav links | Inter | 14px | 500 | — |
| Arabic (hero) | Amiri | 72–90px | 400 | `direction: rtl`, `line-height: 1.65` |
| Arabic (card detail) | Amiri | 38px | 400 | `direction: rtl` |
| Arabic (inline) | Amiri | 22–28px | 400 | `direction: rtl` |

### Type rules

- Playfair Display is display only — headings, card titles, kicker labels in rare italic use. Never use it for body text or nav.
- Amiri is Arabic only. Never use it for Latin text.
- Inter handles all body, nav, buttons, metadata, and UI chrome.
- Italic Playfair Display (`font-style: italic`) is reserved for emphasis in headlines or hero subtext — not general copy.

---

## Spacing & Layout

```css
--container: 1320px;   /* Max content width */
--r-sm:      3px;      /* Small radius — buttons, nav links, tags */
--r-md:      6px;      /* Medium radius — cards, inputs */
--r-lg:      10px;     /* Large radius — hero card, modal */
```

### Section padding
- Section vertical padding: `80px 0`
- Section inner horizontal padding: `48px` (desktop)
- Hero top padding: `96px`

### Grid systems
- Hero: `grid-template-columns: 1fr 460px`, gap `80px`
- Product card grid: `repeat(auto-fill, minmax(320px, 1fr))`, gap `28px`
- Rooms/collections grid: typically 4–5 columns
- Browse layout: `280px sidebar` + main content with `padding-left: 44px`

### Elevation — Shadow tokens
```css
--shadow-sm:   0 1px 4px rgba(26,46,37,.06);
--shadow-md:   0 4px 20px rgba(26,46,37,.09), 0 1px 4px rgba(26,46,37,.05);
--shadow-lg:   0 16px 48px rgba(26,46,37,.13), 0 4px 12px rgba(26,46,37,.07);
--shadow-card: 0 2px 12px rgba(26,46,37,.08);
```

Shadows use the foreground color tint (emerald-black), never grey or black. `shadow-lg` is reserved for the hero dua card and modals only.

---

## Components

### Nav
- Sticky, `height: 66px`, frosted glass: `background: rgba(250,247,242,0.92)` + `backdrop-filter: blur(14px)`
- Border bottom: `1px solid var(--border)`
- Logo: `masnoon.svg` loaded as `<img class="nav-logo-img">`, `height: 50px`, `width: auto`
- Links: Inter 14px 500, hover state: emerald text + `var(--emerald-subtle)` background pill
- Active page link: `class="active"` on the `<a>` — same emerald text + `var(--emerald-subtle)` background as hover, persistent
- Container max-width: `var(--container)`, `padding: 0 48px`

### Buttons

```css
/* Primary */
.btn-primary: background: var(--emerald); color: #fff;
  hover: background: var(--emerald-deep)

/* Outline */
.btn-outline: background: transparent; color: var(--emerald);
  border: 1.5px solid var(--emerald);
  hover: background: var(--emerald-subtle)

/* Gold (primary download CTA) */
.btn-gold: background: var(--gold); color: var(--fg);
  hover: background: var(--gold-light)

/* Ghost — tertiary, light backgrounds only */
.btn-ghost: background: transparent; color: var(--fg-light);
  border: 1.5px solid var(--border);
  hover: border-color: var(--emerald); color: var(--emerald)

/* On dark backgrounds */
.btn-white: background: rgba(255,255,255,0.12); color: #fff;
  border: 1.5px solid rgba(255,255,255,0.2)
  hover: background: rgba(255,255,255,0.2)
```

Base button: `padding: 9px 20px`, `border-radius: var(--r-sm)`, `font-size: 14px`, `font-weight: 500`
Large: `padding: 13px 28px`, `font-size: 15px`

### Product Cards (Browse page)
- Background: `var(--surface)`, border: `1px solid var(--border)`, radius: `var(--r-md)`, shadow: `var(--shadow-card)`
- Header: emerald band, `padding: 18px 22px`, contains room tag + title
- Room tag: small inline-flex pill, `background: rgba(255,255,255,0.15)`, `color: rgba(255,255,255,0.9)`, `border-radius: 99px`, `font-size: 11px`
- Body: `padding: 22px 22px 0`, contains description (Inter 14px muted) + placement hint (emerald-subtle tinted box, 13px)
- Footer: `padding: 16px 22px`, contains source metadata (11px muted-light) + download button
- Hover: `transform: translateY(-2px)`, `shadow-md`, border-color shifts to `rgba(45,90,71,0.2)`

### Kicker / Eyebrow
Pattern used before every major section title:
```html
<div class="section-kicker">Section Label</div>
```
Style: Inter 11px, weight 600, uppercase, `letter-spacing: 0.14em`, `color: var(--gold)`, `margin-bottom: 12px`

### Section Header Row
```html
<div class="section-header-row">
  <div>
    <div class="section-kicker">...</div>
    <h2 class="section-title">...</h2>
    <p class="section-sub">...</p>
  </div>
  <a class="btn btn-outline">View all →</a>
</div>
```

### Coming Soon Cards
- Dashed border: `border: 2px dashed var(--border)`, `background: var(--cream-card)`
- Opacity: `0.85` on the card, normal on badge
- Badge: `background: var(--emerald-subtle)`, `color: var(--emerald)`, pill shape, "Coming Soon" label
- CTA: ghost `mailto:` link styled as `.btn-outline`

---

## Iconography

- No emoji icons. No generic icon libraries.
- SVG only, inline or as `<svg>` blocks.
- Room icons: small (16–18px) SVG paths for entryway door, fork/knife, moon, water drop, car.
- Decorative: one Islamic geometric ornament SVG per page maximum (used as section divider or card corner detail). Corner ornaments on the hero dua card only.
- The logo is `masnoon.svg` — a badge-style SVG with a tight viewBox crop (`viewBox="50 145 294 85"`). Loaded as `<img>` in nav (`height: 50px`) and footer (`height: 40px`). No width set — scales from height.

---

## Page Structure Conventions

### Home page sections (in order)
1. **Nav** — sticky frosted
2. **Hero** — 2-col: editorial headline + floating dua card
3. **Rooms / Locations** — cream-section background, 5-col grid
4. **Featured Collections** — white background, alternating card layout
5. **How It Works** — dark surface (`#162720`), 3-step horizontal layout
6. **Gallery** — cream-section, user photos + submit CTA
7. **Footer** — dark surface, 2-col: brand + tagline left, Browse links right

### Browse page sections (in order)
1. **Nav** — same as home (Collections link active)
2. **Page header** — dark surface band, title + subtitle
3. **Browse layout** — `220px` fixed sidebar + `1fr` content
   - Sidebar: search row (top), location filters, format filters, availability filters
   - Main: collection banner (emerald full-width) → product card grid (3 cols)

### About page sections (in order)
1. **Nav** — same as home (About link active)
2. **About hero** — dark surface, centered, gold-flanked kicker, italic gold headline
3. **Origin** — white, 2-col: story text left + 3 commitment cards right (sticky)
4. **Philosophy** — cream section, 2-col: text left + emerald hadith quote card right
5. **Standards** — white, 4-item 2×2 numbered grid
6. **Closing** — emerald background, centered sadaqah jariyah message + 2 CTAs

### Distribution page sections (in order)
1. **Nav** — same as home (Distribution link active)
2. **Dist hero** — dark surface, centered, Sadaqah Jariyah kicker
3. **Steps** — cream section, 3-col: Print / Laminate / Distribute blocks (third card emerald accent)
4. **Content** — white, 2-col: explanation text left + coming soon card right (sticky)

### Section rhythm
- Alternate between: `var(--bg)` / `var(--cream-section)` / `var(--surface)` / `var(--dark-surface)`
- Never two dark sections in a row
- Footer is always dark (`#162720`)

---

## Copy & Content Rules

- **No filler.** Every dua card must have: real dua title, real description of what it's for, real placement recommendation, real hadith source.
- Arabic text is reserved for: hero dua card (large, 72–90px), dua detail pages. Product cards on browse show title + English description only.
- Source format: `Author/Collection Reference · Grade` — e.g. `Abu Dawud 5096 · Hasan`
- Placement hint format: a short sentence starting with "Place near…" or "Keep in…"
- Coming Soon products: include a brief 2-sentence description of the planned product and a Notify link.

---

## What to Avoid

- Warm beige / peach / pink / orange-brown backgrounds — not our palette
- Gradient backgrounds on sections or cards
- Emoji as icons (✨ 🚀 🎯)
- Rounded cards with a left coloured border accent
- Inter or Roboto as a display / heading face
- Invented metrics without a real source
- Arabic text on every surface — it is a premium flourish, used selectively
- Gold on more than 3 elements per page
- Multiple competing decorative flourishes per screen
- Designer controls, platform selectors, or mockup metadata exposed as product UI

---

## File Conventions

### HTML pages
| File | Purpose |
|---|---|
| `index.html` | Home page |
| `browse.html` | Browse / search / download page |
| `about.html` | About — origin story, Masnoon definition, standards |
| `distribute.html` | Distribution — free sadaqah distribution programme |
| `design.md` | This file — design system reference |

### CSS structure
Each page loads two stylesheets: shared base, then page-specific.
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/home.css">   <!-- or browse/about/distribute -->
```

| File | Contents |
|---|---|
| `css/base.css` | Variables, reset, body, nav, buttons, section base, footer, base responsive |
| `css/home.css` | Hero, CTA banner, rooms grid, collections, how-it-works, gallery |
| `css/browse.css` | Page header, search, sidebar, browse layout, dua cards, toast |
| `css/about.css` | About hero, origin, philosophy, standards, closing |
| `css/distribute.css` | Dist hero, print/laminate/distribute steps, coming soon card |

### PDFs — all in `pdfs/` subfolder
| File | Purpose |
|---|---|
| `pdfs/mq2ewup0-all-home-dua.pdf` | All Home Duas collection PDF |
| `pdfs/mq2exy8s-umrah.pdf` | Umrah Step-by-Step Guide PDF |
| `pdfs/mq2ew86n-wake-up.pdf` | Dua for Waking Up |
| `pdfs/mq2ew862-toilet.pdf` | Dua for Entering/Exiting Bathroom |
| `pdfs/mq2ew85q-meals.pdf` | Dua for Meals (start + end) |
| `pdfs/mq2ew857-leaving-home.pdf` | Dua for Leaving the Home |
| `pdfs/mq2ew84e-evil-eyes.pdf` | Dua for Protection from Evil Eye |
| `pdfs/mq2ew83u-entering-home.pdf` | Dua for Entering the Home |

### PDF structure (each individual dua)
- Page 1: Dua text — Arabic (Uthmani script), Transliteration, English Translation
- Page 2: Placement recommendation — where and how to display it

### Planned products (not yet live)
- **Dua on the Go** — A4 printable set for car/travel (journey start, marketplace, mosque, eating at others' homes, key Dhikr strips). Post-print: laminate and cut into strips, front = dua, back = hadith.
- **Allah's 99 Names booklet** — Very small booklet format (~18 pages per A4). Each page: one Name of Allah in Arabic, transliteration, meaning, Quranic occurrence count. Color-coded by category (mercy, might, punishment etc).
