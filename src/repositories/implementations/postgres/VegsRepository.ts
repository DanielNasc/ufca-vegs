import { PrismaClient, Vegetarian } from "@prisma/client";

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
        name: true,
        attendances: true
      }
    });

    return vegs;
  }

  async vegsWithNameLike(name: string): Promise<Partial<Vegetarian>[]> {
    const vegs = await prisma.vegetarian.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      select: {
        name: true,
        card: true,
        absences: true,
        attendances: true
      }
    })


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

  async getVegByCard(card: number): Promise<Vegetarian | null> {
    const veg = await prisma.vegetarian.findFirst({
      where: {
        card
      }
    })

    return veg;
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
    prisma.mealReservation.deleteMany({
      where: {
        user_id: id
      }
    })

    await prisma.mealReservation.deleteMany({
      where: {
        user_id: id
      }
    })

    await prisma.vegetarian.delete({
      where: {
        id
      }
    })
  }

  async updateCard({ old_card, new_card }: IUpdateCardPropsDTO): Promise<void> // atualiza o numero do cartao de um veg
  {
    await prisma.vegetarian.update({
      where: {
        card: old_card
      },
      data: {
        card: new_card
      }
    })
  }

  async decrementAbsences(id: string): Promise<void> {
    // só decrementa se o numero de faltas for maior que 0
    await prisma.vegetarian.updateMany({
      where: {
        id,
        absences: {
          gt: 0
        }
      },
      data: {
        absences: {
          decrement: 1
        }
      }
    })
  }

  async resetAbsences(id: string): Promise<void> {
    await prisma.vegetarian.update({
      where: {
        id
      },
      data: {
        absences: 0
      }
    })
  }

  async incrementAttendance(id: string): Promise<void> {
    await prisma.vegetarian.update({
      where: {
        id
      },
      data: {
        attendances: {
          increment: 1
        }
      }
    })
  }
}
