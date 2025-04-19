// --- src/modules/rating/resolvers/rating.resolver.ts ---
import {
  ratePost,
  getAverageRating,
  getMyRating,
  deleteRating,
} from '../services/rating.service';

export default {
  Query: {
    averageRating: async (_: any, args: any) => getAverageRating(Number(args.postId)),
    myRating: async (_: any, args: any, ctx: any) =>
      ctx.userId ? getMyRating(Number(args.postId), ctx.userId) : null,
  },
  Mutation: {
    ratePost: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      return ratePost(Number(args.postId), ctx.userId, args.value);
    },
    deleteRating: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      return deleteRating(Number(args.postId), ctx.userId);
    },
  },
};

