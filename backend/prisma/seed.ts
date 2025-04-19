import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@test.com' },
    update: {},
    create: {
      username: 'demo',
      email: 'demo@test.com',
      password: hashedPassword,
      role: 'USER',
      bio: 'This is a demo user.',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Platform administrator.',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      caption: 'My first post!',
      media: 'media1.jpg',
      userId: demoUser.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      caption: 'Hello from the admin!',
      media: 'admin-post.mp4',
      userId: adminUser.id,
    },
  });

  // Add comments
  const comment = await prisma.comment.create({
    data: {
      content: 'Nice post!',
      postId: post1.id,
      userId: adminUser.id,
    },
  });

  // Add reply to comment
  await prisma.comment.create({
    data: {
      content: 'Thanks!',
      postId: post1.id,
      parentId: comment.id,
      userId: demoUser.id,
    },
  });

  // Add like
  await prisma.like.create({
    data: {
      userId: demoUser.id,
      postId: post2.id,
    },
  });

  // Add rating
  await prisma.rating.create({
    data: {
      value: 5,
      userId: demoUser.id,
      postId: post2.id,
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(' Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
