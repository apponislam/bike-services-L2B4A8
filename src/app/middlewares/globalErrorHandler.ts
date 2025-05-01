import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";

interface ErrorResponse {
    success: boolean;
    status: number;
    message: string;
    stack?: string;
}

const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    // Default error response
    let errorResponse: ErrorResponse = {
        success: false,
        status: 500,
        message: "Something went wrong!",
        ...(process.env.NODE_ENV === "development" && { stack: (err as Error)?.stack }),
    };

    // Handle Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2023":
                errorResponse = {
                    success: false,
                    status: 400,
                    message: "Invalid ID format",
                    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
                };
                break;
            case "P2025":
                errorResponse = {
                    success: false,
                    status: 404,
                    message: "Record not found",
                    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
                };
                break;
            case "P2002":
                errorResponse = {
                    success: false,
                    status: 409,
                    message: "Duplicate record",
                    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
                };
                break;
            default:
                errorResponse = {
                    success: false,
                    status: 500,
                    message: "Database error",
                    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
                };
        }
    }
    // Handle other Error types
    else if (err instanceof Error) {
        errorResponse = {
            success: false,
            status: 500,
            message: err.message,
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        };
    }

    res.status(errorResponse.status).json(errorResponse);
};

export default globalErrorHandler;
