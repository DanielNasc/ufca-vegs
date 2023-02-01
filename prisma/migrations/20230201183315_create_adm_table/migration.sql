-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);
