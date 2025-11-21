import {Router} from "express"

import * as authController from "../controllers/auth.controller"
import { loginValidator, registerValidator } from "../validators/auth.validators"
import { validateRequest } from "../middleware/validateRequest.middleware"
import { ProtectRoute } from "../middleware/auth.middleware";

const router = Router()

router.post("/register",registerValidator,validateRequest,authController.register)
router.post("/login",loginValidator,validateRequest,authController.login)
router.get("/me",ProtectRoute,authController.me)
router.get("/logout",authController.logout)
router.post("/refresh-token",authController.refreshToken)

export default router