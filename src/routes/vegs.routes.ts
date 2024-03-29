import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { countActiveVegsController } from "../useCases/countActiveVegs";
import { createUnusualReservationController } from "../useCases/createUnusualReservation";
import { createVegController } from "../useCases/createVeg";
import { decrementAbsencesController } from "../useCases/decrementAbsences";
import { deleteVegController } from "../useCases/deleteVeg";
import { getScheduleTableController } from "../useCases/GetScheduleTable";
import { getVegsWithNameLikeController } from "../useCases/getVegsWithNameLike";
import { listAllVegsController } from "../useCases/listAllVegs";
import { toggleSuspendedController } from "../useCases/toggleSuspended";
import { updateVegCardController } from "../useCases/updateVegCard";

const vegsRouter = Router();

vegsRouter.get("/", (_, res) => listAllVegsController.handle(res));
vegsRouter.get("/count", (_, res) => countActiveVegsController.handle(res));
vegsRouter.get("/scheduletable/:card", (req, res) => getScheduleTableController.handle(req, res));
vegsRouter.get("/search/:name", ensureAuthenticated, (req, res) => getVegsWithNameLikeController.handle(req, res));

vegsRouter.post("/", ensureAuthenticated, (req, res) => createVegController.handle(req, res));
vegsRouter.post("/unusual", ensureAuthenticated, (req, res) => createUnusualReservationController.handle(req, res));

vegsRouter.put("/decrementabsences/:card", ensureAuthenticated, (req, res) => decrementAbsencesController.handle(req, res));
vegsRouter.put("/togglesuspended/:card", ensureAuthenticated, (req, res) => toggleSuspendedController.handle(req, res));

vegsRouter.patch("/card", (req, res) => updateVegCardController.handle(req, res))

vegsRouter.delete("/:card", ensureAuthenticated, (req, res) => deleteVegController.handle(req, res));

export { vegsRouter };
