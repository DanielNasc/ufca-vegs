import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { SocketIoService } from "../../services/SocketIo";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";

interface IRequestUnusualReservation {
    card: number;
    unusualReservations: {
        day: Days;
        meal: "lunch" | "dinner";
        will_come: boolean;
    }[]
}

const socketIoService = SocketIoService.getInstance()

export class CreateUnusualReservationUseCase {
    constructor( private mealReservationsRepository: MealReservationsRepository,
                private vegsRepository: VegsRepository ) {}

    execute({card, unusualReservations}: IRequestUnusualReservation) {
        const { day: today, hour } = getDayAndHour()
        const curr_meal = getMeal(hour)
        const user_id = this.vegsRepository.getIdByCard(card)

        if (!user_id) return

        for (const unusualReservation of unusualReservations) {
            const { day, meal, will_come } = unusualReservation;
            
            if (
                this.mealReservationsRepository.addNewUnusualReservation({ user_id, day, meal, will_come }) &&
                day === today && 
                curr_meal === meal
                ) {

                if (will_come) {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        socketIoService.broadcast("increment");
                    })()
                }
                else {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        socketIoService.broadcast("decrement")
                    })()
                }
            }
        }
    }
}