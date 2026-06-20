# Font &amp; Color Pairing Tool

A single-page React app for discovering font pairings with **expert-backed explanations**, matched color palettes, and cross-platform availability. The core bet: the *explanation* — teaching **why** a pairing works — is the product, not just the pairing itself.

Every font previews live and legally via the Google Fonts API. No specimen images, no backend, no accounts.

## Features

- **Live preview** — real headline + paragraph rendered in the actual fonts (loaded via Google Fonts `display=swap`), never specimen images.
- **Honest explanations** — each pairing's rationale is labelled `expert` (with a real, linked citation) or `rule-based` (derived reasoning, *never* a fabricated attribution).
- **Filters** — by use case, mood, strategy (contrast / superfamily / harmony / mono-accent), and platform.
- **Generated color palettes** — a perceptual color engine (OKLCH via culori, ramps via chroma-js) derives a coherent palette from each pairing; toggle to apply it to the live preview.
- **Near-match substitution** — every font carries a web-safe CSS fallback stack plus named alternatives for platforms lacking the exact face.
- **Export &amp; share** — copy ready-to-paste CSS (`@import` + `font-family` + palette custom properties), save favorites (localStorage), and deep-link any pairing via the URL hash.
- **Algorithmic pairing engine** — classifies fonts and scores combinations against typographic rules to generate novel, honestly-derived pairings on demand. Generation samples the **entire Google Fonts serif/sans library** (~1,300 families, auto-classified in `src/data/fontCatalog.js`), so it stays instant regardless of catalog size.
- **Per-font platform availability** — badges computed per font and AND-ed across the pairing, distinguishing **verified** (Google, Figma) from **estimated** (Adobe, Canva).

## Tech stack

- React 18 + Vite
- Plain `useState` / `useMemo` — no state library; all state owned by `App`
- [chroma-js](https://github.com/gka/chroma.js) + [culori](https://culorijs.org/) for color
- Google Fonts loaded via stylesheet injection

## Getting started

```bash
npm install
npm run dev            # start the dev server
npm run build          # production build
npm run preview        # preview the production build
npm run build:catalog  # regenerate src/data/fontCatalog.js from Google Fonts
```

## Project structure

```
src/
  App.jsx                 # owns all state; filters -> matches -> active pairing
  data/
    pairings.js           # curated pairing dataset (ships in the bundle)
    fontCatalog.js        # auto-generated full Google Fonts catalog (engine pool)
    fontAvailability.js   # per-font Adobe/Canva estimates
  lib/
    fonts.js              # Google Fonts URL + font-family stack builder
    filters.js            # filtering + option derivation
    colors.js             # palette generation engine
    substitutes.js        # font classification + near-match fallbacks
    export.js             # CSS export + share-link helpers
    engine.js             # algorithmic pairing engine
    availability.js       # per-font -> per-pairing availability resolver
  components/
    Controls.jsx          # filter UI
    PreviewPanel.jsx      # live font render
    PalettePanel.jsx      # generated palette swatches
    ExplanationPanel.jsx  # rationale + source + near-matches + availability
    ExportPanel.jsx       # CSS / share-link drawer
    SourceBadges.jsx      # platform availability badges
  hooks/
    useGoogleFont.js      # injects Google Fonts <link> for the active pairing
```
