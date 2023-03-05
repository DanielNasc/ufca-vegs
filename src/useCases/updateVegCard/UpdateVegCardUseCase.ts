import { IVegsRepository } from "../../repositories/IVegsRepository";

interface IUpdateVegCardUseCaseProps {
    old_card: number;
    new_card: number;
}

export class UpdateVegCardUseCase {
    constructor(
        private vegsRepository: IVegsRepository
    ) {}

    async execute(props: IUpdateVegCardUseCaseProps) {
        await this.vegsRepository.updateCard(props)
    }
}