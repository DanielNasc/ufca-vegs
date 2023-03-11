import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { SocketIoService } from "../../services/SocketIo";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

export class DeleteVegController {
	constructor(private deleteVegUseCase: DeleteVegUseCase) { }

	async handle(req: Request, res: Response) {
		const card = parseInt(req.params.card);

        if (isNaN(card)) {
            throw new AppError("The card should be a number")
        }

		const hasReservation = await this.deleteVegUseCase.execute(card);

		if (hasReservation) {
			SocketIoService.getInstance().broadcast("decrement")
		}

		return res.status(204).send();
	}
}