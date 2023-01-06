import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { ListAllVegsController } from "./ListAllVegsController";
import { ListAllVegsUseCase } from "./ListAllVegsUseCase";

const vegsRepository = new VegsRepository();
const listAllVegsUseCase = new ListAllVegsUseCase(vegsRepository);
export const listAllVegsController = new ListAllVegsController(listAllVegsUseCase);