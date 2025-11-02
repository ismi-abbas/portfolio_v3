import type { APIRoute } from 'astro';

export const POST: APIRoute = ({ params }) => {
  const id = params.id;

  if (!id) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response('ok');
};

export const GET: APIRoute = () => {
  return Response.json({ status: 'ok' });
};
