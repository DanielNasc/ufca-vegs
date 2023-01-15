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

export type IAddNewReservation = { user_id: string } & IMealAndDay

export interface IAddNewUnusualReservation {
  user_id: string,
  day: Days,
  meal: "lunch" | "dinner",
  will_come: boolean
  is_permanent: boolean
}

export interface IMealReservationsRepository {
  initializeDatabase(): Promise<void>;
  initializeVegsCounter(props: IMealAndDay): Promise<void>
  addNewReservation(props: IAddNewReservation): Promise<void>;
  addNewUnusualReservation(props: IAddNewUnusualReservation): Promise<boolean>;
  countActiveVegs(props: IMealAndDay): Promise<number | null>; // conta quantos vegetarianos irão comer
  checkIfVegWillComeInMeal(props: IAddNewReservation): Promise<boolean | null>; // verifica se o veg irá comer
  sendScheduleTableOfVeg(id: string): Promise<ScheduleTable>;
  saveToHistory(id: string, meal: "lunch" | "dinner", day: Days, did_come: boolean): Promise<void>;
  clearDatabase(): Promise<void>
}
