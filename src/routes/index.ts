import { Router } from "express";
import { adminsRouter } from "./admin.routes";
import { vegsRouter } from "./vegs.routes";

const router = Router();

router.use("/vegs", vegsRouter);
router.use("/admin", adminsRouter);

export { router };
