import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

interface IReservation {
	day: Days;
	meal: "lunch" | "dinner";
}

export interface ICreateVegDTO {
    card: number;
    schedule: IReservation[]
}

export interface IUpdateCardPropsDTO {
    id: string;
    card: number;
}

export interface IVegsRepository {
    listAllVegs(): Veg[]; // manda todos os vegs
    createVeg(props: ICreateVegDTO): Veg; // cria novo obj p um vegetariano
    getIdByCard(card: number): string | undefined; 
    getById(id: string): Veg | undefined;
    removeVeg(id: string): void; // remove o vegetariano do banco de dados
    updateCard({ id, card }: IUpdateCardPropsDTO): void; // atualiza o numero do cartao de um veg
}