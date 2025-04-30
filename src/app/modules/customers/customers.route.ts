import express from "express";
import { customerController } from "./customers.controller";

const router = express.Router();

router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);

export const customerRoutes = router;
