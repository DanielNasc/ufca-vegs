import { Response } from "express";
import { ListAllVegsUseCase } from "./ListAllVegsUseCase";

export class ListAllVegsController {
	constructor(private listAllVegsUseCase: ListAllVegsUseCase) { }

	async handle(res: Response) {
		return res.json(await this.listAllVegsUseCase.execute());
	}
}