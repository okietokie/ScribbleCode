/**
 * Authentication Service for ScribbleCode
 * Handles login, registration, logout, and session management
 */

import { api, setToken, setRefreshToken, clearTokens, getToken } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  profile?: {
    bio?: string;
    avatar?: string;
  };
}

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse | null> => {
  const result = await api.post<AuthResponse>('/auth/login', credentials, { requiresAuth: false });
  
  if (result.success && result.data) {
    setToken(result.data.accessToken);
    setRefreshToken(result.data.refreshToken);
    return result.data;
  }
  
  return null;
};

/**
 * Register new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse | null> => {
  const result = await api.post<AuthResponse>('/auth/register', data, { requiresAuth: false });
  
  if (result.success && result.data) {
    setToken(result.data.accessToken);
    setRefreshToken(result.data.refreshToken);
    return result.data;
  }
  
  return null;
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  // Attempt to notify backend of logout (optional)
  const token = getToken();
  if (token) {
    try {
      await api.post('/auth/logout', {}, { requiresAuth: true });
    } catch (error) {
      // Ignore errors during logout
    }
  }
  
  clearTokens();
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<UserProfile | null> => {
  const result = await api.get<UserProfile>('/users/me');
  
  if (result.success && result.data) {
    return result.data;
  }
  
  return null;
};

/**
 * Update user profile
 */
export const updateProfile = async (data: {
  bio?: string;
  avatar?: string;
}): Promise<UserProfile | null> => {
  const result = await api.patch<UserProfile>('/users/profile', data);
  
  if (result.success && result.data) {
    return result.data;
  }
  
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  updateProfile,
  isAuthenticated,
};
