import {Router} from "express"

import * as authController from "../controllers/auth.controller"
import { registerValidator } from "../validators/auth.validators"
import { validateRequest } from "../middleware/validateRequest.middleware"

const router = Router()

router.post("/register",registerValidator,validateRequest,authController.register)

export default router