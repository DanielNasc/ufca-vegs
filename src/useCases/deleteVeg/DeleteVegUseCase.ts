import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class DeleteVegUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute(card: number) {
		const id = this.vegsRepository.getIdByCard(card);

		if (!id)
			throw new Error("this veg doesnt exist");

		this.vegsRepository.removeVeg(id);
	}
}