"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const async_handler_js_1 = require("../../shared/middleware/async-handler.js");
const validate_request_js_1 = require("../../shared/middleware/validate-request.js");
const auth_js_1 = require("../../shared/middleware/auth.js");
const progressController = __importStar(require("./progress.controller.js"));
const progress_validation_js_1 = require("./progress.validation.js");
const router = (0, express_1.Router)();
// All progress routes require authentication
router.use(auth_js_1.authMiddleware);
/**
 * GET /api/v1/progress
 * Get current user's learning progress
 */
router.get('/', (0, async_handler_js_1.asyncHandler)(progressController.getProgress));
/**
 * PATCH /api/v1/progress
 * Update current user's general progress
 */
router.patch('/', (0, validate_request_js_1.validateRequest)(progress_validation_js_1.updateProgressSchema), (0, async_handler_js_1.asyncHandler)(progressController.updateProgress));
/**
 * PATCH /api/v1/progress/lesson
 * Update lesson-specific progress
 */
router.patch('/lesson', (0, validate_request_js_1.validateRequest)(progress_validation_js_1.lessonProgressSchema), (0, async_handler_js_1.asyncHandler)(progressController.updateLessonProgress));
/**
 * PATCH /api/v1/progress/world
 * Update world-specific progress
 */
router.patch('/world', (0, validate_request_js_1.validateRequest)(progress_validation_js_1.worldProgressSchema), (0, async_handler_js_1.asyncHandler)(progressController.updateWorldProgress));
/**
 * POST /api/v1/progress/sync
 * Synchronize full progress state from client
 */
router.post('/sync', (0, validate_request_js_1.validateRequest)(progress_validation_js_1.syncProgressSchema), (0, async_handler_js_1.asyncHandler)(progressController.syncProgress));
exports.default = router;
//# sourceMappingURL=progress.routes.js.map