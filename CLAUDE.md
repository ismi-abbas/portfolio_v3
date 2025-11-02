# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website built with Astro v5 and Sanity CMS. The site is deployed on Fly.io using Node.js standalone mode and features a content management system with visual editing capabilities.

**Live Site:** https://www.ismiabbas.xyz/
**Architecture:** Static Site Generation with React islands and headless CMS

## Development Commands

```bash
# Development
pnpm dev          # Start development server (same as start)
pnpm start        # Start development server

# Build & Deployment
pnpm build        # Type-check and build production site
pnpm preview      # Preview with wrangler (legacy, for Cloudflare Workers)

# Utilities
pnpm astro <cmd>  # Run Astro CLI commands directly
```

## Core Architecture

### Content Management
- **Sanity Studio:** Available at `/studio` for content management
- **Visual Editing:** Enabled with stega for real-time content editing
- **Schema Structure:** Modular schema in `src/sanity/schema/` with Post, Author, Category, and BlockContent types
- **API Version:** Uses Sanity API v2025-05-09

### Astro Configuration (astro.config.mjs)
- **Integrations:** MDX, Tailwind CSS, React, Partytown, Sanity, Sitemap
- **Adapter:** Node.js standalone mode for deployment
- **Code Highlighting:** Shiki with catppuccin-mocha theme, supports 16+ languages
- **Vite Config:** Production alias for react-dom/server.edge (React 19 compatibility)

### Key Technologies
- **Framework:** Astro 5.7.11 with React 19.1.0 islands
- **Styling:** Tailwind CSS with typography plugin
- **Content:** Sanity 3.88.2 with PortableText and visual editing
- **Animations:** Framer Motion 10.18.0
- **Build:** Vite 5.4.10 with TypeScript 5.8.3

## Project Structure

### Content Schema (`src/sanity/schema/`)
- `post.ts` - Blog posts with author references, categories, and rich content
- `author.ts` - Author information
- `category.ts` - Post categories (many-to-many with posts)
- `blockContent.ts` - Rich content blocks with headings, code blocks, images
- `index.ts` - Schema registry exports

### Page Routes
- Main pages: `/`, `/blog`, `/projects`, `/code-stats`, `/uses`, `/contact`, `/hire-me`
- Dynamic: `/blog/[slug]` for individual blog posts
- CMS: `/studio` for Sanity content management
- RSS: `/rss.xml` for feed generation

### Key Components
- `Default.astro` - Main layout wrapper
- `BaseHead.astro` - SEO and metadata management
- Header/Footer components for site navigation

## Environment Configuration

Required environment variables:
- `PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `PUBLIC_SANITY_DATASET` - Sanity dataset name

## Build & Deployment

- **Target:** Fly.io (Node.js deployment)
- **Build Process:** `astro check && astro build` (type-checking + static generation)
- **Docker:** Multi-stage Dockerfile with Node.js 22.12.0 base image
- **Output:** Standalone server build optimized for production

## Development Notes

- Uses pnpm as package manager (see pnpm-lock.yaml)
- TypeScript strict mode enabled with `@astrojs/check`
- React 19 requires specific Vite alias for server-side rendering
- Visual editing requires environment variables and proper Sanity configuration
- MDX support enabled with extensive language highlighting
- Partytown configured for third-party script optimization