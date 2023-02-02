import { Admins } from "@prisma/client";

export interface IAdminsRepository {
  getAdminByEmail(email: string): Promise<Admins | null>;
}
