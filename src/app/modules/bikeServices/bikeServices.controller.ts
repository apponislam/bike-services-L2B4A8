import { Request, Response } from "express";
import { serviceServices } from "./bikeServices.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createServiceRecord = catchAsync(async (req: Request, res: Response) => {
    const serviceRecord = await serviceServices.createServiceRecord({
        ...req.body,
        serviceDate: new Date(req.body.serviceDate),
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Service record created successfully",
        data: serviceRecord,
    });
});

const getAllServiceRecords = catchAsync(async (req: Request, res: Response) => {
    const records = await serviceServices.getAllServiceRecords();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service records fetched successfully",
        data: records,
    });
});

const getServiceRecordById = catchAsync(async (req: Request, res: Response) => {
    const record = await serviceServices.getServiceRecordById(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service record fetched successfully",
        data: record,
    });
});

const completeService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const completionDate = req.body.completionDate ? new Date(req.body.completionDate) : undefined;

    const updatedRecord = await serviceServices.completeService(id, completionDate);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service marked as completed",
        data: updatedRecord,
    });
});

const getOverdueServices = catchAsync(async (req: Request, res: Response) => {
    const overdueServices = await serviceServices.getOverdueServices();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Overdue or pending services fetched successfully",
        data: overdueServices,
    });
});

export const serviceController = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    completeService,
    getOverdueServices,
};
