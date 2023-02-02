import { AdminsRepository } from "../../repositories/implementations/postgres/AdminsRepository";
import { AuthenticateAdminController } from "./AuthenticateAdminController";
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase";

const adminsRepository = new AdminsRepository()
const authenticateAdminUseCase = new AuthenticateAdminUseCase(adminsRepository)
export const authenticateAdminController = new AuthenticateAdminController(authenticateAdminUseCase)
