import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { SocketIoService } from "../../services/SocketIo";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";

interface IRequestUnusualReservation {
  card: number;
  is_permanent: boolean
  unusualReservations: {
    day: Days;
    meal: "lunch" | "dinner";
    will_come: boolean;
  }[]
}

const socketIoService = SocketIoService.getInstance()

export class CreateUnusualReservationUseCase {
  constructor(private mealReservationsRepository: MealReservationsRepository,
    private vegsRepository: VegsRepository) { }

  async execute({ card, unusualReservations, is_permanent }: IRequestUnusualReservation) {
    const { day: today, hour } = getDayAndHour()
    const curr_meal = getMeal(hour)
    const user_id = await this.vegsRepository.getIdByCard(card)

    if (!user_id) return

    for (const unusualReservation of unusualReservations) {
      const { day, meal, will_come } = unusualReservation;

      if (
        (await this.mealReservationsRepository.addNewUnusualReservation({ user_id, day, meal, will_come, is_permanent })) &&
        day === today &&
        curr_meal === meal
      ) {
        const counter = await this.mealReservationsRepository.countActiveVegs()

        if (will_come) {
          counter != null && (() => {
            socketIoService.broadcast("increment");
          })()
        }
        else {
          counter != null && (() => {
            socketIoService.broadcast("decrement")
          })()
        }
      }
    }
  }
}
