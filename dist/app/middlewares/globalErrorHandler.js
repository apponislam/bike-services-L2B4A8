"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../generated/prisma");
const globalErrorHandler = (err, req, res, next) => {
    let status = 500;
    let message = "Something went wrong!";
    if (err instanceof prisma_1.Prisma.PrismaClientValidationError) {
        status = 400;
        message = "Validation error: Missing or invalid fields";
    }
    else if (err instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                status = 409;
                message = "Duplicate entry (unique constraint violation)";
                break;
            case "P2025":
                status = 404;
                message = "Record not found";
                break;
            case "P2023":
                status = 400;
                message = "Invalid ID format";
                break;
            case "P2003":
                status = 400;
                message = "Foreign key constraint failed";
                break;
            case "P2016":
                status = 400;
                message = "Query interpretation error";
                break;
        }
    }
    const response = Object.assign({ success: false, status,
        message }, (process.env.NODE_ENV === "development" && { stack: err === null || err === void 0 ? void 0 : err.stack }));
    res.status(status).json(response);
};
exports.default = globalErrorHandler;
