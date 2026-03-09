import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { handleAxiosError } from "./error-handler";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Process the error using our centralized handler
    const errorMessage = handleAxiosError(error);

    // Overwrite the default error message with our user-friendly one
    error.message = errorMessage;

    return Promise.reject(error);
  }
);

export default axiosInstance;
