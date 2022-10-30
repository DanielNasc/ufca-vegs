import { Veg } from "../../model/Veg";
import { Days } from "../../utils/types";
import { ICreateVegDTO, IUpdateCardPropsDTO, IVegsRepository } from "../IVegsRepository";

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

	getById(id: string): Veg | undefined {
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
}