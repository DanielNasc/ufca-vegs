import { v4 as uuidV4 } from "uuid";

interface IReservation {
	day: "mon" | "tues" | "wed" | "thurs" | "fri";
	meal: "lunch" | "dinner";
}

interface IVegProps {
    card: number;
    inactive: boolean;
	schedule: IReservation[]
}

export class Veg implements IVegProps{
	id: string;
	card;
	inactive;
	schedule;

	constructor({ card, inactive, schedule }: IVegProps) {
		this.id = uuidV4();
		this.card = card;
		this.inactive = inactive;
		this.schedule = schedule;
	}
}