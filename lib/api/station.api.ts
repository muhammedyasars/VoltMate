// lib/api/station.api.ts
import api from '../api-client';


export const stationApi = {
  // Get all stations
  getAllStations: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await api.get('/Stations', { params });
    return response.data;
  },

  // Get station by ID
  getStationById: async (id: number) => {
    const response = await api.get(`/Stations/${id}`);
    return response.data;
  },

  // Search stations
  searchStations: async (searchParams: {
    location?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
    amenities?: string[];
  }) => {
    const response = await api.get('/Stations/search', { params: searchParams });
    return response.data;
  },

  // Get station availability
  getStationAvailability: async (stationId: number, date: string) => {
    const response = await api.get(`/Stations/${stationId}/availability`, { 
      params: { date } 
    });
    return response.data;
  },

  // Get nearby stations
  getNearbyStations: async (latitude: number, longitude: number, radius: number = 10) => {
    const response = await api.get('/Stations/nearby', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  },

  // Get station reviews
  getStationReviews: async (stationId: number) => {
    const response = await api.get(`/Stations/${stationId}/reviews`);
    return response.data;
  },

  // Add station review
  addStationReview: async (stationId: number, reviewData: {
    rating: number;
    comment: string;
  }) => {
    const response = await api.post(`/Stations/${stationId}/reviews`, reviewData);
    return response.data;
  },

  // Get station statistics
  getStationStats: async (stationId: number) => {
    const response = await api.get(`/Stations/${stationId}/stats`);
    return response.data;
  }
};