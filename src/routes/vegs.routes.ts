import { Router } from "express";

import { countActiveVegsController } from "../useCases/countActiveVegs";
import { createVegController } from "../useCases/createVeg";
import { deleteVegController } from "../useCases/deleteVeg";
import { listAllVegsController } from "../useCases/listAllVegs";

const vegsRouter = Router();

vegsRouter.get("/", (_, res) => listAllVegsController.handle(res));
vegsRouter.post("/", (req, res) => createVegController.handle(req, res));
vegsRouter.delete("/", (req, res) => deleteVegController.handle(req, res));

vegsRouter.get("/count", (_, res) => countActiveVegsController.handle(res));

export { vegsRouter };