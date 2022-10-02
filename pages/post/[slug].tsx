import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostWidget,
  PostDetail,
} from "../../components";
import { PostDetails } from "../../protocols/models/PostDetails";
import { GetStaticPropsParams } from "../../protocols/next/static-protocols";
import { Props } from "../../protocols/react/Props";
import { getPostDetails, getPosts } from "../../services/graphl/graphlService";
import { NodePost } from "../../services/graphl/protocols/nodePost";

export type PostDetailsProps = Props & {
  post: PostDetails;
};

const PostDetails = ({ post }: PostDetailsProps) => {
  console.log(post);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }: GetStaticPropsParams) {
  console.log("params");
  console.log(params);
  const data = await getPostDetails(params.slug);

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  console.log(posts);
  return {
    paths: posts.map(({ node: { slug } }: NodePost) => ({ params: { slug } })),
    fallback: false,
  };
}
