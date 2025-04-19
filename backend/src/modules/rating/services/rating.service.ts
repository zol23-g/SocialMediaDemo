import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const ratePost = async (postId: number, userId: number, value: number) => {
  return prisma.rating.upsert({
    where: { userId_postId: { userId, postId } },
    update: { value },
    create: { value, userId, postId },
    include: { user: true, post: true },
  });
};

export const getAverageRating = async (postId: number): Promise<number> => {
  const ratings = await prisma.rating.findMany({ where: { postId } });
  if (!ratings.length) return 0;
  const total = ratings.reduce((sum, r) => sum + r.value, 0);
  return total / ratings.length;
};

export const getMyRating = async (postId: number, userId: number): Promise<number | null> => {
  const rating = await prisma.rating.findUnique({
    where: { userId_postId: { userId, postId } },
  });
  return rating?.value ?? null;
};

export const deleteRating = async (postId: number, userId: number) => {
  const rating = await prisma.rating.findUnique({
    where: { userId_postId: { userId, postId } }
  });

  if (!rating) throw new Error('Rating not found');

  await prisma.rating.delete({
    where: { userId_postId: { userId, postId } }
  });

  return true;
};
