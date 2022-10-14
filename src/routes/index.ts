import { Router } from "express";
import { vegsRouter } from "./vegs.routes";

const router = Router()

router.use("/vegs", vegsRouter)

export { router }