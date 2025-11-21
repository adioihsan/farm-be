import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as farmService from "../services/farm.service";
import { CreateFarmDTO, UpdateFarmDTO } from "../dtos/farm.dto";


export async function createFarm(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(500).json(errorResponse("Server Error"));
    }

    const reqDto: CreateFarmDTO = { ...req.body };
    console.log(reqDto)
    const farm = await farmService.createFarm(user.id, reqDto);

    return res
      .status(201)
      .json(successResponse("Farm created successfully", farm));
  } catch (error: any) {
    return res
      .status(400)
      .json(
        errorResponse(error?.message || "Failed to create farm")
      );
  }
}

export async function getMyFarms(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(500).json(errorResponse("Server Error"));
    }

    const farms = await farmService.listFarmsByUser(user.id);
    return res.json(successResponse("Farms fetched successfully", farms));
  } catch (error: any) {
    return res
      .status(500)
      .json(
        errorResponse(error?.message || "Failed to fetch farms")
      );
  }
}

export async function getFarmById(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(500).json(errorResponse("Server Error"));
    }

    const farmId = req.params.id;
    const farm = await farmService.getFarmById(farmId, user.id);

    return res.json(successResponse("Farm fetched successfully", farm));
  } catch (error: any) {
    return res
      .status(404)
      .json(
        errorResponse(error?.message || "Farm not found")
      );
  }
}

export async function updateFarm(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(500).json(errorResponse("Server Error"));
    }

    const farmId = req.params.id;
    const reqDto: UpdateFarmDTO = { ...req.body };

    const farm = await farmService.updateFarm(farmId, user.id, reqDto);

    return res.json(successResponse("Farm updated successfully", farm));
  } catch (error: any) {
    return res
      .status(400)
      .json(
        errorResponse(error?.message || "Failed to update farm")
      );
  }
}

export async function deleteFarm(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(500).json(errorResponse("Server Error"));
    }

    const farmId = req.params.id;
    await farmService.deleteFarm(farmId, user.id);

    return res.json(successResponse("Farm deleted successfully", null));
  } catch (error: any) {
    return res
      .status(400)
      .json(
        errorResponse(error?.message || "Failed to delete farm")
      );
  }
}
