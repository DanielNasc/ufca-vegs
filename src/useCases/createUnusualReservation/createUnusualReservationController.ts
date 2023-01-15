import { Request, Response } from "express";
import { CreateUnusualReservationUseCase } from "./createUnusualReservationUseCase";

export class CreateUnusualReservationController {
  constructor(private createUnusualReservationUseCase: CreateUnusualReservationUseCase) { }

  async handle(req: Request, res: Response) {
    const { unusualReservations, card, is_permanent } = req.body

    await this.createUnusualReservationUseCase.execute({ card, unusualReservations, is_permanent })

    return res.status(201).send("created")
  }
}
