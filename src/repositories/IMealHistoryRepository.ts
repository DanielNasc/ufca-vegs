import { MealHistoryElement } from "../model/MealHistoryElement";
import { Days } from "../utils/types";

export interface IMealHistoryRepository {
    addNewHistoryElement(props: Omit<MealHistoryElement, "date">): Promise<void>;
    getHistoryByUserId(user_id: string): Promise<MealHistoryElement[]>;
    getHistoryAfterDate(date: Date): Promise<MealHistoryElement[]>;
    getHistoryAfterDateByDayAndMeal(date: Date, day: Days, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]>;
    getHistoryByDayAndMeal(day: Days, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]>;
}