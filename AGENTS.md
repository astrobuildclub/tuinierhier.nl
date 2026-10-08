# AGENTS.md: tuinierhier.nl

Instructies voor AI-agents (Claude Code, Cursor, Codex) en ontwikkelaars die aan dit project werken.
Lees eerst `README.md` voor context en `CHANGELOG.md` voor recente wijzigingen.

## Project
- Klant: Tuinier Hier · Bedrijf: All This · SLA: TODO
- Stack: Astro 5, Tailwind, geen CMS, statisch. Geen `.nvmrc`: de Node-versie staat in de Netlify-UI

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
- `README.md` is grotendeels nog de Astro-starter: bij de volgende wijziging vervangen door `~/Code/_standards/README.template.md`.
