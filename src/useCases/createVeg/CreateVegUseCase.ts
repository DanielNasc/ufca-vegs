import { AppError } from "../../errors/AppError";
import { IMealReservationsRepository } from "../../repositories/IMealReservationsRepository";
import { IVegsRepository } from "../../repositories/IVegsRepository";
import { MealProvider } from "../../utils/MealProvider";

interface IRequestReservation {
  day: string;
  meal: "lunch" | "dinner";
}

interface ICreateVegProps {
  card: number;
  name: string;
  schedule: IRequestReservation[];
}

export class CreateVegUseCase {
  constructor(
    private vegsRepository: IVegsRepository,
    private mealReservationsRepository: IMealReservationsRepository
  ) { }

  async execute({ card, name, schedule }: ICreateVegProps): Promise<boolean> {
    if (await this.vegsRepository.getIdByCard(card))
      throw new AppError("This card is already in use", 409);

    const user_id = await this.vegsRepository.createVeg({ card, name }); // cria novo vegetariano
    
    const currentMeal = MealProvider.getInstance().getMeal(); // pega a refeição atual

    let willComeToday = false;

    for (const reservation of schedule) {
      this.mealReservationsRepository.addNewReservation({
        user_id,
        meal: reservation.meal,
        day: reservation.day
      })

      if (reservation.day === currentMeal?.day && reservation.meal === currentMeal?.meal)
        willComeToday = true;
    }

    return willComeToday
  }
}
