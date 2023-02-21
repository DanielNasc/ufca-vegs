type CurrentMeal = {
    meal: string;
    day: string;
    meal_start_date: Date;
} | null;

export class MealProvider {
    private static instance: MealProvider;
    private constructor() {}
    currentMeal: CurrentMeal = null;

    public static getInstance(): MealProvider {
        if (!MealProvider.instance) {
        MealProvider.instance = new MealProvider();
        }
        return MealProvider.instance;
    }
 
    public enableMeal() {
        const newDate = new Date();
        const hour = newDate.getHours();
        const day = newDate.toLocaleDateString("en", {weekday: "short"}).toLocaleLowerCase();

        if (hour >= 11 && hour < 14) {
            const meal_start_date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 11, 0, 0);
            this.currentMeal = {meal: "lunch", day, meal_start_date};
        } else if (hour >= 17 && hour < 20) {
            const meal_start_date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 17, 0, 0);
            this.currentMeal = {meal: "dinner", day, meal_start_date};
        }
    }

    public disableMeal() {
        this.currentMeal = null;
    }

    public getMeal() {
        return this.currentMeal;
    }
}
