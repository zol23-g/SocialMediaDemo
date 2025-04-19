// --- src/config/context.ts ---
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const context = async ({ req }: any) => {
  const auth = req.headers.authorization;
  let userId = null;
  let user = null;
  if (auth) {
    const token = auth.replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    userId = (verified as any).userId;
    user = await prisma.user.findUnique({ where: { id: userId } });
  }
  return {
    prisma,
    userId,
    user,
  };
};
