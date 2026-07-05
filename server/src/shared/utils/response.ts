import { Response } from 'express';
import { ApiResponse } from '../types/api.js';

export const createSuccessResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  
  return res.status(statusCode).json(response);
};

export const createErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: Array<{ field?: string; message: string }>
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
  
  return res.status(statusCode).json(response);
};
