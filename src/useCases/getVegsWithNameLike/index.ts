import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { GetVegsWithNameLikeController } from "./GetVegsWithNameLikeController";
import { GetVegsWithNameLikeUseCase } from "./GetVegsWithNameLikeUseCase";

const vegsRepository = new VegsRepository();
const getVegsWithNameLikeUseCase = new GetVegsWithNameLikeUseCase(vegsRepository);
export const getVegsWithNameLikeController = new GetVegsWithNameLikeController(getVegsWithNameLikeUseCase);