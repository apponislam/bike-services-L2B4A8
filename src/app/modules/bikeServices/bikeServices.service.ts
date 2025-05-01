import { ServiceStatus } from "../../../../generated/prisma";
import prisma from "../../../prisma/client";

const createServiceRecord = async (data: { bikeId: string; serviceDate: Date; description: string; status: ServiceStatus }) => {
    const bike = await prisma.bike.findUniqueOrThrow({
        where: { bikeId: data.bikeId },
    });

    const result = await prisma.serviceRecord.create({
        data: {
            bikeId: data.bikeId,
            serviceDate: data.serviceDate,
            description: data.description,
            status: data.status,
            completionDate: data.status === "done" ? new Date() : null,
        },
    });
    return result;
};

const getAllServiceRecords = async () => {
    const records = await prisma.serviceRecord.findMany();
    return records.map((record) => ({
        ...record,
        status: record.status.replace("_", "-"),
    }));
};

const getServiceRecordById = async (serviceId: string) => {
    return await prisma.serviceRecord.findUnique({
        where: { serviceId },
    });
};

export const serviceServices = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
};
