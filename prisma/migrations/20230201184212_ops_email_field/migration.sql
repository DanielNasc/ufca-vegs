/*
  Warnings:

  - Added the required column `email` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "email" VARCHAR(255) NOT NULL;
