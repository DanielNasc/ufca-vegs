import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";

export class CountActiveVegsUseCase {
	constructor(private mealReservationsRepository: MealReservationsRepository) { }

	async execute() {
		// numero de vegs que vão comer hj ou null
		return (await this.mealReservationsRepository.countActiveVegs());
	}
}