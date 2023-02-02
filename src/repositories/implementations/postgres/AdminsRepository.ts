import { Admins, PrismaClient } from "@prisma/client"
import { IAdminsRepository } from "../../IAdminsRepository"

const prismaClient = new PrismaClient()

export class AdminsRepository implements IAdminsRepository {
  async getByEmail(email: string): Promise<Admins | null> {
    const result = await prismaClient.admins.findUnique({
      where: {
        email
      }
    })

    return result;
  }

  async getById(id: string): Promise<Admins | null> {
    return await prismaClient.admins.findUnique({
      where: {
        id
      }
    })
  }
}
