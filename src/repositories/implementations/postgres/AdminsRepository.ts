import { Admins, PrismaClient } from "@prisma/client"
import { IAdminsRepository } from "../../IAdminsRepository"

const prismaClient = new PrismaClient()

export class AdminsRepository implements IAdminsRepository {
  async getAdminByEmail(email: string): Promise<Admins | null> {
    const result = await prismaClient.admins.findUnique({
      where: {
        email
      }
    })

    return result;
  }
}
