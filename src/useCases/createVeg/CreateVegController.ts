import { Request, Response } from "express";
import { CreateVegUseCase } from "./CreateVegUseCase";
import { SocketIoService } from "../../services/SocketIo";
import { getDayAndHour } from "../../utils/getDayAndHour";

export class CreateVegController {
	constructor(private createVegUseCase: CreateVegUseCase) {}

	handle(req: Request, res: Response) {
		const { card, schedule } = req.body;

		this.createVegUseCase.execute({card: parseInt(card), schedule});
		
		const {day, hour} = getDayAndHour();
            
		const reservation = schedule.find((reservation: any) => (reservation.day == day && reservation.meal === (hour < 14 ? "lunch": "dinner")));
		if (reservation)
			SocketIoService.getInstance().broadcast("created");
		

		return res.status(201).send("Created");
	}
}