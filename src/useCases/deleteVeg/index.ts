import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { DeleteVegController } from "./DeleteVegController";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

const vegsRepository = VegsRepository.getInstance();
const mealReservationsRepository = MealReservationsRepository.getInstance();
const deleteVegUseCase = new DeleteVegUseCase(vegsRepository, mealReservationsRepository);
export const deleteVegController = new DeleteVegController(deleteVegUseCase);