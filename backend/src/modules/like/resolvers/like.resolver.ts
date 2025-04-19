// --- src/modules/like/resolvers/like.resolver.ts ---
import { toggleLike, getLikesForPost, hasUserLiked } from '../services/like.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    likes: async (_: any, args: any) => getLikesForPost(Number(args.postId)),
    hasLiked: async (_: any, args: any, ctx: any) => ctx.userId ? hasUserLiked(Number(args.postId), ctx.userId) : false,
  },
  Mutation: {
    toggleLike: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      return toggleLike(Number(args.postId), ctx.userId);
    },
    likePost: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      const existing = await prisma.like.findUnique({
        where: { userId_postId: { userId: ctx.userId, postId: Number(args.postId) } }
      });
      if (!existing) {
        await prisma.like.create({ data: { userId: ctx.userId, postId: Number(args.postId) } });
      }
      return true;
    },
    
    unlikePost: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      await prisma.like.deleteMany({
        where: { userId: ctx.userId, postId: Number(args.postId) }
      });
      return true;
    },
    
  },
};