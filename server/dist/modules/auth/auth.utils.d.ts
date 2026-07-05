import { JwtPayload } from '../../shared/middleware/auth.js';
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export declare const generateAccessToken: (payload: JwtPayload) => string;
export declare const generateRefreshToken: (payload: JwtPayload) => string;
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
export declare const decodeToken: (token: string) => JwtPayload | null;
export declare const getAccessTokenExpiry: () => number;
export declare const getRefreshTokenExpiry: () => number;
//# sourceMappingURL=auth.utils.d.ts.map