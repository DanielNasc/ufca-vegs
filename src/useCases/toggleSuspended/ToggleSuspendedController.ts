import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ToggleSuspendedUseCase } from "./ToggleSuspendedUseCase";

export class ToggleSuspendedController {
    constructor(private toggleSuspendedUseCase: ToggleSuspendedUseCase) {}

    async handle(request: Request, response: Response) {
        const card = parseInt(request.params.card);

        if (isNaN(card)) {
            throw new AppError("The card should be a number")
        }

        await this.toggleSuspendedUseCase.execute(card)

        return response.status(200).send("updated")
    }
}