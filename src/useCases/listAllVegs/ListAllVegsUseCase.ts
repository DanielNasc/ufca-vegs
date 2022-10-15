import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class ListAllVegsUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute() {
		return this.vegsRepository.listAllVegs();
	}
}