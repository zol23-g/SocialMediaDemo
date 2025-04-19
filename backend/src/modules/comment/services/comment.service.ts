// --- src/modules/comment/services/comment.service.ts ---
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPostComments = async (postId: number) => {
  return prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      user: true,
      post: true,
      replies: {
        include: {
          user: true,
          replies: true,
        },
      },
    },
  });
};

export const addCommentToPost = async (
  postId: number,
  content: string,
  userId: number,
  parentId?: number | string
) => {
  return prisma.comment.create({
    data: {
      content,
      postId,
      parentId: parentId ? Number(parentId) : null,
      userId,
    },
    include: {
      user: true,
      post: true,
      parent: true,
      replies: true,
    },
  });
};


export const updateComment = async (
  id: number,
  content: string,
  ctx: any
) => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error('Comment not found');

  if (ctx.user.role !== 'ADMIN' && comment.userId !== ctx.userId) {
    throw new Error('Not authorized to update this comment');
  }

  return prisma.comment.update({
    where: { id },
    data: { content },
    include: { user: true, post: true, parent: true, replies: true },
  });
};

export const deleteComment = async (id: number, ctx: any) => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error('Comment not found');
  if (ctx.user.role !== 'ADMIN' && comment.userId !== ctx.userId) {
    throw new Error('Not authorized to delete this comment');
  }
  await prisma.comment.delete({ where: { id } });
  return true;
};
