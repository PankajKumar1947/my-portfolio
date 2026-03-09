import { AxiosError } from "axios";

// Define the structure for our error responses
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

/**
 * Standardized error handler for Axios responses.
 * Maps status codes and network conditions to user-friendly messages.
 */
export const handleAxiosError = (error: AxiosError): string => {
  let errorMessage = "An unexpected error occurred. Please try again.";
  const status = error.response?.status;
  const data = error.response?.data as ApiErrorResponse;

  // 1. Prioritize backend-provided error messages (checking both 'error' and 'message' keys)
  if (data && (data.error || data.message)) {
    return data.error || data.message || errorMessage;
  }

  // 2. Handle specific network/timeout issues
  if (error.code === "ECONNABORTED") {
    errorMessage = "Request timeout. Please try again.";
  } else if (!error.response) {
    errorMessage = "Network error. Please check your internet connection.";
  } else {
    // 3. Fallback to status code mapping if no backend message is provided
    switch (status) {
      case 400:
        errorMessage = "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in again.";
        break;
      case 403:
        errorMessage = "Forbidden. You don't have permission.";
        break;
      case 404:
        errorMessage = "Not found. The requested resource doesn't exist.";
        break;
      case 429:
        errorMessage = "Too many requests. Please try again later.";
        break;
      case 500:
        errorMessage = "Internal server error. Try again later.";
        break;
      case 502:
        errorMessage = "Bad gateway. Try again later.";
        break;
      case 503:
        errorMessage = "Service unavailable. Try again later.";
        break;
      case 504:
        errorMessage = "Gateway timeout. Try again later.";
        break;
    }
  }

  return errorMessage;
};
