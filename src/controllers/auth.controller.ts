import { Request, Response } from "express";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dtos/auth.dto";
import * as authService from "../services/auth.service"
import { errorResponse, successResponse } from "../utils/response";



export async function register(req: Request, res: Response) {
    try {
        const reqDto: RegisterRequestDTO = { ...req.body }
        const user: RegisterResponseDTO = await authService.register(reqDto)

        return res.status(201).json(successResponse(
            "User registered successfully", user
        ))

    } catch (error: any) {
        return res.status(400).json(
            errorResponse(error?.message || "Failed to register user")
        );
    }
}

