import { Veg } from "../../model/Veg";
import { ICreateVegDTO, IUpdateCardPropsDTO, IVegsRepository } from "../IVegsRepository";

export class VegsRepository implements IVegsRepository {
    private stupidDatabase: Veg[];
    private static INSTANCE: VegsRepository;

    constructor() {
        this.stupidDatabase = [];
    }

    public static getInstance(): VegsRepository {
        if (!VegsRepository.INSTANCE) {
            VegsRepository.INSTANCE = new VegsRepository()
        }

        return VegsRepository.INSTANCE
    }

    createVeg(props: ICreateVegDTO): void {
        const newVeg = new Veg(props);

        this.stupidDatabase.push(newVeg);
    }

    getByCard(card: number): Veg | undefined {
        return this.stupidDatabase.find(veg => veg.card === card);
    }

    getById(id: string): Veg | undefined {
        return this.stupidDatabase.find(veg => veg.id === id);
    }

    removeVeg(id: string): void {
        const index = this.stupidDatabase.findIndex(veg => veg.id === id);

        if (index > -1)
            this.stupidDatabase.splice(index, 1);
    }

    countActiveVegs(): number {
        return this.stupidDatabase.map(veg => veg.inactive === true).length;
    }

    changeInactive(id: string):void {
        const veg = this.getById(id)

        if (veg)
            veg.inactive = !veg.inactive
    }

    updateCard({ id, card }: IUpdateCardPropsDTO): void {
        const veg = this.getById(id)

        if (!veg)
            return

        veg.card = card
    }
}