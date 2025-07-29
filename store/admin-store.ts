// store/admin-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'manager' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  totalBookings?: number;
  totalSpent?: number;
}

interface Station {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'maintenance' | 'offline';
  chargers: number;
  availableChargers: number;
  rating: number;
  totalBookings: number;
  revenue: number;
  managerId?: string;
}

interface Booking {
  id: string;
  userId: string;
  userName: string;
  stationId: string;
  stationName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'ongoing';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalStations: number;
  activeStations: number;
  totalBookings: number;
  totalRevenue: number;
  revenueGrowth: number;
  bookingGrowth: number;
  userGrowth: number;
  popularStations: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
  revenueChart: Array<{
    date: string;
    revenue: number;
  }>;
  bookingChart: Array<{
    date: string;
    bookings: number;
  }>;
}

interface AdminState {
  // Users
  users: User[];
  selectedUser: User | null;
  
  // Stations
  stations: Station[];
  selectedStation: Station | null;
  
  // Bookings
  bookings: Booking[];
  
  // Analytics
  analytics: Analytics | null;
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // User actions
  fetchUsers: () => Promise<void>;
  fetchUser: (userId: string) => Promise<void>;
  createUser: (userData: Partial<User>) => Promise<void>;
  updateUser: (userId: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  suspendUser: (userId: string) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
  
  // Station actions
  fetchStations: () => Promise<void>;
  fetchStation: (stationId: string) => Promise<void>;
  createStation: (stationData: Partial<Station>) => Promise<void>;
  updateStation: (stationId: string, stationData: Partial<Station>) => Promise<void>;
  deleteStation: (stationId: string) => Promise<void>;
  toggleStationStatus: (stationId: string) => Promise<void>;
  
  // Booking actions
  fetchBookings: (filters?: { status?: string; dateFrom?: string; dateTo?: string }) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: string) => Promise<void>;
  refundBooking: (bookingId: string) => Promise<void>;
  
  // Analytics actions
  fetchAnalytics: (period?: 'week' | 'month' | 'year') => Promise<void>;
  fetchRevenueReport: (startDate: string, endDate: string) => Promise<void>;
  
  // Utility actions
  clearError: () => void;
  resetStore: () => void;
}

const initialState = {
  users: [],
  selectedUser: null,
  stations: [],
  selectedStation: null,
  bookings: [],
  analytics: null,
  loading: false,
  error: null,
};

