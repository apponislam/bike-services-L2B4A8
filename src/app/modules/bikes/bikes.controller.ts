import { Request, Response } from "express";
import { bikeServices } from "./bikes.service";

const createBike = async (req: Request, res: Response) => {
    try {
        const bike = await bikeServices.createBike(req.body);
        res.status(201).json({
            success: true,
            message: "Bike added successfully",
            data: bike,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getAllBikes = async (req: Request, res: Response) => {
    try {
        const bikes = await bikeServices.getAllBikes();
        res.status(200).json({
            success: true,
            message: "Bikes fetched successfully",
            data: bikes,
        });
    } catch (error) {
        console.error("Get all bikes error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getBikeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bike = await bikeServices.getBikeById(id);

        res.status(200).json({
            success: true,
            message: "Bike fetched successfully",
            data: bike,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const bikeController = {
    createBike,
    getAllBikes,
    getBikeById,
};
