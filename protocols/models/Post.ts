import { Author } from "./Author";
import { FeaturedImage } from "./FeaturedImage";

export type Post = {
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: FeaturedImage;
    author: Author;
    createdAt: Date;
  };
