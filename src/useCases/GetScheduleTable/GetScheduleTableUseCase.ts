import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";

export class GetScheduleTableUseCase {
    constructor(private vegsRepository: VegsRepository,
        private mealReservationsRepository: MealReservationsRepository) { }

    execute(card: number) {
        const id = this.vegsRepository.getIdByCard(card)

        if (!id) return null

        return this.mealReservationsRepository.sendScheduleTableOfVeg(id)
    }
}