# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site is

Static study-guide site for the discipline *Gestão de Custos e Projetos Agropecuários* (Colégio Politécnico UFSM). Pure HTML/CSS/JS — no framework, no bundler, no package.json. Every page is a self-contained file.

## Deploying

```
git add <file> && git commit -m "..." && git push
```

GitHub Pages rebuilds automatically in ~1 minute. There is no build step, no lint command, no test suite.

## Design system (shared across all pages)

All pages use the same CSS custom properties and Google Fonts stack:

| Token | Value | Role |
|---|---|---|
| `--paper` / `--paper-warm` | `#FAF7F0` / `#F4EFE2` | page background |
| `--ink` / `--ink-soft` | `#1A1A17` / `#3A3833` | body text |
| `--olive` / `--olive-deep` | `#3D4A2A` / `#2A331C` | Movement 1 — *Entender* (Parts 1–2) |
| `--mustard` / `--mustard-ink` | `#B89233` / `#3A2F08` | Movement 2 — *Medir* (Parts 3–4) |
| `--terra` | `#A8552E` | Movement 3 — *Decidir* (Parts 5–6, quiz) |
| `--rule` / `--rule-soft` | `#D9D3C2` / `#E8E3D3` | borders and dividers |

Fonts: **Fraunces** (serif display headings), **IBM Plex Sans** (body), **IBM Plex Mono** (labels, numbers, code). All loaded from Google Fonts — no local copies.

The three pedagogical movements (Entender / Medir / Decidir) control accent color everywhere: nav tab underlines, masthead top-bar, part numerals, `.current` active state.

## Content pages (`parte-1.html` … `parte-6.html`)

Each page follows the same structure:
1. Sticky `nav.toptabs` — scrollable tab bar linking all parts + home
2. `header.masthead` — part number + movement label + title + TOC toggle
3. Collapsible TOC (`.toc` / `.toc.open`)
4. Accordion content blocks (`.block` / `.block.open`) — toggled by clicking `.block-header`

When adding a new content block, copy an existing `.block` and its inline `<script>` toggle pattern. The accordion JS is inline at the bottom of each parte file.

## `projeto.html` — multi-step wizard (most complex file)

Documented in the HTML comment at the top of the file. Key concepts:

- **ESTADO** — single JS object holding all user input. Auto-saved to `localStorage` on every change.
- **TEMPLATES** — keyed by activity type (soja, gado, fruta, ervamate, madeira, etc.); each entry sets labels, units, family, mode, and whether it is perennial (`perene: true`).
- **`derivar(ESTADO)`** — pure function, single source of truth. Calculates RB → RL → COE → COT → CT and the perennial cash-flow table. Always call this to recompute; never compute partial values inline.
- **`estadoCanonico()`** — adapts ESTADO to the schema consumed by step 7 (dossiê / report).
- **Steps 0–7** — each is a `<section data-step="N">`. Navigation shows/hides via `.on` class. Step 5 (implantação) only appears when `TEMPLATES[template].perene === true`.
- **Print** — CSS `@media print` hides everything except `section[data-step="7"]` (the dossiê).

When editing financial formulas, change only inside `derivar()`. When adding a new activity template, add an entry to `TEMPLATES` with all required keys (nome, unidade, rótulos, família, modo, giro, perene).

## `credito.html` — rural credit data panel

Uses **Leaflet.js 1.9.4** and **Chart.js 4.4.1** loaded from Cloudflare CDN (no local copies). Data is embedded inline in the HTML as JS arrays. The map and charts are re-rendered whenever the filter controls change.

## `quiz-geral.html` — self-assessment

Questions are in the `QUIZ_G` array. Each question has alternatives tagged with a profile code: `op` (Operador), `tr` (Em transição), `ge` (Gestor), `es` (Estratégico). The quiz tallies profile hits and returns the dominant profile.

## Canonical URLs

All pages declare `<link rel="canonical" href="https://robersonoliveira-afk.github.io/Site/...">`. Update this when adding a new page.
