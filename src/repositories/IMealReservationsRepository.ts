import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IMealAndDay {
    day: Days;
    meal: "lunch" | "dinner"
}

export type IAddNewReservation = { id: string } & IMealAndDay

export interface IAddNewUnusualReservation { 
    user_id: string,
    day: Days,
    meal: "lunch" | "dinner",
    will_come: boolean
}

export interface IMealReservationsRepository {
    initializeDatabase(): void;
    initializeVegsCounter(props: IMealAndDay): void
    addNewReservation(props: IAddNewReservation): void;
    addNewUnusualReservation(props: IAddNewUnusualReservation): void;
    countActiveVegs(props: IMealAndDay): number | null; // conta quantos vegetarianos irão comer
    checkIfVegWillComeInMeal(props: IAddNewReservation): boolean | null; // verifica se o veg irá comer
}