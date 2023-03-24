import { IVegsRepository } from "../../repositories/IVegsRepository";

export class GetVegsWithNameLikeUseCase {
    constructor(private vegsRepository: IVegsRepository) {}

    async execute(name: string) {
        const vegs = await this.vegsRepository.vegsWithNameLike(name);

        return vegs;
    }
}