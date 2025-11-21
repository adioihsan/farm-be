// /src/controllers/dashboard.controller.ts
import { Request, Response } from "express";
import {
  DashboardRange,
  DashboardRequestDTO,
} from "../dtos/dashboard.dto";
import * as dashboardService from "../services/dashboard.service";
import { successResponse, errorResponse } from "../utils/response.util";

export async function getDashboard(req: Request, res: Response) {
  try {
    const rangeParam = (req.query.range as DashboardRange) || "30d";

    const reqDto: DashboardRequestDTO = {
      range: rangeParam,
    };

    const data = await dashboardService.getDashboardData(reqDto);

    return res.json(
      successResponse("Dashboard data fetched successfully", data)
    );
  } catch (error: any) {
    console.error("getDashboard error:", error);
    return res.status(500).json(
      errorResponse(error?.message || "Failed to fetch dashboard data")
    );
  }
}
