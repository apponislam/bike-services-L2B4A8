import prisma from "../../../prisma/client";

const createCustomer = async (data: { name: string; email: string; phone: string }) => {
    const result = prisma.customer.create({
        data,
    });
    return result;
};

const getAllCustomers = async () => {
    const result = await prisma.customer.findMany();
    return result;
};

export const customerServices = {
    createCustomer,
    getAllCustomers,
};
