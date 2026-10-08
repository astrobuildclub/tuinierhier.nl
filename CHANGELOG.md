# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

Eerdere wijzigingen (vóór oktober 2026) staan alleen in de git-geschiedenis.

## [Unreleased]

### Gewijzigd
- Deploy-workflow volgens `_standards/DEPLOY.md`: features via PR naar `staging` (branch deploy op `staging--tuinierhier.netlify.app`), gebundelde releases naar `main`. Branch protection op `staging`.
- `netlify.toml` (nieuw, alleen de `ignore`-regel; buildinstellingen staan in de Netlify-UI): geen build bij commits met alleen documentatie (`*.md` in de root, `.github/`). Markdown-content in `src/content/` start wel een build.

### Onderhoud
- `.github/dependabot.yml`: wekelijkse updates naar `staging`, gegroepeerd (Astro, minor/patch).
- `AGENTS.md`, `CLAUDE.md` en `CHANGELOG.md` toegevoegd; deploy-sectie in `README.md`.
