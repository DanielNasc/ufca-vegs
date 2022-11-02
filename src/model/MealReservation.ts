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
        this.fixedCards.push(card); // adiciona-se o cartão do novo usuário à lista fixa
        this.willComeToday.push(card); // e também aos que virão hoje
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
            this.removeOne(unusualReservation.card)
        }
    }

    initializeWillComeToday() {
        this.willComeToday = [...this.fixedCards]

        for (const unusualReservation of this.unusualReservations) {
            this.addToWillComeToday(unusualReservation)
        }
    }

    countCards(): number {
        return this.willComeToday.length;
    }

    reset() {
        this.unusualReservations = []
        this.willComeToday = [...this.fixedCards]
    }

    removeOne(card: number) {
        const index = this.willComeToday.indexOf(card)

        if (index != -1) {
            this.willComeToday.splice(index, 1);
            return true
        }

        return false
    }
}