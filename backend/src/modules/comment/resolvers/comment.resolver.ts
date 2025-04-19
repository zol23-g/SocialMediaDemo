// --- src/modules/comment/resolvers/comment.resolver.ts ---
import {
  getPostComments,
  addCommentToPost,
  updateComment,
  deleteComment,
} from '../services/comment.service';

export default {
  Query: {
    comments: async (_: any, args: any) => getPostComments(Number(args.postId)),
  },
  Mutation: {
    addComment: async (_: any, args: any, ctx: any) => {
      if (!ctx.userId) throw new Error('Not authenticated');
      return addCommentToPost(Number(args.postId), args.content, ctx.userId, args.parentId);
    },
    updateComment: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error('Not authenticated');
      return updateComment(Number(args.id), args.content, ctx);
    },
    deleteComment: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error('Not authenticated');
      return deleteComment(Number(args.id), ctx);
    },
  },
};
