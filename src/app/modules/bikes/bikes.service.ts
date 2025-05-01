import prisma from "../../../prisma/client";

const createBike = async (data: { brand: string; model: string; year: number; customerId: string }) => {
    await prisma.customer.findUniqueOrThrow({
        where: { customerId: data.customerId },
    });

    const result = await prisma.bike.create({
        data,
    });
    return result;
};

const getAllBikes = async () => {
    const result = await prisma.bike.findMany();
    return result;
};

const getBikeById = async (bikeId: string) => {
    const bike = await prisma.bike.findUniqueOrThrow({
        where: { bikeId },
    });

    return bike;
};

export const bikeServices = {
    createBike,
    getAllBikes,
    getBikeById,
};
