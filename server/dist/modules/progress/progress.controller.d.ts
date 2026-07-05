import { Request, Response, NextFunction } from 'express';
/**
 * Get current user's progress
 */
export declare const getProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update current user's progress
 */
export declare const updateProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update lesson progress
 */
export declare const updateLessonProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update world progress
 */
export declare const updateWorldProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Sync progress from client
 */
export declare const syncProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=progress.controller.d.ts.map