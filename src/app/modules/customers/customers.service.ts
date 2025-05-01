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

const getCustomerById = async (customerId: string) => {
    const result = await prisma.customer.findUniqueOrThrow({
        where: {
            customerId,
        },
    });
    return result;
};

const updateCustomer = async (
    customerId: string,
    data: {
        name?: string;
        email?: string;
        phone?: string;
    }
) => {
    const result = await prisma.customer.update({
        where: { customerId },
        data,
    });
    return result;
};

const deleteCustomer = async (customerId: string) => {
    const customer = await prisma.customer.findUnique({
        where: { customerId },
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    await prisma.customer.delete({
        where: { customerId },
    });

    return { customerId };
};

export const customerServices = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
