import { Request, Response } from "express";
import { serviceServices } from "./bikeServices.service";

const createServiceRecord = async (req: Request, res: Response) => {
    try {
        const serviceRecord = await serviceServices.createServiceRecord({
            ...req.body,
            serviceDate: new Date(req.body.serviceDate),
        });

        res.status(201).json({
            success: true,
            message: "Service record created successfully",
            data: serviceRecord,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
};

const getAllServiceRecords = async (req: Request, res: Response) => {
    try {
        const records = await serviceServices.getAllServiceRecords();

        res.status(200).json({
            success: true,
            message: "Service records fetched successfully",
            data: records,
        });
    } catch (error) {
        console.error("Get service records error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getServiceRecordById = async (req: Request, res: Response) => {
    try {
        const record = await serviceServices.getServiceRecordById(req.params.id);

        if (!record) {
            res.status(404).json({
                success: false,
                message: "Service record not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Service record fetched successfully",
            data: record,
        });
    } catch (error) {
        console.error("Get service record error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const serviceController = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
};
