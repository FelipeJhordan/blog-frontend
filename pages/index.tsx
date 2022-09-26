import type { NextPage } from "next";
import Head from "next/head";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";

import { Post } from "../protocols";

const post: Post[] = [
  {
    title: "React testing",
    excerpt: "Learn React Testing",
  },
  {
    title: "React with Tailwind",
    excerpt: "Learn React with Tailwind",
  },
  {
    title: "Learn React with Typescript",
    excerpt: "Learn React with Typescript Testing",
  },
];

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Felipe Blog</title>
        <link rel="icon" href="/favicon.icop" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {post.map((post) => (
            <PostCard post={post} key={post.title}></PostCard>
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

export default Home;
