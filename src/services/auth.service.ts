
import { LoginRequestDTO, RegisterRequestDTO, RefreshTokenDTO, RegisterDTO, LoginDTO } from "../dtos/auth.dto";
import { prisma } from "../config/primsa";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { createToken, generateRefreshToken, hashRefreshToken } from "../utils/token.utils";


export async function register(dto: RegisterRequestDTO): Promise<RegisterDTO> {
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

    const resDto: RegisterDTO = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
    }

    return resDto
}

export async function login(dto: LoginRequestDTO, userAgent: string, ipAddress: string): Promise<LoginDTO> {
    const user = await prisma.user.findUnique({
        select: { password: true, email: true, id: true, name: true },
        where: {
            email: dto.email
        }
    })
    if (!user) {
        throw new Error("Credential didnt match")
    }

    const isPasswordOk = await comparePassword(dto.password, user.password)
    if (!isPasswordOk) throw new Error("Credential didnt match")

    const newAccessToken = createToken({ user: { id: user.id, email: user.email, name: user.name } })
    const refreshToken = generateRefreshToken()

    await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken: refreshToken.hashed,
            userAgent,
            ipAddress,
            expiresAt: refreshToken.expiration
        }
    })

    const resDto: LoginDTO = {
        accessToken: newAccessToken,
        refreshToken: refreshToken.raw
    }

    return resDto;
}

export async function refreshToken(refreshTokenRaw: string, userAgent: string, ipAddress: string): Promise<RefreshTokenDTO> {

    const refreshTokenHashed = hashRefreshToken(refreshTokenRaw);

    const session = await prisma.session.findFirst({
        where: {
            refreshToken: refreshTokenHashed,
            revokedAt: null,
            expiresAt: { gt: new Date() }
        },
        include: { user: true }
    })

    if (!session || !session.user) {
        throw new Error("Invalid or expired refresh token")
    }

    await prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() }
    })

    const user = session.user
    const newRefreshToken = generateRefreshToken()
    const newAccessToken = createToken({ user: { id: session.user.id, email: user.email, name: user.name } })

    await prisma.session.create({
        data: {
            userId: session.userId,
            refreshToken: newRefreshToken.hashed,
            userAgent,
            ipAddress,
            expiresAt: newRefreshToken.expiration
        }
    })
    const resDto: RefreshTokenDTO = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken.raw
    }
    return resDto;
}

export async function logout(refreshTokenRaw: string): Promise<void> {
    if (!refreshTokenRaw) {
        throw new Error("Missing refresh token");
    }
    const refreshTokenHashed = hashRefreshToken(refreshTokenRaw);
    const session = await prisma.session.findFirst({
        where: {
            refreshToken: refreshTokenHashed,
            revokedAt: null,
        },
    });

    if (!session) {
        return;
    }

    await prisma.session.update({
        where: { id: session.id },
        data: {
            revokedAt: new Date(),
        },
    });
    return;
}