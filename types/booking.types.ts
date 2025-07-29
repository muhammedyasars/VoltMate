import { Station } from './station.types';
import { User } from './auth.types';

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show';

export interface Booking {
  id: string;
  userId: string;
  stationId: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  totalPrice: number;
  kwh?: number;
  paymentStatus?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  station?: Station;
}

export interface BookingRequest {
  stationId: string;
  startTime: string;
  duration: number;
}

export interface BookingListResponse {
  bookings: Booking[];
  total: number;
}