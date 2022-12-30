-- CreateTable
CREATE TABLE "MealHistoryElement" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "day" VARCHAR(255) NOT NULL,
    "meal" VARCHAR(255) NOT NULL,
    "did_come" BOOLEAN NOT NULL,
    "respected_the_reservation" BOOLEAN NOT NULL,
    "is_fixed" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealHistoryElement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealHistoryElement" ADD CONSTRAINT "MealHistoryElement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Vegetarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
