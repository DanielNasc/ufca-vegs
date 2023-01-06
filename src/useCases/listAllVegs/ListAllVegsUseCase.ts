import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";

export class ListAllVegsUseCase {
	constructor(private vegsRepository: VegsRepository) { }

	async execute() {
		return await this.vegsRepository.listAllVegs();
	}
}