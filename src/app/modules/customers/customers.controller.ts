import { Request, Response } from "express";
import { customerServices } from "./customers.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const customer = await customerServices.createCustomer(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Customer created successfully",
        data: customer,
    });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
    const customers = await customerServices.getAllCustomers();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Customers fetched successfully",
        data: customers,
    });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await customerServices.getCustomerById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Customer fetched successfully",
        data: customer,
    });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.email) {
        res.status(400).json({
            success: false,
            message: "Email cannot be updated",
        });
    }

    const updatedCustomer = await customerServices.updateCustomer(id, updateData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Customer updated successfully",
        data: updatedCustomer,
    });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await customerServices.deleteCustomer(id);

    res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
    });
});

export const customerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
