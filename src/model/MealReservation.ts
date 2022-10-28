import { v4 as uuidV4 } from "uuid";

interface IExtras {
    card: number;
    will_come: boolean;
}


export class MealReservation {
    readonly id: string;
    cards: number[];
    extras: IExtras[];

    constructor() {
        this.id = uuidV4();
        this.cards = []
        this.extras = []
    }

    addNewCard(card: number) {
        this.cards.push(card);
    }
}