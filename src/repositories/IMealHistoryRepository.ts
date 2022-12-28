import { MealHistoryElement } from "../model/MealHistoryElement";
import { Days } from "../utils/types";

export interface IMealHistoryRepository {
    addNewHistoryElement(props: Omit<MealHistoryElement, "date">): void;
    getHistoryByUserId(user_id: string): MealHistoryElement[];
    getHistoryAfterDate(date: Date): MealHistoryElement[];
    getHistoryAfterDateByDayAndMeal(date: Date, day: Days, meal: "lunch" | "dinner"): MealHistoryElement[];
    getHistoryByDayAndMeal(day: Days, meal: "lunch" | "dinner"): MealHistoryElement[];
}