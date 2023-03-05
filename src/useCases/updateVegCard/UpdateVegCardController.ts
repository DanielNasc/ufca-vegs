import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { UpdateVegCardUseCase } from "./UpdateVegCardUseCase";

export class UpdateVegCardController {
    constructor(
        private updateVegCardUseCase: UpdateVegCardUseCase
    ){}

    async handle(request: Request, response: Response) {
        var {old_card, new_card} = request.body;

        try {
            old_card = Number(old_card)
            new_card = Number(new_card)
            await this.updateVegCardUseCase.execute({old_card, new_card})
        } catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    return response.status(400).json({ message: "Card already exists."})
                }
            }
            
            return response.status(400).json({ message: "Unexpected error."})
        }

        return response.send()
    }
}