import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { CreateUnusualReservationController } from "./createUnusualReservationController";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

const mealReservationsRepository = new MealReservationsRepository()
const vegsRepository = new VegsRepository()
const createUnusualReservationUseCase = new CreateUnusualReservationUseCase(mealReservationsRepository, vegsRepository)
export const createUnusualReservationController = new CreateUnusualReservationController(createUnusualReservationUseCase)