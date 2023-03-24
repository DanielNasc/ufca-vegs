import { Request, Response } from "express";
import { GetVegsWithNameLikeUseCase } from "./GetVegsWithNameLikeUseCase";

export class GetVegsWithNameLikeController {
    constructor(private getVegsWithNameLikeUseCase: GetVegsWithNameLikeUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;

        try {
            const vegs = await this.getVegsWithNameLikeUseCase.execute(name);

            return response.status(200).json(vegs);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || "Unexpected error."
            });
        }
    }
}