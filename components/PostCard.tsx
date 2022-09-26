import React from "react";
import { Post } from "../protocols";

export type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;
