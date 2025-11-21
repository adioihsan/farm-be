import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token.util";
import { errorResponse } from "../utils/response.util";
import { ACCESS_TOKEN } from "../types/constant";

export function ProtectRoute(req: Request, res: Response, next: NextFunction) {
    try {
        // token from cookie; note: backup strategy for mobile access
        let accessTokenToken = req.cookies?.[ACCESS_TOKEN]

        if (!accessTokenToken) {
            // token from header
            const tokenHeader = req.headers.authorization;
            accessTokenToken = tokenHeader?.startsWith("Bearer ") ? tokenHeader.substring(7) : undefined
            if (!accessTokenToken) {
                throw new Error("Unauthorized")
            }
        }
        const payload = validateToken(accessTokenToken)
        req.user = payload.user
        return next()
    } catch (error: any) {
        const errMsg = error.message || "Invalid or Expired Token"
        return res.status(401).json(errorResponse(errMsg))
    }

}