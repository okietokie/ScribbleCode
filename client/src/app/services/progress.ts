/**
 * Progress Service for ScribbleCode
 * Handles progress synchronization with backend
 */

import { api } from './api';

export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
  xpEarned?: number;
  coinsEarned?: number;
  accuracy?: number;
}

export interface SyncProgressRequest {
  lessons: LessonProgress[];
}

export interface SyncProgressResponse {
  synced: number;
  conflicts: Array<{
    lessonId: string;
    local: LessonProgress;
    server: LessonProgress;
    resolved: LessonProgress;
  }>;
}

/**
 * Get user's progress
 */
export const getProgress = async (): Promise<LessonProgress[] | null> => {
  const result = await api.get<LessonProgress[]>('/progress');
  
  if (result.success && result.data) {
    return result.data;
  }
  
  return null;
};

/**
 * Sync local progress with server
 */
export const syncProgress = async (
  localProgress: LessonProgress[]
): Promise<SyncProgressResponse | null> => {
  const result = await api.post<SyncProgressResponse>('/progress/sync', {
    lessons: localProgress,
  });
  
  if (result.success && result.data) {
    return result.data;
  }
  
  return null;
};

/**
 * Save lesson completion
 */
export const saveLessonCompletion = async (data: {
  lessonId: string;
  xpEarned: number;
  coinsEarned: number;
  accuracy: number;
  timeSpentMinutes: number;
}): Promise<LessonProgress | null> => {
  const result = await api.post<LessonProgress>('/progress/lesson', data);
  
  if (result.success && result.data) {
    return result.data;
  }
  
  return null;
};

export default {
  getProgress,
  syncProgress,
  saveLessonCompletion,
};
