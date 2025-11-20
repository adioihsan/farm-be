import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt.utils";
import { errorResponse } from "../utils/response";

export function ProtectRoute(req: Request, res: Response, next: NextFunction) {
    try {
        // token from cookie
        let authToken = req.cookies?.authToken

        if (!authToken) {
            // token from header
            const tokenHeader = req.headers.authorization;
            authToken = tokenHeader?.startsWith("Bearer ") ? tokenHeader.substring(7) : undefined
            if (!authToken) {
                throw new Error("Unauthorized")
            }
        }
        const payload = validateToken(authToken)
        req.user = payload.user
        return next()
    } catch (error: any) {
        const errMsg = error.message || "Invalid or Expired Token"
        return res.status(401).json(errorResponse(errMsg))
    }

}