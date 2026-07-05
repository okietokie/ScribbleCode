"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshTokenExpiry = exports.getAccessTokenExpiry = exports.decodeToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../../config/env.js");
const generateAccessToken = (payload) => {
    const options = {
        expiresIn: env_js_1.config.jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env_js_1.config.jwtSecret, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const options = {
        expiresIn: env_js_1.config.jwtRefreshExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env_js_1.config.jwtRefreshSecret, options);
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_js_1.config.jwtSecret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_js_1.config.jwtRefreshSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
};
exports.decodeToken = decodeToken;
const getAccessTokenExpiry = () => {
    // Parse the expires_in config (e.g., "15m", "1h")
    const expiresIn = env_js_1.config.jwtExpiresIn;
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match)
        return 900000; // Default 15 minutes in ms
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        default: return 900000;
    }
};
exports.getAccessTokenExpiry = getAccessTokenExpiry;
const getRefreshTokenExpiry = () => {
    const expiresIn = env_js_1.config.jwtRefreshExpiresIn;
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match)
        return 604800000; // Default 7 days in ms
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        default: return 604800000;
    }
};
exports.getRefreshTokenExpiry = getRefreshTokenExpiry;
//# sourceMappingURL=auth.utils.js.map