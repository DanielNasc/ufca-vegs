import { Request, Response } from "express";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

export class CreateUnusualReservationController {
    constructor(private createUnusualReservationUseCase: CreateUnusualReservationUseCase) {}

    handle(req: Request, res: Response) {
        const { unusualReservations } = req.body

        this.createUnusualReservationUseCase.execute(unusualReservations)

        return res.status(201).send("created")
    }
}