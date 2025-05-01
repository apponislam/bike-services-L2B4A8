import { Request, Response } from "express";
import { bikeServices } from "./bikes.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createBike = catchAsync(async (req: Request, res: Response) => {
    const bike = await bikeServices.createBike(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Bike added successfully",
        data: bike,
    });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
    const bikes = await bikeServices.getAllBikes();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bikes fetched successfully",
        data: bikes,
    });
});

const getBikeById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bike = await bikeServices.getBikeById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bikes fetched successfully",
        data: bike,
    });
});

export const bikeController = {
    createBike,
    getAllBikes,
    getBikeById,
};
