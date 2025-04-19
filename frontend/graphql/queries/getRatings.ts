import { gql } from '@apollo/client';

export const GET_RATINGS = gql`
  query getRatings($postId: ID!) {
    averageRating(postId: $postId)
    myRating(postId: $postId)
  }
`;
