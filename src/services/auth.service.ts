import { Prisma } from "@prisma/client";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dtos/auth.dto";
import { prisma } from "../config/primsa";
import { hashPassword } from "../utils/hash.util";


export async function register(dto:RegisterRequestDTO):Promise<RegisterResponseDTO>{
    const isExisting = await prisma.user.findUnique({
        where:{
            email:dto.email
        }
    })
    if(isExisting){
        throw new Error("Your email already registered")
    }

    const hashedPassword = await hashPassword(dto.password)

    const user =await prisma.user.create({
        data:{
            email:dto.email,
            name:dto.name,
            password:hashedPassword
        }
    })

    const resDto:RegisterResponseDTO={
        id:user.id,
        email:user.email,
        createdAt:user.createdAt,
    }

    return resDto
}

export async function login(){

}