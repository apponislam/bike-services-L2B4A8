import express from "express";
import { serviceController } from "./bikeServices.controller";

const router = express.Router();

router.post("/", serviceController.createServiceRecord);
router.get("/", serviceController.getAllServiceRecords);
router.get("/:id", serviceController.getServiceRecordById);

export const serviceRoutes = router;
