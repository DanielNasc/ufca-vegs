import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { UpdateVegCardController } from "./UpdateVegCardController";
import { UpdateVegCardUseCase } from "./UpdateVegCardUseCase";

const vegsRepository = new VegsRepository();
const updateVegCardUseCase = new UpdateVegCardUseCase(vegsRepository);
export const updateVegCardController = new UpdateVegCardController(updateVegCardUseCase);
