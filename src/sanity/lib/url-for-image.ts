import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageAsset, Image } from '@sanity/types';

export function urlForImage(source: ImageAsset | Image) {
  return imageUrlBuilder(sanityClient).image(source);
}
