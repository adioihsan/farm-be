import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array().map((err: any) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
}
