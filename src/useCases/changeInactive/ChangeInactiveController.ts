import { Request, Response } from "express";

import { ChangeInactiveUseCase } from "./ChangeInactiveUseCase";

export class ChangeInactiveController {
	constructor(private changeInactiveUseCase: ChangeInactiveUseCase) {}

	handle(req: Request, res: Response) {
		const { card } = req.body;

		this.changeInactiveUseCase.execute(card);

		return res.status(200).send("updated");
	}
}