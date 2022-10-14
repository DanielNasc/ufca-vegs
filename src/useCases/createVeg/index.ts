import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { CreateVegController } from "./CreateVegController";
import { CreateVegUseCase } from "./CreateVegUseCase";

const vegsRepository = VegsRepository.getInstance();
const createVegUseCase = new CreateVegUseCase(vegsRepository);
export const createVegController = new CreateVegController(createVegUseCase);