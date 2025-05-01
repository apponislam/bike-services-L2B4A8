import { Prisma, ServiceStatus } from "../../../../generated/prisma";
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
    const record = await prisma.serviceRecord.findUnique({
        where: { serviceId },
    });

    if (record) {
        return {
            ...record,
            status: record.status.replace("_", "-"),
        };
    }
    return null;
};

const completeService = async (serviceId: string, completionDate?: Date) => {
    return await prisma.serviceRecord.update({
        where: { serviceId },
        data: {
            status: "done" as ServiceStatus,
            completionDate: completionDate || new Date(),
        },
    });
};

const getOverdueServices = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const records = await prisma.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", "in_progress"],
            },
            serviceDate: {
                lt: sevenDaysAgo,
            },
        },
    });

    return records.map((service) => ({
        ...service,
        status: service.status === "in_progress" ? "in-progress" : service.status,
    }));
};

export const serviceServices = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    completeService,
    getOverdueServices,
};
