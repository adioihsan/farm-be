
import { Farm } from "@prisma/client";
import { prisma } from "../config/primsa";
import { CreateFarmDTO, UpdateFarmDTO } from "../dtos/farm.dto";

export async function createFarm(userId: string,dto: CreateFarmDTO): Promise<Farm> {
    const farm = await prisma.farm.create({
        data: {
            userId,
            farmName: dto.farmName,
            ownerName: dto.ownerName,
            location: dto.location,
            isPartner: dto.isPartner,
        },
    });
    return farm;
}

export async function getFarmById(farmId: string,userId?: string): Promise<Farm> {
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

export async function updateFarm(farmId: string,userId: string,dto: UpdateFarmDTO): Promise<Farm> {
    const existing = await prisma.farm.findFirst({
        where: { id: farmId, userId },
    });

    if (!existing) {
        throw new Error("Farm not found or you are not allowed to update this farm");
    }

    const updated = await prisma.farm.update({
        where: { id: farmId },
        data: {
            farmName: dto.farmName ?? existing.farmName,
            ownerName: dto.ownerName ?? existing.ownerName,
            location: dto.location ?? existing.location,
            isPartner: dto.isPartner ?? existing.isPartner,
        },
    });
    return updated;
}

export async function deleteFarm(farmId: string,userId: string): Promise<void> {
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
