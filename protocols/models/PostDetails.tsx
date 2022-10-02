import { Category } from "./Category";
import { Post } from "./Post";

export type PostDetails = Post & {
  categories: Category[];
  content: any;
};
