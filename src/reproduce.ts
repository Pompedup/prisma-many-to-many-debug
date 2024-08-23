import { PrismaClient } from "@prisma/client";

export async function disconnect(prisma: PrismaClient, userId: number) {
  const pointOfSaleIds = [32764, 32765, 32766, 32767]; // Last 4 records to disconnect

  await prisma.user.update({
    where: { id: userId },
    data: {
      pointOfSales: {
        disconnect: pointOfSaleIds.map((id) => ({ id })),
      },
    },
  });
}
