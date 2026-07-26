import { defineMiddleware } from 'astro:middleware';

const BLOG_CACHE_CONTROL = 'public, max-age=0, s-maxage=60';

function isCacheableBlogPath(pathname: string) {
  return pathname === '/blog' || pathname.startsWith('/blog/') || pathname === '/blog-sitemap.xml';
}

function getCloudflareCache() {
  return (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  if (request.method !== 'GET' || url.search || !isCacheableBlogPath(url.pathname)) {
    return next();
  }

  const cache = getCloudflareCache();
  const cached = await cache?.match(request);
  if (cached) {
    return new Response(cached.body, {
      status: cached.status,
      statusText: cached.statusText,
      headers: new Headers(cached.headers),
    });
  }

  const response = await next();
  if (!response.ok) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('Cache-Control', BLOG_CACHE_CONTROL);
  headers.set('Cache-Tag', 'blog');

  const cacheableResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });

  if (cache && !headers.has('Set-Cookie')) {
    context.locals.runtime.ctx.waitUntil(cache.put(request, cacheableResponse.clone()));
  }

  return cacheableResponse;
});
