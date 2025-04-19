import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(postId: $postId) {
      id
      content
      timestamp
      parent {
        id
      }
      user {
        username
      }
      replies {
        id
        content
        timestamp
        user {
          username
        }
      }
    }
  }
`;
