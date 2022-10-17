import { Request, Response } from "express";
import { CreateVegUseCase } from "./CreateVegUseCase";

export class CreateVegController {
	constructor(private createVegUseCase: CreateVegUseCase) {}

	handle(req: Request, res: Response) {
		const { card, schedule } = req.body;

		this.createVegUseCase.execute({card: parseInt(card), schedule});

		return res.status(201).send("Created");
	}
}