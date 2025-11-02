import { sanityClient } from './lib/client'
import type { Post } from './types'

export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    publishedAt,
    author->{
      _id,
      name,
      slug
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }`

  return await sanityClient.fetch(query)
}

export async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    publishedAt,
    body,
    author->{
      _id,
      name,
      slug,
      bio
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }`

  return await sanityClient.fetch(query, { slug })
}

export async function getAuthors(): Promise<any[]> {
  const query = `*[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }`

  return await sanityClient.fetch(query)
}

export async function getCategories(): Promise<any[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`

  return await sanityClient.fetch(query)
}