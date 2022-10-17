import { Veg } from "../model/Veg";

interface IReservation {
	day: "mon" | "tues" | "wed" | "thurs" | "fri";
	meal: "lunch" | "dinner";
}

export interface ICreateVegDTO {
    card: number;
    inactive: boolean;
    schedule: IReservation[]
}

export interface IUpdateCardPropsDTO {
    id: string;
    card: number;
}

export interface IVegsRepository {
    listAllVegs(): Veg[]; // manda todos os vegs
    createVeg(props: ICreateVegDTO): void; // cria novo obj p um vegetariano
    getIdByCard(card: number): string | undefined; 
    getById(id: string): Veg | undefined;
    removeVeg(id: string): void; // remove o vegetariano do banco de dados
    countActiveVegs(): number; // conta quantos vegetarianos existem
    changeInactive(id: string): void; // muda a propriedade inactive de um vegetariano
    updateCard({ id, card }: IUpdateCardPropsDTO): void; // atualiza o numero do cartao de um veg
}