import { Router } from "express";

import { authenticateAdminController } from "../useCases/authenticate"

const adminsRouter = Router()

adminsRouter.post("/login", (req, res) => authenticateAdminController.handle(req, res))

export { adminsRouter }
