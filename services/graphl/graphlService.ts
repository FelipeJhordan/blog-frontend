import request, { gql } from "graphql-request"
import { FeaturedImage } from "../../protocols/models"
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
  console.log(result)

  return result.posts;
};

export const getSimilarPosts = async (categories: [], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug, AND: {categories_some: {
            slug_in: $categories
          }}
        },
        last: 3
      ) {
        {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    }
  `

  const result = await request(graphqlApi, query)

  return result.postsConnection.posts
}