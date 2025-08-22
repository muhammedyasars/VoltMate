import api from '../api-client';


export const adminApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/Admin/dashboard');
    return response.data;
  },

  // Users
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await api.get('/Admin/users', { params });
    return response.data;
  },

  getUserById: async (userId: number) => {
    const response = await api.get(`/Admin/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: number, userData: any) => {
    const response = await api.put(`/Admin/users/${userId}`, userData);
    return response.data;
  },

  updateUserStatus: async (userId: number, status: string) => {
    const response = await api.put(`/Admin/users/${userId}/status`, { status });
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const response = await api.delete(`/Admin/users/${userId}`);
    return response.data;
  },

  // Managers
  getAllManagers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await api.get('/Admin/managers', { params });
    return response.data;
  },

  getManagerById: async (managerId: number) => {
    const response = await api.get(`/Admin/managers/${managerId}`);
    return response.data;
  },

  createManager: async (managerData: any) => {
    const response = await api.post('/Admin/managers', managerData);
    return response.data;
  },

  updateManager: async (managerId: number, managerData: any) => {
    const response = await api.put(`/Admin/managers/${managerId}`, managerData);
    return response.data;
  },

  updateManagerStatus: async (managerId: number, status: string) => {
    const response = await api.put(`/Admin/managers/${managerId}/status`, { status });
    return response.data;
  },

  deleteManager: async (managerId: number) => {
    const response = await api.delete(`/Admin/managers/${managerId}`);
    return response.data;
  },

  // Stations
  getAllStations: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await api.get('/Admin/stations', { params });
    return response.data;
  },

  getStationById: async (stationId: number) => {
    const response = await api.get(`/Admin/stations/${stationId}`);
    return response.data;
  },

  approveStation: async (stationId: number) => {
    const response = await api.put(`/Admin/stations/${stationId}/approve`);
    return response.data;
  },

  rejectStation: async (stationId: number, reason?: string) => {
    const response = await api.put(`/Admin/stations/${stationId}/reject`, { reason });
    return response.data;
  },

  // Bookings
  getAllBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get('/Admin/bookings', { params });
    return response.data;
  },

  // Reports
  getRevenueReport: async (params: {
    startDate: string;
    endDate: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => {
    const response = await api.get('/Admin/reports/revenue', { params });
    return response.data;
  },

  getBookingReport: async (params: {
    startDate: string;
    endDate: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => {
    const response = await api.get('/Admin/reports/bookings', { params });
    return response.data;
  },

  getUserReport: async (params: {
    startDate: string;
    endDate: string;
  }) => {
    const response = await api.get('/Admin/reports/users', { params });
    return response.data;
  },

  exportReport: async (reportType: string, params: any) => {
    const response = await api.get(`/Admin/reports/export/${reportType}`, { 
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};