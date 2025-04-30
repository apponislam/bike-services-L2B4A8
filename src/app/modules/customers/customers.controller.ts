import { Request, Response } from "express";
import { customerServices } from "./customers.service";

const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await customerServices.createCustomer(req.body);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer,
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        console.error("Create customer error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerServices.getAllCustomers();
        res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    } catch (error) {
        console.error("Get all customers error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const customerController = {
    createCustomer,
    getAllCustomers,
};
