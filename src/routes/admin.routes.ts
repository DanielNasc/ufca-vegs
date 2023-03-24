import { Router } from "express";

import { authenticateAdminController } from "../useCases/authenticate"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const adminsRouter = Router()

adminsRouter.post("/login", (req, res) => authenticateAdminController.handle(req, res))

// router to check if the user is logged in when the page is opened
adminsRouter.get("/verify", ensureAuthenticated, (req, res) => {
    return res.status(200).json({
        message: "User is logged in",
        admin: {
            name: req.admin.name,
            email: req.admin.email,
        }
    })
})

adminsRouter.get("/default-profile-picture", (req, res) => {
    return res.sendFile("UFCA_LOGO.png", { root: "public" })
})

export { adminsRouter }
