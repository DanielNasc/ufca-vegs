import { IVegsRepository } from "../../repositories/IVegsRepository";

export class ToggleSuspendedUseCase {
    constructor (private vegsRepository: IVegsRepository) {}

    async execute(card: number) {
        await this.vegsRepository.toggleSuspended(card)
    }
}