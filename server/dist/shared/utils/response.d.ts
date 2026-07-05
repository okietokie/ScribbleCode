import { Response } from 'express';
export declare const createSuccessResponse: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response;
export declare const createErrorResponse: (res: Response, message: string, statusCode?: number, errors?: Array<{
    field?: string;
    message: string;
}>) => Response;
//# sourceMappingURL=response.d.ts.map