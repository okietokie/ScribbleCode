export declare const logger: {
    debug: (message: string, meta?: Record<string, unknown>) => void;
    info: (message: string, meta?: Record<string, unknown>) => void;
    warn: (message: string, meta?: Record<string, unknown>) => void;
    error: (message: string, meta?: Record<string, unknown>) => void;
    http: (method: string, path: string, statusCode: number, duration?: number) => void;
};
//# sourceMappingURL=logger.d.ts.map