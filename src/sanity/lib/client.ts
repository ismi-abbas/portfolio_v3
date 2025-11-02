import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'twb7fz1z',
  dataset: 'site-blog',
  useCdn: false,
  apiVersion: '2025-01-01',
  // Disable Stega/visual editing to avoid React compiler conflicts
  stega: {
    enabled: false,
  },
})