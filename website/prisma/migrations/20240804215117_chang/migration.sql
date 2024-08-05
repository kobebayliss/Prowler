/*
  Warnings:

  - The `steam_price` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epic_price` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "steam_price",
ADD COLUMN     "steam_price" DOUBLE PRECISION,
DROP COLUMN "epic_price",
ADD COLUMN     "epic_price" DOUBLE PRECISION;
