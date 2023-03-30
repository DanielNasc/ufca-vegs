import { Vegetarian } from "@prisma/client";
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

  async getById(id: string): Promise<Vegetarian | null> {
    if (!id) return null

    return (this.stupidDatabase.find(veg => veg.id === id) ?? null) as Vegetarian | null;
  }

  async removeVeg(id: string): Promise<void> {
    const index = this.stupidDatabase.findIndex(veg => veg.id === id);

    this.stupidDatabase.splice(index, 1);
  }

  async updateCard(props: IUpdateCardPropsDTO): Promise<void> {}

  async vegsWithNameLike(name: string): Promise<Vegetarian[]> {
      return {} as any;
  }

  async getVegByCard(card: number): Promise<Vegetarian | null> {
      return {} as any;
  }

  async decrementAbsences(id: string): Promise<void> {}

  async resetAbsences(id: string): Promise<void> {}
  async incrementAttendance(id: string): Promise<void> {}
  async toggleSuspended(card: number): Promise<void> {}

}
