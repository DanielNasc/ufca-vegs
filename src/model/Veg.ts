import { v4 as uuidV4 } from "uuid";

interface IVegProps {
  card: number;
  name: string;
}

export class Veg {
  id: string;
  card: number;
  name: string;
  absences: number;
  created_at: Date;

  constructor({ card, name }: IVegProps) {
    this.id = uuidV4();
    this.card = card;
    this.name = name
    this.absences = 0
    this.created_at = new Date()
  }
}
