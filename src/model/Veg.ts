import { v4 as uuidV4 } from "uuid";
import { Days } from "../utils/types";

interface DayAndMealObj {
	day: Days;
	meal: "lunch" | "dinner";
}

interface IVegProps {
    card: number;
	name: string;
}

export class Veg {
	id: string;
	card: number;
	name: string;

	constructor({ card, name }: IVegProps) {
		this.id = uuidV4();
		this.card = card;
		this.name = name
	}
}