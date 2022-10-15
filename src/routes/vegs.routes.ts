import { Router } from "express";

import { countActiveVegsController } from "../useCases/countActiveVegs";
import { createVegController } from "../useCases/createVeg";

const vegsRouter = Router();

vegsRouter.get("/", (_, res) => countActiveVegsController.handle(res));

vegsRouter.post("/", (req, res) => createVegController.handle(req, res));

export { vegsRouter };