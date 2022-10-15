import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { ChangeInactiveController } from "./ChangeInactiveController";
import { ChangeInactiveUseCase } from "./ChangeInactiveUseCase";

const vegsRepository = VegsRepository.getInstance();
const changeInactiveUseCase = new ChangeInactiveUseCase(vegsRepository);
export const changeInactiveController = new ChangeInactiveController(changeInactiveUseCase);