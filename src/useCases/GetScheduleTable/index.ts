import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { GetScheduleTableController } from "./GetScheduleTableController";
import { GetScheduleTableUseCase } from "./GetScheduleTableUseCase";

const vegsRepository = new VegsRepository()
const mealReservationsRepository = new MealReservationsRepository()
const getScheduleTableUseCase = new GetScheduleTableUseCase(vegsRepository, mealReservationsRepository)
export const getScheduleTableController = new GetScheduleTableController(getScheduleTableUseCase)