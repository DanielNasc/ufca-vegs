import { Request, Response } from "express";
import { GetScheduleTableUseCase } from "./GetScheduleTableUseCase";

export class GetScheduleTableController {
    constructor(private getScheduleTableUseCase: GetScheduleTableUseCase) { }

    async handle(req: Request, res: Response) {
        const { card } = req.params

        return res.json(await this.getScheduleTableUseCase.execute(Number(card)))
    }
}