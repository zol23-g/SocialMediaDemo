import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $content: String!, $parentId: ID) {
    addComment(postId: $postId, content: $content, parentId: $parentId) {
      id
      content
    }
  }
`;
