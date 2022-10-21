import { Veg } from "../../model/Veg";
import { ICreateVegDTO, IUpdateCardPropsDTO, IVegsRepository } from "../IVegsRepository";

export class VegsRepository implements IVegsRepository {
	private stupidDatabase: Veg[];
	private remainingVegs: number | null;
	private static INSTANCE: VegsRepository;

	constructor() {
		this.stupidDatabase = [];
		this.remainingVegs = null;
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

	getById(id: string): Veg | undefined {
		return this.stupidDatabase.find(veg => veg.id === id);
	}

	removeVeg(id: string): void {
		const index = this.stupidDatabase.findIndex(veg => veg.id === id);

		this.stupidDatabase.splice(index, 1);
	}

	initializeVegsCounter(meal: "lunch" | "dinner", day: string): void {
		this.remainingVegs = this.stupidDatabase.filter(veg => veg.scheduleTable[day][meal] != false).length;
	}

	clearCounter(): void {
		this.remainingVegs = null;
	}	

	countActiveVegs(): number | null {
		return this.remainingVegs;
	}

	increaseCounter(): void {
		if (this.remainingVegs)
			this.remainingVegs++;
	}

	decreaseCounter(): void {
		if (this.remainingVegs)
			this.remainingVegs--;
	}

	updateCard({ id, card }: IUpdateCardPropsDTO): void {
		const veg = this.getById(id);

		if (!veg)
			return;

		veg.card = card;
	}
}