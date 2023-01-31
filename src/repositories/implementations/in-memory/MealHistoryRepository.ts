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

  async addNewHistoryElement(props: Omit<MealHistoryElement, "date">): Promise<void> {
    const newHistoryElement = new MealHistoryElement(props);

    this.history.push(newHistoryElement);
  }

  async getHistoryByUserId(user_id: string): Promise<MealHistoryElement[]> {
    return this.history.filter(historyElement => historyElement.user_id === user_id);
  }

  async getHistoryAfterDate(date: Date): Promise<MealHistoryElement[]> {
    return this.history.filter(historyElement => historyElement.date >= date);
  }

  async getHistoryAfterDateByDayAndMeal(date: Date, day: Days, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]> {
    return this.history.filter(historyElement => historyElement.date >= date && historyElement.day === day && historyElement.meal === meal);
  }

  async getHistoryByDayAndMeal(day: Days, meal: "lunch" | "dinner"): Promise<MealHistoryElement[]> {
    return this.history.filter(historyElement => historyElement.day === day && historyElement.meal === meal);
  }
}
