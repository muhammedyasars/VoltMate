import { create } from 'zustand';
import { api } from '@/lib/api-client';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  loginManager: (credentials: LoginCredentials) => Promise<void>; // Added for manager login
  register: (userData: any) => Promise<void>;
  registerManager: (managerData: any) => Promise<void>; // Added for manager registration
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (email, password, remember = false) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      if (remember) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  loginManager: async (credentials) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/auth/manager/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Manager login failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  register: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  registerManager: async (managerData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/auth/manager/register', managerData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Manager registration failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false 
    });
  },
  
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    
    try {
      const response = await api.post('/auth/refresh-token', { refreshToken });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      set({ token });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      });
      return false;
    }
  },
  
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Check if token is expired
      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      
      if (isExpired) {
        // Try to refresh the token
        const refreshed = await get().refreshToken();
        if (!refreshed) return false;
      }
      
      // Get user profile
      const response = await api.get('/users/profile');
      
      set({ 
        user: response.data, 
        token, 
        isAuthenticated: true 
      });
      return true;
    } catch (error) {
      // Token is invalid
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      });
      return false;
    }
  }
}));