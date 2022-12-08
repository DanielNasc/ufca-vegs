import { Veg } from "../model/Veg";
import { Days } from "../utils/types";


export interface IMealAndDay {
    day: Days;
    meal: "lunch" | "dinner"
}
export interface IAddNewUnusualReservation { 
    card: number,
    day: Days, 
    meal: "lunch" | "dinner",
    will_come: boolean }

export interface IMealReservationsRepository {
    initializeDatabase(): void;
    initializeVegsCounter(props: IMealAndDay): void
    addNewCard(veg: Veg): void;
    addNewUnusualReservation(props: IAddNewUnusualReservation): boolean;
    removeCardFromToday(card: number, { day, meal }: IMealAndDay): boolean;
    reset({day, meal}: IMealAndDay): void;
    increaseCounter(): void;
    upateCounter({ day, meal }: IMealAndDay): void;
    decreaseCounter(card: number, { day, meal }: IMealAndDay): boolean;
    countActiveVegs(): number | null; // conta quantos vegetarianos irão comer
}