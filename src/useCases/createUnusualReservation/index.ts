import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { CreateUnusualReservationController } from "./createUnusualReservationController";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

const mealReservationsRepository = MealReservationsRepository.getInstance()
const createUnusualReservationUseCase = new CreateUnusualReservationUseCase(mealReservationsRepository)
export const createUnusualReservationController = new CreateUnusualReservationController(createUnusualReservationUseCase)