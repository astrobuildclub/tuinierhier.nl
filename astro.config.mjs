import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://tuinierhier.nl',
  output: 'static',
  build: {
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