import { v4 as uuidV4 } from "uuid";

interface IUnusualReservations {
    card: number;
    will_come: boolean;
}


export class MealReservation {
    readonly id: string;
    fixedCards: number[];
    willComeToday: number[];
    unusualReservations: IUnusualReservations[];

    constructor() {
        this.id = uuidV4();
        this.fixedCards = []
        this.willComeToday = []
        this.unusualReservations = []
    }

    addNewCard(card: number): void {
        this.fixedCards.push(card);
    }

    addNewUnusualReservation({ card, will_come }: IUnusualReservations) {
        this.unusualReservations.push({card, will_come});
        this.addToWillComeToday({card, will_come});
    }

    addToWillComeToday(unusualReservation: IUnusualReservations) {
        if (unusualReservation.will_come) {
            if (!this.willComeToday.includes(unusualReservation.card))
                this.willComeToday.push(unusualReservation.card)
        }
        else {
            const index = this.willComeToday.indexOf(unusualReservation.card)

            if (index != -1) {
                this.willComeToday.splice(index, 1);
            }
        }
    }

    initializeWillComeTodat() {
        this.willComeToday = [...this.fixedCards]

        for (const unusualReservation of this.unusualReservations) {
            this.addToWillComeToday(unusualReservation)
        }
    }

    countCards(): number {
        return this.willComeToday.length;
    }
}