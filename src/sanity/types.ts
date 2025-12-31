import type { PortableTextBlock } from '@portabletext/types';

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  mainImage?: any;
  publishedAt: string;
  body?: PortableTextBlock[];
  author?: Author;
  categories?: Category[];
  _createdAt: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  image?: any;
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}
