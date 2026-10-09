import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
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

export const collections = { nieuws };
