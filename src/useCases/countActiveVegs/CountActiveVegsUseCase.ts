import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class CountActiveVegsUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute() {
		return this.vegsRepository.countActiveVegs();
	}
}