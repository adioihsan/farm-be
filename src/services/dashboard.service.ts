import { prisma } from "../config/prisma";
import {
  DashboardRequestDTO,
  DashboardResponseDTO,
  DashboardIndicatorDTO,
  DashboardChartPointDTO,
  DashboardRange,
} from "../dtos/dashboard.dto";


export async function getDashboardData(
  dto: DashboardRequestDTO
): Promise<DashboardResponseDTO> {
  const { range } = dto;
  const { from, to } = getDateRange(range);

  const [totalUsers, totalFarms, partnerFarms, activeSessions] =
    await Promise.all([
      prisma.user.count(),
      prisma.farm.count(),
      prisma.farm.count({ where: { isPartner: true } }),
      prisma.session.count({
        where: {
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
      }),
    ]);

  const nonPartnerFarms = totalFarms - partnerFarms;

  const indicators: DashboardIndicatorDTO = {
    totalUsers,
    totalFarms,
    partnerFarms,
    nonPartnerFarms,
    activeSessions,
  };

  const farmsInRange = await prisma.farm.findMany({
    where: {
      createdAt: {
        gte: from,
        lte: to,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  let chart: DashboardChartPointDTO[] = [];

  if (range === "90d") {

    const weekMap = new Map<string, number>();

    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 7)) {
      const weekStart = startOfWeek(d);
      const key = formatDate(weekStart);
      if (!weekMap.has(key)) {
        weekMap.set(key, 0);
      }
    }

    for (const farm of farmsInRange) {
      const weekStart = startOfWeek(farm.createdAt);
      const key = formatDate(weekStart);
      weekMap.set(key, (weekMap.get(key) || 0) + 1);
    }

    chart = Array.from(weekMap.entries())
      .map(([date, farmsCreated]) => ({ date, farmsCreated }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  } else {

    const chartMap = new Map<string, number>();

    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      const key = formatDate(d);
      chartMap.set(key, 0);
    }
    for (const farm of farmsInRange) {
      const key = formatDate(farm.createdAt);
      chartMap.set(key, (chartMap.get(key) || 0) + 1);
    }

    chart = Array.from(chartMap.entries())
      .map(([date, farmsCreated]) => ({ date, farmsCreated }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  }

  const res: DashboardResponseDTO = {
    range,
    indicators,
    chart,
  };

  return res;
}


// HELPER
function getDateRange(range: DashboardRange): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date(to);

  switch (range) {
    case "7d":
      from.setDate(to.getDate() - 6);
      break;
    case "30d":
      from.setDate(to.getDate() - 29);
      break;
    case "90d":
      from.setDate(to.getDate() - 89);
      break;
    default:
      from.setDate(to.getDate() - 29);
  }

  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);

  return { from, to };
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
