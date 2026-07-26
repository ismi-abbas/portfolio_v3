import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'twb7fz1z';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'site-blog';

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2025-05-09',
});
