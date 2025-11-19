import { Prisma } from "@prisma/client";
import { LoginRequestDTO, RegisterRequestDTO, RegisterResponseDTO,LoginResponseDTO } from "../dtos/auth.dto";
import { prisma } from "../config/primsa";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { CreateToken } from "../utils/jwt.utils";


export async function register(dto: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const isExisting = await prisma.user.findUnique({
        where: {
            email: dto.email
        }
    })
    if (isExisting) {
        throw new Error("Your email already registered")
    }

    const hashedPassword = await hashPassword(dto.password)

    const user = await prisma.user.create({
        data: {
            email: dto.email,
            name: dto.name,
            password: hashedPassword
        }
    })

    const resDto: RegisterResponseDTO = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
    }

    return resDto
}

export async function login(dto: LoginRequestDTO):Promise<LoginResponseDTO>{
    const user = await prisma.user.findUnique({
        select: { password: true,email:true,id:true },
        where: {
            email: dto.email
        }
    })
    if(!user){
        throw new Error("Credential didnt match")
    }

    const isPasswordOk= await comparePassword(dto.password,user.password)
    if(!isPasswordOk) throw new Error("Credential didnt match")

    const newToken = CreateToken({
        userId:user.id,
        email:user.password
    })

    const resDto:LoginResponseDTO = {
        token:newToken
    }

    return resDto;
}