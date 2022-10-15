import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { DeleteVegController } from "./DeleteVegController";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

const vegsRepository = VegsRepository.getInstance();
const deleteVegUseCase = new DeleteVegUseCase(vegsRepository);
export const deleteVegController = new DeleteVegController(deleteVegUseCase);