// /src/routes/dashboard.route.ts
import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { dashboardValidator } from "../validators/dashboard.validator";
import { validateRequest } from "../middleware/validateRequest.middleware"

const router = Router();

router.get("/", dashboardValidator, validateRequest, getDashboard);

export default router;
