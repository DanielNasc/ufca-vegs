import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { GetScheduleTableController } from "./GetScheduleTableController";
import { GetScheduleTableUseCase } from "./GetScheduleTableUseCase";

const vegsRepository = VegsRepository.getInstance()
const getScheduleTableUseCase = new GetScheduleTableUseCase(vegsRepository)
export const getScheduleTableController = new GetScheduleTableController(getScheduleTableUseCase)