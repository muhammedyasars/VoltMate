// store/dashboard-store.ts

import { create } from 'zustand';
import { dashboardApi } from '@/lib/api/dashboard.api';

interface DashboardState {
  userDashboard: any;
  managerDashboard: any;
  revenueStats: any;
  bookingStats: any;
  loading: boolean;
  error: string | null;

  // Actions
  fetchUserDashboard: () => Promise<void>;
  fetchManagerDashboard: () => Promise<void>;
  fetchManagerRevenueStats: (period?: string) => Promise<void>;
  fetchManagerBookingStats: (period?: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  userDashboard: null,
  managerDashboard: null,
  revenueStats: null,
  bookingStats: null,
  loading: false,
  error: null,

  fetchUserDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardApi.getUserDashboard();
      set({ userDashboard: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchManagerDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardApi.getManagerDashboard();
      set({ managerDashboard: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchManagerRevenueStats: async (period = 'month') => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardApi.getManagerRevenueStats(period);
      set({ revenueStats: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchManagerBookingStats: async (period = 'month') => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardApi.getManagerBookingStats(period);
      set({ bookingStats: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));