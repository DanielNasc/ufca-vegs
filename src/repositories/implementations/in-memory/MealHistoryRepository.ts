import { MealHistoryElement } from "../../../model/MealHistoryElement";
import { Days } from "../../../utils/types";
import { IMealHistoryRepository } from "../../IMealHistoryRepository";

export class MealHistoryRepository implements IMealHistoryRepository {
    private history: MealHistoryElement[];

    private static INSTANCE: MealHistoryRepository;

    private constructor() {
        this.history = [];
    }

    public static getInstance(): MealHistoryRepository {
        if (!MealHistoryRepository.INSTANCE) {
            MealHistoryRepository.INSTANCE = new MealHistoryRepository();
        }

        return MealHistoryRepository.INSTANCE;
    }

    addNewHistoryElement(props: Omit<MealHistoryElement, "date">): void {
        const newHistoryElement = new MealHistoryElement(props);

        this.history.push(newHistoryElement);
    }

    getHistoryByUserId(user_id: string): MealHistoryElement[] {
        return this.history.filter(historyElement => historyElement.user_id === user_id);
    }

    getHistoryAfterDate(date: Date): MealHistoryElement[] {
        return this.history.filter(historyElement => historyElement.date >= date);
    }

    getHistoryAfterDateByDayAndMeal(date: Date, day: Days, meal: "lunch" | "dinner"): MealHistoryElement[] {
        return this.history.filter(historyElement => historyElement.date >= date && historyElement.day === day && historyElement.meal === meal);
    }

    getHistoryByDayAndMeal(day: Days, meal: "lunch" | "dinner"): MealHistoryElement[] {
        return this.history.filter(historyElement => historyElement.day === day && historyElement.meal === meal);
    }
}