import { v4 as uuidV4 } from "uuid";
import fs from "fs"

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

    addNewUnusualReservation({ card, will_come }: IUnusualReservations): boolean {
        // precisa inserir/remover/modificar dados se:
        // * um usuário não fixo disse que iria
        // * um usuário não fixo que disse que iria mudar de ideia e não ir mais
        // * um usuário fixo disse que não iria
        // * um usuário fixo que disse que não iria mudar de ideia e ir

        if (this.fixedCards.includes(card)) {
            if (!will_come) { // se um usuario fixo disse que não iria
                this.addToUnusualReservations({card, will_come}) // o dado é colocado na lista de incomuns
                return this.removeOne(card) // e ele é retirado da lista dos que vão comer hoje
            } else { // caso ele mude de ideia e diga que vai comer
                this.removeUnusualReservation(card) // o dado é removido as incomuns
                return this.addToWillComeToday({card, will_come}) // e ele volta para a lista dos que vão comer hoje
            }
        } else {
            if (will_come) { // se o usuário não fixo disse que iria comer hoje
                this.addToUnusualReservations({card, will_come}) // adiciona-se sua reserva a unusualReservations
                return this.addToWillComeToday({card, will_come}) // e o usuario à lista de quem irá comer hoje
            } else { // caso ele mude de ideia e diga que não vai
                this.removeUnusualReservation(card) // sua reserva é removida das incomuns
                return this.removeOne(card) // e ele é retirado da lista de quem irá comer hoje
            }
        }

    }

    addToWillComeToday(unusualReservation: IUnusualReservations) {
        if (unusualReservation.will_come) {
            if (!this.willComeToday.includes(unusualReservation.card)) {
                this.willComeToday.push(unusualReservation.card)
                return true
            }
            return false
        }
        else {
            return this.removeOne(unusualReservation.card)
        }
    }
    
    addToUnusualReservations(unusualReservation: IUnusualReservations) {
        const index = this.unusualReservations.findIndex(r => r.card === unusualReservation.card)

        if (index != -1) {
            this.unusualReservations[index].will_come = unusualReservation.will_come;
        } else {
            this.unusualReservations.push(unusualReservation)
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
        const didntComeToday = this.willComeToday
        
        const fileName = `${new Date()}-${uuidV4()}.json`

        if (!fs.existsSync("old"))
            fs.mkdirSync("old")

        fs.writeFile(`old/${fileName}`, 
                    JSON.stringify({didntComeToday, unusualReservations: this.unusualReservations}),
                    (err) => {
                        if (err) throw err
                    })

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

    removeUnusualReservation(card: number) {
        const index = this.unusualReservations.findIndex(r => r.card === card)
        
        
        if (index != -1) {
            this.unusualReservations.splice(index, 1);
            return true
        }
        
        return false
    }
}