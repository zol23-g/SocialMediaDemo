// src/types/graphql-upload.d.ts
declare module 'graphql-upload/graphqlUploadExpress.js' {
  import { RequestHandler } from 'express';

  const graphqlUploadExpress: (options?: {
    maxFileSize?: number;
    maxFiles?: number;
    maxFieldSize?: number;
  }) => RequestHandler;

  export default graphqlUploadExpress;
}
