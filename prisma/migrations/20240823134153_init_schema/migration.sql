-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointOfSale" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PointOfSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserPointOfSale" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPointOfSale_AB_unique" ON "_UserPointOfSale"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPointOfSale_B_index" ON "_UserPointOfSale"("B");

-- AddForeignKey
ALTER TABLE "_UserPointOfSale" ADD CONSTRAINT "_UserPointOfSale_A_fkey" FOREIGN KEY ("A") REFERENCES "PointOfSale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPointOfSale" ADD CONSTRAINT "_UserPointOfSale_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
