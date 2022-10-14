import { v4 as uuidV4 } from "uuid"

interface IVegProps {
    card: number;
    inactive: boolean;
}

export class Veg {
    id: string;
    card: number;
    inactive: boolean;

    constructor({ card, inactive }: IVegProps) {
        this.id = uuidV4()
        this.card = card;
        this.inactive = inactive;
    }
}