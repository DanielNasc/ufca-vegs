import { Admins } from "@prisma/client";

export interface IAdminsRepository {
  getByEmail(email: string): Promise<Admins | null>;
  getById(id: string): Promise<Admins | null>;
}
