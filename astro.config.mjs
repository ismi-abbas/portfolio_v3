import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  site: 'https://ismiabbas.site/',
  integrations: [mdx(), sitemap(), tailwind(), react(), image(), partytown()],
});
