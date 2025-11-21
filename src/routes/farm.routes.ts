import { Router } from "express";
import * as farmController from "../controllers/farm.controller";
import { ProtectRoute } from "../middleware/auth.middleware";
import { createFarmValidator, updateFarmValidator } from "../validators/farm.validators";
import { validateRequest } from "../middleware/validateRequest.middleware";

const router = Router();

router.post("/", ProtectRoute,createFarmValidator,validateRequest, farmController.createFarm);
router.get("/", ProtectRoute, farmController.getMyFarms);
router.get("/:id", ProtectRoute, farmController.getFarmById);
router.put("/:id", ProtectRoute,updateFarmValidator,validateRequest, farmController.updateFarm);
router.delete("/:id", ProtectRoute, farmController.deleteFarm);

export default router;