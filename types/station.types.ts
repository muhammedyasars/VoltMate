export type StationStatus = 
  | 'available' 
  | 'occupied' 
  | 'maintenance' 
  | 'offline';

export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: StationStatus;
  managerId?: string;
  powerOutput: string;
  chargerType: string;
  price: string;
  operatingHours: string;
  description?: string;
  amenities?: string[];
  imageUrl?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StationRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  powerOutput: string;
  chargerType: string;
  price: string;
  operatingHours?: string;
  description?: string;
  amenities?: string[];
  imageUrl?: string;
}

export interface StationListResponse {
  stations: Station[];
  total: number;
}