import {Router} from "express"

import * as authController from "../controllers/auth.controller"
import { loginValidator, registerValidator } from "../validators/auth.validators"
import { validateRequest } from "../middleware/validateRequest.middleware"

const router = Router()

router.post("/register",registerValidator,validateRequest,authController.register)
router.post("/login",loginValidator,validateRequest,authController.login)

export default router