import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IReservation {
    day: Days;
    meal: "lunch" | "dinner";
}

export interface ICreateVegDTO {
    card: number;
    name: string;
}

export interface IUpdateCardPropsDTO {
    id: string;
    card: number;
}

export interface IAddUnusualReservationProps {
    card: number;
    day: Days;
    meal: "lunch" | "dinner";
    will_come: boolean;
}

export interface IVegsRepository {
    listAllVegs(): Promise<Veg[]>; // manda todos os vegs
    createVeg(props: ICreateVegDTO): Promise<string>; // cria novo obj p um vegetariano
    getIdByCard(card: number): Promise<string | undefined>;
    getById(id: string): Promise<Veg | null>;
    removeVeg(id: string): Promise<void>; // remove o vegetariano do banco de dados
    updateCard({ id, card }: IUpdateCardPropsDTO): Promise<void>; // atualiza o numero do cartao de um veg
}