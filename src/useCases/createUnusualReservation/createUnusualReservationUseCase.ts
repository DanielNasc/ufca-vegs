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
                 private vegsRepository: VegsRepository) {}

    execute({card, unusualReservations}: IRequestUnusualReservation) {
        const { day: today, hour } = getDayAndHour()
        const curr_meal = getMeal(hour)

        for (const unusualReservation of unusualReservations) {
            const { day, meal, will_come } = unusualReservation;
            this.vegsRepository.addUnusualReservation({card, day, meal, will_come})
            
            if (
                this.mealReservationsRepository.addNewUnusualReservation({ card, day, meal, will_come }) &&
                day === today && 
                curr_meal === meal
                ) {

                if (will_come) {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        this.mealReservationsRepository.upateCounter({day, meal})
                        socketIoService.broadcast("created");
                    })()
                }
                else {
                    this.mealReservationsRepository.countActiveVegs() != null && (() => {
                        this.mealReservationsRepository.removeCardFromToday(card, {day, meal})
                        socketIoService.broadcast("one passed")
                    })()
                }
            }
        }
    }
}