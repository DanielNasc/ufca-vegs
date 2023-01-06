import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";

export class GetScheduleTableUseCase {
    constructor(private vegsRepository: VegsRepository,
        private mealReservationsRepository: MealReservationsRepository) { }

    async execute(card: number) {
        const user_id = await this.vegsRepository.getIdByCard(card)

        if (!user_id) return null

        return await this.mealReservationsRepository.sendScheduleTableOfVeg(user_id)
    }
}