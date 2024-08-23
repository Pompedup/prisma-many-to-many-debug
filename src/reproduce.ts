import { PrismaClient } from "@prisma/client";

export async function disconnect(prisma: PrismaClient, userId: number) {
  const pointOfSales = await prisma.pointOfSale.findMany({
    select: { id: true },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      pointOfSales: {
        disconnect: pointOfSales,
      },
    },
  });
}
