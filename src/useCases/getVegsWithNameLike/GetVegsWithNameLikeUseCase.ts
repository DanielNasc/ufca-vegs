import { IVegsRepository } from "../../repositories/IVegsRepository";

export class GetVegsWithNameLikeUseCase {
    constructor(private vegsRepository: IVegsRepository) {}

    async execute(name: string) {
        if (name.toUpperCase() === "_ALL") {
            return await this.vegsRepository.listAllVegs();
        }

        const vegs = await this.vegsRepository.vegsWithNameLike(name);

        return vegs;
    }
}