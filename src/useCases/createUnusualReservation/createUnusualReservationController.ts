import { Request, Response } from "express";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

export class CreateUnusualReservationController {
    constructor(private createUnusualReservationUseCase: CreateUnusualReservationUseCase) {}

    handle(req: Request, res: Response) {
        const { unusualReservations, card } = req.body

        this.createUnusualReservationUseCase.execute({card, unusualReservations})

        return res.status(201).send("created")
    }
}