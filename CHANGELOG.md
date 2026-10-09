# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

Eerdere wijzigingen (vóór oktober 2026) staan alleen in de git-geschiedenis.

## [Unreleased]

### Toegevoegd
- `public/llms.txt` (met de hand, geen CMS) en een `<link rel="alternate">` ernaar in de head.
- `apple-touch-icon` (`/assets/webclip.png`).

### Gewijzigd
- Tailwind 4 via `@tailwindcss/vite`; config als `@theme` in `src/styles/tailwind.css`; klassen gemigreerd met `@tailwindcss/upgrade`. SCSS-basis in `@layer base` zodat de cascade gelijk blijft. Verwijderd: `@astrojs/tailwind`, `@tailwindcss/typography` (ongebruikt), autoprefixer, `postcss.config.mjs`.
- Astro 6: content collection naar de Content Layer API (`src/content.config.ts`, glob-loader), `post.id` en `render(post)`. URL's ongewijzigd.
- Astro 7 (Rust-compiler, Vite 8, Sätteri), `@astrojs/mdx` 8. `compressHTML: true` behouden.
- `README.md` volgens `_standards/README.template.md`: statische site, geen CMS.
- `AGENTS.md`: Node 22 via `.nvmrc`, statisch zonder CMS, `llms.txt` bijhouden bij nieuwe posts.
- Deploy-workflow volgens `_standards/DEPLOY.md`: features via PR naar `staging` (branch deploy op `staging--tuinierhier.netlify.app`), gebundelde releases naar `main`. Branch protection op `staging`.
- `netlify.toml` (nieuw, alleen de `ignore`-regel; buildinstellingen staan in de Netlify-UI): geen build bij commits met alleen documentatie (`*.md` in de root, `.github/`). Markdown-content in `src/content/` start wel een build.

### Opgelost
- Bloem in de footer zat niet meer midden op de rand (Tailwind 4 `translate` + transform uit het scrollscript). Script zet nu alleen `rotate` en respecteert `prefers-reduced-motion`.
- `src/data/siteData.json` bevatte nog starterdata ("My Astro Blog"): naam, beschrijving en OG-alt nu Tuinierhier.

### Beveiliging
- Astro 5 → 7 en Tailwind 3 → 4: `npm audit` van 13 naar **0** meldingen.
- `npm audit fix` en patch-/minor-updates: van 39 naar 13 meldingen (critical 2 → 1, high 28 → 6). Astro 5.15 → 5.18, GSAP 3.15, Lenis 1.3.26, Sass, PostCSS en overige integraties.
- Overgebleven meldingen raken bezoekers niet: ze zitten in build-tooling (Tailwind 3-keten, `sharp`, esbuild-devserver) of in Astro-features die we niet gebruiken (`define:vars`, server islands). Ze zijn pas op te lossen met majors (Astro 7, Tailwind 4): aparte PR's.

### Onderhoud
- `.github/dependabot.yml`: wekelijkse updates naar `staging`, gegroepeerd (Astro, minor/patch).
- `AGENTS.md`, `CLAUDE.md` en `CHANGELOG.md` toegevoegd; deploy-sectie in `README.md`.
