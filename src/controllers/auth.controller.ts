import { Request, Response } from "express";
import { LoginRequestDTO, RegisterRequestDTO } from "../dtos/auth.dto";
import * as authService from "../services/auth.service"
import { errorResponse, successResponse } from "../utils/response";
import { REFRESH_TOKEN } from "../types/constant";


export async function register(req: Request, res: Response) {
    try {
        const reqDto: RegisterRequestDTO = { ...req.body }
        const user = await authService.register(reqDto)

        return res.status(201).json(successResponse(
            "User registered successfully", user
        ))

    } catch (error: any) {
        return res.status(400).json(
            errorResponse(error?.message || "Failed to register user")
        );
    }
}

export async function login(req: Request, res: Response) {
    try {
        const userAgent = req.headers["user-agent"] || ""
        const ipAddress = req.ip || ""
        const withRefreshToken = req.query.withRefreshToken // note: if  'true' refresh token will included in response data, default:false
        const reqDto: LoginRequestDTO = { ...req.body }
        const tokenRes = await authService.login(reqDto, userAgent, ipAddress)
        const refreshToken = tokenRes.refreshToken

        res.cookie(REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        if (!withRefreshToken) {
            delete tokenRes.refreshToken
        }
        return res.status(201).json(successResponse("Login Success", tokenRes))
    } catch (error: any) {
        return res.status(500).json(
            errorResponse(error?.message || "Login Failed")
        );
    }
}

export async function refreshToken(req: Request, res: Response) {
    try {
        const refreshTokenRaw = req.cookies?.[REFRESH_TOKEN]
        const userAgent = req.headers["user-agent"] || ""
        const ipAddress = req.ip || ""
        const withRefreshToken = req.query.withRefreshToken //

        if (!refreshTokenRaw) {
            return res.status(401).json({ message: "Missing refresh token" });
        }

        const refreshTokenRes = await authService.refreshToken(refreshTokenRaw, userAgent, ipAddress)
        const refreshToken = refreshTokenRes.refreshToken

        res.cookie(REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        if (!withRefreshToken) {
            delete refreshTokenRes.refreshToken
        }
        return res.status(201).json(successResponse("Login Success", refreshTokenRes))

    } catch (error: any) {
        return res.status(500).json(
            errorResponse(error?.message || "Refresh Token Failed")
        );
    }
}

export async function logout(req: Request, res: Response) {
    try {
        const refreshTokenRaw = req.cookies?.[REFRESH_TOKEN];

        // general clearing
        if (!refreshTokenRaw) {
            res.clearCookie(REFRESH_TOKEN, {
                path: "/",
            });
            return res.json(successResponse("Logged out successfully"));
        }

        await authService.logout(refreshTokenRaw);

        res.clearCookie(REFRESH_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res.json(successResponse("Logged out successfully"));
    } catch (error: any) {
        return res.status(500).json(
            errorResponse(error?.message || "Failed to logout")
        );
    }
}

export async function me(req: Request, res: Response) {
    const user = req.user
    if (!user) return res.status(500).json(errorResponse("Server Error"))
    return res.json(successResponse("User authenticated", user))
}
