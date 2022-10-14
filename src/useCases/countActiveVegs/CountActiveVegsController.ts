import { Request, Response } from "express";
import { CountActiveVegsUseCase } from "./CountActiveVegsUseCase";

export class CountActiveVegsController {
    constructor(private countActiveVegsUseCase: CountActiveVegsUseCase) {}

    handle(res: Response) {
        const activeVegs = this.countActiveVegsUseCase.execute()

        return res.json({activeVegs})
    }
}