// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Live domain — drives canonical, Open Graph, sitemap.xml and the JSON-LD
// business record. The apex 308-redirects here, so `www` is the canonical host.
const SITE = process.env.PUBLIC_SITE_URL || 'https://www.keypointlocksmithinc.com';

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
