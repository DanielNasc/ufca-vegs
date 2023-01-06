import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { DeleteVegController } from "./DeleteVegController";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

const vegsRepository = new VegsRepository();
const mealReservationsRepository = new MealReservationsRepository();
const deleteVegUseCase = new DeleteVegUseCase(vegsRepository, mealReservationsRepository);
export const deleteVegController = new DeleteVegController(deleteVegUseCase);