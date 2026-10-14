import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://tuinierhier.nl',
  output: 'static',
  // URL's zonder slash aan het eind, gelijk aan de oude Webflow-site (/nieuws/<slug>), in verband met SEO.
  trailingSlash: 'never',
  // Astro 7 gebruikt standaard 'jsx': witruimte tussen elementen verdwijnt ("Home Blog" → "HomeBlog").
  compressHTML: true,
  // Afbeeldingen (ook in Markdown) krijgen een srcset in meerdere breedtes, nooit breder dan het origineel.
  image: {
    layout: 'constrained',
  },
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          // Functievorm: Vite 7 staat de object-vorm niet toe voor modules die in de server-build extern zijn.
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap';
            if (id.includes('node_modules/lenis')) return 'lenis';
          }
        }
      }
    }
  },
  integrations: [mdx(), sitemap()]
});