import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

class ApiClient {
  private client: AxiosInstance;
  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("accessToken");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as any;

        // Prevent infinite retry loops
        if (originalRequest._retry) {
          return Promise.reject(this.handleError(error));
        }

        // If 401 and we have a refresh token, try to refresh
        if (error.response?.status === 401 && typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refreshToken");
          
          if (refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              // Use existing promise if already refreshing
              const newAccessToken = await (this.refreshPromise || this.refreshAccessToken(refreshToken));
              
              if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return this.client(originalRequest);
              }
            } catch (refreshError) {
              // Refresh failed, redirect to login
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              return Promise.reject(refreshError);
            }
          } else {
            // No refresh token, go to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      try {
        const response = await this.client.post("/auth/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }
        
        return accessToken;
      } catch (error) {
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private handleError(error: AxiosError<ApiError>): ApiError {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: error.message || "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      status: error.response?.status || 500,
    };
  }

  get<T>(url: string, params?: Record<string, unknown>) {
    return this.client.get<T>(url, { params });
  }

  post<T>(url: string, data?: unknown) {
    return this.client.post<T>(url, data);
  }

  put<T>(url: string, data?: unknown) {
    return this.client.put<T>(url, data);
  }

  patch<T>(url: string, data?: unknown) {
    return this.client.patch<T>(url, data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url);
  }
}

export const api = new ApiClient();

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);
  return response.data;
}
