import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const toggleLike = async (postId: number, userId: number): Promise<boolean> => {
  const existing = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return false;
  } else {
    await prisma.like.create({
      data: { userId, postId },
    });
    return true;
  }
};

export const getLikesForPost = async (postId: number) => {
  return prisma.like.findMany({
    where: { postId },
    include: { user: true, post: true },
  });
};

export const hasUserLiked = async (postId: number, userId: number): Promise<boolean> => {
  const existing = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });
  return !!existing;
};
