import { Request, Response } from "express";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

export class DeleteVegController {
	constructor(private deleteVegUseCase: DeleteVegUseCase) {}

	handle(req: Request, res: Response) {
		const { card } = req.body;

		this.deleteVegUseCase.execute(card);

		return res.status(204).send();
	}
}