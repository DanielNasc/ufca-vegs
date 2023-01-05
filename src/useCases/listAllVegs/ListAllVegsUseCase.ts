import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";

export class ListAllVegsUseCase {
	constructor(private vegsRepository: VegsRepository) { }

	execute() {
		return this.vegsRepository.listAllVegs();
	}
}