import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";
import { GetScheduleTableController } from "./GetScheduleTableController";
import { GetScheduleTableUseCase } from "./GetScheduleTableUseCase";

const vegsRepository = VegsRepository.getInstance()
const mealReservationsRepository = MealReservationsRepository.getInstance()
const getScheduleTableUseCase = new GetScheduleTableUseCase(vegsRepository, mealReservationsRepository)
export const getScheduleTableController = new GetScheduleTableController(getScheduleTableUseCase)