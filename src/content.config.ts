import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// Nieuwsberichten: één Markdown-bestand per bericht in src/content/nieuws/.
// De bestandsnaam is de slug (/nieuws/<slug>/), gelijk aan de oude Webflow-URL's.
// Bestanden met `_` ervoor zijn concepten en worden overgeslagen.
const nieuws = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/nieuws" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Volgorde: nieuwste eerst. Berichten op dezelfde dag sorteer je met de tijd.
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.object({
        src: image(),
        alt: z.string(),
      }),
      // Externe links onder het bericht (bv. de aflevering of het interview).
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    }),
});

// Vaste teksten van de site (zijbalk, intro, diensten, contact, privacy): één Markdown-bestand per blok
// in src/content/teksten/. De id is het pad zonder .md, bv. "intro-links" of "diensten/tuinadvies".
const teksten = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/teksten" }),
  schema: z.object({
    titel: z.string().optional(),
    intro: z.string().optional(),
    label: z.string().optional(),
    volgorde: z.number().optional(),
    // Tekstpagina's (privacy.md): datum van de laatste versie.
    bijgewerkt: z.coerce.date().optional(),
  }),
});

// Contactlinks, één bron voor de zijbalk en de contactsectie, gesorteerd op `volgorde`.
const links = defineCollection({
  loader: file("src/content/links.json"),
  schema: z.object({
    label: z.string(),
    url: z.string(),
    volgorde: z.number(),
  }),
});

export const collections = { nieuws, teksten, links };
