import { PrismaClient } from "@prisma/client";
import { createUserIfNotExists } from "./seed";
import { disconnect } from "./reproduce";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  const userId = await createUserIfNotExists(prisma, "user@example.com");
  await disconnect(prisma, userId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
