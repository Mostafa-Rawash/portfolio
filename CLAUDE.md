# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # Production build → outputs to ../production (sibling dir)
npm run preview   # Preview the production build locally
npm run lint      # ESLint — strict, max-warnings 0 (zero tolerance)
```

There is no test suite. Lint is the only automated quality gate.

## Architecture

Single-page React 18 app built with Vite 5. No backend — all data is static JSON.

**Data flow**: `src/data/*.json` → `src/services/api.js` (thin fetch wrappers) → page/component props. All content lives in three files:
- `src/data/profile.json` — personal info, skills, education, volunteering, awards
- `src/data/experience.json` — 8 work history entries
- `src/data/data.json` — 7 project entries

**Routing**: React Router 6 with a single active route `/` → `Pages/Home.jsx`. Other pages (`Skills`, `Experiences`, `Resume`) exist but are not wired into the router yet.

**Component layout**: `App.jsx` wraps a DaisyUI drawer. The drawer `side` slot holds `Sidebar.jsx`; the main content is `Pages/Home.jsx` which sequences all sections vertically.

## Styling

- **Tailwind CSS 3 + DaisyUI 4** (dark theme) + custom CSS variables in `App.css`
- Color palette via CSS vars: `--color-primary` (#8b5cf6 purple), `--color-accent` (#22d3ee cyan), `--color-background` (#0a0a14)
- Tailwind theme aliases: `theme.p` (primary), `theme.a` (accent), `theme.b` (background), `theme.tc` (text), `theme.cc` (card), `theme.sc` (secondary)
- Light/dark handled via `prefers-color-scheme` media query in `App.css` — not via a toggle
- Section entrance animations use CSS `fade-up` keyframes with staggered `animation-delay` classes defined in `App.css`
- Font: Manrope (loaded via `index.html`)

## Key conventions

- Components are in `src/Components/`, pages in `src/Pages/` — keep this split
- Static images and docs are split between `src/assets/` (bundled by Vite) and `public/` (served as-is); project screenshots and skill icons go in `public/`
- Production build outputs to `../production` — do not commit that directory
- Hotjar analytics (ID 6607809) is embedded directly in `index.html`
