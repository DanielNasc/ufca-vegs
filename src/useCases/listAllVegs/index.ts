import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { ListAllVegsController } from "./ListAllVegsController";
import { ListAllVegsUseCase } from "./ListAllVegsUseCase";

const vegsRepository = VegsRepository.getInstance();
const listAllVegsUseCase = new ListAllVegsUseCase(vegsRepository);
export const listAllVegsController = new ListAllVegsController(listAllVegsUseCase);