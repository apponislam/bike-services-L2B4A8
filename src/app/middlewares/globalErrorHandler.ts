import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";

const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let message = "Something went wrong!";

    if (err instanceof Prisma.PrismaClientValidationError) {
        status = 400;
        message = "Validation error: Missing or invalid fields";
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
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

    const response: {
        success: boolean;
        status: number;
        message: string;
        errors?: any;
        stack?: string;
    } = {
        success: false,
        status,
        message,
        // errors: err, //need to remove after work
        ...(process.env.NODE_ENV === "development" && { stack: (err as Error)?.stack }),
    };

    res.status(status).json(response);
};

export default globalErrorHandler;
