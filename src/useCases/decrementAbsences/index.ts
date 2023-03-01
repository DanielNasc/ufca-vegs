import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { DecrementAbsencesController } from "./DecrementAbsencesController";
import { DecrementAbsencesUseCase } from "./DecrementAbsencesUseCase";


const vegsRepository = new VegsRepository();
const decrementAbsencesUseCase = new DecrementAbsencesUseCase(vegsRepository);
export const decrementAbsencesController = new DecrementAbsencesController(decrementAbsencesUseCase);