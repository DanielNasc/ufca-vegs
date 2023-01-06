import { Days } from "../utils/types";

export class MealHistoryElement {
    meal: string;
    day: string;
    user_id: string;
    did_come: boolean;
    respected_the_reservation: boolean;
    is_fixed: boolean;
    date: Date;

    constructor({ meal, day, user_id, did_come, respected_the_reservation, is_fixed }: Omit<MealHistoryElement, "date">) {
        this.meal = meal;
        this.day = day;
        this.user_id = user_id;
        this.did_come = did_come;
        this.respected_the_reservation = respected_the_reservation;
        this.is_fixed = is_fixed;
        this.date = new Date();
    }
}