/*
  Warnings:

  - You are about to drop the `Target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Target";

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_gameId_key" ON "Score"("gameId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
