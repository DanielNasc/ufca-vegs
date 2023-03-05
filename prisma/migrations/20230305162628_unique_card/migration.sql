/*
  Warnings:

  - A unique constraint covering the columns `[card]` on the table `Vegetarian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vegetarian_card_key" ON "Vegetarian"("card");
