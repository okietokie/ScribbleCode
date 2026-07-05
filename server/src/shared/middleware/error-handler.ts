import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/env.js';
import { AppError } from '../errors/app-errors.js';
import { ApiResponse } from '../types/api.js';

interface ErrorResponse extends ApiResponse {
  stack?: string;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let code: string | undefined = 'INTERNAL_ERROR';
  let details: Record<string, unknown> | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    details = err.details;
  } else if (err.name === 'ValidationError' && err.constructor.name !== 'AppError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Validation error';
    code = 'VALIDATION_ERROR';
  } else if (err.name === 'CastError') {
    // Mongoose cast error
    statusCode = 400;
    message = 'Invalid ID format';
    code = 'INVALID_ID';
  } else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    message = 'Resource already exists';
    code = 'DUPLICATE_KEY';
    const fields = Object.keys((err as any).keyValue || {});
    details = { fields };
  }

  const isDevelopment = config.env === 'development';

  const response: ErrorResponse = {
    success: false,
    message: isDevelopment ? message : 'An error occurred',
    timestamp: new Date().toISOString(),
    errors: details ? [{ message: JSON.stringify(details) }] : undefined,
  };

  if (isDevelopment) {
    response.stack = err.stack;
    response.errors = [{ message: err.message }];
  }

  console.error(`[Error] ${statusCode} - ${message} - ${req.method} ${req.path}`);

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(
    `Route ${req.method} ${req.originalUrl} not found`,
    404,
    'ROUTE_NOT_FOUND'
  );
  next(error);
};
