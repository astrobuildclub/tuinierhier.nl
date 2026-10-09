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
- Styling: SCSS met Utopia (fluid type/space) en Tailwind 4 (`src/styles/tailwind.css`) · Fonts: Manrope (zelf gehost), new-spirit en anchor-web (Typekit)
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
  content/      nieuws/ (berichten), teksten/ (vaste teksten), links.json
  data/         siteData.json (site-naam, OG-beeld)
  lib/          nieuws.ts, teksten.ts (ophalen en sorteren)
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

### Teksten bewerken

Alle vaste teksten staan als Markdown in `src/content/teksten/`. Gewoon de tekst aanpassen; lege regel = nieuwe alinea, `[tekst](url)` = link.

| Bestand | Waar op de site |
|---|---|
| `sidebar.md` | Witte zijbalk, bovenaan (mobiel: footer) |
| `intro-links.md` · `intro-rechts.md` | Blauwe intro, linker- en rechterkolom (laatste alinea rechts is iets minder vet) |
| `diensten.md` | Kop "Diensten" (`titel`) |
| `diensten/*.md` | Eén dienst per bestand: `titel`, `intro` (vet), tekst = body, `volgorde` |
| `contact.md` | Groene sectie: `label` ("samenwerken?"), `titel`, tekst = body |
| `../links.json` | Instagram, LinkedIn, e-mail: één lijst voor zijbalk én contact (`volgorde`) |

Nieuwe dienst: kopieer een bestand in `diensten/` en pas `volgorde` aan.

### Hero-video

Achtergrond van de hero: gedimd, uitgezoomd bij scrollen, zonder geluid, in een lus. Hij hoeft dus niet scherp te zijn, wel licht. De huidige bestanden (1280×720, 6,9 s) zijn 3,5 MB (MP4) en 2,1 MB (WebM): veel te zwaar.

| | Desktop (liggend) | Mobiel (staand, optioneel) | Poster |
|---|---|---|---|
| Bestand | `hero-1280.mp4` + `hero-1280.webm` | `hero-720x1280.mp4` + `.webm` | `hero-poster.jpg` |
| Afmeting | 1280×720 (16:9) | 720×1280 (9:16), midden uitgesneden | 1280×720 |
| Duur | 6–10 s, naadloze lus | idem | eerste frame |
| Framerate | 25 fps, constant | 25 fps | |
| Codec | MP4: H.264 High · WebM: VP9 | idem | JPG, kwaliteit ~75 |
| Geluid | **geen audiospoor** | geen | |
| Doel | MP4 ≤ 1,2 MB · WebM ≤ 0,9 MB | ≤ 0,8 MB | ≤ 120 kB |

**Handbrake** (vanaf het origineel, niet vanaf de huidige transcode):

1. Preset *General → Fast 720p30* als basis.
2. **Summary:** Format MP4, ✓ *Web Optimized* (moov-atom vooraan: start sneller), ✓ *Align A/V Start*.
3. **Dimensions:** 1280×720 (mobiel: *Cropping* custom naar 9:16, dan 720×1280).
4. **Video:** Encoder *H.264 (x264)*, Framerate *25*, *Constant Framerate*, Quality *RF 28* (te blokkerig? 26), Encoder Preset *Slow*, Profile *High*, Level *4.0*.
5. **Audio:** alle sporen verwijderen.
6. WebM: zelfde instellingen, Format *WebM*, Encoder *VP9*, Quality *CQ 34*.
7. Poster: in QuickTime het eerste frame exporteren, of `ffmpeg -i hero-1280.mp4 -frames:v 1 -q:v 4 hero-poster.jpg`.

Bestanden in `public/assets/`, en in `src/components/sections/Hero.astro` de lijst `video.sources` en `video.poster` aanpassen. Lichtste bron eerst (WebM). Mobiele versie bovenaan met `media: "(max-width: 767px) and (orientation: portrait)"`.

## Privacy, toegankelijkheid en SEO

- Consent: geen statistiek of embeds. Manrope is zelf gehost (`@fontsource/manrope`). Typekit (new-spirit, anchor-web) blijft extern: Adobe Fonts mag je niet zelf hosten. Dat stuurt het IP-adres van bezoekers naar Adobe; vermelden in de privacyverklaring.
- WCAG 2.2 AA: animaties respecteren `prefers-reduced-motion` (de hero-video start dan niet); hero-video heeft een pauzeknop; skip-link naar `#inhoud`.
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
- Webshop later als maatwerk.

---

Eigenaar: All This · Wat er gedaan is: zie [`CHANGELOG.md`](CHANGELOG.md) · Werkafspraken voor ontwikkelaars en AI-agents: [`AGENTS.md`](AGENTS.md)
