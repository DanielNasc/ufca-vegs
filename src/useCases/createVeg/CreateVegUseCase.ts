import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { Days } from "../../utils/types";

interface IReservation {
	day: Days;
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

		const newVeg = this.vegsRepository.createVeg({card, schedule});
		const {day, hour} = getDayAndHour();
		const meal = hour < 14 ? "lunch": "dinner";

		if (this.vegsRepository.countActiveVegs() !== null && newVeg.scheduleTable[day][meal]) {
			this.vegsRepository.increaseCounter()
		}
	}
}