import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { CountActiveVegsController } from "./CountActiveVegsController";
import { CountActiveVegsUseCase } from "./CountActiveVegsUseCase";

const vegsRepository = VegsRepository.getInstance();
const countActiveVegsUseCase = new CountActiveVegsUseCase(vegsRepository);
export const countActiveVegsController = new CountActiveVegsController(countActiveVegsUseCase);