// lib/api/manager.api.ts

import api from '../api-client';


export const managerApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/Manager/dashboard');
    return response.data;
  },

  // Stations
  getManagerStations: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const response = await api.get('/Manager/stations', { params });
    return response.data;
  },

  getStationById: async (stationId: number) => {
    const response = await api.get(`/Manager/stations/${stationId}`);
    return response.data;
  },

  createStation: async (stationData: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    openingTime: string;
    closingTime: string;
    description?: string;
    amenities?: string[];
    chargerTypes?: { type: string; power: number; count: number }[];
    photos?: string[];
  }) => {
    const response = await api.post('/Manager/stations', stationData);
    return response.data;
  },

  updateStation: async (stationId: number, stationData: any) => {
    const response = await api.put(`/Manager/stations/${stationId}`, stationData);
    return response.data;
  },

  uploadStationPhotos: async (stationId: number, formData: FormData) => {
    const response = await api.post(`/Manager/stations/${stationId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteStationPhoto: async (stationId: number, photoId: string) => {
    const response = await api.delete(`/Manager/stations/${stationId}/photos/${photoId}`);
    return response.data;
  },

  // Bookings
  getStationBookings: async (stationId: number, params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get(`/Manager/stations/${stationId}/bookings`, { params });
    return response.data;
  },

  getAllBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get('/Manager/bookings', { params });
    return response.data;
  },

  approveBooking: async (bookingId: number) => {
    const response = await api.put(`/Manager/bookings/${bookingId}/approve`);
    return response.data;
  },

  rejectBooking: async (bookingId: number, reason: string) => {
    const response = await api.put(`/Manager/bookings/${bookingId}/reject`, { reason });
    return response.data;
  },

  // Reports
  getStationReport: async (stationId: number, params: {
    startDate: string;
    endDate: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => {
    const response = await api.get(`/Manager/stations/${stationId}/reports`, { params });
    return response.data;
  },

  getRevenueReport: async (params: {
    startDate: string;
    endDate: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => {
    const response = await api.get('/Manager/reports/revenue', { params });
    return response.data;
  },

  // Users
  getStationUsers: async (stationId: number, params?: {
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get(`/Manager/stations/${stationId}/users`, { params });
    return response.data;
  },

  // Settings
  updateStationPricing: async (stationId: number, pricingData: {
    baseRate: number;
    peakHourRate?: number;
    peakHourStart?: string;
    peakHourEnd?: string;
    discountPercentage?: number;
  }) => {
    const response = await api.put(`/Manager/stations/${stationId}/pricing`, pricingData);
    return response.data;
  },

  updateStationAvailability: async (stationId: number, availabilityData: {
    slots: Array<{
      day: string;
      isOpen: boolean;
      openingTime?: string;
      closingTime?: string;
      excludedDates?: string[];
    }>;
  }) => {
    const response = await api.put(`/Manager/stations/${stationId}/availability`, availabilityData);
    return response.data;
  }
};