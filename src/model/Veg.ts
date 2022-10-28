import { v4 as uuidV4 } from "uuid";
import { Days } from "../utils/types";

interface IReservation {
	day: Days;
	meal: "lunch" | "dinner";
}

interface IVegProps {
    card: number;
	schedule: IReservation[]
}
interface ScheduleTable {
	[key: string]: {
		lunch: boolean;
		dinner: boolean;
	}
}

const days = ["mon", "tue", "wed", "thu", "fri"];

export class Veg {
	id: string;
	card: number;
	scheduleTable: ScheduleTable;

	constructor({ card, schedule }: IVegProps) {
		this.id = uuidV4();
		this.card = card;

		this.scheduleTable = {};
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