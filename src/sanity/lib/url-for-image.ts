import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

export function urlForImage(source: any) {
  return imageUrlBuilder(sanityClient).image(source);
}
