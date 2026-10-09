# tuinierhier.nl

> Nieuwe website voor Tuinierhier (Eefje Peddemors), tuinfluencer: over Eefje, diensten, blog en contact. Vervangt de huidige Webflow-site.

| | |
|---|---|
| **Klant** | Tuinierhier (Eefje Peddemors) |
| **Bedrijf** | All This |
| **Status** | WIP: Astro-versie staat op Netlify, www.tuinierhier.nl draait nog op Webflow |
| **SLA** | Nee (later: Personal) |
| **Live** | https://www.tuinierhier.nl (nog Webflow) |
| **Netlify** | team All This, site `tuinierhier` |
| **CMS** | geen: statische site, blog als Markdown in de repo |
| **Repo** | [github.com/astrobuildclub/tuinierhier.nl](https://github.com/astrobuildclub/tuinierhier.nl) |
| **Notion** | [Repo-inventaris → tuinierhier.nl](https://app.notion.com/p/3f3a14629244814993eae1ce2c957353) |

## Stack

- Astro 5 · Node 22 (`.nvmrc`) · static (`output: 'static'`)
- Styling: SCSS met Utopia (fluid type/space) en Tailwind 3 · Fonts: Manrope (Google Fonts), Typekit, Atkinson (lokaal)
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
  content/      blog/: blogposts in Markdown/MDX
  data/         siteData.json (site-naam, OG-beeld), navData.js
  js/           jsonLD.js, nav.js, utils.js
  layouts/      MainLayout, MainHead, BlogPost
  pages/        index, blog/, rss.xml
  styles/       SCSS: reset, typography, utopia, variables
public/         robots.txt, llms.txt, favicon, fonts, video en beelden
```

## Content en CMS

- Geen CMS. De homepage-teksten staan in de componenten in `src/components/sections/`.
- Blogposts: een Markdown-bestand in `src/content/blog/` (frontmatter: `title`, `description`, `pubDate`, `heroImage`). Een wijziging daar start een Netlify-build.
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

- Overstap van Webflow naar Netlify (domein www.tuinierhier.nl) staat nog open.
- In `src/content/blog/` staan nog voorbeeldposts van de Astro-starter (`markdown-style-guide.md`, `second-post.md`, `using-mdx.mdx`, `_third-post.md`) en meerdere posts met de placeholder-description "Een stadstuin met potentie.".
- Webshop later als maatwerk.

---

Eigenaar: All This · Wat er gedaan is: zie [`CHANGELOG.md`](CHANGELOG.md) · Werkafspraken voor ontwikkelaars en AI-agents: [`AGENTS.md`](AGENTS.md)