export const useAdminStore = create<AdminState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // User actions
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          // Simulated API call - replace with actual API
          const response = await fetch('/api/admin/users');
          const data = await response.json();
          
          // Mock data for development
          const mockUsers: User[] = [
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+1234567890',
              role: 'user',
              status: 'active',
              createdAt: '2024-01-15T10:00:00Z',
              lastLogin: '2024-03-20T15:30:00Z',
              totalBookings: 15,
              totalSpent: 450.50,
            },
            {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              role: 'manager',
              status: 'active',
              createdAt: '2024-01-10T10:00:00Z',
              lastLogin: '2024-03-21T09:00:00Z',
              totalBookings: 8,
              totalSpent: 280.00,
            },
            // Add more mock users as needed
          ];
          
          set({ users: mockUsers, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch users', loading: false });
        }
      },

      fetchUser: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/admin/users/${userId}`);
          const user = await response.json();
          set({ selectedUser: user, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch user', loading: false });
        }
      },

      createUser: async (userData: Partial<User>) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const newUser = await response.json();
          set((state) => ({ 
            users: [...state.users, newUser], 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to create user', loading: false });
        }
      },

      updateUser: async (userId: string, userData: Partial<User>) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const updatedUser = await response.json();
          set((state) => ({
            users: state.users.map(u => u.id === userId ? updatedUser : u),
            selectedUser: state.selectedUser?.id === userId ? updatedUser : state.selectedUser,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to update user', loading: false });
        }
      },

      deleteUser: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
          set((state) => ({
            users: state.users.filter(u => u.id !== userId),
            selectedUser: state.selectedUser?.id === userId ? null : state.selectedUser,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to delete user', loading: false });
        }
      },

      suspendUser: async (userId: string) => {
        await get().updateUser(userId, { status: 'suspended' });
      },

      activateUser: async (userId: string) => {
        await get().updateUser(userId, { status: 'active' });
      },

      // Station actions
      fetchStations: async () => {
        set({ loading: true, error: null });
        try {
          // Mock data for development
          const mockStations: Station[] = [
            {
              id: '1',
              name: 'Downtown Charging Hub',
              address: '123 Main St, City',
              status: 'active',
              chargers: 10,
              availableChargers: 6,
              rating: 4.5,
              totalBookings: 1250,
              revenue: 15000,
            },
            // Add more mock stations
          ];
          
          set({ stations: mockStations, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch stations', loading: false });
        }
      },

      fetchStation: async (stationId: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/admin/stations/${stationId}`);
          const station = await response.json();
          set({ selectedStation: station, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch station', loading: false });
        }
      },

      createStation: async (stationData: Partial<Station>) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/admin/stations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stationData),
          });
          const newStation = await response.json();
          set((state) => ({ 
            stations: [...state.stations, newStation], 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to create station', loading: false });
        }
      },

      updateStation: async (stationId: string, stationData: Partial<Station>) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/admin/stations/${stationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stationData),
          });
          const updatedStation = await response.json();
          set((state) => ({
            stations: state.stations.map(s => s.id === stationId ? updatedStation : s),
            selectedStation: state.selectedStation?.id === stationId ? updatedStation : state.selectedStation,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to update station', loading: false });
        }
      },

      deleteStation: async (stationId: string) => {
        set({ loading: true, error: null });
        try {
          await fetch(`/api/admin/stations/${stationId}`, { method: 'DELETE' });
          set((state) => ({
            stations: state.stations.filter(s => s.id !== stationId),
            selectedStation: state.selectedStation?.id === stationId ? null : state.selectedStation,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to delete station', loading: false });
        }
      },

      toggleStationStatus: async (stationId: string) => {
        const station = get().stations.find(s => s.id === stationId);
        if (station) {
          const newStatus = station.status === 'active' ? 'maintenance' : 'active';
          await get().updateStation(stationId, { status: newStatus });
        }
      },

      // Booking actions
      fetchBookings: async (filters) => {
        set({ loading: true, error: null });
        try {
          // Mock data
          const mockBookings: Booking[] = [
            {
              id: '1',
              userId: '1',
              userName: 'John Doe',
              stationId: '1',
              stationName: 'Downtown Charging Hub',
              date: '2024-03-22',
              startTime: '10:00',
              endTime: '11:00',
              status: 'confirmed',
              amount: 25.00,
              paymentStatus: 'paid',
            },
            // Add more mock bookings
          ];
          
          set({ bookings: mockBookings, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch bookings', loading: false });
        }
      },

      updateBookingStatus: async (bookingId: string, status: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
          const updatedBooking = await response.json();
          set((state) => ({
            bookings: state.bookings.map(b => b.id === bookingId ? updatedBooking : b),
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to update booking status', loading: false });
        }
      },

      refundBooking: async (bookingId: string) => {
        await get().updateBookingStatus(bookingId, 'refunded');
      },

      // Analytics actions
      fetchAnalytics: async (period = 'month') => {
        set({ loading: true, error: null });
        try {
          // Mock analytics data
          const mockAnalytics: Analytics = {
            totalUsers: 1250,
            activeUsers: 890,
            totalStations: 45,
            activeStations: 42,
            totalBookings: 5680,
            totalRevenue: 125000,
            revenueGrowth: 15.5,
            bookingGrowth: 12.3,
            userGrowth: 8.7,
            popularStations: [
              { id: '1', name: 'Downtown Hub', bookings: 450, revenue: 11250 },
              { id: '2', name: 'Airport Station', bookings: 380, revenue: 9500 },
            ],
            revenueChart: [
              { date: '2024-03-01', revenue: 4200 },
              { date: '2024-03-02', revenue: 4500 },
              // Add more data points
            ],
            bookingChart: [
              { date: '2024-03-01', bookings: 168 },
              { date: '2024-03-02', bookings: 180 },
              // Add more data points
            ],
          };
          
          set({ analytics: mockAnalytics, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch analytics', loading: false });
        }
      },

      fetchRevenueReport: async (startDate: string, endDate: string) => {
        // Implementation for revenue report
        await get().fetchAnalytics();
      },

      // Utility actions
      clearError: () => set({ error: null }),
      resetStore: () => set(initialState),
    }),
    {
      name: 'admin-store',
    }
  )
);