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
exports.bikeServices = void 0;
const client_1 = __importDefault(require("../../../prisma/client"));
const createBike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.customer.findUniqueOrThrow({
        where: { customerId: data.customerId },
    });
    const result = yield client_1.default.bike.create({
        data,
    });
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.default.bike.findMany();
    return result;
});
const getBikeById = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield client_1.default.bike.findUniqueOrThrow({
        where: { bikeId },
    });
    return bike;
});
exports.bikeServices = {
    createBike,
    getAllBikes,
    getBikeById,
};
