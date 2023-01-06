import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { CreateVegController } from "./CreateVegController";
import { CreateVegUseCase } from "./CreateVegUseCase";

const vegsRepository = new VegsRepository();
const mealReservationsRepository = new MealReservationsRepository()
const createVegUseCase = new CreateVegUseCase(vegsRepository, mealReservationsRepository);
export const createVegController = new CreateVegController(createVegUseCase);