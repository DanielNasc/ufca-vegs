-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "profile_pic" TEXT NOT NULL DEFAULT 'default';

-- AlterTable
ALTER TABLE "Vegetarian" ADD COLUMN     "suspended" BOOLEAN NOT NULL DEFAULT false;
