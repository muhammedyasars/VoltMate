import { api } from "@/lib/api-client";
import { useState, useCallback } from "react";


export const useApi = <T, P = any>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" = "get"
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (payload?: P, params?: Record<string, any>) => {
      setLoading(true);
      setError(null);

      try {
        let response;

        switch (method) {
          case "get":
            response = await api.get<T>(endpoint, { params });
            break;
          case "post":
            response = await api.post<T>(endpoint, payload, { params });
            break;
          case "put":
            response = await api.put<T>(endpoint, payload, { params });
            break;
          case "delete":
            response = await api.delete<T>(endpoint, { params });
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(response.data);
        return response.data;
      } catch (err: any) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "An error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return {
    data,
    error,
    loading,
    execute,
    setData, 
  };
};
