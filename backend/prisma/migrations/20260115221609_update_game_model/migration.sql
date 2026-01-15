/*
  Warnings:

  - You are about to drop the column `status` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Target` table. All the data in the column will be lost.
  - Added the required column `elapsedTime` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Made the column `finishedAt` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `iconPath` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_targetId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "status",
DROP COLUMN "targetId",
ADD COLUMN     "elapsedTime" INTEGER NOT NULL,
ALTER COLUMN "startedAt" DROP DEFAULT,
ALTER COLUMN "finishedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "iconUrl",
ADD COLUMN     "iconPath" TEXT NOT NULL;
