
import { Days } from "../utils/types";

export interface IMealAndDay {
  day: string;
  meal: string;
}

export type ScheduleTable = {
  [key in Days]: {
    lunch: boolean;
    dinner: boolean;
  }
}

export interface ISendScheduleTableOfVeg {
  [key: string]: {
    [meal: string]: {
      is_permanent: boolean;
      will_come: boolean;
    } | null;
  }
}

export type IAddNewReservation = { user_id: string } & IMealAndDay

export interface IAddNewUnusualReservation {
  user_id: string,
  day: string,
  meal: string
  will_come: boolean
  is_permanent: boolean
}

export interface IMealReservationsRepository {
  addNewReservation(props: IAddNewReservation): Promise<void>;
  addNewUnusualReservation(props: IAddNewUnusualReservation): Promise<boolean>;
  countActiveVegs(props: IMealAndDay): Promise<number | null>; // conta quantos vegetarianos irão comer
  checkIfVegWillComeInMeal(props: IAddNewReservation | null): Promise<boolean | null>; // verifica se o veg irá comer
  sendScheduleTableOfVeg(id: string): Promise<ISendScheduleTableOfVeg>;
  saveToHistory(id: string, meal: "lunch" | "dinner", day: string, did_come: boolean): Promise<void>;
  clearDatabase(): Promise<void>
}
