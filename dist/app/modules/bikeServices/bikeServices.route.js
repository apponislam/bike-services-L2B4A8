"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bikeServices_controller_1 = require("./bikeServices.controller");
const router = express_1.default.Router();
router.post("/", bikeServices_controller_1.serviceController.createServiceRecord);
router.get("/", bikeServices_controller_1.serviceController.getAllServiceRecords);
router.get("/status", bikeServices_controller_1.serviceController.getOverdueServices);
router.get("/:id", bikeServices_controller_1.serviceController.getServiceRecordById);
router.put("/:id/complete", bikeServices_controller_1.serviceController.completeService);
exports.serviceRoutes = router;
