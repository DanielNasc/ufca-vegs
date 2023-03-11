import { PrismaClient } from "@prisma/client";

import { MealHistoryElement } from "../../../model/MealHistoryElement";
import { IMealHistoryRepository } from "../../IMealHistoryRepository";

const prismaClient = new PrismaClient();

export class MealHistoryRepository implements IMealHistoryRepository {
    async addNewHistoryElement({ day, did_come, is_fixed, meal, respected_the_reservation, user_id }: Omit<MealHistoryElement, "date">): Promise<void> {
        await prismaClient.mealHistoryElement.create({
            data: {
                day,
                did_come,
                is_fixed,
                meal,
                respected_the_reservation,
                user_id,
            }
        })
    }

    async getHistoryByUserId(user_id: string): Promise<MealHistoryElement[]> {
        const history = await prismaClient.mealHistoryElement.findMany({
            where: {
                user_id,
            }
        });

        return history;
    }

    async getHistoryAfterDate(date: Date): Promise<MealHistoryElement[]> {
        const history = await prismaClient.mealHistoryElement.findMany({
            where: {
                date: {
                    gte: date,
                }
            }
        });

        return history;
    }
    async getHistoryAfterDateByDayAndMeal(date: Date, day: string, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]> {
        const history = await prismaClient.mealHistoryElement.findMany({
            where: {
                day,
                meal,
                date: {
                    gte: date,
                }
            }
        });

        return history;
    }

    async getHistoryByDayAndMeal(day: string, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]> {
        const history = await prismaClient.mealHistoryElement.findMany({
            where: {
                day,
                meal,
            }
        });

        return history;
    }
}