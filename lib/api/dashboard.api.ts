// lib/api/dashboard.api.ts

import api from '../api-client';

export const dashboardApi = {
  // User Dashboard
  getUserDashboard: async () => {
    const response = await api.get('/Dashboard/user');
    return response.data;
  },

  // Manager Dashboard
  getManagerDashboard: async () => {
    const response = await api.get('/Dashboard/manager');
    return response.data;
  },

  // Manager Revenue Stats
  getManagerRevenueStats: async (period: string = 'month') => {
    const response = await api.get(`/Dashboard/manager/revenue?period=${period}`);
    return response.data;
  },

  // Manager Booking Stats
  getManagerBookingStats: async (period: string = 'month') => {
    const response = await api.get(`/Dashboard/manager/bookings?period=${period}`);
    return response.data;
  },

  // Admin Dashboard
  getAdminDashboard: async () => {
    const response = await api.get('/Dashboard/admin');
    return response.data;
  },

  // User Stats
  getUserStats: async (userId: number) => {
    const response = await api.get(`/Dashboard/user/${userId}/stats`);
    return response.data;
  },

  // Environmental Impact
  getEnvironmentalImpact: async (userId: number) => {
    const response = await api.get(`/Dashboard/user/${userId}/environmental-impact`);
    return response.data;
  },

  // Usage Summary
  getUsageSummary: async (userId: number) => {
    const response = await api.get(`/Dashboard/user/${userId}/usage-summary`);
    return response.data;
  }
};