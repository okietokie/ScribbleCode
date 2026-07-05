/**
 * API Services for ScribbleCode Frontend
 */

export { api, apiRequest, getToken, setToken, clearTokens } from './api';
export type { ApiError, ApiResponse } from './api';

export {
  login,
  register,
  logout,
  getCurrentUser,
  updateProfile,
  isAuthenticated,
} from './auth';
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
} from './auth';

export { getProgress, syncProgress, saveLessonCompletion } from './progress';
export type { LessonProgress, SyncProgressResponse } from './progress';
