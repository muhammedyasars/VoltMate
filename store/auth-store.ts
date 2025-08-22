import { create } from 'zustand';
import api from '@/lib/api-client';
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

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'manager' | 'admin';
  uniqueId?: string;
}

interface ManagerRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  businessRegistrationNumber: string;
  phoneNumber?: string;
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

  // ---------- USER LOGIN ----------
  login: async (email, password, remember = false) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/Auth/user/login', { email, password });
      
      // Backend wraps response in ApiResponseDto<T>
      if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
      }
      
      // Extract from nested data object
      const responseData = res.data.data;
      const token = responseData.token;
      
      // Get role and ensure it's a valid type
      const userType = responseData.userType.toLowerCase();
      const role = (userType === 'user' || userType === 'manager' || userType === 'admin') 
        ? userType as 'user' | 'manager' | 'admin'
        : 'user'; // Default to 'user' if unknown
      
      // Create user object from response fields
      const user: User = {
        id: responseData.userId.toString(),
        email: responseData.email,
        name: responseData.name,
        role: role
      };

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Add a small delay to ensure localStorage is set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // ---------- MANAGER LOGIN ----------
  loginManager: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/Auth/manager/login', credentials);
      
      // Check for success
      if (!res.data.success) {
        throw new Error(res.data.message || "Manager login failed");
      }
      
      // Extract from nested data object
      const responseData = res.data.data;
      const token = responseData.token;
      
      // Create user object from response fields with explicit type
      const user: User = {
        id: responseData.userId.toString(),
        email: responseData.email,
        name: responseData.name,
        role: 'manager' as const,
        uniqueId: responseData.uniqueId
      };

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Add a small delay to ensure localStorage is set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Manager login failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // ---------- USER REGISTER ----------
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const dto = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        phoneNumber: userData.phoneNumber || '',
      };

      const res = await api.post('/Registration/user/register', dto);
      
      // Check for success wrapped response
      if (!res.data.success) {
        throw new Error(res.data.message || "Registration failed");
      }
      
      // Extract data from response
      const responseData = res.data.data;
      const token = responseData.token;
      
      // Create proper user object
      const user: User = {
        id: responseData.userId.toString(),
        email: responseData.email,
        name: responseData.name,
        role: 'user' as const
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // ---------- MANAGER REGISTER ----------
  registerManager: async (managerData: ManagerRegisterData) => {
    set({ loading: true, error: null });
    try {
      // Backend DTO expects: Name, Email, Password, ConfirmPassword, CompanyName, BusinessRegistrationNumber, PhoneNumber
      const dto = {
        name: managerData.name,
        email: managerData.email,
        password: managerData.password,
        confirmPassword: managerData.confirmPassword,
        companyName: managerData.companyName,
        businessRegistrationNumber: managerData.businessRegistrationNumber,
        phoneNumber: managerData.phoneNumber || '',
      };

      const res = await api.post('/Registration/manager/register', dto);

      if (res.data.success === false) {
        const errorMessage = res.data.message || 'Manager registration failed';
        set({ error: errorMessage, loading: false });
        return { success: false, error: errorMessage };
      }

      // Extract from response data
      const responseData = res.data.data || res.data;
      const token = responseData.token;
      const uniqueId = responseData.uniqueId;
      
      // Create properly typed user object
      const user: User = {
        id: responseData.userId.toString(),
        email: responseData.email,
        name: responseData.name,
        role: 'manager' as const,
        uniqueId: uniqueId
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, loading: false });

      return {
        success: true,
        uniqueId,
        message: 'Manager registration successful',
        user,
        token,
      };
    } catch (err: any) {
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

  // ---------- LOGOUT ----------
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginPreferences');
    localStorage.removeItem('registeredUser');
    set({ user: null, token: null, isAuthenticated: false });
  },

  // ---------- CHECK AUTH ----------
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

      // Get role from token and ensure it's a valid type
      const tokenRole = decoded.role?.toLowerCase() || 'user';
      const role = (tokenRole === 'user' || tokenRole === 'manager' || tokenRole === 'admin') 
        ? tokenRole as 'user' | 'manager' | 'admin'
        : 'user';

      const user: User = {
        id: decoded.sub || decoded.userId || decoded.nameid,
        email: decoded.email,
        name: decoded.name || decoded.unique_name,
        role: role
      };

      set({ user, token, isAuthenticated: true });
      return true;
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
      return false;
    }
  },
}));