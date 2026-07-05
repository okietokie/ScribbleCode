export declare const config: {
    readonly env: "development" | "test" | "production";
    readonly port: number;
    readonly mongodbUri: string;
    readonly jwtSecret: string;
    readonly jwtRefreshSecret: string;
    readonly jwtExpiresIn: string;
    readonly jwtRefreshExpiresIn: string;
    readonly clientUrl: string;
    readonly logLevel: string;
    readonly rateLimitWindowMs: number;
    readonly rateLimitMaxRequests: number;
    readonly authRateLimitWindowMs: number;
    readonly authRateLimitMaxRequests: number;
    readonly cookieSecure: boolean;
    readonly cookieSameSite: "none" | "lax";
};
export default config;
//# sourceMappingURL=env.d.ts.map