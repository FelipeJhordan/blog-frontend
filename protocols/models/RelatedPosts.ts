import { FeaturedImage } from "./FeaturedImage"

export type RelatedPosts = {
    slug: string
    title: string
    featuredImage: FeaturedImage
    createdAt: Date
}