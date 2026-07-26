import type { APIRoute } from 'astro';

export const prerender = false;

const MAX_BODY_BYTES = 16_384;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_DETAILS_LENGTH = 5_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Invalid request origin.' }, 403);
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body is too large.' }, 413);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return json({ error: 'Request body is too large.' }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  if (!payload || typeof payload !== 'object') {
    return json({ error: 'Invalid submission.' }, 400);
  }

  const submission = payload as Record<string, unknown>;
  if (typeof submission.website === 'string' && submission.website.trim()) {
    return json({ ok: true }, 201);
  }

  const name = typeof submission.name === 'string' ? submission.name.trim() : '';
  const email = typeof submission.email === 'string' ? submission.email.trim().toLowerCase() : '';
  const projectDetails =
    typeof submission.projectDetails === 'string' ? submission.projectDetails.trim() : '';

  if (!name || name.length > MAX_NAME_LENGTH) {
    return json({ error: 'Enter a valid name.' }, 400);
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return json({ error: 'Enter a valid email address.' }, 400);
  }

  if (!projectDetails || projectDetails.length > MAX_DETAILS_LENGTH) {
    return json({ error: 'Project details must be between 1 and 5,000 characters.' }, 400);
  }

  try {
    const result = await locals.runtime.env.CONTACT_DB.prepare(
      `INSERT INTO contact_submissions (name, email, project_details)
       VALUES (?1, ?2, ?3)`,
    )
      .bind(name, email, projectDetails)
      .run();

    if (!result.success) {
      throw new Error(result.error ?? 'D1 insert failed');
    }

    return json({ ok: true }, 201);
  } catch (error) {
    console.error('Failed to store contact submission:', error);
    return json({ error: 'Unable to save the submission.' }, 500);
  }
};
