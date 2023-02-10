import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError"
import { AdminsRepository } from "../repositories/implementations/postgres/AdminsRepository";

interface IPayload {
  id: string;
}

export async function ensureAuthenticated(req: Request, _: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) throw new AppError("Missing authorization token", 401)

  try {
    const { id } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    const adminsRepository = new AdminsRepository()

    if (!(await adminsRepository.getById(id))) throw new AppError("Invalid token", 401);

    return next()
  } catch {
    throw new AppError("Invalid token", 401)
  }
}
