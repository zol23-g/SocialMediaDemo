import { gql } from '@apollo/client';

export const RATE_POST = gql`
  mutation ratePost($postId: ID!, $value: Int!) {
    ratePost(postId: $postId, value: $value) {
      id
      value
    }
  }
`;
