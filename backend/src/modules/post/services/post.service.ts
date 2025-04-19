// --- src/modules/post/services/post.service.ts ---
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (userId: number, caption: string | undefined, media: string) => {
  return prisma.post.create({
    data: {
      caption,
      media,
      userId,
    },
    include: { user: true },
  });
};

export const getAllPosts = async () => {
  return prisma.post.findMany({
    include: { user: true },
    orderBy: { timestamp: 'desc' },
  });
};

export const getPostById = async (postId: number) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: { user: true },
  });
};

export const updatePost = async (id: number, caption: string | undefined, media: string | undefined, ctx: any) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error('Post not found');

  if (ctx.user.role !== 'ADMIN' && post.userId !== ctx.userId) {
    throw new Error('Not authorized to update this post');
  }

  return prisma.post.update({
    where: { id },
    data: {
      caption: caption ?? post.caption,
      media: media ?? post.media,
    },
    include: { user: true },
  });
};

export const deletePost = async (id: number, ctx: any) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error('Post not found');

  if (ctx.user.role !== 'ADMIN' && post.userId !== ctx.userId) {
    throw new Error('Not authorized to delete this post');
  }

  await prisma.post.delete({ where: { id } });
  return true;
};
