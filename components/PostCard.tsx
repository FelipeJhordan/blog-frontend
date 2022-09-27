import React from "react";
import { Post } from "../protocols/models";

export type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};
