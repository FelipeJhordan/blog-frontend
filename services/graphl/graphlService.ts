import request, { gql } from "graphql-request"
import { Comment } from "../../protocols/models/Comment"
import { RelatedPosts } from "../../protocols/models/RelatedPosts"

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? ''

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
    
    `

    const result = await request(graphqlApi, query)
    return result.postsConnection.edges
} 

export const getRecentPosts = async (): Promise<RelatedPosts[]> => {
  const query = gql`
  query getpostsdetail {
    posts(orderBy: createdAt_ASC, last: 3) {
      slug
      title
      createdAt
      featuredImage {
        url
      }
    }
  }
  `;
  const result = await request(graphqlApi, query);

  return result.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlApi, query, { slug, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query =  gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlApi, query)

  return result.categories
}

export const getPostDetails = async (slug: string) => {

  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.post;
};

export const submitComment = async(comment: Comment) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(comment)
  })

  return result.json()
}

export const getComments = async ( slug: string ): Promise<Comment[]> => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {
        post: {
          slug: $slug
        }
      }) {
        name
        createdAt
        comment
      }
    }
  `


  const result = await request(graphqlApi, query, {
    slug
  })

  return result.comments
}


export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlApi, query);

  return result.posts;
};


export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.postsConnection.edges;
};