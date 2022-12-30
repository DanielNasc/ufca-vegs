-- CreateTable
CREATE TABLE "Vegetarian" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "card" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vegetarian_pkey" PRIMARY KEY ("id")
);
