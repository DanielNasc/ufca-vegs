import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IMealAndDay {
    day: Days;
    meal: "lunch" | "dinner"
}

export type ScheduleTable = {
	[key in Days]: {
		lunch: boolean;
		dinner: boolean;
	}
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
    addNewUnusualReservation(props: IAddNewUnusualReservation): boolean;
    countActiveVegs(props: IMealAndDay): number | null; // conta quantos vegetarianos irão comer
    checkIfVegWillComeInMeal(props: IAddNewReservation): boolean | null; // verifica se o veg irá comer
    sendScheduleTableOfVeg(id: string): ScheduleTable;
}