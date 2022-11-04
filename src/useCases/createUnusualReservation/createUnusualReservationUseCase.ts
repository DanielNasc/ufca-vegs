import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { SocketIoService } from "../../services/SocketIo";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";

interface IRequestUnusualReservation {
    card: number;
    day: Days;
    meal: "lunch" | "dinner";
    will_come: boolean;
}

const socketIoService = SocketIoService.getInstance()

export class CreateUnusualReservationUseCase {
    constructor( private mealReservationsRepository: MealReservationsRepository ) {}

    execute(unusualReservations: Array<IRequestUnusualReservation>) {
        const { day: today, hour } = getDayAndHour()
        const curr_meal = getMeal(hour)

        for (const unusualReservation of unusualReservations) {
            const { card, day, meal, will_come } = unusualReservation;
            
            
            if (
                this.mealReservationsRepository.addNewUnusualReservation({ card, day, meal, will_come }) &&
                day === today && 
                curr_meal === meal
                ) {

                if (will_come) {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        this.mealReservationsRepository.increaseCounter()
                        socketIoService.broadcast("created");
                    })()
                }
                else {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        this.mealReservationsRepository.decreaseCounter(card, {day, meal})
                        socketIoService.broadcast("one passed")
                    })()
                }
            }
        }
    }
}