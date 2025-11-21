// /src/validators/dashboard.validator.ts
import { query } from "express-validator";

export const dashboardValidator = [
  query("range")
    .optional()
    .isIn(["7d", "30d", "90d"])
    .withMessage("range must be one of: 7d, 30d, 90d"),
];
