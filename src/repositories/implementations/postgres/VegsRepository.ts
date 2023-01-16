import { Prisma, PrismaClient, Vegetarian } from "@prisma/client";

// import { Veg } from "../../../model/Veg";
import { ICreateVegDTO, IUpdateCardPropsDTO, IVegsRepository } from "../../IVegsRepository";

const prisma = new PrismaClient();

export class VegsRepository implements IVegsRepository {
  async listAllVegs(): Promise<Partial<Vegetarian>[]> // manda todos os vegs
  {
    const vegs = await prisma.vegetarian.findMany({
      select: {
        absences: true,
        card: true,
        name: true
      }
    });

    return vegs;
  }

  async createVeg({ card, name }: ICreateVegDTO): Promise<string> // cria novo obj p um vegetariano
  {
    const newVeg = await prisma.vegetarian.create({
      data: {
        card, name
      }
    })

    return newVeg.id
  }

  async getIdByCard(card: number): Promise<string | undefined> {
    const i = await prisma.vegetarian.findFirst({
      where: {
        card
      }
    })

    return i ? i.id : undefined;
  }

  async getById(id: string): Promise<Vegetarian | null> {
    const veg = await prisma.vegetarian.findUnique({
      where: {
        id
      }
    })

    return veg;
  }

  async removeVeg(id: string): Promise<void> // remove o vegetariano do banco de dados
  {
    await prisma.vegetarian.delete({
      where: {
        id
      }
    })
  }

  async updateCard({ id, card }: IUpdateCardPropsDTO): Promise<void> // atualiza o numero do cartao de um veg
  {
    await prisma.vegetarian.update({
      where: {
        id
      },
      data: {
        card
      }
    })
  }
}
