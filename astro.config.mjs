import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(import.meta.env.MODE, process.cwd(), '');

const projectId = PUBLIC_SANITY_PROJECT_ID || 'twb7fz1z';
const dataset = PUBLIC_SANITY_DATASET || 'site-blog';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ismiabbas.xyz/',
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
  },
  integrations: [
    mdx({
      shikiConfig: {
        // Choose your preferred theme
        theme: 'github-dark',
        // Languages that should be available for highlighting
        langs: [
          'js',
          'ts',
          'jsx',
          'tsx',
          'html',
          'css',
          'json',
          'md',
          'yaml',
          'bash',
          'astro',
          'python',
          'java',
          'c',
          'cpp',
        ],
        // You can add custom language parsers if needed
        // customLanguages: {},
        // Wrap the code blocks in a div with a specific class
        wrap: true,
      },
      // This setting ensures all code blocks get processed,
      // including those from external sources like Sanity
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    sitemap(),
    tailwind(),
    react(),
    partytown(),
    sanity({
      projectId: 'twb7fz1z',
      dataset: 'site-blog',
      useCdn: false,
      studioBasePath: '/studio',
      apiVersion: '2025-01-01',
    }),
  ],
  adapter: cloudflare(),
});
