# MasnoonDuas

A free library of print-ready Islamic dua cards for the Muslim home. Download, print, laminate, and place where the reminder matters most.

## Pages

| File | URL |
|---|---|
| `index.html` | Home |
| `browse.html` | Browse & download all duas |
| `about.html` | About the project |
| `distribute.html` | Free distribution to mosques |

## Stack

Static HTML/CSS/JS — no build step, no dependencies, no framework.

- **Fonts** — Google Fonts: Playfair Display, Inter, Amiri
- **Data** — `data/duas.json` drives the browse page card rendering
- **PDFs** — all in `pdfs/`

## Structure

```
masnoon/
├── index.html
├── browse.html
├── about.html
├── distribute.html
├── masnoon.svg          # Logo
├── css/
│   ├── base.css         # Shared: variables, reset, nav, buttons, footer
│   ├── home.css
│   ├── browse.css
│   ├── about.css
│   └── distribute.css
├── js/
│   └── browse.js        # Fetches duas.json, renders cards, handles filtering
├── data/
│   └── duas.json        # All dua content + PDF references
└── pdfs/                # Print-ready PDFs
```

## Adding a new dua

1. Add an entry to `data/duas.json` following the existing schema (see any current entry for the shape)
2. Put the PDF in `pdfs/`
3. The browse page picks it up automatically — no HTML changes needed

## Design reference

See `design.md` for the full design system: color tokens, typography scale, component patterns, and page structure conventions.
