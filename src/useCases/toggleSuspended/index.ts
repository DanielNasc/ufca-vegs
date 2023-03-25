import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { ToggleSuspendedController } from "./ToggleSuspendedController";
import { ToggleSuspendedUseCase } from "./ToggleSuspendedUseCase";

const vegsRepository = new VegsRepository()
const toggleSuspendedUseCase = new ToggleSuspendedUseCase(vegsRepository)
export const toggleSuspendedController = new ToggleSuspendedController(toggleSuspendedUseCase)