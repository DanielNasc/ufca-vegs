import { VegsRepository } from "../../repositories/implementations/VegsRepository";

export class CountActiveVegsUseCase {
	constructor(private vegsRepository: VegsRepository) {}

	execute() {
		let meal: "lunch" | "dinner";
		const newDate = new Date();
		const hour = newDate.getHours();
		const day = newDate.toLocaleDateString("en", {weekday: "short"}).toLocaleLowerCase();
		
		if (hour > 14)
			meal = "lunch";
		else 
			meal = "dinner";

		return this.vegsRepository.countActiveVegs(meal, day);
	}
}