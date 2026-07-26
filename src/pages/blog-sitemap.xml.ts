import type { APIRoute } from 'astro';
import { getPosts } from '../sanity/utils';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL('https://www.ismiabbas.xyz');
  const posts = await getPosts();
  const locations = [
    new URL('/blog', baseUrl).href,
    ...posts.map((post) => new URL(`/blog/${encodeURIComponent(post.slug.current)}`, baseUrl).href),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locations.map((location) => `  <url><loc>${location}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
