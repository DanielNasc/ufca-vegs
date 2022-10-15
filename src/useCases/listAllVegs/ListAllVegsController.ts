import { Response } from "express";
import { ListAllVegsUseCase } from "./ListAllVegsUseCase";

export class ListAllVegsController {
	constructor(private listAllVegsUseCase: ListAllVegsUseCase) {}

	handle(res: Response) {
		return res.json(this.listAllVegsUseCase.execute());
	}
}