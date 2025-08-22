// lib/api/auth.api.ts

import api from '../api-client';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/Auth/login', credentials);
    return response.data;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },

  managerLogin: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/Auth/manager/login', credentials);
    return response.data;
  },

  managerRegister: async (managerData: any) => {
    const response = await api.post('/Auth/manager/register', managerData);
    return response.data;
  },

  adminLogin: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/Auth/admin/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/Auth/logout');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/Auth/refresh-token', { refreshToken });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.post('/Auth/verify-email', { token });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/Auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    const response = await api.post('/Auth/reset-password', data);
    return response.data;
  }
};