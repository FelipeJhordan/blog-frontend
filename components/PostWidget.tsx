import React, { useEffect, useState } from "react";

import moment from "moment";
import { Props } from "../protocols/react/Props";
import {
  getRecentPosts,
  getSimilarPosts,
} from "../services/graphl/graphlService";
import { RelatedPosts } from "../protocols/models/RelatedPosts";
import Link from "next/link";

export type PostWidgetProps = Props & {
  categories?: string[];
  slug?: string;
};

export const PostWidget = ({ categories = [], slug = "" }: PostWidgetProps) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPosts[]>([]);
  useEffect(() => {
    const setPageWidgetBySlug = async (slug: string) => {
      if (slug) {
        const response = await getSimilarPosts(categories, slug);

        setRelatedPosts(response);
      } else {
        const response = await getRecentPosts();

        setRelatedPosts(response);
      }
    };

    setPageWidgetBySlug(slug);
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Posts Relacionados" : "Posts Recentes "}
      </h3>

      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("DD MMM, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.slug}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
