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
            return;
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

const getCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await customerServices.getCustomerById(id);

        if (!customer) {
            res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer fetched successfully",
            data: customer,
        });
    } catch (error) {
        console.error("Get customer by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Prevent email updates if included (optional)
        if (updateData.email) {
            res.status(400).json({
                success: false,
                message: "Email cannot be updated",
            });
        }

        const updatedCustomer = await customerServices.updateCustomer(id, updateData);

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        console.error("Update customer error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await customerServices.deleteCustomer(id);

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });
    } catch (error: any) {
        if (error.message === "Customer not found") {
            res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        console.error("Delete customer error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const customerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
