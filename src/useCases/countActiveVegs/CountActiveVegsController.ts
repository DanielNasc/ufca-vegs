import { Response } from "express";
import { CountActiveVegsUseCase } from "./CountActiveVegsUseCase";

export class CountActiveVegsController {
	constructor(private countActiveVegsUseCase: CountActiveVegsUseCase) { }

	async handle(res: Response) {
		const activeVegs = await this.countActiveVegsUseCase.execute();

		return res.json({ activeVegs });
	}
}