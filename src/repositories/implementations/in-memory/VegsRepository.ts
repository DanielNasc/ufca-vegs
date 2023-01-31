import { Veg } from "../../../model/Veg";
import { ICreateVegDTO, IUpdateCardPropsDTO, IVegsRepository } from "../../IVegsRepository"

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

  async listAllVegs(): Promise<Veg[]> {
    return [...this.stupidDatabase];
  }

  async createVeg(props: ICreateVegDTO): Promise<string> {
    const newVeg = new Veg(props);

    this.stupidDatabase.push(newVeg);

    return newVeg.id;
  }

  async getIdByCard(card: number): Promise<string | undefined> {
    const i = this.stupidDatabase.findIndex(veg => veg.card === card);

    return i > -1 ? this.stupidDatabase[i].id : undefined;
  }

  async getById(id: string): Promise<Veg | null> {
    if (!id) return null

    return this.stupidDatabase.find(veg => veg.id === id) ?? null;
  }

  async removeVeg(id: string): Promise<void> {
    const index = this.stupidDatabase.findIndex(veg => veg.id === id);

    this.stupidDatabase.splice(index, 1);
  }

  async updateCard({ id, card }: IUpdateCardPropsDTO): Promise<void> {
    const veg = await this.getById(id);

    if (!veg)
      return;

    veg.card = card;
  }
}
