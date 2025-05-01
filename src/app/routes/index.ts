import express from "express";
import { customerRoutes } from "../modules/customers/customers.route";
import { bikeRoutes } from "../modules/bikes/bikes.route";
import { serviceRoutes } from "../modules/bikeServices/bikeServices.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/customers",
        route: customerRoutes,
    },
    {
        path: "/bikes",
        route: bikeRoutes,
    },
    {
        path: "/services",
        route: serviceRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
