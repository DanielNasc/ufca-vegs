import { IMealReservationsRepository } from "../../repositories/IMealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";

export class DeleteVegUseCase {
	constructor(
		private vegsRepository: VegsRepository,
		private mealReservationsRepository: IMealReservationsRepository
	) { }

	execute(card: number): boolean {
		const { day, hour } = getDayAndHour()
		const meal = getMeal(hour)

		const id = this.vegsRepository.getIdByCard(card);

		if (!id)
			throw new Error("this veg doesnt exist");

		const vegWillCome = this.mealReservationsRepository.checkIfVegWillComeInMeal({ id, day, meal });

		this.vegsRepository.removeVeg(id);

		return !!vegWillCome;
	}
}