import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class CreateVegUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute(card: number) {
		if (this.vegsRepository.getByCard(card))
			throw new Error("This card is already in use");

		this.vegsRepository.createVeg({card, inactive: false});
	}
}