import { v4 as uuidV4 } from "uuid";
import { Days } from "../utils/types";

interface IReservation {
	day: Days;
	meal: "lunch" | "dinner";
}

interface IVegProps {
    card: number;
	name: string;
	schedule: IReservation[]
}
type ScheduleTable = {
	[key in Days]: {
		lunch: boolean;
		dinner: boolean;
	}
}

const days: Days[] = ["mon", "tue", "wed", "thu", "fri"];

export class Veg {
	id: string;
	card: number;
	name: string;
	scheduleTable: ScheduleTable;

	constructor({ card, name, schedule }: IVegProps) {
		this.id = uuidV4();
		this.card = card;
		this.name = name

		this.scheduleTable = {} as ScheduleTable;
		for (const day of days) {
			this.scheduleTable[day] = {
				lunch: false,
				dinner: false
			};
		}

		this.createScheduleTable(schedule);
	}

	createScheduleTable(schedule: IReservation[]) {
		for (const reservation of schedule) {
			this.scheduleTable[reservation["day"]][reservation["meal"]] = true;
		}
	}
}