import type { Slug } from '@sanity/types';
import { type BlockSchemaType, type ImageAsset } from '@sanity/types';
import groq from 'groq';
import { sanityClient } from 'sanity:client';

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`);
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, {
    slug,
  });
}

export interface Post {
  _type: 'post';
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: BlockSchemaType[];
  publishedAt: string;
  updatedAt: string;
}
