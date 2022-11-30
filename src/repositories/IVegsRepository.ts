import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IReservation {
	day: Days;
	meal: "lunch" | "dinner";
}

export interface ICreateVegDTO {
    card: number;
    name: string;
    schedule: IReservation[]
}

export interface IUpdateCardPropsDTO {
    id: string;
    card: number;
}

type ScheduleTable = {
	[key in Days]: {
		lunch: boolean;
		dinner: boolean;
	}
}

export interface IAddUnusualReservationProps {
    card: number;
    day: Days;
    meal: "lunch" | "dinner";
    will_come: boolean;
}

export interface IVegsRepository {
    listAllVegs(): Veg[]; // manda todos os vegs
    createVeg(props: ICreateVegDTO): Veg; // cria novo obj p um vegetariano
    resetScheduledMeal(props: IReservation): void;
    getIdByCard(card: number): string | undefined; 
    getScheduleTable(card: number): ScheduleTable | undefined;
    getById(id: string): Veg | undefined;
    addUnusualReservation(props: IAddUnusualReservationProps): void;
    removeVeg(id: string): void; // remove o vegetariano do banco de dados
    updateCard({ id, card }: IUpdateCardPropsDTO): void; // atualiza o numero do cartao de um veg
}