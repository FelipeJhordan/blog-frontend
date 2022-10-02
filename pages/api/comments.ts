
import { GraphQLClient, gql } from "graphql-request"
import { NextApiRequest, NextApiResponse } from "next"
import { CreateComment } from "./protocols/create-comment"

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

export default async function comments(req: NextApiRequest, res: NextApiResponse) {
  
  const comment: CreateComment = JSON.parse(req.body)

  const graphQLClient = new GraphQLClient(graphqlApi, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })


  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
  const result = await graphQLClient.request(query, comment)

  return res.status(200).send(result)
}