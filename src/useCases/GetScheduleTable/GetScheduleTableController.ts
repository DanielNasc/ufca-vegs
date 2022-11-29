import { Request, Response } from "express";
import { GetScheduleTableUseCase } from "./GetScheduleTableUseCase";

export class GetScheduleTableController {
    constructor(private getScheduleTableUseCase: GetScheduleTableUseCase) {}

    handle(req: Request, res: Response) {
        const {card}  = req.params

        return res.json(this.getScheduleTableUseCase.execute(Number(card)))
    }
}