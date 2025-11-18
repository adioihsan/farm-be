import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

//    for app error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      details: err.details || null,
    });
  }

  // for prisma error
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      status: "error",
      message: "Database error",
      details: err.meta || err.message,
    });
  }

  // Default Error
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
