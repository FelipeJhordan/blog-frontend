import type { NextPage } from "next";
import Head from "next/head";
import { PostWidget, PostCard, Categories } from "../components/";
import { Post } from "../protocols/models";
import { Props } from "../protocols/react/Props";
import { FeaturedPosts } from "../sections/FeaturedPosts";
import { getPosts } from "../services/graphl/graphlService";
import { NodePost } from "../services/graphl/protocols/nodePost";

type HomeProps = Props & {
  posts: Post[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Felipe Blog</title>
        <link rel="icon" href="/favicon.icop" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post} key={post.title + post.excerpt} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  const serializedPosts = serializePosts(posts);
  return {
    props: { posts: serializedPosts },
  };
}

export const serializePosts = (posts: Record<string, {}>[]) => {
  return posts.map((post: Record<string, {}>) => post.node);
};

export default Home;
