import { Request, Response } from "express";
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from "../dtos/auth.dto";
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

export async function login(req:Request,res:Response){
    try {
        const reqDto: LoginRequestDTO = {...req.body}
        const token:LoginResponseDTO = await authService.login(reqDto)
        return res.status(201).json(successResponse(
            "Login Success",token
        ))
    } catch (error:any) {
        return res.status(500).json(
            errorResponse(error?.message || "Login Failed")
        );
    }
}
