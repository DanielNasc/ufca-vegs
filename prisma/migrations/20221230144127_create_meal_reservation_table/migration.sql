-- CreateTable
CREATE TABLE "MealReservation" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "meal" VARCHAR(255) NOT NULL,
    "day" VARCHAR(255) NOT NULL,
    "is_fixed" BOOLEAN NOT NULL DEFAULT true,
    "will_come" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealReservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealReservation" ADD CONSTRAINT "MealReservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Vegetarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
