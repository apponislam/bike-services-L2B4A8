"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customers_route_1 = require("../modules/customers/customers.route");
const bikes_route_1 = require("../modules/bikes/bikes.route");
const bikeServices_route_1 = require("../modules/bikeServices/bikeServices.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/customers",
        route: customers_route_1.customerRoutes,
    },
    {
        path: "/bikes",
        route: bikes_route_1.bikeRoutes,
    },
    {
        path: "/services",
        route: bikeServices_route_1.serviceRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
