"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceServices = void 0;
const client_1 = __importDefault(require("../../../prisma/client"));
const createServiceRecord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield client_1.default.bike.findUniqueOrThrow({
        where: { bikeId: data.bikeId },
    });
    const result = yield client_1.default.serviceRecord.create({
        data: {
            bikeId: data.bikeId,
            serviceDate: data.serviceDate,
            description: data.description,
            status: data.status,
            completionDate: data.status === "done" ? new Date() : null,
        },
    });
    return result;
});
const getAllServiceRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield client_1.default.serviceRecord.findMany();
    return records.map((record) => (Object.assign(Object.assign({}, record), { status: record.status.replace("_", "-") })));
});
const getServiceRecordById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield client_1.default.serviceRecord.findUniqueOrThrow({
        where: { serviceId },
    });
    if (record) {
        return Object.assign(Object.assign({}, record), { status: record.status.replace("_", "-") });
    }
    return null;
});
const completeService = (serviceId, completionDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.serviceRecord.update({
        where: { serviceId },
        data: {
            status: "done",
            completionDate: completionDate || new Date(),
        },
    });
});
const getOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const records = yield client_1.default.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", "in_progress"],
            },
            serviceDate: {
                lt: sevenDaysAgo,
            },
        },
    });
    return records.map((service) => (Object.assign(Object.assign({}, service), { status: service.status === "in_progress" ? "in-progress" : service.status })));
});
exports.serviceServices = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    completeService,
    getOverdueServices,
};
