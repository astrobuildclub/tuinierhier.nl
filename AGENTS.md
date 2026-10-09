# AGENTS.md: tuinierhier.nl

Instructies voor AI-agents (Claude Code, Cursor, Codex) en ontwikkelaars die aan dit project werken.
Lees eerst `README.md` voor context en `CHANGELOG.md` voor recente wijzigingen.

## Project
- Klant: Tuinier Hier · Bedrijf: All This · SLA: TODO
- Stack: Astro 7, SCSS (Utopia) en Tailwind 4, GSAP en Lenis, Node 22 (zie `.nvmrc`, gelijk aan `NODE_VERSION` in `netlify.toml`)
- Statische site (`output: 'static'`), **geen CMS**: Sanity is bewust niet nodig. `~/Code/_standards/SANITY.md` geldt hier niet.

## Werkwijze
- Werk nooit direct op `main`. Branch vanaf `staging` → PR naar `staging` → deploy preview → merge. Naar `main` alleen gebundelde releases en hotfixes, volgens `~/Code/_standards/DEPLOY.md` (elke productiedeploy kost Netlify-credits).
- Branchnamen: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Commit nooit `.env`-bestanden of tokens. Nieuwe variabelen: naam toevoegen aan `.env.example` en de README.
- Variabelen met `PUBLIC_` komen in de browser terecht: nooit voor tokens.

## Documentatie bijhouden (verplicht)
- Elke wijziging die je commit: voeg een regel toe onder `## [Unreleased]` in `CHANGELOG.md`.
- Bij een release (`staging → main`): zet `[Unreleased]` om naar een datumkop.
- Verandert setup, env, stack of deploy? Werk `README.md` bij.

## Conventies
- Moderne CSS: custom properties, OKLCH-kleuren, logical properties, container queries waar zinvol.
- Toegankelijkheid: WCAG 2.2 AA. Semantische HTML, focus-states, `prefers-reduced-motion` respecteren.
- AVG: geen tracking of third-party embeds zonder consent.
- SEO en AI readiness (meta, JSON-LD, sitemap, robots, `llms.txt`) volgens `~/Code/_standards/SEO.md`.

## Projectspecifiek
- Blogposts staan als Markdown in `src/content/blog/`. Een wijziging daar start wel een Netlify-build (zie `ignore` in `netlify.toml`).
- Nieuwe of gewijzigde blogpost: werk ook `public/llms.txt` bij (met de hand, er is geen CMS).
- Tailwind 4 staat in `src/styles/tailwind.css` (`@theme`, geen `tailwind.config`). De SCSS-basis staat in `@layer base` (`global.scss`): CSS buiten een layer wint in v4 altijd van utilities. Positie via `translate-*`-klassen niet combineren met `style.transform` in JS; gebruik `style.rotate`/`scale` (zie `FooterAnimation.astro`).
- `compressHTML: true` in `astro.config.mjs` laten staan: de Astro 7-default `'jsx'` plakt woorden tussen elementen aan elkaar.
- Domein altijd **zonder `www`**: `site` in `astro.config.mjs` is `https://tuinierhier.nl`. In Netlify is `tuinierhier.nl` het primaire domein en stuurt `www` door. (Webflow doet nu nog andersom, tot de overstap.)
