import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { DecrementAbsencesUseCase } from "./DecrementAbsencesUseCase";

export class DecrementAbsencesController {
    constructor(
        private decrementAbsencesUseCase: DecrementAbsencesUseCase
    ) { }
    
    async handle(request: Request, response: Response): Promise<Response> {
        const card = parseInt(request.params.card);

        if (isNaN(card)) {
            throw new AppError("The card should be a number")
        }
        
        await this.decrementAbsencesUseCase.execute(card);

        return response.status(200).send();
    }
}