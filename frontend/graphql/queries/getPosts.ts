import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      id
      caption
      media
      timestamp
      user {
        username
      }
    }
  }
`;
