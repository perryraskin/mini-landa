/*
  Warnings:

  - You are about to drop the column `shareId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Share` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shareId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shareId";

-- AlterTable
ALTER TABLE "Share" DROP COLUMN "price";
