"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.uuidSchema = exports.usernameSchema = exports.passwordSchema = exports.emailSchema = void 0;
exports.validateData = validateData;
const zod_1 = require("zod");
// Common validation schemas
exports.emailSchema = zod_1.z.string().email('Invalid email address');
exports.passwordSchema = zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters');
exports.usernameSchema = zod_1.z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');
exports.uuidSchema = zod_1.z.string().uuid('Invalid UUID format');
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
// Helper for validating request data
function validateData(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
        throw new Error(JSON.stringify(errors));
    }
    return result.data;
}
//# sourceMappingURL=validation.js.map