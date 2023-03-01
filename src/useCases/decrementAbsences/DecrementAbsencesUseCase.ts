import { AppError } from "../../errors/AppError";
import { IVegsRepository } from "../../repositories/IVegsRepository";

export class DecrementAbsencesUseCase {
    constructor(
        private vegsRepository: IVegsRepository
    ) { }
    
    async execute(card: number): Promise<void> {
        const veg = await this.vegsRepository.getVegByCard(card);
    
        if (!veg) {
        throw new AppError("Vegetarian not found", 404);
        }
    
        if (veg.absences === 0) {
        throw new AppError("Vegetarian has no absences", 400);
        }
    
        await this.vegsRepository.decrementAbsences(veg.id);
    }
}