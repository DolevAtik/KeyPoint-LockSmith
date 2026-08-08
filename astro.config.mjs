// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Temporary Vercel host until a custom domain is connected — drives canonical,
// Open Graph, sitemap.xml and the JSON-LD business record.
const SITE = process.env.PUBLIC_SITE_URL || 'https://keypoint-locksmith-one.vercel.app';

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
