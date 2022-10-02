import React from "react";
import { useRouter } from "next/router";

import { PostCard, Categories, Loader } from "../../components";
import {
  getCategories,
  getCategoryPost,
} from "../../services/graphl/graphlService";
import { Category } from "../../protocols/models/Category";
import { GetStaticPropsParams } from "../../protocols/next/static-protocols";
import { Post } from "../../protocols/models";

export type CategoryPostProps = {
  posts: Post[];
};

const CategoryPost = ({ posts }: CategoryPostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }: GetStaticPropsParams) {
  const nodes = await getCategoryPost(params.slug);
  console.log(nodes);
  return {
    props: { posts: serializePosts(nodes) },
  };
}
export const serializePosts = (posts: Record<string, {}>[]) => {
  return posts.map((post: Record<string, {}>) => post.node);
};

export async function getStaticPaths() {
  const categories: Category[] = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
