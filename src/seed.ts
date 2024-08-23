import { PrismaClient } from "@prisma/client";

function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }
    return acc;
  }, [] as T[][]);
}

async function createPointOfSales(prisma: PrismaClient) {
  const newPointOfSales = Array.from({ length: 32767 }, (_, i) => ({
    name: `Point of Sale ${i + 1}`,
  }));

  await prisma.pointOfSale.createMany({
    data: newPointOfSales,
  });
}

async function addPointOfSales(prisma: PrismaClient, userId: number) {
  const pointOfSales = await prisma.pointOfSale.findMany();

  const chunkedPointOfSales = chunk(pointOfSales, 1000);

  for (const chunk of chunkedPointOfSales) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        pointOfSales: {
          connect: chunk.map((pointOfSale) => ({ id: pointOfSale.id })),
        },
      },
    });
  }
}

export async function createUserIfNotExists(
  prisma: PrismaClient,
  email: string
) {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) return user.id;
  user = await prisma.user.create({
    data: {
      email,
    },
  });

  await createPointOfSales(prisma);
  await addPointOfSales(prisma, user.id);
  console.log("User with large number of PointOfSale relations created.");
  return user.id;
}
