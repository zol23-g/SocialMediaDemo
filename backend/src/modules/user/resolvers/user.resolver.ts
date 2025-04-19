// --- src/modules/user/resolvers/user.resolver.ts ---
import { registerUser, loginUser } from '../services/user.service';

export default {
  Query: {
    me: async (_: any, __: any, ctx: any) => {
      return ctx.userId ? ctx.prisma.user.findUnique({ where: { id: ctx.userId } }) : null;
    },
  },
  Mutation: {
    signup: async (_: any, args: any) => registerUser(args.username, args.email, args.password),
    login: async (_: any, args: any) => loginUser(args.email, args.password),
  },
};