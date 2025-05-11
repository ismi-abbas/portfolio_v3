import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(import.meta.env.MODE, process.cwd(), '');

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ismiabbas.xyz/',
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
  },
  integrations: [
    sitemap(),
    tailwind(),
    react(),
    partytown(),
    sanity({
      projectId,
      dataset,
      useCdn: true,
      studioBasePath: '/studio',
      apiVersion: '2025-05-09',
    }),
  ],
  vite: {
    build: {
      minify: false,
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
});
