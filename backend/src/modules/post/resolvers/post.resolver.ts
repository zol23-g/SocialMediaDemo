// --- src/modules/post/resolvers/post.resolver.ts ---
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../services/post.service';
import fs from 'fs';
import path from 'path';

export default {
  Query: {
    posts: async () => getAllPosts(),
    post: async (_: any, args: any) => getPostById(Number(args.id)),
  },
  Mutation: {
    createPost: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');

      const { caption, media } = args;

      // Strip base64 header if present
      const base64Data = media.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const filename = `post-${Date.now()}.jpg`;
      const uploadPath = path.join(__dirname, '../../../../uploads', filename);

      fs.writeFileSync(uploadPath, buffer); // Save file locally

      return createPost(ctx.userId, caption, `/uploads/${filename}`);
    },
    
    updatePost: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error('Not authenticated');
      return updatePost(Number(args.id), args.caption, args.media, ctx);
    },
    deletePost: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error('Not authenticated');
      return deletePost(Number(args.id), ctx);
    },
  },
};