// lib/api/client.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Better token handling in request interceptor
api.interceptors.request.use(
  (config) => {
    // Try-catch to avoid errors if localStorage is not available
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token attached to request:", config.url);
      } else {
        console.log("No token found for request:", config.url);
      }
    } catch (error) {
      console.error("Error accessing token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Success [${response.config.url}]:`, response.data);
    return response;
  },
  (error) => {
    // Handle 401 errors specifically
    if (error.response && error.response.status === 401) {
      console.error("Authentication error (401). Redirecting to login...");
      // You could trigger a logout here or redirect to login
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication failed. Please login again.'));
    }
    
    console.error(`API Error [${error.config?.url}]:`, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;