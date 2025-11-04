import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // clear existing data
  await prisma.task.deleteMany();

  // create initial tasks input
  const tasks = [
    {
      title: 'Complete Project Documentation',
      description: 'Write comprehensive documentation for the task management system',
      status: 'todo',
      order: 0
    },
    {
      title: 'Review Code Changes',
      description: 'Review and approve pending pull requests',
      status: 'inprogress',
      order: 1
    },
    {
      title: 'Deploy to Production',
      description: 'Deploy the latest version to production environment',
      status: 'done',
      order: 2
    },
    {
      title: 'Fix Bug in Authentication',
      description: 'Resolve the login timeout issue reported by users',
      status: 'todo',
      order: 3
    }
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: task
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
