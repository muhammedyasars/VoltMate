import { useState, useCallback } from 'react';
import { api } from '@/lib/api-client';

export const useApi = <T, P = any>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get'
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (payload?: P) => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        switch (method) {
          case 'get':
            response = await api.get<T>(endpoint);
            break;
          case 'post':
            response = await api.post<T>(endpoint, payload);
            break;
          case 'put':
            response = await api.put<T>(endpoint, payload);
            break;
          case 'delete':
            response = await api.delete<T>(endpoint);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }
        
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message || 'An error occurred';
        setError(message);
        setLoading(false);
        throw error;
      }
    },
    [endpoint, method]
  );

  return {
    data,
    error,
    loading,
    execute
  };
};