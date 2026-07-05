/**
 * API Client for ScribbleCode Backend
 * Handles HTTP requests with authentication, error handling, and retry logic
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Types
export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

// Token management
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Request configuration
interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
  retryCount?: number;
}

// Retry logic for network failures
const fetchWithRetry = async (
  url: string,
  config: RequestConfig,
  maxRetries: number = 3
): Promise<Response> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, config);
      
      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }
      
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Network error');
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error('Request failed after retries');
};

// Main API request handler
export const apiRequest = async <T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const {
    requiresAuth = true,
    retryCount = 3,
    headers = {},
    ...restConfig
  } = config;

  const url = `${API_BASE_URL}${endpoint}`;
  
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add authentication header if required
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetchWithRetry(
      url,
      {
        ...restConfig,
        headers: requestHeaders,
      },
      retryCount
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle token expiration
      if (response.status === 401 && requiresAuth) {
        // Attempt token refresh
        const refreshed = await handleTokenRefresh();
        if (refreshed) {
          // Retry original request with new token
          return apiRequest<T>(endpoint, { ...config, retryCount: 0 });
        }
        // Clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
      }

      return {
        success: false,
        error: {
          message: data.message || 'Request failed',
          code: data.code,
          status: response.status,
        },
      };
    }

    return {
      success: true,
      data: data.data as T,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Network error',
        status: 0,
      },
    };
  }
};

// Token refresh handler
const handleTokenRefresh = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data) {
        setToken(data.data.accessToken);
        if (data.data.refreshToken) {
          setRefreshToken(data.data.refreshToken);
        }
        return true;
      }
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
  }

  return false;
};

// Convenience methods
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, { ...config, method: 'DELETE' }),
};

export default api;
