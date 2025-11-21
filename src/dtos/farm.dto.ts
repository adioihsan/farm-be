export interface CreateFarmDTO {
    farmName: string;
    ownerName: string;
    location: string;
    isPartner: boolean;
}

export interface UpdateFarmDTO {
    farmName?: string;
    ownerName?: string;
    location?: string;
    isPartner?: boolean;
}