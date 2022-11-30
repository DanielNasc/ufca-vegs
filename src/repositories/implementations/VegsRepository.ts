import { Veg } from "../../model/Veg";
import { Days } from "../../utils/types";
import { IAddUnusualReservationProps, ICreateVegDTO, IReservation, IUpdateCardPropsDTO, IVegsRepository } from "../IVegsRepository";

export class VegsRepository implements IVegsRepository {
	private stupidDatabase: Veg[];
	private static INSTANCE: VegsRepository;

	constructor() {
		this.stupidDatabase = [];
	}
	
	public static getInstance(): VegsRepository {
		if (!VegsRepository.INSTANCE) {
			VegsRepository.INSTANCE = new VegsRepository();
		}

		return VegsRepository.INSTANCE;
	}

	listAllVegs(): Veg[] {
		return [...this.stupidDatabase];
	}

	createVeg(props: ICreateVegDTO): Veg {
		const newVeg = new Veg(props);

		this.stupidDatabase.push(newVeg);

		return newVeg;
	}

	getIdByCard(card: number): string | undefined {
		const i = this.stupidDatabase.findIndex(veg => veg.card === card);

		return i > -1 ? this.stupidDatabase[i].id : undefined;
	}

	getScheduleTable(card: number): { mon: { lunch: boolean; dinner: boolean; }; tue: { lunch: boolean; dinner: boolean; }; wed: { lunch: boolean; dinner: boolean; }; thu: { lunch: boolean; dinner: boolean; }; fri: { lunch: boolean; dinner: boolean; }; } | undefined{
		const scheduletable = this.getById(this.getIdByCard(card))?.scheduleTable
		
		return scheduletable
	}

	getById(id: string | undefined): Veg | undefined {
		if (!id) return undefined
		return this.stupidDatabase.find(veg => veg.id === id);
	}

	removeVeg(id: string): void {
		const index = this.stupidDatabase.findIndex(veg => veg.id === id);
		
		this.stupidDatabase.splice(index, 1);
	}

	updateCard({ id, card }: IUpdateCardPropsDTO): void {
		const veg = this.getById(id);

		if (!veg)
			return;

		veg.card = card;
	}

	addUnusualReservation({card, day, meal, will_come}: IAddUnusualReservationProps): void {
		const veg = this.getById(this.getIdByCard(card))

		if (veg) veg.scheduleTable[day][meal] = will_come
	}
	
	resetScheduledMeal(dayAndMeal: IReservation): void {
		for (let veg of this.stupidDatabase) {
			veg.resetScheduleTable(dayAndMeal)
		}
	}
}