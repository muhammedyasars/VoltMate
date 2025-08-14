import { create } from 'zustand';
import { api } from '@/lib/api-client';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  email: string;
  password: string;
}

interface ManagerLoginCredentials {
  email: string;
  password: string;
  uniqueManagerId: string;
}

// Add proper interface for manager registration that matches your DTO
interface ManagerRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  businessRegistrationNumber: string;
  phoneNumber?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'manager' | 'admin';
}

interface ManagerRegistrationResponse {
  success: boolean;
  uniqueId?: string;
  message?: string;
  error?: string;
  user?: User;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  loginManager: (credentials: ManagerLoginCredentials) => Promise<void>;
  register: (userData: any) => Promise<void>;
  registerManager: (managerData: ManagerRegisterData) => Promise<ManagerRegistrationResponse>;
  logout: () => void;
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
      const res = await api.post('/Auth/user/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  loginManager: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/Auth/manager/login', credentials);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Manager login failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/Auth/user/register', userData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  registerManager: async (managerData: ManagerRegisterData) => {
    set({ loading: true, error: null });
    try {
      // Transform the data to match the C# DTO structure (PascalCase)
      const dto = {
        FirstName: managerData.firstName,
        LastName: managerData.lastName,
        Email: managerData.email,
        Password: managerData.password,
        ConfirmPassword: managerData.confirmPassword,
        CompanyName: managerData.companyName,
        BusinessRegistrationNumber: managerData.businessRegistrationNumber,
        PhoneNumber: managerData.phoneNumber || ''
      };

      const res = await api.post('/Auth/manager/register', dto);
      
      // Handle response that might indicate failure with status 200
      if (res.data.success === false) {
        const errorMessage = res.data.message || 'Manager registration failed';
        set({ error: errorMessage, loading: false });
        return { success: false, error: errorMessage };
      }
      
      const { token, user, uniqueId } = res.data;

      localStorage.setItem('token', token);
      
      set({ user, token, isAuthenticated: true, loading: false });
      
      return { 
        success: true, 
        uniqueId, 
        message: 'Manager registration successful',
        user,
        token
      };
    } catch (err: any) {
      // Server returned an error status
      let errorMessage = 'Manager registration failed';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat();
        errorMessage = validationErrors.join(', ');
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginPreferences');
    localStorage.removeItem('registeredUser');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
        return false;
      }

      const user = {
        id: decoded.sub || decoded.userId,
        email: decoded.email,
        name: decoded.name || decoded.unique_name,
        role: decoded.role || 'user'
      };
      
      set({ user, token, isAuthenticated: true });
      return true;
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
      return false;
    }
  }
}));