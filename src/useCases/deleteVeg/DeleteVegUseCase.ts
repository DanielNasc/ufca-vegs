import { IMealReservationsRepository } from "../../repositories/IMealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { MealProvider } from "../../utils/MealProvider";

export class DeleteVegUseCase {
	constructor(
		private vegsRepository: VegsRepository,
		private mealReservationsRepository: IMealReservationsRepository
	) { }

	async execute(card: number): Promise<boolean> {
		const currentMeal = MealProvider.getInstance().getMeal();

		const user_id = await this.vegsRepository.getIdByCard(card);

		if (!user_id)
			throw new Error("this veg doesnt exist");

		let vegWillCome = false;

		if (currentMeal) {
			vegWillCome = !!(await this.mealReservationsRepository.checkIfVegWillComeInMeal({ user_id, ...currentMeal }))
		}

		await this.vegsRepository.removeVeg(user_id);

		return vegWillCome;
	}
}