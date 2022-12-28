import { Request, Response } from "express";
import { SocketIoService } from "../../services/SocketIo";
import { DeleteVegUseCase } from "./DeleteVegUseCase";

export class DeleteVegController {
	constructor(private deleteVegUseCase: DeleteVegUseCase) {}

	handle(req: Request, res: Response) {
		const { card } = req.body;

		const hasReservation = this.deleteVegUseCase.execute(card);

		if (hasReservation) {
			SocketIoService.getInstance().broadcast("decrement")
		}

		return res.status(204).send();
	}
}