"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdHandler = void 0;
const uuid_1 = require("uuid");
const requestIdHandler = (req, res, next) => {
    const requestId = req.headers['x-request-id'] || (0, uuid_1.v4)();
    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
};
exports.requestIdHandler = requestIdHandler;
//# sourceMappingURL=request-id.js.map