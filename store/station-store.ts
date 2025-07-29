import { create } from 'zustand';
import { api } from '@/lib/api-client';

interface StationState {
  stations: any[];
  currentStation: any | null;
  loading: boolean;
  error: string | null;
  fetchStations: () => Promise<void>;
  fetchStationById: (id: string) => Promise<void>;
  fetchManagerStations: (managerId: string) => Promise<void>;
  createStation: (stationData: any) => Promise<void>;
  updateStation: (id: string, stationData: any) => Promise<void>;
  deleteStation: (id: string) => Promise<void>;
}

export const useStationStore = create<StationState>((set, get) => ({
  stations: [],
  currentStation: null,
  loading: false,
  error: null,

  fetchStations: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get('/stations');
      set({ stations: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch stations', 
        loading: false 
      });
    }
  },

  fetchStationById: async (id) => {
    set({ loading: true, error: null, currentStation: null });
    
    try {
      const response = await api.get(`/stations/${id}`);
      set({ currentStation: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch station', 
        loading: false 
      });
    }
  },

  fetchManagerStations: async (managerId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get(`/stations/manager/${managerId}`);
      set({ stations: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch manager stations', 
        loading: false 
      });
    }
  },

  createStation: async (stationData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/stations', stationData);
      set(state => ({ 
        stations: [...state.stations, response.data],
        loading: false 
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create station', 
        loading: false 
      });
      throw error;
    }
  },

  updateStation: async (id, stationData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.put(`/stations/${id}`, stationData);
      
      set(state => ({
        stations: state.stations.map(station => 
          station.id === id ? response.data : station
        ),
        currentStation: state.currentStation?.id === id ? response.data : state.currentStation,
        loading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to update station', 
        loading: false 
      });
      throw error;
    }
  },

  deleteStation: async (id) => {
    set({ loading: true, error: null });
    
    try {
      await api.delete(`/stations/${id}`);
      
      set(state => ({
        stations: state.stations.filter(station => station.id !== id),
        currentStation: state.currentStation?.id === id ? null : state.currentStation,
        loading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete station', 
        loading: false 
      });
      throw error;
    }
  }
}));