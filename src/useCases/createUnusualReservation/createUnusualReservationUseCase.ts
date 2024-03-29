import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { SocketIoService } from "../../services/SocketIo";
import { MealProvider } from "../../utils/MealProvider";

interface IRequestUnusualReservation {
  card: number;
  is_permanent: boolean
  unusualReservations: {
    day: string;
    meal: "lunch" | "dinner";
    will_come: boolean;
  }[]
}

const socketIoService = SocketIoService.getInstance()

export class CreateUnusualReservationUseCase {
  constructor(private mealReservationsRepository: MealReservationsRepository,
    private vegsRepository: VegsRepository) { }

  async execute({ card, unusualReservations, is_permanent }: IRequestUnusualReservation) {
    const currentMeal = MealProvider.getInstance().getMeal();

    const user_id = await this.vegsRepository.getIdByCard(card)

    if (!user_id) return

    for (const unusualReservation of unusualReservations) {
      const { day, meal, will_come } = unusualReservation;

      if (
        (await this.mealReservationsRepository.addNewUnusualReservation({ user_id, day, meal, will_come, is_permanent })) &&
        day === currentMeal?.day &&
        meal === currentMeal?.meal
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
