import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IMealAndDay {
    day: Days;
    meal: "lunch" | "dinner"
}
export interface IMealReservationsRepository {
    initializeDatabase(): void;
    initializeVegsCounter(props: IMealAndDay): void
    addNewCard(veg: Veg): void;
    reset({day, meal}: IMealAndDay): void;
    increaseCounter(): void;
    decreaseCounter(card: number, { day, meal }: IMealAndDay): boolean;
    countActiveVegs(): number | null; // conta quantos vegetarianos irão comer
}