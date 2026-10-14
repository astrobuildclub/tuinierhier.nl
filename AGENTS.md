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
- Nieuwsberichten staan als Markdown in `src/content/nieuws/`; de bestandsnaam is de slug (`/nieuws/<slug>`, gelijk aan de oude Webflow-URL's, niet wijzigen in verband met SEO). Afbeeldingen in `src/assets/blog/`, relatief verwijzen (`../../assets/blog/…`) zodat Astro ze optimaliseert. Een wijziging daar start wel een Netlify-build (zie `ignore` in `netlify.toml`).
- Markdown-tekst in een component: zet typografie op de wrapper en geef `[&_p]:m-0 [&_p]:leading-[inherit]` mee. `_reset.scss` zet `line-height: 1` op `p`, dus anders erft de alinea de regelafstand niet.
- Vaste teksten staan in `src/content/teksten/*.md` en links in `src/content/links.json` (zie README → "Teksten bewerken"). Geen tekst hardcoded in componenten zetten.
- Lenis meet de paginahoogte via een ResizeObserver op `body` (`smoothScroll.ts`); voeg je dynamisch content toe, roep dan `refreshScrollLength()` aan.
- Hero-video: specs en Handbrake-instellingen in de README; bronnen in `Hero.astro` (`video.sources`).
- Nieuw of gewijzigd bericht: werk ook `public/llms.txt` bij (met de hand, er is geen CMS).
- Tailwind 4 staat in `src/styles/tailwind.css` (`@theme`, geen `tailwind.config`). De SCSS-basis staat in `@layer base` (`global.scss`): CSS buiten een layer wint in v4 altijd van utilities. Positie via `translate-*`-klassen niet combineren met `style.transform` in JS; gebruik `style.rotate`/`scale` (zie `FooterAnimation.astro`).
- Gestapelde sticky secties: gebruik `data-sticky-fit` + `lg:sticky lg:top-[var(--sticky-top,0px)]` (zie `src/utils/stickyFit.ts`), niet `top-0`, zodat hoge secties eerst helemaal in beeld komen.
- `compressHTML: true` in `astro.config.mjs` laten staan: de Astro 7-default `'jsx'` plakt woorden tussen elementen aan elkaar.
- Domein altijd **zonder `www`**: `site` in `astro.config.mjs` is `https://tuinierhier.nl`. In Netlify is `tuinierhier.nl` het primaire domein en stuurt `www` door. (Webflow doet nu nog andersom, tot de overstap.)
