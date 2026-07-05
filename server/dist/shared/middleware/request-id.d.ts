import { Request, Response, NextFunction } from 'express';
export declare const requestIdHandler: (req: Request, res: Response, next: NextFunction) => void;
declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
    }
}
//# sourceMappingURL=request-id.d.ts.map