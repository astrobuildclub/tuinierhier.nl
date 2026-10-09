# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

Eerdere wijzigingen (vóór oktober 2026) staan alleen in de git-geschiedenis.

## [Unreleased]

### Toegevoegd
- Alle vaste teksten als Markdown in `src/content/teksten/` (zijbalk, intro, diensten, contact); contactlinks in `src/content/links.json` voor zijbalk én contact.
- Hero-video: pauzeknop (WCAG 2.2.2); start niet bij `prefers-reduced-motion`; pauzeert uit beeld. Specs en Handbrake-instellingen in de README.
- Skip-link "Naar de inhoud"; bloem linkt naar home met een elastische bounce; "← Home" op `/nieuws`.
- Nieuws: "Laad meer" met "Bekijk archief" eronder, gecentreerd.
- Nieuws: de 9 echte berichten van de Webflow-site (teksten, datums, links), met URL's, titels en meta-descriptions 1-op-1 gelijk aan Webflow (`/nieuws/<slug>`, zonder slash aan het eind). Vier ontbraken nog: ambassadeur Onderhoudsarmoe, GrijsGroen, museumstuk, Rotterdams WeerWoord.
- Home toont de nieuwste 3 berichten met een knop "Meer nieuws" (per 3, focus naar het eerste nieuwe bericht); zonder JS staan ze er allemaal.
- `/nieuws`: overzichtspagina op `MainLayout` (vervangt de Astro-starterpagina `/blog/`). Redirect `/blog/*` → `/nieuws/*`.
- Alt-teksten die beschrijven wat er op de foto's staat; intro en externe links onder elk bericht.
- `public/llms.txt` (met de hand, geen CMS) en een `<link rel="alternate">` ernaar in de head.
- `apple-touch-icon` (`/assets/webclip.png`).

### Gewijzigd
- `README.md`: notitie "webshop later als maatwerk" weg; is geen afspraak met de klant.
- Beelden krijgen een `srcset` (`image.layout: 'constrained'`), ook in Markdown. Tailwind-tokens verwijzen naar de SCSS-variabelen (`@theme inline`).
- Tailwind 4 via `@tailwindcss/vite`; config als `@theme` in `src/styles/tailwind.css`; klassen gemigreerd met `@tailwindcss/upgrade`. SCSS-basis in `@layer base` zodat de cascade gelijk blijft. Verwijderd: `@astrojs/tailwind`, `@tailwindcss/typography` (ongebruikt), autoprefixer, `postcss.config.mjs`.
- Astro 6: content collection naar de Content Layer API (`src/content.config.ts`, glob-loader), `post.id` en `render(post)`. URL's ongewijzigd.
- Astro 7 (Rust-compiler, Vite 8, Sätteri), `@astrojs/mdx` 8. `compressHTML: true` behouden.
- `README.md` volgens `_standards/README.template.md`: statische site, geen CMS.
- `AGENTS.md`: Node 22 via `.nvmrc`, statisch zonder CMS, `llms.txt` bijhouden bij nieuwe posts.
- Deploy-workflow volgens `_standards/DEPLOY.md`: features via PR naar `staging` (branch deploy op `staging--tuinierhier.netlify.app`), gebundelde releases naar `main`. Branch protection op `staging`.
- `netlify.toml` (nieuw, alleen de `ignore`-regel; buildinstellingen staan in de Netlify-UI): geen build bij commits met alleen documentatie (`*.md` in de root, `.github/`). Markdown-content in `src/content/` start wel een build.

### Opgelost
- Linkkleur in berichten: `--clr-brand` (8,9:1) in plaats van `--clr-green` (3,5:1), WCAG AA.
- Na "Laad meer" kon je niet verder scrollen: Lenis mat de pagina via `<html>` (`height: 100%`); nu ResizeObserver op `body`.
- E-mail overal eefje@tuinierhier.nl; LinkedIn naar het echte profiel.
- Titel-animatie in de hero: schermlezers lezen het woord, niet losse letters. Klikdoelen ≥ 24px.
- Berichten bevatten gekopieerde alinea's uit andere berichten en kapotte links (`https:/…`); opnieuw opgebouwd vanuit de live site. Tracking-parameters (`igshid`) uit Instagram-links.
- Afbeeldingen in berichten via `src/assets` (WebP, lazy) in plaats van `public/` (Balkonton 2 MB → 0,9 MB).
- Datums in het Nederlands (`7 okt 2023`).
- Sticky secties (Over, Diensten) die hoger zijn dan het scherm scrollen eerst door tot de onderkant zichtbaar is en zetten zich dan pas vast (`src/utils/stickyFit.ts`, `data-sticky-fit`). Voorheen viel de onderkant van Diensten weg achter de volgende sectie.
- Bloem in de footer zat niet meer midden op de rand (Tailwind 4 `translate` + transform uit het scrollscript). Script zet nu alleen `rotate` en respecteert `prefers-reduced-motion`.
- `src/data/siteData.json` bevatte nog starterdata ("My Astro Blog"): naam, beschrijving en OG-alt nu Tuinierhier.

### Verwijderd
- Google Fonts (Manrope nu zelf gehost via `@fontsource/manrope`), Atkinson-fonts en ongebruikte beelden in `public/` (~1,35 MB).
- Starter-inhoud: voorbeeldposts (Markdown Style Guide, Sample Blog Post, Using MDX, …), `/blog/`-pagina met Astro-header, placeholderbeelden, `navData.js`.

### Beveiliging
- Astro 5 → 7 en Tailwind 3 → 4: `npm audit` van 13 naar **0** meldingen.
- `npm audit fix` en patch-/minor-updates: van 39 naar 13 meldingen (critical 2 → 1, high 28 → 6). Astro 5.15 → 5.18, GSAP 3.15, Lenis 1.3.26, Sass, PostCSS en overige integraties.
- Overgebleven meldingen raken bezoekers niet: ze zitten in build-tooling (Tailwind 3-keten, `sharp`, esbuild-devserver) of in Astro-features die we niet gebruiken (`define:vars`, server islands). Ze zijn pas op te lossen met majors (Astro 7, Tailwind 4): aparte PR's.

### Onderhoud
- `.github/dependabot.yml`: wekelijkse updates naar `staging`, gegroepeerd (Astro, minor/patch).
- `AGENTS.md`, `CLAUDE.md` en `CHANGELOG.md` toegevoegd; deploy-sectie in `README.md`.
