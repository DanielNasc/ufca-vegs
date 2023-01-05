import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";
import { CreateVegController } from "./CreateVegController";
import { CreateVegUseCase } from "./CreateVegUseCase";

const vegsRepository = VegsRepository.getInstance();
const mealReservationsRepository = MealReservationsRepository.getInstance()
const createVegUseCase = new CreateVegUseCase(vegsRepository, mealReservationsRepository);
export const createVegController = new CreateVegController(createVegUseCase);