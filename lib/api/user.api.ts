// lib/api/user.api.ts

import api from '../api-client';


export const userApi = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/Users/profile');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number) => {
    const response = await api.get(`/Users/${id}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: any) => {
    const response = await api.put('/Users/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData: { 
    currentPassword: string; 
    newPassword: string 
  }) => {
    const response = await api.post('/Users/change-password', passwordData);
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (formData: FormData) => {
    const response = await api.post('/Users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete('/Users/account');
    return response.data;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/Users/preferences');
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences: any) => {
    const response = await api.put('/Users/preferences', preferences);
    return response.data;
  }
};