import { Request, Response } from "express";
import { CreateVegUseCase } from "./CreateVegUseCase";
import { SocketIoService } from "../../services/SocketIo";

export class CreateVegController {
	constructor(private createVegUseCase: CreateVegUseCase) {}

	handle(req: Request, res: Response) {
		const { card, name, schedule } = req.body; // pega o cartão e a reservas que o usuário quer ( {day, meal} )

		if (
			this.createVegUseCase.execute({card: parseInt(card), name, schedule}) // retorna true se o usuário vai comer no dia
		)
			SocketIoService.getInstance().broadcast("increment"); // se ele for, anuncia p todo mundo aumentar um ao contador
		

		return res.status(201).send("Created");
	}
}