import { Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route not found: ${req.originalUrl}`,
    });
};

export default notFoundHandler;
