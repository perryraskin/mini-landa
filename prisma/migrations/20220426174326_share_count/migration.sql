/*
  Warnings:

  - You are about to drop the column `shareAmount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shareAmount",
ADD COLUMN     "shareCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;
