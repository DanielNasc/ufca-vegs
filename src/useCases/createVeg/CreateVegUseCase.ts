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

		const newVeg = this.vegsRepository.createVeg({card, name, schedule}); // cria novo vegetariano
		this.mealReservationsRepository.addNewCard(newVeg) // adiciona o usuario à tabela de reservas

		const {day, hour} = getDayAndHour();

		const willComeToday = newVeg.scheduleTable[day][getMeal(hour)]

		if (willComeToday)
			this.mealReservationsRepository.increaseCounter()
		
		return willComeToday
	}
}