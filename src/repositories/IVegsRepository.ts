import { Vegetarian } from "@prisma/client";

export interface IReservation {
  day: string;
  meal: "lunch" | "dinner";
}

export interface ICreateVegDTO {
  card: number;
  name: string;
}

export interface IUpdateCardPropsDTO {
  old_card: number;
  new_card: number;
}

export interface IAddUnusualReservationProps {
  card: number;
  day: string;
  meal: "lunch" | "dinner";
  will_come: boolean;
}

export interface IVegsRepository {
  listAllVegs(): Promise<Partial<Vegetarian>[]>; // manda todos os vegs
  createVeg(props: ICreateVegDTO): Promise<string>; // cria novo obj p um vegetariano
  getIdByCard(card: number): Promise<string | undefined>;
  getVegByCard(card: number): Promise<Vegetarian | null>;
  getById(id: string): Promise<Vegetarian | null>;
  removeVeg(id: string): Promise<void>; // remove o vegetariano do banco de dados
  updateCard(props: IUpdateCardPropsDTO): Promise<void>; // atualiza o numero do cartao de um veg
  decrementAbsences(id: string): Promise<void>; // decrementa o numero de faltas
  resetAbsences(id: string): Promise<void>; // zera o numero de faltas
  incrementAttendance(id: string): Promise<void>; // incrementa o numero de presencas
}
