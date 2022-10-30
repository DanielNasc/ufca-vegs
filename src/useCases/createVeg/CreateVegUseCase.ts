import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";

interface IRequestReservation {
	day: Days;
	meal: "lunch" | "dinner";
}

interface ICreateVegProps {
	card: number;
	schedule: IRequestReservation[];
}

export class CreateVegUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute({card, schedule}: ICreateVegProps) {
		if (this.vegsRepository.getIdByCard(card))
			throw new Error("This card is already in use");

		const newVeg = this.vegsRepository.createVeg({card, schedule});
		const { day, hour } = getDayAndHour();
		const meal = getMeal(hour);

		if (this.vegsRepository.countActiveVegs() !== null && newVeg.scheduleTable[day][meal]) {
			this.vegsRepository.increaseCounter()
		}
	}
}