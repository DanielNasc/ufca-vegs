import { VegsRepository } from "../../repositories/implementations/VegsRepository";

interface IReservation {
	day: "mon" | "tues" | "wed" | "thurs" | "fri";
	meal: "lunch" | "dinner";
}

interface ICreateVegProps {
	card: number;
	schedule: IReservation[];
}

export class CreateVegUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute({card, schedule}: ICreateVegProps) {
		if (this.vegsRepository.getIdByCard(card))
			throw new Error("This card is already in use");

		this.vegsRepository.createVeg({card, inactive: false, schedule});
	}
}