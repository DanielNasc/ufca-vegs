import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";
import { CreateUnusualReservationController } from "./createUnusualReservationController";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

const mealReservationsRepository = MealReservationsRepository.getInstance()
const vegsRepository = VegsRepository.getInstance()
const createUnusualReservationUseCase = new CreateUnusualReservationUseCase(mealReservationsRepository, vegsRepository)
export const createUnusualReservationController = new CreateUnusualReservationController(createUnusualReservationUseCase)