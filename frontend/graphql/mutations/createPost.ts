import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($caption: String, $media: String!) {
    createPost(caption: $caption, media: $media) {
      id
    }
  }
`;
