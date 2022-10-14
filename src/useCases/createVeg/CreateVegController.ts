import { Request, Response } from "express";
import { CreateVegUseCase } from "./CreateVegUseCase";

export class CreateVegController {
    constructor(private createVegUseCase: CreateVegUseCase) {}

    handle(req: Request, res: Response) {
        const { card } = req.body;

        this.createVegUseCase.execute(parseInt(card));

        return res.status(201).send("Created")
    }
}