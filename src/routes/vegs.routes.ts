import { Router } from "express";
import { MealReservationsRepository } from "../repositories/implementations/MealReservationsRepository";

import { countActiveVegsController } from "../useCases/countActiveVegs";
import { createUnusualReservationController } from "../useCases/createUnusualReservation";
import { createVegController } from "../useCases/createVeg";
import { deleteVegController } from "../useCases/deleteVeg";
import { getScheduleTableController } from "../useCases/GetScheduleTable";
import { listAllVegsController } from "../useCases/listAllVegs";

const vegsRouter = Router();

vegsRouter.get("/", (_, res) => listAllVegsController.handle(res)); // [v]
vegsRouter.post("/", (req, res) => createVegController.handle(req, res)); // [v]
vegsRouter.delete("/", (req, res) => deleteVegController.handle(req, res)); // [v]

vegsRouter.get("/count", (_, res) => countActiveVegsController.handle(res)); // [x]

vegsRouter.post("/unusual", (req, res) => createUnusualReservationController.handle(req, res)); // [x]

vegsRouter.get("/scheduletable/:card", (req, res) => getScheduleTableController.handle(req, res)) // [x]

vegsRouter.get("/all", (_, res) => {
    return res.json(MealReservationsRepository.getInstance().getAllReservations())
}); // [x]

export { vegsRouter };