"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route not found: ${req.originalUrl}`,
    });
};
exports.default = notFoundHandler;
