import { sanityClient } from './client';

export interface LoadQueryOptions<T = any> {
  query: string;
  params?: Record<string, any>;
  perspective?: 'raw' | 'published' | 'previewDrafts';
}

export async function loadQuery<T = any>(options: LoadQueryOptions<T>) {
  const { query, params = {}, perspective = 'published' } = options;

  try {
    const data = await sanityClient.fetch<T>(query, params, {
      perspective,
    });

    return {
      data,
      sourceMap: null, // Not available in v4 without additional setup
    };
  } catch (error) {
    console.error('Error loading Sanity data:', error);
    return {
      data: null,
      sourceMap: null,
    };
  }
}
