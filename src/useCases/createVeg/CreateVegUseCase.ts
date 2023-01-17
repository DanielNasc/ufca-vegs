import { AppError } from "../../AppError";
import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";

interface IRequestReservation {
  day: Days;
  meal: "lunch" | "dinner";
}

interface ICreateVegProps {
  card: number;
  name: string;
  schedule: IRequestReservation[];
}

export class CreateVegUseCase {
  constructor(
    private vegsRepository: VegsRepository,
    private mealReservationsRepository: MealReservationsRepository
  ) { }

  async execute({ card, name, schedule }: ICreateVegProps): Promise<boolean> {
    if (await this.vegsRepository.getIdByCard(card))
      throw new AppError("This card is already in use", 409);

    const user_id = await this.vegsRepository.createVeg({ card, name }); // cria novo vegetariano
    const { day, hour } = getDayAndHour();
    const meal = getMeal(hour);

    let willComeToday = false;

    for (const reservation of schedule) {
      this.mealReservationsRepository.addNewReservation({
        user_id,
        meal: reservation.meal,
        day: reservation.day
      })

      if (reservation.day === day && reservation.meal === meal)
        willComeToday = true;
    }

    return willComeToday
  }
}
