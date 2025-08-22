import { create } from 'zustand';
import  api  from '@/lib/api-client';

interface BookingState {
  bookings: any[];
  currentBooking: any | null;
  loading: boolean;
  error: string | null;
  fetchUserBookings: (userId: string) => Promise<void>;
  fetchStationBookings: (stationId: string) => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  createBooking: (bookingData: any) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,

  fetchUserBookings: async (userId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get(`/bookings/user/${userId}`);
      set({ bookings: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch bookings', 
        loading: false 
      });
    }
  },

  fetchStationBookings: async (stationId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get(`/bookings/station/${stationId}`);
      set({ bookings: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch station bookings', 
        loading: false 
      });
    }
  },

  fetchBookingById: async (id) => {
    set({ loading: true, error: null, currentBooking: null });
    
    try {
      const response = await api.get(`/bookings/${id}`);
      set({ currentBooking: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch booking', 
        loading: false 
      });
    }
  },

  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/bookings', bookingData);
      
      set(state => ({ 
        bookings: [...state.bookings, response.data],
        currentBooking: response.data,
        loading: false 
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create booking', 
        loading: false 
      });
      throw error;
    }
  },

  cancelBooking: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post(`/bookings/cancel/${id}`);
      
      set(state => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? response.data : booking
        ),
        currentBooking: state.currentBooking?.id === id ? response.data : state.currentBooking,
        loading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to cancel booking', 
        loading: false 
      });
      throw error;
    }
  }
}));