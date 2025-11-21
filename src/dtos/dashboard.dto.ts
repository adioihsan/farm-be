export type DashboardRange = "7d" | "30d" | "90d";

export interface DashboardRequestDTO {
    range: DashboardRange;
}

export interface DashboardIndicatorDTO {
    totalUsers: number;
    totalFarms: number;
    partnerFarms: number;
    nonPartnerFarms: number;
    activeSessions: number;
}

export interface DashboardChartPointDTO {
    date: string;      
    farmsCreated: number;  
}

export interface DashboardResponseDTO {
    range: DashboardRange;
    indicators: DashboardIndicatorDTO;
    chart: DashboardChartPointDTO[];
}
