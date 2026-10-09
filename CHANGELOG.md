# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

Eerdere wijzigingen (vóór oktober 2026) staan alleen in de git-geschiedenis.

## [Unreleased]

### Toegevoegd
- `public/llms.txt` (met de hand, geen CMS) en een `<link rel="alternate">` ernaar in de head.
- `apple-touch-icon` (`/assets/webclip.png`).

### Opgelost
- `site` in `astro.config.mjs` en de sitemap-URL in `robots.txt` naar `https://www.tuinierhier.nl` (het live-domein; zonder `www` is een redirect). Canonical, sitemap en JSON-LD kloppen daarmee.
- `src/data/siteData.json` bevatte nog starterdata ("My Astro Blog"): naam, beschrijving en OG-alt nu Tuinierhier.

### Gewijzigd
- `README.md` volgens `_standards/README.template.md`: statische site, geen CMS.
- `AGENTS.md`: Node 22 via `.nvmrc`, statisch zonder CMS, `llms.txt` bijhouden bij nieuwe posts.
- Deploy-workflow volgens `_standards/DEPLOY.md`: features via PR naar `staging` (branch deploy op `staging--tuinierhier.netlify.app`), gebundelde releases naar `main`. Branch protection op `staging`.
- `netlify.toml` (nieuw, alleen de `ignore`-regel; buildinstellingen staan in de Netlify-UI): geen build bij commits met alleen documentatie (`*.md` in de root, `.github/`). Markdown-content in `src/content/` start wel een build.

### Onderhoud
- `.github/dependabot.yml`: wekelijkse updates naar `staging`, gegroepeerd (Astro, minor/patch).
- `AGENTS.md`, `CLAUDE.md` en `CHANGELOG.md` toegevoegd; deploy-sectie in `README.md`.
