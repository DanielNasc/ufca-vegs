import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";

export class CountActiveVegsUseCase {
	constructor(private mealReservationsRepository: MealReservationsRepository) { }

	execute() {
		// numero de vegs que vão comer hj ou null
		return this.mealReservationsRepository.countActiveVegs();
	}
}