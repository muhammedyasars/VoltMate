// lib/api/booking.api.ts
import api from '../api-client';


export const bookingApi = {
  // Get user bookings
  getUserBookings: async (userId: number, params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const response = await api.get(`/Bookings/user/${userId}`, { params });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id: number) => {
    const response = await api.get(`/Bookings/${id}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData: {
    stationId: number;
    bookingDate: string;
    timeSlot: string;
    duration: number;
    vehicleType: string;
    vehicleNumber?: string;
  }) => {
    const response = await api.post('/Bookings', bookingData);
    return response.data;
  },

  // Update booking
  updateBooking: async (id: number, bookingData: any) => {
    const response = await api.put(`/Bookings/${id}`, bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id: number, reason?: string) => {
    const response = await api.post(`/Bookings/${id}/cancel`, { reason });
    return response.data;
  },

  // Get recent bookings
  getRecentBookings: async (userId: number, limit: number = 5) => {
    const response = await api.get(`/Bookings/user/${userId}/recent`, { 
      params: { limit } 
    });
    return response.data;
  },

  // Check booking availability
  checkAvailability: async (stationId: number, date: string, timeSlot: string) => {
    const response = await api.post('/Bookings/check-availability', {
      stationId,
      date,
      timeSlot
    });
    return response.data;
  },

  // Get booking invoice
  getBookingInvoice: async (bookingId: number) => {
    const response = await api.get(`/Bookings/${bookingId}/invoice`);
    return response.data;
  },

  // Start charging session
  startCharging: async (bookingId: number) => {
    const response = await api.post(`/Bookings/${bookingId}/start-charging`);
    return response.data;
  },

  // Stop charging session
  stopCharging: async (bookingId: number) => {
    const response = await api.post(`/Bookings/${bookingId}/stop-charging`);
    return response.data;
  }
};