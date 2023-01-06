import { IMealReservationsRepository } from "../../repositories/IMealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";

export class DeleteVegUseCase {
	constructor(
		private vegsRepository: VegsRepository,
		private mealReservationsRepository: IMealReservationsRepository
	) { }

	async execute(card: number): Promise<boolean> {
		const { day, hour } = getDayAndHour()
		const meal = getMeal(hour)

		const user_id = await this.vegsRepository.getIdByCard(card);

		if (!user_id)
			throw new Error("this veg doesnt exist");

		const vegWillCome = await this.mealReservationsRepository.checkIfVegWillComeInMeal({ user_id, day, meal });

		await this.vegsRepository.removeVeg(user_id);

		return !!vegWillCome;
	}
}