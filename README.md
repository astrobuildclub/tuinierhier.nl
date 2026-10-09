# tuinierhier.nl

> Nieuwe website voor Tuinierhier (Eefje Peddemors), tuinfluencer: over Eefje, diensten, nieuws en contact. Vervangt de huidige Webflow-site.

| | |
|---|---|
| **Klant** | Tuinierhier (Eefje Peddemors) |
| **Bedrijf** | All This |
| **Status** | WIP: Astro-versie staat op Netlify, tuinierhier.nl draait nog op Webflow |
| **SLA** | Nee (later: Personal) |
| **Live** | https://tuinierhier.nl (nog Webflow, die stuurt nu door naar `www`) |
| **Netlify** | team All This, site `tuinierhier` |
| **CMS** | geen: statische site, nieuws als Markdown in de repo |
| **Repo** | [github.com/astrobuildclub/tuinierhier.nl](https://github.com/astrobuildclub/tuinierhier.nl) |
| **Notion** | [Repo-inventaris → tuinierhier.nl](https://app.notion.com/p/3f3a14629244814993eae1ce2c957353) |

## Stack

- Astro 7 · Node 22 (`.nvmrc`) · static (`output: 'static'`)
- Styling: SCSS met Utopia (fluid type/space) en Tailwind 4 (`src/styles/tailwind.css`) · Fonts: Manrope (Google Fonts), Typekit, Atkinson (lokaal)
- Animatie: GSAP (ScrollTrigger) en Lenis (smooth scroll), met `prefers-reduced-motion`
- Consent: geen tracking · Hosting: Netlify

## Lokaal starten

```bash
nvm use
npm install
npm run dev            # http://localhost:4321
```

Overige scripts: `npm run build` (draait eerst `astro check`), `npm run preview`.

### Environment-variabelen

Geen.

## Structuur

```
src/
  components/   animations/, common/, features/ (blog, seo), layout/, sections/
  content/      nieuws/: nieuwsberichten in Markdown
  data/         siteData.json (site-naam, OG-beeld), navData.js
  js/           jsonLD.js, nav.js, utils.js
  layouts/      MainLayout, MainHead, NieuwsPost
  pages/        index, nieuws/, rss.xml
  styles/       SCSS: reset, typography, utopia, variables
public/         robots.txt, llms.txt, favicon, fonts, video en beelden
```

## Content en CMS

- Geen CMS. De homepage-teksten staan in de componenten in `src/components/sections/`.
- Nieuws: een Markdown-bestand per bericht in `src/content/nieuws/`. De bestandsnaam is de URL (`/nieuws/<slug>`). Frontmatter:

  ```yaml
  title: "Titel (ook de <title> van de pagina)"
  description: "Intro onder de titel en meta-description"
  pubDate: 2023-10-07T12:00:00Z   # nieuwste eerst; zelfde dag → sorteer met de tijd
  heroImage:
    src: "../../assets/blog/foto.jpg"
    alt: "Beschrijf wat er op de foto te zien is"
  links:                          # optioneel, onder het bericht
    - label: "grijsgroen.org"
      url: "https://grijsgroen.org/aflevering-6/"
  ```

  Afbeeldingen in de tekst: `![alt](../../assets/blog/foto.jpg)`, dan maakt Astro er WebP in de juiste maten van. Een wijziging start een Netlify-build; werk ook `public/llms.txt` bij.
- Home toont de nieuwste 3 berichten met "Meer nieuws" (per 3); `/nieuws` toont alles.
- Sanity is niet nodig (zie Notion). `~/Code/_standards/SANITY.md` geldt hier niet.

## Privacy, toegankelijkheid en SEO

- Consent: geen statistiek of embeds. Let op: Google Fonts en Typekit worden extern geladen (IP-adres naar Google/Adobe). TODO: zelf hosten of bewust accepteren.
- WCAG 2.2 AA: animaties respecteren `prefers-reduced-motion`.
- SEO en AI readiness volgens `~/Code/_standards/SEO.md`: meta en Open Graph (`Seo.astro`), JSON-LD (`src/js/jsonLD.js`), sitemap (`@astrojs/sitemap`), `public/robots.txt`, `public/llms.txt` (met de hand bijhouden).

## Deploy

### Branches

| Branch | Deploy | URL |
|---|---|---|
| `main` | Productie | https://tuinierhier.netlify.app |
| `staging` | Branch deploy (goedgekeurde features, nog niet live) | https://staging--tuinierhier.netlify.app |
| PR's | Deploy preview | link in de PR |

Features gaan via een PR naar `staging`. Naar `main` alleen gebundelde releases (PR `staging → main`) en hotfixes. Commits met alleen documentatie (`*.md` in de root, `.github/`) starten geen build; Markdown-content in `src/content/` wel. Zie `~/Code/_standards/DEPLOY.md`.

Netlify: team All This, site [`tuinierhier`](https://app.netlify.com/projects/tuinierhier).

## Bekende issues en afspraken

- Overstap van Webflow naar Netlify staat nog open. Domein altijd zonder `www`: in Netlify `tuinierhier.nl` als primair domein, `www` stuurt door.
- In `src/content/nieuws/` staan nog voorbeeldposts van de Astro-starter (`markdown-style-guide.md`, `second-post.md`, `using-mdx.mdx`, `_third-post.md`) en meerdere posts met de placeholder-description "Een stadstuin met potentie.".
- Webshop later als maatwerk.

---

Eigenaar: All This · Wat er gedaan is: zie [`CHANGELOG.md`](CHANGELOG.md) · Werkafspraken voor ontwikkelaars en AI-agents: [`AGENTS.md`](AGENTS.md)
