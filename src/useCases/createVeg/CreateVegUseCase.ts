import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
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
	name: string;
	schedule: IRequestReservation[];
}

export class CreateVegUseCase {
	constructor(
			private vegsRepository: VegsRepository,
			private mealReservationsRepository: MealReservationsRepository
			) {}

	execute({card, name, schedule}: ICreateVegProps) {
		if (this.vegsRepository.getIdByCard(card))
			throw new Error("This card is already in use");

		const newVegId = this.vegsRepository.createVeg({card, name}); // cria novo vegetariano
		const {day, hour} = getDayAndHour();
		const meal = getMeal(hour);

		let willComeToday = false;

		for (const reservation of schedule) {
			this.mealReservationsRepository.addNewReservation({
				id: newVegId,
				meal: reservation.meal,
				day: reservation.day
			})

			if (reservation.day === day && reservation.meal === meal)
				willComeToday = true;
		}
		
		return willComeToday
	}
}