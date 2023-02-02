import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError"
import { AdminsRepository } from "../repositories/implementations/postgres/AdminsRepository";

interface IPayload {
  id: string;
}

export async function ensureAuthenticated(req: Request, _: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("missing authorization header", 400)

  const [, token] = authHeader.split(" ");

  try {
    const { id } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    const adminsRepository = new AdminsRepository

    if (!(await adminsRepository.getById(id))) throw new AppError("Invalid token");

    return next()
  } catch {
    throw new AppError("Invalid token")
  }
}
