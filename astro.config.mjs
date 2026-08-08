// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update this to the real domain before launch — it drives the canonical URL,
// Open Graph tags, sitemap.xml and the JSON-LD business record.
const SITE = process.env.PUBLIC_SITE_URL || 'https://keypointlocksmith.com';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // One small stylesheet beats a blocking request per component.
    inlineStylesheets: 'auto',
  },
  image: {
    responsiveStyles: true,
  },
  compressHTML: true,
});
