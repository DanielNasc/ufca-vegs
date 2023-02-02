import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { AppError } from "../../errors/AppError";
import { AdminsRepository } from "../../repositories/implementations/postgres/AdminsRepository";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository
  ) { }

  async execute({ email, password }: IRequest) {
    const admin = await this.adminsRepository.getByEmail(email)

    if (!admin) throw new AppError("Invalid email or password", 400)

    const match = await bcrypt.compare(password, admin.password_hash)

    if (!match) throw new AppError("Invalid email or password", 400)

    const token = jwt.sign({
      id: admin.id,
      email: admin.email,
      name: admin.name
    }, process.env.JWT_SECRET as string, {
      expiresIn: "7 days"
    })

    return token
  }
}
