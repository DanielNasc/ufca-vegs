import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { CountActiveVegsController } from "./CountActiveVegsController";
import { CountActiveVegsUseCase } from "./CountActiveVegsUseCase";

const mealReservationsRepository = new MealReservationsRepository();
const countActiveVegsUseCase = new CountActiveVegsUseCase(mealReservationsRepository);
export const countActiveVegsController = new CountActiveVegsController(countActiveVegsUseCase);