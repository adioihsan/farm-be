
import { Farm } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateFarmDTO, UpdateFarmDTO } from "../dtos/farm.dto";

export async function createFarm(userId: string, dto: CreateFarmDTO): Promise<Farm> {

    const exists = await prisma.farm.findFirst({
        where: { userId, farmName: dto.farmName },
    });

    if (exists) {
        throw new Error("Farm name already exists");
    }

    return prisma.farm.create({
        data: {
            userId,
            farmName: dto.farmName,
            ownerName: dto.ownerName,
            location: dto.location,
            isPartner: dto.isPartner,
        },
    });
}

export async function getFarmById(farmId: string, userId?: string): Promise<Farm> {
    const farm = await prisma.farm.findFirst({
        where: {
            id: farmId,
            ...(userId ? { userId } : {}),
        },
    });

    if (!farm) {
        throw new Error("Farm not found");
    }
    return farm;
}

export async function listFarmsByUser(userId: string): Promise<Farm[]> {
    const farms = await prisma.farm.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return farms;
}

export async function updateFarm(
    farmId: string,
    userId: string,
    dto: UpdateFarmDTO
): Promise<Farm> {

    const existing = await prisma.farm.findFirst({
        where: { id: farmId, userId }
    });

    if (!existing) {
        throw new Error("Farm not found or you are not allowed to update this farm");
    }

    if (dto.farmName && dto.farmName !== existing.farmName) {
        const nameExists = await prisma.farm.findFirst({
            where: { userId, farmName: dto.farmName },
        });

        if (nameExists) {
            throw new Error("Farm name already exists");
        }
    }

    return prisma.farm.update({
        where: { id: farmId },
        data: {
            farmName: dto.farmName ?? existing.farmName,
            ownerName: dto.ownerName ?? existing.ownerName,
            location: dto.location ?? existing.location,
            isPartner: dto.isPartner ?? existing.isPartner,
        },
    });
}


export async function deleteFarm(farmId: string, userId: string): Promise<void> {
    const existing = await prisma.farm.findFirst({
        where: { id: farmId, userId },
    });

    if (!existing) {
        throw new Error("Farm not found or you are not allowed to delete this farm");
    }

    await prisma.farm.delete({
        where: { id: farmId },
    });
}
