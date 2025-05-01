"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customers_controller_1 = require("./customers.controller");
const router = express_1.default.Router();
router.post("/", customers_controller_1.customerController.createCustomer);
router.get("/", customers_controller_1.customerController.getAllCustomers);
router.get("/:id", customers_controller_1.customerController.getCustomerById);
router.put("/:id", customers_controller_1.customerController.updateCustomer);
router.delete("/:id", customers_controller_1.customerController.deleteCustomer);
exports.customerRoutes = router;
