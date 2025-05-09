import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageAsset } from '@sanity/types';

export function urlForImage(source: ImageAsset) {
  return imageUrlBuilder(sanityClient).image(source);
}
