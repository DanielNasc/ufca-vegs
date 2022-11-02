import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { CountActiveVegsController } from "./CountActiveVegsController";
import { CountActiveVegsUseCase } from "./CountActiveVegsUseCase";

const mealReservationsRepository = MealReservationsRepository.getInstance();
const countActiveVegsUseCase = new CountActiveVegsUseCase(mealReservationsRepository);
export const countActiveVegsController = new CountActiveVegsController(countActiveVegsUseCase);