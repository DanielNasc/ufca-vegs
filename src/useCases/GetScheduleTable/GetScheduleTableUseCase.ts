import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class GetScheduleTableUseCase {
    constructor(private vegsRepository: VegsRepository) {}

    execute(card: number) {
        return this.vegsRepository.getScheduleTable(card)
    }
}